/**
 * ATF SDK — bulk-ingest scaffold for Bureau of Alcohol, Tobacco, Firearms and
 * Explosives data that is published as downloadable files rather than a query
 * API: chiefly the monthly Listing of Federal Firearms Licensees (FFLs) — every
 * licensed firearms dealer, manufacturer, and importer, by type and location —
 * and the annual AFMER manufacturing/export tables.
 *
 * ATF.gov serves these behind a CDN that blocks scripted requests and rotates
 * per-month URLs, so ingestion is DELIBERATE and URL-driven: you pass the
 * current file URL (from https://www.atf.gov/firearms/listing-federal-firearms-licensees)
 * to ingest(), and this downloads it, sniffs the delimiter, and indexes it into
 * a local SQLite table with a schema-generic loader (whatever columns exist).
 *
 * Requires Node >= 22.5 (node:sqlite). No API key.
 *
 * Standalone:
 *   import { ingest, searchFfls } from "fedpipe/sdk/atf";
 *   await ingest("https://www.atf.gov/.../0125-ffl-list.csv");
 */

import { existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, ingestDelimitedBuffer, queryGenericTable, type SqliteDb } from "../../shared/bulk.js";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  "Accept": "*/*",
};
/** Documented landing page for current FFL listing file URLs. */
export const FFL_LISTING_PAGE = "https://www.atf.gov/firearms/listing-federal-firearms-licensees";

function dbPath(): string { return join(bulkCacheDir("atf"), "ffl.db"); }

/**
 * Download an ATF data file (e.g. the current FFL listing CSV) and index it
 * locally. Deliberate: call it when refreshing the dataset, with the file URL.
 */
export async function ingest(url: string): Promise<{ rowCount: number; columns: string[] }> {
  if (!url) throw new Error(`atf: pass the current file URL from ${FFL_LISTING_PAGE}`);
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`atf: download failed (HTTP ${res.status}) from ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return ingestDelimitedBuffer({ buf, dbPath: dbPath(), table: "ffls", source: url });
}

export function isIngested(): boolean {
  const p = dbPath();
  return existsSync(p) && statSync(p).size > 0;
}

function ensureDbOrThrow(): void {
  if (!isIngested()) {
    throw new Error(
      `atf: data not yet ingested. ATF publishes files (not an API); ingest the current FFL listing first: ` +
      `import { ingest } from 'fedpipe/sdk/atf'; await ingest('<file url from ${FFL_LISTING_PAGE}>'). Requires Node >= 22.5.`,
    );
  }
}

/** Query the ingested FFL (or other ATF) table; filters are column→substring. */
export async function searchFfls(params: { filters?: Record<string, string>; limit?: number }): Promise<{ rows: Array<Record<string, unknown>>; total: number }> {
  ensureDbOrThrow();
  return queryGenericTable({ dbPath: dbPath(), table: "ffls", filters: params.filters, limit: params.limit });
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

/** Delete the local ATF database. */
export function clearCache(): void {
  let dir: string;
  try { dir = bulkCacheDir("atf"); } catch { return; }
  try {
    for (const f of readdirSync(dir)) if (/^ffl\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
  } catch { /* nothing */ }
}
