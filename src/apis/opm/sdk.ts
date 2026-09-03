/**
 * OPM FedScope SDK — federal civilian workforce statistics.
 *
 * Source: {@link https://www.opm.gov/data/datasets/} (FedScope Employment Cube)
 *
 * OPM publishes federal employment as pre-aggregated, tab-delimited summary
 * tables inside a ZIP (no query API). These give headcount and AVERAGE SALARY
 * by agency, duty location, and occupation — the workforce composition and pay
 * of the federal government. The data is anonymized/aggregated (no individual
 * names or salaries). This fetches the ZIP once and serves it from memory.
 *
 * The download URL is a version-specific file ID, so it pins a snapshot; bump
 * SNAPSHOT_URL when a newer FedScope Employment Cube is posted.
 */

import { unzipEntries } from "../../shared/bulk.js";

// FedScope Employment Cube — March 2025 (posted 2025-07-01).
const SNAPSHOT_URL = "https://www.opm.gov/data/datasets/Files/753/bc88ce69-1bbe-406f-9441-3c5153014616.zip";
export const SNAPSHOT_LABEL = "March 2025";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  "Accept": "*/*",
};
const AGENCY_FILE = "Status Employment by Agency and Duty Location_202503_and_202409.txt";
const OCC_FILE = "Status Employment by Occupation_202503_and_202409.txt";
const MEMO_TTL = 24 * 60 * 60 * 1000;

interface AgencyRow { datecode: string; agency: string; subAgency: string; state: string; stateName: string; count: number; avgSalary: number; avgLos: number }
interface OccRow { datecode: string; family: string; occupation: string; count: number; avgSalary: number; avgLos: number }
interface Loaded { agency: AgencyRow[]; occupation: OccRow[]; latest: string; at: number }
let memo: Loaded | null = null;

/** Parse a tab-delimited FedScope table into header-keyed rows. */
function parseTsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/);
  const header = (lines.shift() ?? "").split("\t").map(h => h.trim());
  const out: Record<string, string>[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = line.split("\t");
    const row: Record<string, string> = {};
    header.forEach((h, i) => { row[h] = (cells[i] ?? "").replace(/^"|"$/g, "").trim(); });
    out.push(row);
  }
  return out;
}

const num = (v: string) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };

async function load(): Promise<Loaded> {
  if (memo && Date.now() - memo.at < MEMO_TTL) return memo;
  const res = await fetch(SNAPSHOT_URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`opm: download failed (HTTP ${res.status})`);
  const entries = unzipEntries(Buffer.from(await res.arrayBuffer()), [AGENCY_FILE, OCC_FILE]);
  const agencyRaw = entries.get(AGENCY_FILE);
  const occRaw = entries.get(OCC_FILE);
  if (!agencyRaw || !occRaw) throw new Error("opm: expected FedScope summary tables in the archive");

  const agency: AgencyRow[] = parseTsv(agencyRaw.toString("utf8")).map(r => ({
    datecode: r.DATECODE, agency: r.AGYT ?? "", subAgency: r.AGYSUBT ?? "", state: r.STATE ?? "", stateName: r.STATET ?? "",
    count: num(r.EMPCOUNT), avgSalary: num(r.AVGSAL), avgLos: num(r.AVGLOS),
  }));
  const occupation: OccRow[] = parseTsv(occRaw.toString("utf8")).map(r => ({
    datecode: r.DATECODE, family: r.OCCFAMT ?? "", occupation: r.OCCT ?? "",
    count: num(r.EMPCOUNT), avgSalary: num(r.AVGSAL), avgLos: num(r.AVGLOS),
  }));
  const latest = agency.reduce((m, r) => (r.datecode > m ? r.datecode : m), "");
  memo = { agency, occupation, latest, at: Date.now() };
  return memo;
}

