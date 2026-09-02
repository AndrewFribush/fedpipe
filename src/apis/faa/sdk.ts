/**
 * FAA Aircraft Registry SDK — bulk-ingest client for the FAA Releasable
 * Aircraft Database (every U.S.-registered civil aircraft and its owner).
 *
 * Bulk-ingest module (see shared/bulk.ts): downloads the ~80MB ZIP once,
 * extracts MASTER.txt (registrations) and ACFTREF.txt (make/model reference)
 * with the built-in zlib, joins them, and indexes into a local SQLite DB.
 * Subsequent queries are local. Requires Node >= 22.5. No API key.
 *
 * The FAA download sits behind a CDN that blocks HEAD requests and clients
 * with no browser-like headers — so this uses a GET with a browser User-Agent
 * and a ranged GET (not HEAD) for the freshness check.
 *
 * Source: {@link https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download}
 */

import { existsSync, renameSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { bulkCacheDir, openSqlite, unzipEntries, csvRecords, type SqliteDb } from "../../shared/bulk.js";

const URL = "https://registry.faa.gov/database/ReleasableAircraft.zip";
// The CDN rejects requests without a browser-like UA/Accept.
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  "Accept": "*/*",
};

/** TYPE REGISTRANT codes. */
const REGISTRANT_TYPE: Record<string, string> = {
  "1": "Individual", "2": "Partnership", "3": "Corporation", "4": "Co-Owned",
  "5": "Government", "7": "LLC", "8": "Non-Citizen Corporation", "9": "Non-Citizen Co-Owned",
};

// ─── Helpers ─────────────────────────────────────────────────────────

const BOM = /^﻿/;
/** Map header names (trimmed, BOM-stripped) to indices. */
function headerIndex(fields: string[]): Record<string, number> {
  const idx: Record<string, number> = {};
  fields.forEach((name, i) => { idx[name.replace(BOM, "").trim()] = i; });
  return idx;
}

// ─── Ingest ──────────────────────────────────────────────────────────

async function buildDb(dbPath: string, lastModified: string): Promise<void> {
  const res = await fetch(URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`faa: download failed (HTTP ${res.status}). The FAA registry CDN can be flaky — retry shortly.`);
  const zip = Buffer.from(await res.arrayBuffer());
  const entries = unzipEntries(zip, ["MASTER.txt", "ACFTREF.txt"]);
  const masterCsv = entries.get("MASTER.txt");
  const refCsv = entries.get("ACFTREF.txt");
  if (!masterCsv || !refCsv) throw new Error("faa: expected MASTER.txt and ACFTREF.txt in the archive");

  // ACFTREF: aircraft make/model by code (small — hold in memory for the join).
  const ref = new Map<string, { mfr: string; model: string; seats: string }>();
  {
    const gen = csvRecords(refCsv.toString("utf8"));
    const head = headerIndex(gen.next().value as string[]);
    const cCode = head["CODE"], cMfr = head["MFR"], cModel = head["MODEL"], cSeats = head["NO-SEATS"];
    for (const r of gen) {
      ref.set((r[cCode] ?? "").trim(), {
        mfr: (r[cMfr] ?? "").trim(), model: (r[cModel] ?? "").trim(), seats: (r[cSeats] ?? "").trim(),
      });
    }
  }

  const tmp = `${dbPath}.tmp-${process.pid}`;
  if (existsSync(tmp)) rmSync(tmp, { force: true });
  const db = await openSqlite(tmp);
  db.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;");
  db.exec("CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);");
  db.exec(`CREATE TABLE aircraft(
    n_number TEXT, serial TEXT, mfr TEXT, model TEXT, year_mfr TEXT,
    registrant_type TEXT, owner_name TEXT, city TEXT, state TEXT,
    status_code TEXT, mode_s_hex TEXT, unique_id TEXT
  );`);
  const insert = db.prepare(
    "INSERT INTO aircraft(n_number,serial,mfr,model,year_mfr,registrant_type,owner_name,city,state,status_code,mode_s_hex,unique_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
  );

  const gen = csvRecords(masterCsv.toString("utf8"));
  const h = headerIndex(gen.next().value as string[]);
  const get = (r: string[], name: string) => (r[h[name]] ?? "").trim();

  db.exec("BEGIN");
  let count = 0;
  for (const r of gen) {
    const code = get(r, "MFR MDL CODE");
    const ac = ref.get(code);
    const regType = get(r, "TYPE REGISTRANT");
    insert.run(
      "N" + get(r, "N-NUMBER"),
      get(r, "SERIAL NUMBER"),
      ac?.mfr ?? "",
      ac?.model ?? "",
      get(r, "YEAR MFR"),
      REGISTRANT_TYPE[regType] ?? regType,
      get(r, "NAME"),
      get(r, "CITY"),
      get(r, "STATE"),
      get(r, "STATUS CODE"),
      get(r, "MODE S CODE HEX"),
      get(r, "UNIQUE ID"),
    );
    count++;
  }
  db.exec("COMMIT");
  db.exec("CREATE INDEX idx_n ON aircraft(n_number);");
  db.exec("CREATE INDEX idx_owner ON aircraft(owner_name);");
  db.prepare("INSERT INTO meta(key,value) VALUES('last_modified',?),('row_count',?),('built_at',?)")
    .run(lastModified, String(count), new Date().toISOString());
  db.close();
  renameSync(tmp, dbPath);
}

