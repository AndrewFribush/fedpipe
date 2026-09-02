/**
 * NTSB Aviation Accident Database SDK — bulk-ingest client for the NTSB's
 * civil aviation accident/incident record (CAROL "avall" dataset).
 *
 * Bulk-ingest module (see shared/bulk.ts): NTSB publishes the data as a
 * Microsoft Access database inside a ZIP, with no public query API (an official
 * Enterprise API is slated for 2027). This downloads the ~96MB ZIP once,
 * reads the .mdb with the pure-JS `mdb-reader` (no native build), joins the
 * events and aircraft tables, and indexes them into a local SQLite DB.
 * Requires Node >= 22.5. No API key.
 *
 * The `avall` file covers 2008-present; the NTSB's Pre2008/PRE1982 archives
 * (same format) extend it and could be added later.
 *
 * Source: {@link https://data.ntsb.gov/avdata}
 */

import { existsSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import MDBReader from "mdb-reader";
import { bulkCacheDir, openSqlite, unzipEntries, type SqliteDb } from "../../shared/bulk.js";

const URL = "https://data.ntsb.gov/avdata/FileDirectory/DownloadFile?fileID=C%3A%5Cavdata%5Cavall.zip";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  "Accept": "*/*",
};

const INJURY_LABEL: Record<string, string> = { FATL: "fatal", SERS: "serious", MINR: "minor", NONE: "none" };
const DAMAGE_LABEL: Record<string, string> = { DEST: "destroyed", SUBS: "substantial", MINR: "minor", NONE: "none" };

/** Rebuild after this many days when the source sends no Last-Modified. */
const STALE_DAYS = 21;

/**
 * Normalize an aircraft registration. NTSB includes foreign aircraft, so only
 * U.S. registrations (which start with a digit, or N+digit) get the "N"
 * prefix — a foreign reg like "PP-MFS" or "G-ABCD" keeps its own.
 */
function normReg(raw: unknown): string {
  const r = String(raw ?? "").trim().toUpperCase();
  if (!r) return "";
  return /^N?\d/.test(r) ? "N" + r.replace(/^N/, "") : r;
}

const cacheDir = () => bulkCacheDir("ntsb");
const dbFile = () => join(cacheDir(), "accidents.db");

// ─── Ingest ──────────────────────────────────────────────────────────

