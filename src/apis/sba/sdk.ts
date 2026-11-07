/**
 * SBA SDK — bulk-ingest client for the Small Business Administration's 7(a) and
 * 504 loan FOIA data (data.sba.gov). SBA has no query API: it publishes the
 * loan-level FOIA extracts as CSV files. This module resolves the current CSV
 * URLs from SBA's DKAN metastore, downloads them once, indexes them into a local
 * SQLite database, and answers queries locally — the small-business-lending
 * complement to USAspending (contracts/grants) and HMDA (mortgages).
 *
 * Bulk-ingest module (see shared/bulk.ts). Requires Node >= 22.5. No API key.
 * The recent-era files (FY2010-present for 504, FY2020-present for 7(a)) are
 * ingested to bound the download; older historical files are skipped.
 *
 * Standalone — no MCP or Zod required:
 *   import { searchLoans, datasetInfo } from "fedpipe/sdk/sba";
 */

import { existsSync, renameSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, csvRecords, type SqliteDb } from "../../shared/bulk.js";

const METASTORE = "https://data.sba.gov/api/1/metastore/schemas/dataset/items?limit=200";
const HEADERS = { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" };

// ─── Resolve current CSV URLs from the DKAN metastore ────────────────

interface CsvSource { program: "7(a)" | "504"; url: string; }

async function resolveCsvUrls(): Promise<CsvSource[]> {
  const res = await fetch(METASTORE, { headers: HEADERS });
  if (!res.ok) throw new Error(`sba: metastore fetch failed (HTTP ${res.status}).`);
  const items: any[] = await res.json();
  const foia = items.find((it) => String(it.title ?? "").trim() === "7(a) & 504 FOIA");
  if (!foia) throw new Error("sba: could not find the '7(a) & 504 FOIA' dataset in the SBA metastore.");

  const sources: CsvSource[] = [];
  for (const dist of foia.distribution ?? []) {
    const url: string = dist.downloadURL ?? "";
    if (!url.toLowerCase().endsWith(".csv")) continue;
    if (!/present/i.test(url)) continue; // recent-era files only
    const program = /7a|7\(a\)/i.test(url) ? "7(a)" : "504";
    sources.push({ program, url });
  }
  if (!sources.length) throw new Error("sba: no current FOIA CSVs found in the dataset distribution.");
  return sources;
}

// ─── Ingest ──────────────────────────────────────────────────────────

const BOM = /^﻿/;
function headerIndex(fields: string[]): Record<string, number> {
  const idx: Record<string, number> = {};
  fields.forEach((name, i) => { idx[name.replace(BOM, "").trim()] = i; });
  return idx;
}

async function buildDb(dbPath: string, sources: CsvSource[]): Promise<void> {
  const tmp = `${dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE loans(
    program TEXT, borrower TEXT, borrower_city TEXT, borrower_state TEXT,
    lender TEXT, gross_approval REAL, approval_date TEXT, approval_fy TEXT,
    naics_code TEXT, naics_desc TEXT, project_state TEXT, project_county TEXT,
    business_type TEXT, loan_status TEXT, jobs_supported TEXT
  );`);
  const insert = db.prepare(
    "INSERT INTO loans(program,borrower,borrower_city,borrower_state,lender,gross_approval,approval_date,approval_fy,naics_code,naics_desc,project_state,project_county,business_type,loan_status,jobs_supported) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  );

  let count = 0;
  db.exec("BEGIN");
  for (const src of sources) {
    const res = await fetch(src.url, { headers: HEADERS });
    if (!res.ok) continue; // skip a file that fails; keep what we can
    const text = Buffer.from(await res.arrayBuffer()).toString("utf8");
    const gen = csvRecords(text);
    const h = headerIndex(gen.next().value as string[]);
    const get = (r: string[], ...names: string[]): string => {
      for (const nm of names) { const i = h[nm]; if (i != null && r[i] != null) return r[i].trim(); }
      return "";
    };
    for (const r of gen) {
      const gross = Number((get(r, "GrossApproval") || "").replace(/[$,]/g, "")) || null;
      insert.run(
        src.program,
        get(r, "BorrName"),
        get(r, "BorrCity"),
        get(r, "BorrState"),
        get(r, "BankName", "CDC_Name", "ThirdPartyLender_Name"),
        gross,
        get(r, "ApprovalDate"),
        get(r, "ApprovalFY"),
        get(r, "NaicsCode"),
        get(r, "NaicsDescription"),
        get(r, "ProjectState"),
        get(r, "ProjectCounty"),
        get(r, "BusinessType"),
        get(r, "LoanStatus"),
        get(r, "JobsSupported"),
      );
      count++;
    }
  }
  db.exec("COMMIT");
  db.exec("CREATE INDEX idx_borrower ON loans(borrower);");
  db.exec("CREATE INDEX idx_state ON loans(borrower_state);");
  db.exec("CREATE INDEX idx_fy ON loans(approval_fy);");
  db.prepare("INSERT INTO meta(key,value) VALUES('row_count',?),('built_at',?),('sources',?)")
    .run(String(count), new Date().toISOString(), sources.map((s) => s.url).join(" | "));
  db.close();
  renameSync(tmp, dbPath);
}

async function ensureDb(): Promise<SqliteDb> {
  const dbPath = join(bulkCacheDir("sba"), "loans.db");
  if (existsSync(dbPath) && statSync(dbPath).size > 0) return openSqlite(dbPath);
  await buildDb(dbPath, await resolveCsvUrls());
  return openSqlite(dbPath);
}

// ─── Types & mapping ─────────────────────────────────────────────────

export interface Loan {
  program: string;
  borrower: string;
  location: string | null;
  lender: string;
  grossApproval: number | null;
  approvalDate: string | null;
  approvalFY: string | null;
  naics: string | null;
  naicsDescription: string | null;
  projectState: string | null;
  loanStatus: string | null;
  jobsSupported: string | null;
}

function toLoan(r: any): Loan {
  return {
    program: r.program,
    borrower: r.borrower,
    location: [r.borrower_city, r.borrower_state].filter(Boolean).join(", ") || null,
    lender: r.lender,
    grossApproval: r.gross_approval,
    approvalDate: r.approval_date || null,
    approvalFY: r.approval_fy || null,
    naics: r.naics_code || null,
    naicsDescription: r.naics_desc || null,
    projectState: r.project_state || null,
    loanStatus: r.loan_status || null,
    jobsSupported: r.jobs_supported || null,
  };
}

// ─── Queries ─────────────────────────────────────────────────────────

/** Search SBA 7(a)/504 loans by borrower, lender, state, program, or fiscal year. */
export async function searchLoans(params: {
  borrower?: string;
  lender?: string;
  state?: string;
  program?: "7(a)" | "504";
  fiscalYear?: string | number;
  limit?: number;
}): Promise<{ rows: Loan[]; total: number; totalApprovedUsd: number }> {
  const db = await ensureDb();
  try {
    const where: string[] = [];
    const args: unknown[] = [];
    if (params.borrower) { where.push("borrower LIKE ?"); args.push(`%${params.borrower.toUpperCase()}%`); }
    if (params.lender) { where.push("lender LIKE ?"); args.push(`%${params.lender.toUpperCase()}%`); }
    if (params.state) { where.push("borrower_state = ?"); args.push(params.state.toUpperCase()); }
    if (params.program) { where.push("program = ?"); args.push(params.program); }
    if (params.fiscalYear) { where.push("approval_fy = ?"); args.push(String(params.fiscalYear)); }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const agg = db.prepare(`SELECT COUNT(*) n, COALESCE(SUM(gross_approval),0) s FROM loans ${clause}`).get(...args);
    const limit = Math.min(params.limit ?? 25, 200);
    const rows = db.prepare(`SELECT * FROM loans ${clause} ORDER BY gross_approval DESC LIMIT ?`).all(...args, limit).map(toLoan);
    return { rows, total: Number(agg?.n ?? 0), totalApprovedUsd: Number(agg?.s ?? 0) };
  } finally {
    db.close();
  }
}

/** Local dataset status (row count, source files, build time). */
export async function datasetInfo(): Promise<{ rowCount: number; sources: string; builtAt: string }> {
  const db = await ensureDb();
  try {
    const meta: Record<string, string> = {};
    for (const r of db.prepare("SELECT key,value FROM meta").all()) meta[r.key] = r.value;
    return { rowCount: Number(meta.row_count ?? 0), sources: meta.sources ?? "", builtAt: meta.built_at ?? "" };
  } finally {
    db.close();
  }
}

/** Delete the local SBA database, forcing a fresh download on next query. */
export function clearCache(): void {
  let dir: string;
  try { dir = bulkCacheDir("sba"); } catch { return; }
  try {
    for (const f of readdirSync(dir)) {
      if (/^loans\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
    }
  } catch { /* nothing to clear */ }
}
