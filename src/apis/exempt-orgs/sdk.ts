/**
 * IRS Exempt Organizations Business Master File (EO BMF) SDK — bulk-ingest
 * client for the IRS registry of every U.S. tax-exempt organization.
 *
 * Bulk-ingest module (see shared/bulk.ts): the IRS publishes the EO BMF as
 * plain CSV files (one per region), refreshed monthly, with no query API. This
 * downloads the files once, indexes them into a local SQLite DB, and serves
 * fast local queries. Requires Node >= 22.5. No API key.
 *
 * This is the *registry* — all ~1.8M recognized exempt orgs, whether or not
 * they file a Form 990 — complementing the `nonprofits` module (ProPublica's
 * detailed 990 financials for the filers).
 *
 * Source: {@link https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf}
 */

import { existsSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, csvRecords, type SqliteDb } from "../../shared/bulk.js";

// The six regional CSV extracts (headers identical across all of them).
const FILES = ["eo1", "eo2", "eo3", "eo4", "eo_pr", "eo_xx"];
const fileUrl = (f: string) => `https://www.irs.gov/pub/irs-soi/${f}.csv`;

/** Slim columns kept from the ~28-column extract, mapped by header name. */
const COLUMNS: Record<string, string> = {
  ein: "EIN",
  name: "NAME",
  street: "STREET",
  city: "CITY",
  state: "STATE",
  zip: "ZIP",
  subsection: "SUBSECTION",
  classification: "CLASSIFICATION",
  ruling: "RULING",
  foundation: "FOUNDATION",
  status: "STATUS",
  tax_period: "TAX_PERIOD",
  asset_amt: "ASSET_AMT",
  income_amt: "INCOME_AMT",
  revenue_amt: "REVENUE_AMT",
  ntee_cd: "NTEE_CD",
};

/** IRS subsection codes → 501(c)(x) description (the common ones). */
export const SUBSECTION: Record<string, string> = {
  "03": "501(c)(3) charitable/religious/educational",
  "04": "501(c)(4) social welfare",
  "05": "501(c)(5) labor/agricultural",
  "06": "501(c)(6) business league/trade",
  "07": "501(c)(7) social/recreational club",
  "08": "501(c)(8) fraternal beneficiary",
  "10": "501(c)(10) fraternal",
  "19": "501(c)(19) veterans org",
  "92": "401(a) / other",
};

const subsectionLabel = (code: string) => SUBSECTION[code?.padStart(2, "0")] ?? (code ? `501(c)(${Number(code)})` : "unknown");

const cacheDir = () => bulkCacheDir("exempt-orgs");
const dbFile = () => join(cacheDir(), "eo_bmf.db");

// ─── Ingest ──────────────────────────────────────────────────────────

async function buildDb(dbPath: string, lastModified: string): Promise<void> {
  const tmp = `${dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  const cols = Object.keys(COLUMNS);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE orgs(${cols.map(c => `${c} TEXT`).join(", ")});`);
  const insert = db.prepare(`INSERT INTO orgs(${cols.join(",")}) VALUES(${cols.map(() => "?").join(",")})`);

  let count = 0;
  db.exec("BEGIN");
  for (const f of FILES) {
    const res = await fetch(fileUrl(f));
    if (!res.ok) throw new Error(`exempt-orgs: download failed (HTTP ${res.status}) for ${f}.csv`);
    const gen = csvRecords(await res.text());
    const header = gen.next();
    if (header.done) continue;
    const idx: Record<string, number> = {};
    (header.value as string[]).forEach((name, i) => { idx[name.trim()] = i; });
    const picks = Object.values(COLUMNS).map(src => idx[src] ?? -1);
    for (const rec of gen) {
      insert.run(...picks.map(i => (i >= 0 ? (rec[i] ?? "").trim() : "")));
      count++;
    }
  }
  db.exec("COMMIT");
  db.exec("CREATE INDEX idx_ein ON orgs(ein);");
  db.exec("CREATE INDEX idx_name ON orgs(name);");
  db.prepare("INSERT INTO meta(key,value) VALUES('last_modified',?),('row_count',?),('built_at',?)")
    .run(lastModified, String(count), new Date().toISOString());
  db.close();
  renameSync(tmp, dbPath);
}