async function buildDb(dbPath: string, lastModified: string): Promise<void> {
  const res = await fetch(URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`ntsb: download failed (HTTP ${res.status}). The NTSB data site can be flaky — retry shortly.`);
  const zip = Buffer.from(await res.arrayBuffer());
  const entries = unzipEntries(zip);
  let mdb: Buffer | undefined;
  for (const [name, b] of entries) if (name.toLowerCase().endsWith(".mdb")) { mdb = b; break; }
  if (!mdb) throw new Error("ntsb: no .mdb found in the archive");

  const reader = new MDBReader(mdb);
  // events: one per accident/incident. Index by ev_id for the aircraft join.
  const events = new Map<string, Record<string, any>>();
  for (const e of reader.getTable("events").getData()) events.set(String(e.ev_id), e);

  const tmp = `${dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE accidents(
    ev_id TEXT, ntsb_no TEXT, date TEXT, year TEXT, type TEXT,
    city TEXT, state TEXT, country TEXT, injury_level TEXT,
    fatalities INTEGER, total_aboard INTEGER,
    n_number TEXT, make TEXT, model TEXT, category TEXT, damage TEXT, far_part TEXT
  );`);
  const insert = db.prepare(`INSERT INTO accidents(
    ev_id,ntsb_no,date,year,type,city,state,country,injury_level,fatalities,total_aboard,
    n_number,make,model,category,damage,far_part) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);

  const asDate = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : d ? String(d).slice(0, 10) : "");
  const num = (v: unknown) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

  db.exec("BEGIN");
  let count = 0;
  for (const a of reader.getTable("aircraft").getData()) {
    const e = events.get(String(a.ev_id));
    if (!e) continue;
    insert.run(
      String(a.ev_id),
      e.ntsb_no ?? "",
      asDate(e.ev_date),
      e.ev_year != null ? String(e.ev_year) : "",
      e.ev_type === "ACC" ? "accident" : e.ev_type === "INC" ? "incident" : String(e.ev_type ?? ""),
      e.ev_city ?? "",
      e.ev_state ?? "",
      e.ev_country ?? "",
      INJURY_LABEL[String(e.ev_highest_injury ?? "")] ?? String(e.ev_highest_injury ?? ""),
      num(e.inj_tot_f),
      num(e.inj_tot_t),
      normReg(a.regis_no),
      String(a.acft_make ?? "").trim(),
      String(a.acft_model ?? "").trim(),
      String(a.acft_category ?? "").trim(),
      DAMAGE_LABEL[String(a.damage ?? "")] ?? String(a.damage ?? ""),
      String(a.far_part ?? "").trim(),
    );
    count++;
  }
  db.exec("COMMIT");
  db.exec("CREATE INDEX idx_n ON accidents(n_number);");
  db.exec("CREATE INDEX idx_make ON accidents(make);");
  db.prepare("INSERT INTO meta(key,value) VALUES('last_modified',?),('row_count',?),('built_at',?)")
    .run(lastModified, String(count), new Date().toISOString());
  db.close();
  renameSync(tmp, dbPath);
}

async function currentLastModified(): Promise<string> {
  try {
    const res = await fetch(URL, { headers: { ...HEADERS, Range: "bytes=0-0" } });
    return res.headers.get("last-modified") ?? "";
  } catch { return ""; }
}

async function ensureDb(): Promise<SqliteDb> {
  const dbPath = dbFile();
  const lastModified = await currentLastModified();
  if (existsSync(dbPath) && statSync(dbPath).size > 0) {
    const db = await openSqlite(dbPath);
    try {
      const stored = db.prepare("SELECT value FROM meta WHERE key='last_modified'").get()?.value ?? "";
      if (lastModified) {
        if (stored === lastModified) return db;
      } else {
        // The NTSB endpoint often omits Last-Modified — fall back to a TTL so
        // the local copy still refreshes for this monthly-updated dataset.
        const builtAt = db.prepare("SELECT value FROM meta WHERE key='built_at'").get()?.value ?? "";
        const ageDays = builtAt ? (Date.now() - Date.parse(builtAt)) / 86_400_000 : Infinity;
        if (ageDays < STALE_DAYS) return db;
      }
    } catch { /* rebuild */ }
    db.close();
  }
  await buildDb(dbPath, lastModified);
  return openSqlite(dbPath);
}

// ─── Types ───────────────────────────────────────────────────────────

export interface Accident {
  ntsbNo: string;
  eventId: string;
  date: string;
  type: string;
  location: string | null;
  injuryLevel: string;
  fatalities: number | null;
  totalAboard: number | null;
  nNumber: string | null;
  make: string;
  model: string;
  category: string | null;
  damage: string;
  farPart: string | null;
}

function toAccident(r: any): Accident {
  return {
    ntsbNo: r.ntsb_no,
    eventId: r.ev_id,
    date: r.date,
    type: r.type,
    location: [r.city, r.state, r.country && r.country !== "USA" ? r.country : ""].filter(Boolean).join(", ") || null,
    injuryLevel: r.injury_level,
    fatalities: r.fatalities,
    totalAboard: r.total_aboard,
    nNumber: r.n_number || null,
    make: r.make,
    model: r.model,
    category: r.category || null,
    damage: r.damage,
    farPart: r.far_part || null,
  };
}

// ─── Queries ─────────────────────────────────────────────────────────

/** All NTSB accidents/incidents for one aircraft by N-number. */
export async function accidentsByNNumber(nNumber: string): Promise<Accident[]> {
  const norm = normReg(nNumber);
  const db = await ensureDb();
  try {
    return db.prepare("SELECT * FROM accidents WHERE n_number = ? ORDER BY date DESC").all(norm).map(toAccident);
  } finally {
    db.close();
  }
}

/** Search accidents by make/model, state, year, or minimum severity. */
export async function searchAccidents(params: {
  make?: string;
  model?: string;
  state?: string;
  year?: number;
  fatalOnly?: boolean;
  limit?: number;
}): Promise<{ rows: Accident[]; total: number }> {
  const db = await ensureDb();
  try {
    const where: string[] = [];
    const args: unknown[] = [];
    if (params.make) { where.push("make LIKE ?"); args.push(`%${params.make.toUpperCase()}%`); }
    if (params.model) { where.push("model LIKE ?"); args.push(`%${params.model.toUpperCase()}%`); }
    if (params.state) { where.push("state = ?"); args.push(params.state.toUpperCase()); }
    if (params.year) { where.push("year = ?"); args.push(String(params.year)); }
    if (params.fatalOnly) where.push("injury_level = 'fatal'");
    if (!where.length) return { rows: [], total: 0 };
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM accidents ${clause}`).get(...args)?.n ?? 0);
    const limit = Math.min(params.limit ?? 20, 100);
    const rows = db.prepare(`SELECT * FROM accidents ${clause} ORDER BY date DESC LIMIT ?`).all(...args, limit).map(toAccident);
    return { rows, total };
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

/** Delete the local NTSB database, forcing a fresh download next query. */
export function clearCache(): void {
  let dir: string;
  try { dir = cacheDir(); } catch { return; }
  try {
    for (const f of readdirSync(dir)) if (/^accidents\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
  } catch { /* nothing to clear */ }
}