/** Weighted average of a count-weighted metric. */
const wavg = (rows: { count: number; avgSalary: number }[]) => {
  const emp = rows.reduce((s, r) => s + r.count, 0);
  return emp ? { employees: emp, avgSalary: Math.round(rows.reduce((s, r) => s + r.count * r.avgSalary, 0) / emp) } : { employees: 0, avgSalary: 0 };
};

export interface AgencyWorkforce {
  agency: string;
  employees: number;
  avgSalary: number;
  topStates: { state: string; employees: number; avgSalary: number }[];
}

/**
 * Common agency acronyms → a distinctive substring of the FedScope agency
 * (AGYT, department/independent-agency level) name. FedScope files agencies by
 * full name, so a bare acronym like "NASA" otherwise matches nothing. Only
 * top-level agencies belong here — bureau acronyms (FBI, IRS) live under a
 * parent department and won't match at this level.
 */
const AGENCY_ALIASES: Record<string, string> = {
  NASA: "AERONAUTICS AND SPACE", EPA: "ENVIRONMENTAL PROTECTION", SSA: "SOCIAL SECURITY",
  VA: "VETERANS AFFAIRS", DHS: "HOMELAND SECURITY", DOD: "DEPARTMENT OF DEFENSE",
  DOJ: "DEPARTMENT OF JUSTICE", USDA: "DEPARTMENT OF AGRICULTURE", HHS: "HEALTH AND HUMAN SERVICES",
  HUD: "HOUSING AND URBAN", DOT: "DEPARTMENT OF TRANSPORTATION", DOL: "DEPARTMENT OF LABOR",
  DOI: "DEPARTMENT OF THE INTERIOR", GSA: "GENERAL SERVICES", NSF: "NATIONAL SCIENCE FOUNDATION",
  SEC: "SECURITIES AND EXCHANGE", FCC: "COMMUNICATIONS COMMISSION", FDIC: "DEPOSIT INSURANCE",
  FTC: "TRADE COMMISSION", OPM: "PERSONNEL MANAGEMENT", SBA: "SMALL BUSINESS",
  NRC: "NUCLEAR REGULATORY", USAID: "INTERNATIONAL DEVELOPMENT",
};

/** Federal workforce for agencies whose name matches `name` (latest period). */
export async function agencyWorkforce(name: string): Promise<AgencyWorkforce[]> {
  const { agency, latest } = await load();
  const key = name.trim().toUpperCase();
  const q = (AGENCY_ALIASES[key] ?? name).toUpperCase();
  const hits = agency.filter(r => r.datecode === latest && r.agency.toUpperCase().includes(q));
  const byAgency = new Map<string, AgencyRow[]>();
  for (const r of hits) (byAgency.get(r.agency) ?? byAgency.set(r.agency, []).get(r.agency)!).push(r);
  return [...byAgency.entries()].map(([agencyName, rows]) => {
    const total = wavg(rows);
    const byState = new Map<string, AgencyRow[]>();
    for (const r of rows) (byState.get(r.stateName) ?? byState.set(r.stateName, []).get(r.stateName)!).push(r);
    const topStates = [...byState.entries()]
      .map(([state, rs]) => ({ state, ...wavg(rs) }))
      .sort((a, b) => b.employees - a.employees).slice(0, 8);
    return { agency: agencyName, ...total, topStates };
  }).sort((a, b) => b.employees - a.employees);
}

export interface OccupationWorkforce { occupation: string; family: string; employees: number; avgSalary: number; avgYearsService: number }

/** Federal workforce for occupations whose title matches `name`. */
export async function occupationWorkforce(name: string): Promise<OccupationWorkforce[]> {
  const { occupation, latest } = await load();
  const q = name.toUpperCase();
  return occupation
    .filter(r => r.datecode === latest && r.occupation.toUpperCase().includes(q))
    .map(r => ({ occupation: r.occupation, family: r.family, employees: r.count, avgSalary: r.avgSalary, avgYearsService: r.avgLos }))
    .sort((a, b) => b.employees - a.employees);
}

export function clearCache(): void {
  memo = null;
}