async function ensureDb(): Promise<SqliteDb> {
  const dbPath = dbFile();
  let lastModified = "";
  try {
    const head = await fetch(fileUrl("eo1"), { method: "HEAD" });
    lastModified = head.headers.get("last-modified") ?? "";
  } catch { /* fall back to whatever DB exists */ }

  if (existsSync(dbPath) && statSync(dbPath).size > 0) {
    const db = await openSqlite(dbPath);
    try {
      const stored = db.prepare("SELECT value FROM meta WHERE key='last_modified'").get()?.value ?? "";
      if (!lastModified || stored === lastModified) return db;
    } catch { /* rebuild */ }
    db.close();
  }
  await buildDb(dbPath, lastModified);
  return openSqlite(dbPath);
}

// ─── Types ───────────────────────────────────────────────────────────

export interface ExemptOrg {
  ein: string;
  name: string;
  location: string | null;
  subsection: string;
  rulingYear: string | null;
  status: string;
  nteeCode: string | null;
  assets: number | null;
  income: number | null;
  revenue: number | null;
}

function toOrg(r: any): ExemptOrg {
  const num = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && String(v).trim() !== "" ? n : null; };
  return {
    ein: r.ein,
    name: r.name,
    location: [r.city, r.state].filter(Boolean).join(", ") || null,
    subsection: subsectionLabel(r.subsection),
    rulingYear: r.ruling ? String(r.ruling).slice(0, 4) : null,
    status: r.status,
    nteeCode: r.ntee_cd || null,
    assets: num(r.asset_amt),
    income: num(r.income_amt),
    revenue: num(r.revenue_amt),
  };
}

// ─── Queries ─────────────────────────────────────────────────────────

/** Search exempt orgs by name, with optional state / subsection / NTEE prefix. */
export async function searchOrgs(params: {
  name?: string;
  state?: string;
  subsection?: string;
  nteePrefix?: string;
  ein?: string;
  limit?: number;
}): Promise<{ rows: ExemptOrg[]; total: number }> {
  const db = await ensureDb();
  try {
    const where: string[] = [];
    const args: unknown[] = [];
    if (params.ein) { where.push("ein = ?"); args.push(params.ein.replace(/\D/g, "")); }
    if (params.name) { where.push("name LIKE ?"); args.push(`%${params.name.toUpperCase()}%`); }
    if (params.state) { where.push("state = ?"); args.push(params.state.toUpperCase()); }
    if (params.subsection) { where.push("subsection = ?"); args.push(params.subsection.padStart(2, "0")); }
    if (params.nteePrefix) { where.push("ntee_cd LIKE ?"); args.push(`${params.nteePrefix.toUpperCase()}%`); }
    if (!where.length) return { rows: [], total: 0 };
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM orgs ${clause}`).get(...args)?.n ?? 0);
    const limit = Math.min(params.limit ?? 20, 100);
    const rows = db.prepare(`SELECT * FROM orgs ${clause} ORDER BY CAST(revenue_amt AS INTEGER) DESC LIMIT ?`).all(...args, limit).map(toOrg);
    return { rows, total };
  } finally {
    db.close();
  }
}

/** Look up one organization by EIN. */
export async function getOrg(ein: string): Promise<ExemptOrg | null> {
  const db = await ensureDb();
  try {
    const row = db.prepare("SELECT * FROM orgs WHERE ein = ?").get(ein.replace(/\D/g, ""));
    return row ? toOrg(row) : null;
  } finally {
    db.close();
  }
}

/** Dataset status. */
export async function datasetInfo(): Promise<{ rowCount: number; sourceLastModified: string; builtAt: string }> {
  const db = await ensureDb();
  try {
    const meta: Record<string, string> = {};
    for (const r of db.prepare("SELECT key,value FROM meta").all()) meta[r.key] = r.value;
    return { rowCount: Number(meta.row_count ?? 0), sourceLastModified: meta.last_modified ?? "", builtAt: meta.built_at ?? "" };
  } finally {
    db.close();
  }
}

/** Delete the local EO BMF database, forcing a fresh download next query. */
export function clearCache(): void {
  let dir: string;
  try { dir = cacheDir(); } catch { return; }
  try {
    for (const f of readdirSync(dir)) if (/^eo_bmf\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
  } catch { /* nothing to clear */ }
}
