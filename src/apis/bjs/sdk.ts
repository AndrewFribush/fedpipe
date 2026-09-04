/**
 * BJS SDK — bulk-ingest scaffold for Bureau of Justice Statistics data.
 *
 * BJS publishes no query API: its corrections and victimization datasets (NPS,
 * NCRP, NCVS, Federal Justice Statistics) are distributed as downloadable CSV/
 * delimited extracts, some via ICPSR/NACJD behind an access agreement. This
 * module ingests any such delimited file you point it at — download → sniff the
 * delimiter → build a table from its own header → query locally.
 *
 * Requires Node >= 22.5 (node:sqlite). No API key (the file may require BJS/
 * ICPSR access to obtain the URL).
 *
 * Standalone:
 *   import { ingest, searchData } from "fedpipe/sdk/bjs";
 *   await ingest("https://.../nps_2023.csv");
 */

import { existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, ingestDelimitedBuffer, queryGenericTable, type SqliteDb } from "../../shared/bulk.js";

const HEADERS = { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)", "Accept": "*/*" };
export const BJS_DATA_PAGE = "https://bjs.ojp.gov/library/publications/list";
export const NACJD_PAGE = "https://www.icpsr.umich.edu/web/pages/NACJD/";

function dbPath(): string { return join(bulkCacheDir("bjs"), "data.db"); }

/** Download a BJS delimited extract and index it locally (deliberate). */
export async function ingest(url: string): Promise<{ rowCount: number; columns: string[] }> {
  if (!url) throw new Error(`bjs: pass the URL of a BJS/NACJD delimited extract (see ${NACJD_PAGE}).`);
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`bjs: download failed (HTTP ${res.status}) from ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return ingestDelimitedBuffer({ buf, dbPath: dbPath(), table: "data", source: url });
}

export function isIngested(): boolean {
  const p = dbPath();
  return existsSync(p) && statSync(p).size > 0;
}

/** Query the ingested BJS table; filters are column→substring. */
export async function searchData(params: { filters?: Record<string, string>; limit?: number }): Promise<{ rows: Array<Record<string, unknown>>; total: number }> {
  if (!isIngested()) {
    throw new Error(
      `bjs: data not yet ingested. BJS has no query API; ingest a delimited extract first: ` +
      `import { ingest } from 'fedpipe/sdk/bjs'; await ingest('<url>'). Requires Node >= 22.5.`,
    );
  }
  return queryGenericTable({ dbPath: dbPath(), table: "data", filters: params.filters, limit: params.limit });
}

/** Local dataset status. */
export async function datasetInfo(): Promise<{ ingested: boolean; rowCount: number; columns: string[]; builtAt: string; source: string }> {
  if (!isIngested()) return { ingested: false, rowCount: 0, columns: [], builtAt: "", source: "" };
  const db: SqliteDb = await openSqlite(dbPath());
  try {
    const meta: Record<string, string> = {};
    for (const r of db.prepare("SELECT key,value FROM meta").all()) meta[r.key] = r.value;
    return {
      ingested: true,
      rowCount: Number(meta.row_count ?? 0),
      columns: (meta.columns ?? "").split(",").filter(Boolean),
      builtAt: meta.built_at ?? "",
      source: meta.source ?? "",
    };
  } finally { db.close(); }
}

/** Delete the local BJS database. */
export function clearCache(): void {
  let dir: string;
  try { dir = bulkCacheDir("bjs"); } catch { return; }
  try {
    for (const f of readdirSync(dir)) if (/^data\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
  } catch { /* nothing */ }
}
