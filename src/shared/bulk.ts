/**
 * Shared primitives for bulk-ingest modules — sources that publish large bulk
 * downloads instead of a query API (DOL Form 5500, FAA aircraft registry).
 *
 * The pattern: download the archive once, extract it with the built-in zlib
 * (no zip dependency), parse the delimited text, and index it into a local
 * SQLite database via the built-in `node:sqlite` (no native dependency).
 * Subsequent queries hit the local DB. Requires Node >= 22.5 for node:sqlite.
 */

import { inflateRawSync } from "node:zlib";
import { mkdirSync, existsSync, renameSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

// ─── Cache location (mirrors shared/client.ts) ───────────────────────

/** A writable per-source cache directory under the fedpipe cache root. */
export function bulkCacheDir(subdir: string): string {
  const base = process.env.XDG_CACHE_HOME || join(homedir(), ".cache");
  const dir = join(base, "fedpipe", subdir);
  try {
    mkdirSync(dir, { recursive: true });
    return dir;
  } catch {
    const fallback = join(tmpdir(), "fedpipe", subdir);
    mkdirSync(fallback, { recursive: true });
    return fallback;
  }
}

// ─── node:sqlite (Node >= 22.5), loaded lazily ───────────────────────

export type SqliteDb = {
  exec(sql: string): void;
  prepare(sql: string): { run(...a: unknown[]): unknown; get(...a: unknown[]): any; all(...a: unknown[]): any[] };
  close(): void;
};

/** Open (or create) a SQLite database. Throws a clear message on Node < 22.5. */
export async function openSqlite(path: string): Promise<SqliteDb> {
  let mod: { DatabaseSync: new (p: string) => SqliteDb };
  try {
    mod = (await import("node:sqlite")) as unknown as { DatabaseSync: new (p: string) => SqliteDb };
  } catch {
    throw new Error(
      "This bulk-ingest module needs Node's built-in SQLite (node:sqlite), available in Node >= 22.5. " +
      `You are on ${process.version}. Upgrade Node to use it.`,
    );
  }
  return new mod.DatabaseSync(path);
}

// ─── ZIP extraction via the central directory (multi-entry) ──────────

const SIG_LOCAL = 0x04034b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_EOCD = 0x06054b50;

/**
 * Extract entries from a ZIP buffer. Parses the End-Of-Central-Directory
 * record and the central directory, so it works for multi-entry archives and
 * entries written with a streaming data descriptor (where the local header's
 * sizes are zero). Pass `wanted` to extract only those filenames.
 *
 * Supports stored (0) and deflate (8) — the only methods these datasets use.
 */
export function unzipEntries(buf: Buffer, wanted?: string[]): Map<string, Buffer> {
  // Find EOCD by scanning backwards (its comment field is normally empty).
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i >= buf.length - 22 - 0xffff; i--) {
    if (buf.readUInt32LE(i) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("bulk: not a ZIP (no end-of-central-directory record)");
  const count = buf.readUInt16LE(eocd + 10);
  let ptr = buf.readUInt32LE(eocd + 16); // central directory offset
  const want = wanted ? new Set(wanted) : null;
  const out = new Map<string, Buffer>();

  for (let e = 0; e < count; e++) {
    if (buf.readUInt32LE(ptr) !== SIG_CENTRAL) break;
    const method = buf.readUInt16LE(ptr + 10);
    const compSize = buf.readUInt32LE(ptr + 20);
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const localOff = buf.readUInt32LE(ptr + 42);
    const name = buf.toString("utf8", ptr + 46, ptr + 46 + nameLen);
    ptr += 46 + nameLen + extraLen + commentLen;

    if (want && !want.has(name)) continue;
    // Re-read the local header to find the true data offset (its name/extra
    // lengths can differ from the central record's extra length).
    if (buf.readUInt32LE(localOff) !== SIG_LOCAL) throw new Error(`bulk: bad local header for ${name}`);
    const lNameLen = buf.readUInt16LE(localOff + 26);
    const lExtraLen = buf.readUInt16LE(localOff + 28);
    const dataStart = localOff + 30 + lNameLen + lExtraLen;
    const comp = buf.subarray(dataStart, dataStart + compSize);
    out.set(name, method === 0 ? comp : inflateRawSync(comp));
    if (want && out.size === want.size) break;
  }
  return out;
}

// ─── CSV parsing (RFC-4180 quoting; lazy, low-memory) ────────────────

/**
 * Yield CSV records one at a time from a string. Handles quoted fields with
 * embedded commas, quotes ("" escape), and newlines. Lazy, so a caller can
 * insert row-by-row without materializing every row.
 */
export function* csvRecords(s: string): Generator<string[]> {
  let i = 0;
  const n = s.length;
  while (i < n) {
    const fields: string[] = [];
    let field = "";
    let inQuotes = false;
    while (i < n) {
      const c = s[i];
      if (inQuotes) {
        if (c === '"') {
          if (s[i + 1] === '"') { field += '"'; i += 2; }
          else { inQuotes = false; i++; }
        } else { field += c; i++; }
      } else if (c === '"') {
        inQuotes = true; i++;
      } else if (c === ",") {
        fields.push(field); field = ""; i++;
      } else if (c === "\n") {
        i++; break;
      } else if (c === "\r") {
        i += s[i + 1] === "\n" ? 2 : 1; break;
      } else { field += c; i++; }
    }
    fields.push(field); // the final field, ended by a newline or by EOF
    if (fields.length === 1 && fields[0] === "") continue; // skip blank line
    yield fields;
  }
}

// ─── Schema-generic delimited ingest (for no-API bulk files) ─────────
//
// Sources that publish a single delimited file with no query API (EOIR case
// data, ATF FFL listings, BJS extracts) share one shape: download → read the
// header → create a table from whatever columns exist → index → query locally.
// These two helpers implement that generically so each module stays tiny.

const GENERIC_MAX_ROWS = Number(process.env.FEDPIPE_BULK_MAX_ROWS ?? 5_000_000);

/** Pick the most likely delimiter (tab | pipe | comma) from a header line. */
export function sniffDelimiter(headerLine: string): string {
  const counts: Record<string, number> = { "\t": 0, "|": 0, ",": 0 };
  for (const ch of headerLine) if (ch in counts) counts[ch]++;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "\t";
}

/** Sanitize a raw column name to a safe SQLite identifier. */
function safeColumn(name: string, i: number): string {
  const c = name.replace(/^﻿/, "").trim().replace(/[^A-Za-z0-9_]/g, "_").replace(/^_+|_+$/g, "");
  return c || `col_${i}`;
}

/**
 * Index a delimited file (already downloaded into a Buffer) into a fresh SQLite
 * database, creating the table from the file's own header. Sniffs the delimiter;
 * caps rows (FEDPIPE_BULK_MAX_ROWS). Writes a `meta` table (row_count, columns,
 * table, built_at, source). Atomic via tmp-then-rename.
 */
export async function ingestDelimitedBuffer(opts: {
  buf: Buffer;
  dbPath: string;
  table: string;
  maxRows?: number;
  source?: string;
}): Promise<{ rowCount: number; columns: string[] }> {
  const text = opts.buf.toString("utf8");
  const nl = text.indexOf("\n");
  const headerLine = (nl === -1 ? text : text.slice(0, nl)).replace(/\r$/, "");
  const delim = sniffDelimiter(headerLine);
  const cols = headerLine.split(delim).map(safeColumn);

  const tmp = `${opts.dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE "${opts.table}"(${cols.map((c) => `"${c}" TEXT`).join(", ")});`);
  const insert = db.prepare(`INSERT INTO "${opts.table}" VALUES(${cols.map(() => "?").join(",")})`);

  const cap = opts.maxRows ?? GENERIC_MAX_ROWS;
  db.exec("BEGIN");
  let count = 0;
  let start = nl + 1;
  for (let i = nl + 1; i <= text.length && count < cap; i++) {
    if (i === text.length || text[i] === "\n") {
      const line = text.slice(start, i).replace(/\r$/, "");
      start = i + 1;
      if (!line) continue;
      const parts = line.split(delim);
      insert.run(...cols.map((_, c) => parts[c] ?? null));
      count++;
    }
  }
  db.exec("COMMIT");
  db.prepare("INSERT INTO meta(key,value) VALUES('row_count',?),('columns',?),('table',?),('built_at',?),('source',?)")
    .run(String(count), cols.join(","), opts.table, new Date().toISOString(), opts.source ?? "");
  db.close();
  renameSync(tmp, opts.dbPath);
  return { rowCount: count, columns: cols };
}

/**
 * Query a generically-ingested table (built by ingestDelimitedBuffer). `filters`
 * maps real column names to substring matches; unknown columns are ignored.
 */
export async function queryGenericTable(opts: {
  dbPath: string;
  table: string;
  filters?: Record<string, string>;
  limit?: number;
}): Promise<{ rows: Array<Record<string, unknown>>; total: number }> {
  const db = await openSqlite(opts.dbPath);
  try {
    const colsCsv = String(db.prepare("SELECT value FROM meta WHERE key='columns'").get()?.value ?? "");
    const cols = new Set(colsCsv.split(","));
    const where: string[] = [];
    const args: unknown[] = [];
    for (const [k, v] of Object.entries(opts.filters ?? {})) {
      if (!cols.has(k)) continue;
      where.push(`"${k}" LIKE ?`);
      args.push(`%${v}%`);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM "${opts.table}" ${clause}`).get(...args)?.n ?? 0);
    const lim = Math.min(opts.limit ?? 25, 200);
    const rows = db.prepare(`SELECT * FROM "${opts.table}" ${clause} LIMIT ?`).all(...args, lim) as Array<Record<string, unknown>>;
    return { rows, total };
  } finally {
    db.close();
  }
}