async function currentLastModified(): Promise<string> {
  // HEAD is blocked by the CDN; a 1-byte ranged GET returns Last-Modified cheaply.
  try {
    const res = await fetch(URL, { headers: { ...HEADERS, Range: "bytes=0-0" } });
    return res.headers.get("last-modified") ?? "";
  } catch {
    return "";
  }
}

async function ensureDb(): Promise<SqliteDb> {
  const dbPath = join(bulkCacheDir("faa"), "aircraft.db");
  const lastModified = await currentLastModified();
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

export interface Aircraft {
  nNumber: string;
  serial: string;
  make: string;
  model: string;
  yearManufactured: string | null;
  registrantType: string;
  owner: string;
  location: string | null;
  statusCode: string;
  modeSHex: string | null;
  uniqueId: string;
}

function toAircraft(r: any): Aircraft {
  return {
    nNumber: r.n_number,
    serial: r.serial,
    make: r.mfr,
    model: r.model,
    yearManufactured: r.year_mfr || null,
    registrantType: r.registrant_type,
    owner: r.owner_name,
    location: [r.city, r.state].filter(Boolean).join(", ") || null,
    statusCode: r.status_code,
    modeSHex: r.mode_s_hex || null,
    uniqueId: r.unique_id,
  };
}

// ─── Queries ─────────────────────────────────────────────────────────

/** Look up one aircraft by N-number (with or without the leading "N"). */
export async function getAircraft(nNumber: string): Promise<Aircraft | null> {
  const norm = "N" + nNumber.trim().toUpperCase().replace(/^N/i, "");
  const db = await ensureDb();
  try {
    const row = db.prepare("SELECT * FROM aircraft WHERE n_number = ?").get(norm);
    return row ? toAircraft(row) : null;
  } finally {
    db.close();
  }
}

/** Aircraft registered to an owner (name substring), optionally by state. */
export async function searchByOwner(params: { name: string; state?: string; limit?: number }): Promise<{ rows: Aircraft[]; total: number }> {
  const db = await ensureDb();
  try {
    const where = ["owner_name LIKE ?"];
    const args: unknown[] = [`%${params.name.toUpperCase()}%`];
    if (params.state) { where.push("state = ?"); args.push(params.state.toUpperCase()); }
    const clause = `WHERE ${where.join(" AND ")}`;
    const total = Number(db.prepare(`SELECT COUNT(*) n FROM aircraft ${clause}`).get(...args)?.n ?? 0);
    const limit = Math.min(params.limit ?? 20, 100);
    const rows = db.prepare(`SELECT * FROM aircraft ${clause} ORDER BY owner_name, n_number LIMIT ?`).all(...args, limit).map(toAircraft);
    return { rows, total };
  } finally {
    db.close();
  }
}

/** Dataset status (row count, source date), building if needed. */
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

/** Delete the local FAA database, forcing a fresh download on next query. */
export function clearCache(): void {
  let dir: string;
  try { dir = bulkCacheDir("faa"); } catch { return; }
  try {
    for (const f of readdirSync(dir)) {
      if (/^aircraft\.db(\.tmp-\d+)?$/.test(f)) rmSync(join(dir, f), { force: true });
    }
  } catch { /* nothing to clear */ }
}
