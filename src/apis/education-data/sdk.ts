/**
 * Education Data SDK — the Urban Institute's Education Data API
 * (educationdata.urban.org), a clean, keyless JSON gateway over the U.S.
 * Department of Education's core collections:
 *
 *   - IPEDS: every degree-granting college & university (directory, enrollment,
 *     finance, completions) — the higher-ed backbone.
 *   - CCD (Common Core of Data): every public K-12 school and district.
 *
 * This is the programmatic backbone that College Scorecard only samples.
 *
 * Standalone — no MCP or Zod required:
 *   import { getColleges, getSchools } from "fedpipe/sdk/education-data";
 *
 * Keyless: the Urban Institute serves this open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://educationdata.urban.org",
  name: "education-data",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d — annual data
  timeoutMs: 45_000,
  // Urban's CDN (Cloudflare) rejects requests without a browser-like User-Agent.
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

// ─── Reference ───────────────────────────────────────────────────────

/** Two-letter state → numeric FIPS (as the Urban API expects for `fips`). */
export const STATE_FIPS: Record<string, number> = {
  AL: 1, AK: 2, AZ: 4, AR: 5, CA: 6, CO: 8, CT: 9, DE: 10, DC: 11, FL: 12,
  GA: 13, HI: 15, ID: 16, IL: 17, IN: 18, IA: 19, KS: 20, KY: 21, LA: 22,
  ME: 23, MD: 24, MA: 25, MI: 26, MN: 27, MS: 28, MO: 29, MT: 30, NE: 31,
  NV: 32, NH: 33, NJ: 34, NM: 35, NY: 36, NC: 37, ND: 38, OH: 39, OK: 40,
  OR: 41, PA: 42, RI: 44, SC: 45, SD: 46, TN: 47, TX: 48, UT: 49, VT: 50,
  VA: 51, WA: 53, WV: 54, WI: 55, WY: 56, PR: 72,
};

/** IPEDS institutional control code → label. */
export const INST_CONTROL: Record<number, string> = {
  1: "Public",
  2: "Private nonprofit",
  3: "Private for-profit",
};

// ─── Helpers ─────────────────────────────────────────────────────────

/** Resolve a state given as a 2-letter code or a numeric FIPS to the Urban `fips` int. */
export function resolveStateFips(state: string | number): number | undefined {
  if (typeof state === "number") return state;
  const s = String(state).trim();
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  return STATE_FIPS[s.toUpperCase()];
}

/** Convert a 5-digit county FIPS ("08101") to the Urban `county_code` ("8101"). */
export function toUrbanCounty(countyFips: string): string {
  const s = String(countyFips).replace(/[^0-9]/g, "").padStart(5, "0");
  return `${parseInt(s.slice(0, 2), 10)}${s.slice(2)}`;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Colleges & universities from IPEDS (directory) for a state.
 * Returns institution identity, location, sector/control, and level.
 */
export async function getColleges(opts: {
  state: string | number;
  year?: number;
  limit?: number;
}): Promise<{ total: number; results: Array<Record<string, unknown>> }> {
  const fips = resolveStateFips(opts.state);
  const year = opts.year ?? 2022;
  const raw = await api.get<any>(
    `/api/v1/college-university/ipeds/directory/${year}/`,
    qp({ fips }),
  );
  const all: any[] = raw?.results ?? [];
  const limit = opts.limit ?? 100;
  const results = all.slice(0, limit).map((r) => ({
    unitid: r.unitid,
    name: r.inst_name,
    city: r.city,
    county: r.county_name,
    zip: r.zip,
    control: INST_CONTROL[r.inst_control] ?? r.inst_control,
    level: r.institution_level,
    highest_degree: r.offering_highest_degree,
    website: r.url_school,
  }));
  return { total: raw?.count ?? all.length, results };
}

/**
 * Public K-12 schools from the Common Core of Data (CCD) directory.
 * Scope to a county (5-digit FIPS) or a whole state.
 */
export async function getSchools(opts: {
  state: string | number;
  countyFips?: string;
  year?: number;
  limit?: number;
}): Promise<{ total: number; results: Array<Record<string, unknown>> }> {
  const fips = resolveStateFips(opts.state);
  const year = opts.year ?? 2021;
  // The CCD directory endpoint returns a whole state in one page and ignores a
  // county_code query param, so fetch the state and filter by county client-side.
  const raw = await api.get<any>(`/api/v1/schools/ccd/directory/${year}/`, qp({ fips }));
  let all: any[] = raw?.results ?? [];
  if (opts.countyFips) {
    const cc = toUrbanCounty(opts.countyFips);
    all = all.filter((r) => String(r.county_code) === cc);
  }
  const limit = opts.limit ?? 100;
  const results = all.slice(0, limit).map((r) => ({
    ncessch: r.ncessch,
    name: r.school_name,
    district: r.lea_name,
    city: r.city_location,
    zip: r.zip_location,
    lowest_grade: r.lowest_grade_offered,
    highest_grade: r.highest_grade_offered,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
  // After a client-side county filter, `all.length` is the real match count.
  const total = opts.countyFips ? all.length : (raw?.count ?? all.length);
  return { total, results };
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
