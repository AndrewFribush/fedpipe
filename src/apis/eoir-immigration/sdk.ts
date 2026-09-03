/**
 * EOIR Immigration Courts SDK — bulk-ingest scaffold for the Executive Office
 * for Immigration Review's FOIA case-data release (the immigration-court
 * caseload that otherwise is only surfaced by third parties like TRAC).
 *
 * There is no query API: EOIR publishes one very large ZIP of delimited tables.
 * This module downloads it on DELIBERATE ingest (not on an incidental query —
 * the archive is multiple gigabytes), then indexes the case table into a local
 * SQLite database and answers queries locally.
 *
 * The loader is schema-GENERIC: it reads the case file's header row, sniffs the
 * delimiter, and creates a table from whatever columns are present — so it does
 * not depend on a hard-coded EOIR schema. Column names are surfaced by
 * eoir_dataset_info; filter on them with eoir_cases.
 *
 * Requires Node >= 22.5 (node:sqlite). No API key.
 * NOTE: pre-built scaffold — the archive is too large to verify here, so the
 * exact case-table filename/columns are confirmed on the first real ingest.
 */

import { existsSync, renameSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, unzipEntries, type SqliteDb } from "../../shared/bulk.js";

const ZIP_URL = "https://fileshare.eoir.justice.gov/EOIR%20Case%20Data.zip";
const HEADERS = { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" };
/** Bound the local DB for a scaffold; raise via FEDPIPE_EOIR_MAX_ROWS. */
const MAX_ROWS = Number(process.env.FEDPIPE_EOIR_MAX_ROWS ?? 3_000_000);

function dbPath(): string { return join(bulkCacheDir("eoir-immigration"), "cases.db"); }

// ─── Delimited parsing (tab | pipe | comma, sniffed from the header) ─

function sniffDelimiter(headerLine: string): string {
  const counts = { "\t": 0, "|": 0, ",": 0 } as Record<string, number>;
  for (const ch of headerLine) if (ch in counts) counts[ch]++;
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]) || "\t";
}

/** Sanitize a raw column name to a safe SQLite identifier. */
function safeCol(name: string, i: number): string {
  const c = name.replace(/^﻿/, "").trim().replace(/[^A-Za-z0-9_]/g, "_").replace(/^_+|_+$/g, "");
  return c || `col_${i}`;
}

// ─── Ingest (deliberate) ─────────────────────────────────────────────

/**
 * Download the EOIR ZIP and index the case table into local SQLite.
 * This is a LARGE download (multiple GB) and can take several minutes — call it
 * deliberately (e.g. from a maintenance script), not on a hot path.
 */
export async function ingest(): Promise<{ rowCount: number; columns: string[]; table: string }> {
  const res = await fetch(ZIP_URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`eoir-immigration: download failed (HTTP ${res.status}) from ${ZIP_URL}`);
  const zip = Buffer.from(await res.arrayBuffer());
  const entries = unzipEntries(zip); // all entries

  // Pick the case table: prefer a filename containing "case", else the largest.
  let picked: { name: string; buf: Buffer } | null = null;
  for (const [name, buf] of entries) {
    if (!/\.(csv|txt|tab)$/i.test(name)) continue;
    if (/case/i.test(name) && !/lookup|tbllook/i.test(name)) { picked = { name, buf }; break; }
    if (!picked || buf.length > picked.buf.length) picked = { name, buf };
  }
  if (!picked) throw new Error("eoir-immigration: no delimited case table found in the archive.");

  const text = picked.buf.toString("utf8");
  const nl = text.indexOf("\n");
  const headerLine = (nl === -1 ? text : text.slice(0, nl)).replace(/\r$/, "");
  const delim = sniffDelimiter(headerLine);
  const rawCols = headerLine.split(delim);
  const cols = rawCols.map(safeCol);

  const tmp = `${dbPath()}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE cases(${cols.map((c) => `"${c}" TEXT`).join(", ")});`);
  const insert = db.prepare(`INSERT INTO cases VALUES(${cols.map(() => "?").join(",")})`);

  db.exec("BEGIN");
  let count = 0;
  let start = nl + 1;
  for (let i = nl + 1; i <= text.length && count < MAX_ROWS; i++) {
    if (i === text.length || text[i] === "\n") {
      const line = text.slice(start, i).replace(/\r$/, "");
      start = i + 1;
      if (!line) continue;
      const parts = line.split(delim);
      const row = cols.map((_, c) => parts[c] ?? null);
      insert.run(...row);
      count++;
    }
  }
  db.exec("COMMIT");
  db.prepare("INSERT INTO meta(key,value) VALUES('row_count',?),('columns',?),('table',?),('built_at',?),('source',?)")
    .run(String(count), cols.join(","), picked.name, new Date().toISOString(), ZIP_URL);
  db.close();
  renameSync(tmp, dbPath());
  return { rowCount: count, columns: cols, table: picked.name };
}

