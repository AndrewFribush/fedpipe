/**
 * DOL Form 5500 SDK — bulk-ingest client for private employee benefit plan
 * filings (retirement and welfare plans).
 *
 * Unlike every other fedpipe module (live API + cache), there is no query API
 * for Form 5500: DOL publishes annual bulk datasets. This module downloads the
 * ~29MB ZIP once on first use, extracts it with the built-in zlib (no zip
 * dependency), and indexes it into a local SQLite database via Node's built-in
 * `node:sqlite` (no native dependency). Subsequent queries hit the local DB.
 *
 * Source: {@link https://www.dol.gov/agencies/ebsa/researchers/data/form-5500-datasets}
 * Requires Node >= 22.5 (for `node:sqlite`). No API key.
 */

import { existsSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, unzipEntries, csvRecords, type SqliteDb } from "../../shared/bulk.js";

const cacheDir = () => bulkCacheDir("form5500");

// ─── Config ──────────────────────────────────────────────────────────

/** Most recent plan year with a substantially complete dataset. */
export const DEFAULT_YEAR = 2024;

const sourceUrl = (year: number) =>
  `https://www.askebsa.dol.gov/FOIA%20Files/${year}/Latest/F_5500_${year}_Latest.zip`;

/** Slim set of columns we keep — mapped from the CSV header by name so a
 *  column reordering across dataset years can't silently misalign them. */
const COLUMNS: Record<string, string> = {
  ack_id: "ACK_ID",
  tax_period: "FORM_TAX_PRD",
  plan_name: "PLAN_NAME",
  plan_number: "SPONS_DFE_PN",
  sponsor_name: "SPONSOR_DFE_NAME",
  dba_name: "SPONS_DFE_DBA_NAME",
  ein: "SPONS_DFE_EIN",
  state: "SPONS_DFE_MAIL_US_STATE",
  city: "SPONS_DFE_MAIL_US_CITY",
  business_code: "BUSINESS_CODE",
  plan_entity_code: "TYPE_PLAN_ENTITY_CD",
  pension_code: "TYPE_PENSION_BNFT_CODE",
  welfare_code: "TYPE_WELFARE_BNFT_CODE",
  active_participants: "TOT_ACTIVE_PARTCP_CNT",
  total_participants: "TOT_PARTCP_BOY_CNT",
};

// ─── Ingest ──────────────────────────────────────────────────────────

