/**
 * EOIR Immigration Courts SDK — bulk-ingest client for the Executive Office for
 * Immigration Review's FOIA case-data release (the immigration-court caseload
 * that third parties like TRAC are built on).
 *
 * There is no query API: EOIR publishes one ~4.5 GB ZIP64 archive of delimited
 * tables. That is far too large to buffer in memory (and macOS's bundled unzip
 * 6.00 can't read ZIP64), so this ingester is DISK-BASED and STREAMING: it
 * downloads the ZIP to the cache dir and streams the case table (A_TblCase)
 * through python3's zipfile line-by-line into a local SQLite database. The loader
 * is schema-GENERIC — it reads the case file's header, sniffs the delimiter, and
 * builds the table from whatever columns exist — so it does not depend on a
 * hard-coded EOIR schema.
 *
 * Requires Node >= 22.5 (node:sqlite) and python3 (its zipfile handles ZIP64;
 * both are present on macOS/Linux). No API key. Ingest is deliberate (call
 * ingest()), not triggered by a query.
 *
 * Standalone:
 *   import { ingest, searchCases } from "fedpipe/sdk/eoir-immigration";
 *   await ingest();                       // downloads + indexes (~minutes, large)
 *   await searchCases({ filters: { NAT: "MEX" } });
 */

import { existsSync, statSync, rmSync, readdirSync, createWriteStream } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, queryGenericTable, sniffDelimiter, type SqliteDb } from "../../shared/bulk.js";

const ZIP_URL = "https://fileshare.eoir.justice.gov/EOIR%20Case%20Data.zip";
const HEADERS = { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)", "Accept": "*/*" };
/** Bound the local DB for a scaffold; raise via FEDPIPE_EOIR_MAX_ROWS. */
const MAX_ROWS = Number(process.env.FEDPIPE_EOIR_MAX_ROWS ?? 3_000_000);

const cacheDir = () => bulkCacheDir("eoir-immigration");
const dbPath = () => join(cacheDir(), "cases.db");
const zipPath = () => join(cacheDir(), "EOIR_Case_Data.zip");

function safeCol(name: string, i: number): string {
  const c = name.replace(/^﻿/, "").trim().replace(/[^A-Za-z0-9_]/g, "_").replace(/^_+|_+$/g, "");
  return c || `col_${i}`;
}

// ─── Ingest (deliberate, disk-based, streaming) ──────────────────────

async function downloadZip(): Promise<void> {
  if (existsSync(zipPath()) && statSync(zipPath()).size > 1_000_000) return; // already downloaded
  const res = await fetch(ZIP_URL, { headers: HEADERS });
  if (!res.ok || !res.body) throw new Error(`eoir-immigration: download failed (HTTP ${res.status}) from ${ZIP_URL}`);
  const { Readable } = await import("node:stream");
  await new Promise<void>((resolve, reject) => {
    const out = createWriteStream(zipPath());
    (Readable as any).fromWeb(res.body).pipe(out).on("finish", () => resolve()).on("error", reject);
  });
}

/** List archive entries via python3 (its zipfile handles ZIP64; system unzip 6.00 does not). */
const PY_LIST = "import zipfile,sys;print('\\n'.join(zipfile.ZipFile(sys.argv[1]).namelist()))";
/** Stream one archive entry to stdout via python3. */
const PY_STREAM =
  "import zipfile,sys\nf=zipfile.ZipFile(sys.argv[1]).open(sys.argv[2])\nw=sys.stdout.buffer\nfor c in iter(lambda: f.read(1<<20), b''): w.write(c)";

async function pickCaseEntry(): Promise<string> {
  const { execFileSync } = await import("node:child_process");
  const names = execFileSync("python3", ["-c", PY_LIST, zipPath()], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\n").map((s) => s.trim()).filter(Boolean)
    .filter((n) => /\.(csv|txt|tab)$/i.test(n));
  if (!names.length) throw new Error("eoir-immigration: no delimited tables in the archive.");
  // Prefer the primary case table (A_TblCase), not identifier/lookup tables.
  return names.find((n) => /A_TblCase\.csv$/i.test(n))
    ?? names.find((n) => /case/i.test(n) && !/identifier|lookup|tbllook/i.test(n))
    ?? names[0];
}

/**
 * Download (if needed) and index the EOIR case table into local SQLite.
 * Large and slow — call it deliberately.
 */
export async function ingest(): Promise<{ rowCount: number; columns: string[]; table: string }> {
  await downloadZip();
  const entry = await pickCaseEntry();

  const { spawn } = await import("node:child_process");
  const readline = await import("node:readline");

  const tmp = `${dbPath()}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");

  const child = spawn("python3", ["-c", PY_STREAM, zipPath(), entry]);
  child.on("error", (e) => { throw e; });
  const rl = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });

  let cols: string[] = [];
  let delim = "\t";
  let insert: ReturnType<SqliteDb["prepare"]> | null = null;
  let count = 0;
  let inTx = false;

  for await (const raw of rl) {
    const line = raw.replace(/\r$/, "");
    if (!insert) {
      delim = sniffDelimiter(line);
      cols = line.split(delim).map(safeCol);
      db.exec(`CREATE TABLE cases(${cols.map((c) => `"${c}" TEXT`).join(", ")});`);
      insert = db.prepare(`INSERT INTO cases VALUES(${cols.map(() => "?").join(",")})`);
      db.exec("BEGIN"); inTx = true;
      continue;
    }
    if (!line) continue;
    const parts = line.split(delim);
    insert.run(...cols.map((_, c) => parts[c] ?? null));
    if (++count >= MAX_ROWS) break;
  }
  rl.close();
  child.kill();
  if (inTx) db.exec("COMMIT");

  db.prepare("INSERT INTO meta(key,value) VALUES('row_count',?),('columns',?),('table',?),('built_at',?),('source',?)")
    .run(String(count), cols.join(","), entry, new Date().toISOString(), ZIP_URL);
  db.close();
  const { renameSync } = await import("node:fs");
  renameSync(tmp, dbPath());
  return { rowCount: count, columns: cols, table: entry };
}

// ─── Queries ─────────────────────────────────────────────────────────

const NOT_INGESTED =
  "eoir-immigration: data not yet ingested. The EOIR case data is a ~4.5 GB FOIA ZIP with no query API. Run the " +
  "deliberate ingest first: import { ingest } from 'fedpipe/sdk/eoir-immigration'; await ingest(). Requires Node >= 22.5 and python3.";

export function isIngested(): boolean {
  const p = dbPath();
  return existsSync(p) && statSync(p).size > 0;
}

export async function columns(): Promise<string[]> {
  if (!isIngested()) return [];
  const db = await openSqlite(dbPath());
  try {
    const v = db.prepare("SELECT value FROM meta WHERE key='columns'").get()?.value ?? "";
    return v ? String(v).split(",") : [];
  } finally { db.close(); }
}

/** Query the ingested case table. `filters` maps column names to substring matches. */
export async function searchCases(params: { filters?: Record<string, string>; limit?: number }): Promise<{ rows: Array<Record<string, unknown>>; total: number }> {
  if (!isIngested()) throw new Error(NOT_INGESTED);
  return queryGenericTable({ dbPath: dbPath(), table: "cases", filters: params.filters, limit: params.limit });
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

/** Delete the local EOIR database (keeps the downloaded ZIP; delete it manually to re-download). */
export function clearCache(): void {
  let dir: string;
  try { dir = cacheDir(); } catch { return; }
  try {
    for (const f of readdirSync(dir)) if (/^cases\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
  } catch { /* nothing */ }
}
