/**
 * Census SDK — typed API client for the U.S. Census Bureau Data API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { queryCensus, searchVariables } from "fedpipe/sdk/census";
 *
 *   const data = await queryCensus("2023/acs/acs1", "NAME,B01001_001E", "state:*");
 *   console.log(data.headers, data.rows);
 *
 * Requires CENSUS_API_KEY env var. Get one at https://api.census.gov/data/key_signup.html
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.census.gov/data",
  name: "census",
  auth: { type: "query", envParams: { key: "CENSUS_API_KEY" } },
  rateLimit: { perSecond: 3, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — Census data updates annually
});

/** Dataset catalog + geography lookups — keyless, change rarely. */
const catalogApi = createClient({
  baseUrl: "https://api.census.gov",
  name: "census-catalog",
  rateLimit: { perSecond: 3, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000,
});

/** Census Geocoder — street address → every geography level. Keyless. */
const geocoderApi = createClient({
  baseUrl: "https://geocoding.geo.census.gov/geocoder",
  name: "census-geocoder",
  rateLimit: { perSecond: 3, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000,
});

/** Name lookups (state/county/place → FIPS) pull NAME from this dataset. */
const GEO_LOOKUP_DATASET = "/2023/acs/acs5";

// ─── Types ───────────────────────────────────────────────────────────

/** Transformed Census query result: first row becomes headers, rest becomes rows. */
export interface CensusQueryResult {
  headers: string[];
  rows: string[][];
  /** Human-readable label per header — only when queried with `descriptive: true`. */
  labels?: string[];
}

/** A resolved geography — name → FIPS codes plus ready-to-use query parameters. */
export interface CensusGeography {
  level: "state" | "county" | "place";
  name: string;
  /** Full GEOID (state+county or state+place FIPS concatenated). */
  geoid: string;
  fips: { state: string; county?: string; place?: string };
  /** Value for `for_geo` in census_query. */
  forGeo: string;
  /** Value for `in_geo` in census_query (undefined for states). */
  inGeo?: string;
  /** Uniform Census Geography ID, usable via the `ucgid` parameter. */
  ucgid: string;
  /** Match quality: exact name, or substring. */
  match: "exact" | "partial";
}

/** A table (variable group) in a Census dataset, e.g. B19013. */
export interface CensusTable {
  id: string;
  description: string;
  universe?: string;
  variablesUrl?: string;
}

/** A dataset from the Census API catalog (api.census.gov/data.json). */
export interface CensusCatalogDataset {
  path: string;
  title: string;
  vintage: number | null;
  description: string;
  isTimeseries: boolean;
}

/** A geography level supported by a dataset, with the parent levels it requires. */
export interface CensusGeographyLevel {
  code: string;
  name: string;
  requires: string[];
  wildcard: string[];
}

/** Census Variable. */
export interface CensusVariable {
  label?: string;
  concept?: string;
  predicateType?: string;
}

/** Census Variable Match. */
export interface CensusVariableMatch {
  id: string;
  label: string;
  concept: string;
}

/** Census Dataset. */
export interface CensusDataset {
  path: string;
  name: string;
  description: string;
}

// ─── Reference Data ──────────────────────────────────────────────────

/** Commonly used Census API variable codes. */
export const commonVariables = {
  NAME: "Geographic area name",
  B01001_001E: "Total population",
  B01002_001E: "Median age",
  B02001_002E: "White alone population",
  B02001_003E: "Black/African American alone",
  B03003_003E: "Hispanic/Latino population",
  B19013_001E: "Median household income",
  B19001_001E: "Household income distribution (total)",
  B19301_001E: "Per capita income",
  B25077_001E: "Median home value (owner-occupied)",
  B25064_001E: "Median gross rent",
  B25003_001E: "Housing tenure (total occupied)",
  B25003_002E: "Owner-occupied housing units",
  B25003_003E: "Renter-occupied housing units",
  B17001_002E: "Population below poverty level",
  B15003_022E: "Bachelor's degree",
  B15003_023E: "Master's degree",
  B15003_025E: "Doctorate degree",
  B23025_002E: "In labor force",
  B23025_005E: "Unemployed",
} as const;

/** Datasets. */
export const datasets: CensusDataset[] = [
  { path: "2023/acs/acs1", name: "ACS 1-Year (2023)", description: "American Community Survey 1-year estimates — larger areas only" },
  { path: "2023/acs/acs5", name: "ACS 5-Year (2023)", description: "American Community Survey 5-year estimates — all geographies" },
  { path: "2022/acs/acs1", name: "ACS 1-Year (2022)", description: "ACS 1-year 2022" },
  { path: "2020/dec/pl", name: "Decennial 2020 PL", description: "2020 Census redistricting data" },
  { path: "2020/dec/dhc", name: "Decennial 2020 DHC", description: "2020 Census demographic and housing characteristics" },
  { path: "2010/dec/sf1", name: "Decennial 2010 SF1", description: "2010 Census Summary File 1" },
  { path: "2023/pep/population", name: "Population Estimates (2023)", description: "Annual population estimates" },
  { path: "2017/ecnbasic", name: "Economic Census (2017)", description: "Economic Census basic data" },
];

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Query the Census Bureau Data API.
 * The raw API returns a 2D string array; this transforms it into { headers, rows }.
 */
export async function queryCensus(
  dataset: string,
  variables: string,
  forGeo?: string,
  inGeo?: string,
  extra?: Record<string, string>,
  opts: {
    /** Uniform Census Geography IDs, comma-separated (e.g. "0400000US06,0500000US06037") — alternative to for/in. */
    ucgid?: string;
    /** Ask the API for a second header row of human-readable variable labels. */
    descriptive?: boolean;
  } = {},
): Promise<CensusQueryResult> {
  const norm = dataset.startsWith("/") ? dataset : `/${dataset}`;
  const params: Record<string, string> = { get: variables };
  if (opts.ucgid) params.ucgid = opts.ucgid;
  else if (forGeo) params.for = forGeo;
  else throw new Error("census: provide for_geo or ucgid");
  if (inGeo && !opts.ucgid) params.in = inGeo;
  if (opts.descriptive) params.descriptive = "true";
  if (extra) Object.assign(params, extra);

  const raw = await api.get<string[][]>(norm, params);
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("census: empty response — no data returned");
  }
  if (opts.descriptive && raw.length >= 2) {
    return { headers: raw[0], labels: raw[1], rows: raw.slice(2) };
  }
  return { headers: raw[0], rows: raw.slice(1) };
}

// ─── Geography resolution ────────────────────────────────────────────

/** State/territory FIPS codes keyed by postal abbreviation. */
export const STATE_FIPS: Record<string, { fips: string; name: string }> = {
  AL: { fips: "01", name: "Alabama" }, AK: { fips: "02", name: "Alaska" }, AZ: { fips: "04", name: "Arizona" },
  AR: { fips: "05", name: "Arkansas" }, CA: { fips: "06", name: "California" }, CO: { fips: "08", name: "Colorado" },
  CT: { fips: "09", name: "Connecticut" }, DE: { fips: "10", name: "Delaware" }, DC: { fips: "11", name: "District of Columbia" },
  FL: { fips: "12", name: "Florida" }, GA: { fips: "13", name: "Georgia" }, HI: { fips: "15", name: "Hawaii" },
  ID: { fips: "16", name: "Idaho" }, IL: { fips: "17", name: "Illinois" }, IN: { fips: "18", name: "Indiana" },
  IA: { fips: "19", name: "Iowa" }, KS: { fips: "20", name: "Kansas" }, KY: { fips: "21", name: "Kentucky" },
  LA: { fips: "22", name: "Louisiana" }, ME: { fips: "23", name: "Maine" }, MD: { fips: "24", name: "Maryland" },
  MA: { fips: "25", name: "Massachusetts" }, MI: { fips: "26", name: "Michigan" }, MN: { fips: "27", name: "Minnesota" },
  MS: { fips: "28", name: "Mississippi" }, MO: { fips: "29", name: "Missouri" }, MT: { fips: "30", name: "Montana" },
  NE: { fips: "31", name: "Nebraska" }, NV: { fips: "32", name: "Nevada" }, NH: { fips: "33", name: "New Hampshire" },
  NJ: { fips: "34", name: "New Jersey" }, NM: { fips: "35", name: "New Mexico" }, NY: { fips: "36", name: "New York" },
  NC: { fips: "37", name: "North Carolina" }, ND: { fips: "38", name: "North Dakota" }, OH: { fips: "39", name: "Ohio" },
  OK: { fips: "40", name: "Oklahoma" }, OR: { fips: "41", name: "Oregon" }, PA: { fips: "42", name: "Pennsylvania" },
  RI: { fips: "44", name: "Rhode Island" }, SC: { fips: "45", name: "South Carolina" }, SD: { fips: "46", name: "South Dakota" },
  TN: { fips: "47", name: "Tennessee" }, TX: { fips: "48", name: "Texas" }, UT: { fips: "49", name: "Utah" },
  VT: { fips: "50", name: "Vermont" }, VA: { fips: "51", name: "Virginia" }, WA: { fips: "53", name: "Washington" },
  WV: { fips: "54", name: "West Virginia" }, WI: { fips: "55", name: "Wisconsin" }, WY: { fips: "56", name: "Wyoming" },
  PR: { fips: "72", name: "Puerto Rico" },
};

/** Resolve a state given a postal abbreviation, FIPS code, or full name. */
export function resolveState(input: string): { abbr: string; fips: string; name: string } | null {
  const q = input.trim();
  const upper = q.toUpperCase();
  if (STATE_FIPS[upper]) return { abbr: upper, ...STATE_FIPS[upper] };
  for (const [abbr, s] of Object.entries(STATE_FIPS)) {
    if (s.fips === q.padStart(2, "0") || s.name.toLowerCase() === q.toLowerCase()) return { abbr, ...s };
  }
  return null;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

/** Split "Philadelphia, PA" / "Cook County, Illinois" into name + resolved state. */
function splitNameAndState(query: string): { name: string; state: ReturnType<typeof resolveState> } {
  const parts = query.split(",").map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const st = resolveState(parts[parts.length - 1]);
    if (st) return { name: parts.slice(0, -1).join(", "), state: st };
  }
  return { name: query.trim(), state: null };
}

/**
 * Resolve a human place name to FIPS codes and ready-to-use census_query parameters.
 * Works for states, counties (and parishes/boroughs), and incorporated places / CDPs.
 * No database — county and place names are pulled from the ACS NAME variable and cached.
 *
 * @example
 * ```typescript
 * await resolveGeography("Philadelphia, PA");      // → place 4260000, for=place:60000 in=state:42
 * await resolveGeography("Cook County, Illinois"); // → county 17031
 * await resolveGeography("Texas");                 // → state 48
 * ```
 */
export async function resolveGeography(query: string, opts: {
  level?: "state" | "county" | "place";
  /** Restrict to a state (abbr, FIPS, or name). Inferred from ", XX" in the query when omitted. */
  state?: string;
  limit?: number;
} = {}): Promise<CensusGeography[]> {
  const { name, state: inferred } = splitNameAndState(query);
  const state = opts.state ? resolveState(opts.state) : inferred;
  const limit = opts.limit ?? 10;
  const q = normalize(name);
  const results: CensusGeography[] = [];

  // States — static table, no request
  if (!opts.level || opts.level === "state") {
    for (const [abbr, s] of Object.entries(STATE_FIPS)) {
      const n = normalize(s.name);
      if (n === q || abbr.toLowerCase() === q) results.push(stateGeo(s.fips, s.name, "exact"));
      else if (!opts.level && n.includes(q) && q.length >= 3) results.push(stateGeo(s.fips, s.name, "partial"));
    }
    if (opts.level === "state") return results.slice(0, limit);
  }

  // Counties and places — NAME lookups (cached 1h by the shared client; the lists change once a year)
  const wantCounty = !opts.level || opts.level === "county";
  const wantPlace = !opts.level || opts.level === "place";
  const inClause = state ? `state:${state.fips}` : undefined;

  const scan = async (level: "county" | "place") => {
    const raw = await api.get<string[][]>(GEO_LOOKUP_DATASET, {
      get: "NAME", for: `${level}:*`, ...(inClause ? { in: inClause } : {}),
    });
    const [headers, ...rows] = raw;
    const nameIdx = headers.indexOf("NAME"), stIdx = headers.indexOf("state"), codeIdx = headers.indexOf(level);
    for (const row of rows) {
      const full = row[nameIdx];                       // "Philadelphia city, Pennsylvania"
      const local = full.split(",")[0];                // "Philadelphia city"
      const n = normalize(local);
      const stripped = n.replace(/\b(city|town|village|borough|cdp|county|parish|municipio|census area|city and borough|municipality)\b/g, "").trim();
      let match: CensusGeography["match"] | null = null;
      if (n === q || stripped === q) match = "exact";
      else if (n.includes(q) || stripped.includes(q)) match = "partial";
      if (!match) continue;
      const st = row[stIdx], code = row[codeIdx];
      results.push({
        level, name: full, geoid: `${st}${code}`,
        fips: level === "county" ? { state: st, county: code } : { state: st, place: code },
        forGeo: `${level}:${code}`, inGeo: `state:${st}`,
        ucgid: `${level === "county" ? "0500000US" : "1600000US"}${st}${code}`,
        match,
      });
    }
  };
  if (wantCounty) await scan("county");
  if (wantPlace) await scan("place");

  // Exact matches first; incorporated places before CDPs; then alphabetical
  results.sort((a, b) =>
    (a.match === b.match ? 0 : a.match === "exact" ? -1 : 1) ||
    (Number(/CDP/.test(a.name)) - Number(/CDP/.test(b.name))) ||
    a.name.localeCompare(b.name));
  return results.slice(0, limit);
}

function stateGeo(fips: string, name: string, match: CensusGeography["match"]): CensusGeography {
  return { level: "state", name, geoid: fips, fips: { state: fips }, forGeo: `state:${fips}`, ucgid: `0400000US${fips}`, match };
}

/** Geographies containing a street address (state, county, tract, block, place, congressional district, ...). */
export async function geocodeAddress(address: string): Promise<{
  matchedAddress: string; coordinates: { x: number; y: number };
  geographies: Record<string, { GEOID?: string; NAME?: string; [k: string]: unknown }[]>;
} | null> {
  const res = await geocoderApi.get<{ result: { addressMatches: { matchedAddress: string; coordinates: { x: number; y: number }; geographies: Record<string, Record<string, unknown>[]> }[] } }>(
    "/geographies/onelineaddress", { address, benchmark: "Public_AR_Current", vintage: "Current_Current", format: "json" },
  );
  const m = res.result?.addressMatches?.[0];
  if (!m) return null;
  return { matchedAddress: m.matchedAddress, coordinates: m.coordinates, geographies: m.geographies as never };
}

// ─── Discovery ───────────────────────────────────────────────────────

/** Search a dataset's tables (variable groups) by keyword — e.g. "median income" → B19013. */
export async function searchTables(dataset: string, keyword: string, maxResults = 20): Promise<CensusTable[]> {
  const norm = dataset.startsWith("/") ? dataset : `/${dataset}`;
  const data = await catalogApi.get<{ groups: { name: string; description: string; universe?: string; variables?: string }[] }>(`/data${norm}/groups.json`);
  const terms = normalize(keyword).split(" ").filter(Boolean);
  const scored = (data.groups ?? [])
    .map(g => {
      const hay = normalize(`${g.name} ${g.description} ${g.universe ?? ""}`);
      const hits = terms.filter(t => hay.includes(t)).length;
      const idHit = g.name.toLowerCase() === keyword.toLowerCase() || g.name.toLowerCase().startsWith(keyword.toLowerCase());
      const desc = normalize(g.description);
      const phraseHit = desc.includes(terms.join(" "));
      const leadHit = desc.startsWith(terms.join(" ")) || desc.startsWith(terms[0] ?? "");
      return { g, score: hits + (idHit ? 10 : 0) + (hits === terms.length ? 2 : 0) + (phraseHit ? 3 : 0) + (leadHit ? 2 : 0) };
    })
    .filter(x => x.score > 0)
    // Higher score first; then shorter (more general) descriptions; then plain B-tables before race iterations (B19013A…)
    .sort((a, b) => b.score - a.score || a.g.description.length - b.g.description.length || a.g.name.length - b.g.name.length || a.g.name.localeCompare(b.g.name));
  return scored.slice(0, maxResults).map(({ g }) => ({ id: g.name, description: g.description, universe: g.universe, variablesUrl: g.variables }));
}

/** Variables in one table (group). Estimates only by default — skips margins of error and annotations. */
export async function getTableVariables(dataset: string, tableId: string, opts: { includeAll?: boolean } = {}): Promise<CensusVariableMatch[]> {
  const norm = dataset.startsWith("/") ? dataset : `/${dataset}`;
  const data = await catalogApi.get<{ variables: Record<string, CensusVariable> }>(`/data${norm}/groups/${tableId.toUpperCase()}.json`);
  return Object.entries(data.variables ?? {})
    .filter(([id]) => opts.includeAll || /E$/.test(id) || /^(NAME|GEO_ID)$/.test(id))
    .map(([id, v]) => ({ id, label: (v.label ?? "").replace(/!!/g, " > "), concept: v.concept ?? "" }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Search the full Census API dataset catalog (1,700+ datasets) by keyword and/or vintage. */
export async function listDatasets(opts: { keyword?: string; vintage?: number; maxResults?: number } = {}): Promise<CensusCatalogDataset[]> {
  const data = await catalogApi.get<{ dataset: { title: string; description?: string; c_vintage?: number; c_dataset?: string[]; c_isTimeseries?: boolean; c_isAvailable?: boolean }[] }>("/data.json");
  const kw = opts.keyword ? normalize(opts.keyword).split(" ").filter(Boolean) : [];
  const out: CensusCatalogDataset[] = [];
  for (const d of data.dataset ?? []) {
    if (d.c_isAvailable === false) continue;
    if (opts.vintage && d.c_vintage !== opts.vintage) continue;
    const parts = d.c_dataset ?? [];
    const path = d.c_isTimeseries ? `timeseries/${parts.join("/")}` : `${d.c_vintage ?? ""}/${parts.join("/")}`;
    if (kw.length) {
      const hay = normalize(`${d.title} ${path} ${d.description ?? ""}`);
      if (!kw.every(t => hay.includes(t))) continue;
    }
    out.push({ path, title: d.title, vintage: d.c_vintage ?? null, description: (d.description ?? "").slice(0, 200), isTimeseries: Boolean(d.c_isTimeseries) });
  }
  out.sort((a, b) => (b.vintage ?? 0) - (a.vintage ?? 0) || a.path.localeCompare(b.path));
  return out.slice(0, opts.maxResults ?? 25);
}

/** Geography levels a dataset supports, with the parent geographies each one requires. */
export async function getGeographyLevels(dataset: string): Promise<CensusGeographyLevel[]> {
  const norm = dataset.startsWith("/") ? dataset : `/${dataset}`;
  const data = await catalogApi.get<{ fips: { geoLevelDisplay: string; name: string; requires?: string[]; wildcard?: string[] }[] }>(`/data${norm}/geography.json`);
  return (data.fips ?? []).map(g => ({ code: g.geoLevelDisplay, name: g.name, requires: g.requires ?? [], wildcard: g.wildcard ?? [] }));
}

/**
 * Search for Census variable names/codes by keyword within a dataset.
 * Fetches the dataset's variables.json and filters locally.
 */
export async function searchVariables(
  dataset: string,
  keyword: string,
  maxResults = 20,
): Promise<CensusVariableMatch[]> {
  const norm = dataset.startsWith("/") ? dataset : `/${dataset}`;
  const data = await api.get<{ variables: Record<string, CensusVariable> }>(`${norm}/variables.json`);

  const kw = keyword.toLowerCase();
  const matches: CensusVariableMatch[] = [];
  for (const [id, info] of Object.entries(data.variables)) {
    const label = info.label || "";
    const concept = info.concept || "";
    if (
      label.toLowerCase().includes(kw) ||
      concept.toLowerCase().includes(kw) ||
      id.toLowerCase().includes(kw)
    ) {
      matches.push({ id, label, concept });
      if (matches.length >= maxResults) break;
    }
  }
  return matches;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
  catalogApi.clearCache();
  geocoderApi.clearCache();
}