async function buildDb(year: number, dbPath: string, lastModified: string): Promise<void> {
  const res = await fetch(sourceUrl(year));
  if (!res.ok) throw new Error(`form5500: download failed (HTTP ${res.status}) for ${year}`);
  const zip = Buffer.from(await res.arrayBuffer());
  const entries = unzipEntries(zip);
  let csvBuf: Buffer | undefined;
  for (const [name, b] of entries) if (name.toLowerCase().endsWith(".csv")) { csvBuf = b; break; }
  if (!csvBuf) throw new Error("form5500: no CSV found in the archive");
  const gen = csvRecords(csvBuf.toString("utf8"));

  const header = gen.next();
  if (header.done) throw new Error("form5500: empty dataset");
  const colIndex: Record<string, number> = {};
  (header.value as string[]).forEach((name, idx) => { colIndex[name.trim()] = idx; });
  const picks = Object.entries(COLUMNS).map(([col, src]) => ({ col, idx: colIndex[src] ?? -1 }));

  const tmp = `${dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  const cols = Object.keys(COLUMNS);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec(`CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);`);
  db.exec(`CREATE TABLE plans(${cols.map(c => `${c} TEXT`).join(", ")});`);
  const insert = db.prepare(`INSERT INTO plans(${cols.join(",")}) VALUES(${cols.map(() => "?").join(",")})`);

  db.exec("BEGIN");
  let count = 0;
  for (const rec of gen) {
    const vals = picks.map(p => (p.idx >= 0 ? (rec[p.idx] ?? "") : ""));
    insert.run(...vals);
    count++;
  }
  db.exec("COMMIT");

  db.exec("CREATE INDEX idx_ein ON plans(ein);");
  db.exec("CREATE INDEX idx_sponsor ON plans(sponsor_name);");
  db.prepare("INSERT INTO meta(key,value) VALUES('year',?),('last_modified',?),('row_count',?),('built_at',?)")
    .run(String(year), lastModified, String(count), new Date().toISOString());
  db.close();

  renameSync(tmp, dbPath);
}

/** Open the local DB for `year`, downloading and indexing it if missing or
 *  stale (the source's Last-Modified changed). Returns an open handle. */
async function ensureDb(year: number): Promise<SqliteDb> {
  const dbPath = join(cacheDir(), `form5500_${year}.db`);
  let lastModified = "";
  try {
    const head = await fetch(sourceUrl(year), { method: "HEAD" });
    lastModified = head.headers.get("last-modified") ?? "";
  } catch { /* offline HEAD — fall back to whatever DB exists */ }

  if (existsSync(dbPath) && statSync(dbPath).size > 0) {
    const db = await openSqlite(dbPath);
    try {
      const stored = db.prepare("SELECT value FROM meta WHERE key='last_modified'").get()?.value ?? "";
      if (!lastModified || stored === lastModified) return db; // fresh (or can't check)
    } catch { /* corrupt/old schema — rebuild */ }
    db.close();
  }
  await buildDb(year, dbPath, lastModified);
  return openSqlite(dbPath);
}

// ─── Public types ────────────────────────────────────────────────────

export interface PlanRow {
  ackId: string;
  planYear: string;
  planName: string;
  planNumber: string;
  sponsor: string;
  dba: string | null;
  ein: string;
  location: string | null;
  businessCode: string | null;
  planType: string;         // "pension" | "welfare" | "DFE/other"
  activeParticipants: number | null;
  totalParticipants: number | null;
}

function toRow(r: any): PlanRow {
  const pension = (r.pension_code ?? "").trim();
  const welfare = (r.welfare_code ?? "").trim();
  const planType = pension && pension !== "0" ? "pension" : welfare && welfare !== "0" ? "welfare" : "DFE/other";
  const num = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && String(v).trim() !== "" ? n : null; };
  return {
    ackId: r.ack_id,
    planYear: (r.tax_period ?? "").slice(0, 4),
    planName: r.plan_name,
    planNumber: r.plan_number,
    sponsor: r.sponsor_name,
    dba: r.dba_name || null,
    ein: r.ein,
    location: [r.city, r.state].filter(Boolean).join(", ") || null,
    businessCode: r.business_code || null,
    planType,
    activeParticipants: num(r.active_participants),
    totalParticipants: num(r.total_participants),
  };
}

// ─── Queries ─────────────────────────────────────────────────────────

/** Search plans by sponsor/plan name, sponsor EIN, or state. */
export async function searchPlans(params: {
  name?: string;
  ein?: string;
  state?: string;
  year?: number;
  limit?: number;
}): Promise<{ rows: PlanRow[]; total: number; year: number }> {
  const year = params.year ?? DEFAULT_YEAR;
  const db = await ensureDb(year);
  try {
    const where: string[] = [];
    const args: unknown[] = [];
    if (params.ein) { where.push("ein = ?"); args.push(params.ein.replace(/\D/g, "")); }
    if (params.name) { where.push("(sponsor_name LIKE ? OR plan_name LIKE ?)"); const q = `%${params.name.toUpperCase()}%`; args.push(q, q); }
    if (params.state) { where.push("state = ?"); args.push(params.state.toUpperCase()); }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM plans ${clause}`).get(...args)?.n ?? 0);
    const limit = Math.min(params.limit ?? 20, 100);
    const rows = db.prepare(
      `SELECT * FROM plans ${clause} ORDER BY CAST(active_participants AS INTEGER) DESC LIMIT ?`,
    ).all(...args, limit).map(toRow);
    return { rows, total, year };
  } finally {
    db.close();
  }
}

/** All plans filed by one sponsor EIN. */
export async function getPlansByEin(ein: string, year = DEFAULT_YEAR): Promise<{ rows: PlanRow[]; year: number }> {
  const db = await ensureDb(year);
  try {
    const rows = db.prepare("SELECT * FROM plans WHERE ein = ? ORDER BY CAST(active_participants AS INTEGER) DESC")
      .all(ein.replace(/\D/g, "")).map(toRow);
    return { rows, year };
  } finally {
    db.close();
  }
}

/** Delete the locally-indexed Form 5500 databases, forcing a fresh download
 *  and re-index on the next query. */
export function clearCache(): void {
  let dir: string;
  try { dir = cacheDir(); } catch { return; }
  try {
    for (const f of readdirSync(dir)) {
      if (/^form5500_.*\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
    }
  } catch { /* nothing to clear */ }
}

/** Dataset metadata (row count, source date) for a year, building if needed. */
export async function datasetInfo(year = DEFAULT_YEAR): Promise<{ year: number; rowCount: number; sourceLastModified: string; builtAt: string }> {
  const db = await ensureDb(year);
  try {
    const meta: Record<string, string> = {};
    for (const r of db.prepare("SELECT key, value FROM meta").all()) meta[r.key] = r.value;
    return { year, rowCount: Number(meta.row_count ?? 0), sourceLastModified: meta.last_modified ?? "", builtAt: meta.built_at ?? "" };
  } finally {
    db.close();
  }
}