const NOT_INGESTED =
  "eoir-immigration: data not yet ingested. The EOIR case data is a multi-gigabyte FOIA release with no query " +
  "API. Run the deliberate ingest first: import { ingest } from 'fedpipe/sdk/eoir-immigration'; await ingest(). " +
  "Requires Node >= 22.5.";

async function ensureDb(): Promise<SqliteDb> {
  const p = dbPath();
  if (!existsSync(p) || statSync(p).size === 0) throw new Error(NOT_INGESTED);
  return openSqlite(p);
}

// ─── Queries ─────────────────────────────────────────────────────────

/** True once the local DB has been built by ingest(). */
export function isIngested(): boolean {
  const p = dbPath();
  return existsSync(p) && statSync(p).size > 0;
}

/** The columns available in the ingested case table (empty until ingested). */
export async function columns(): Promise<string[]> {
  if (!isIngested()) return [];
  const db = await openSqlite(dbPath());
  try {
    const v = db.prepare("SELECT value FROM meta WHERE key='columns'").get()?.value ?? "";
    return v ? String(v).split(",") : [];
  } finally { db.close(); }
}

/**
 * Query the ingested case table. `filters` maps column names (see columns()) to
 * substring matches; only real columns are honored.
 */
export async function searchCases(params: {
  filters?: Record<string, string>;
  limit?: number;
}): Promise<{ rows: Array<Record<string, unknown>>; total: number }> {
  const db = await ensureDb();
  try {
    const cols = new Set(
      (db.prepare("SELECT value FROM meta WHERE key='columns'").get()?.value ?? "").split(","),
    );
    const where: string[] = [];
    const args: unknown[] = [];
    for (const [k, v] of Object.entries(params.filters ?? {})) {
      if (!cols.has(k)) continue;
      where.push(`"${k}" LIKE ?`);
      args.push(`%${v}%`);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM cases ${clause}`).get(...args)?.n ?? 0);
    const limit = Math.min(params.limit ?? 25, 200);
    const rows = db.prepare(`SELECT * FROM cases ${clause} LIMIT ?`).all(...args, limit) as Array<Record<string, unknown>>;
    return { rows, total };
  } finally { db.close(); }
}

/** Local dataset status. */
export async function datasetInfo(): Promise<{ ingested: boolean; rowCount: number; columns: string[]; table: string; builtAt: string }> {
  if (!isIngested()) return { ingested: false, rowCount: 0, columns: [], table: "", builtAt: "" };
  const db = await openSqlite(dbPath());
  try {
    const meta: Record<string, string> = {};
    for (const r of db.prepare("SELECT key,value FROM meta").all()) meta[r.key] = r.value;
    return {
      ingested: true,
      rowCount: Number(meta.row_count ?? 0),
      columns: (meta.columns ?? "").split(",").filter(Boolean),
      table: meta.table ?? "",
      builtAt: meta.built_at ?? "",
    };
  } finally { db.close(); }
}

/** Delete the local EOIR database. */
export function clearCache(): void {
  let dir: string;
  try { dir = bulkCacheDir("eoir-immigration"); } catch { return; }
  try {
    for (const f of readdirSync(dir)) {
      if (/^cases\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
    }
  } catch { /* nothing to clear */ }
}
