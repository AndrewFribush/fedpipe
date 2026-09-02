/**
 * World Bank SDK — international economic indicators for 200+ countries.
 *
 * API docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392
 * No auth required. No published rate limit.
 *
 * Usage:
 *   import { getIndicator, searchIndicators } from "fedpipe/sdk/world-bank";
 *   const gdp = await getIndicator("NY.GDP.MKTP.CD", { country: "US", dateRange: "2020:2024" });
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.worldbank.org/v2",
  name: "world-bank",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — data updates annually for most indicators
});

// ─── Types ───────────────────────────────────────────────────────────

/** World Bank indicator data point. */
export interface WBIndicatorValue {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

/** World Bank indicator metadata. */
export interface WBIndicatorInfo {
  id: string;
  name: string;
  unit: string;
  source: { id: string; value: string };
  sourceNote: string;
  sourceOrganization: string;
}

/** World Bank country metadata. */
export interface WBCountry {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; value: string };
  incomeLevel: { id: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

// World Bank wraps responses in [metadata, data] tuple
type WBResponse<T> = [{ page: number; pages: number; per_page: string; total: number }, T[]];

/** World Bank topic (thematic grouping of indicators). */
export interface WBTopic {
  id: string;
  value: string;
  sourceNote?: string;
}

/** World Bank data source / database. */
export interface WBSource {
  id: string;
  name: string;
  code?: string;
  description?: string;
  url?: string;
  lastupdated?: string;
}

/** World Bank classification entry (income level or lending type). */
export interface WBClassification {
  id: string;
  iso2code: string;
  value: string;
}

/** World Bank region. */
export interface WBRegion {
  id: string;
  code: string;
  name: string;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Get indicator data for a country or set of countries. */
export async function getIndicator(indicatorId: string, opts: {
  country?: string;  // ISO2 code, "US", "GB", "all", or semicolon-separated "US;GB;DE"
  dateRange?: string; // "2020:2024" or single year "2024"
  perPage?: number;
} = {}): Promise<{ total: number; data: WBIndicatorValue[] }> {
  const country = opts.country ?? "US";
  const data = await api.get<WBResponse<WBIndicatorValue>>(
    `/country/${country}/indicator/${indicatorId}`,
    { format: "json", date: opts.dateRange, per_page: opts.perPage ?? 100 }
  );
  if (!Array.isArray(data) || data.length < 2) return { total: 0, data: [] };
  return { total: data[0].total, data: data[1] ?? [] };
}

/** Compare an indicator across multiple countries. */
export async function compareCountries(indicatorId: string, countries: string[], opts?: {
  dateRange?: string; perPage?: number;
}): Promise<{ total: number; data: WBIndicatorValue[] }> {
  return getIndicator(indicatorId, {
    country: countries.join(";"),
    dateRange: opts?.dateRange,
    perPage: opts?.perPage ?? 500,
  });
}

/**
 * Search indicators by keyword.
 *
 * The World Bank API has no server-side text search, so the indicator catalog (~29,000 across all
 * sources, or ~1,500 with `source: 2` = World Development Indicators) is fetched — paged, cached 24h —
 * and ranked client-side: every term must appear in the name (or, failing that, the definition);
 * exact-ID, whole-phrase, and phrase-at-start matches rank first; shorter names break ties.
 */
export async function searchIndicators(query: string, opts: {
  limit?: number;
  source?: string | number; // restrict to a single source database (e.g. 2 = WDI)
} = {}): Promise<WBIndicatorInfo[]> {
  const limit = opts.limit ?? 30;
  const catalog: WBIndicatorInfo[] = [];
  let page = 1, pages = 1;
  do {
    const data = await api.get<WBResponse<WBIndicatorInfo>>("/indicator", { format: "json", per_page: 20000, source: opts.source, page });
    if (!Array.isArray(data) || data.length < 2 || !data[1]) break;
    pages = data[0].pages;
    catalog.push(...data[1]);
    page++;
  } while (page <= pages);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const phrase = terms.join(" ");
  const scored = catalog
    .map(i => {
      const name = (i.name ?? "").toLowerCase(), id = (i.id ?? "").toLowerCase();
      if (id === query.toLowerCase()) return { i, score: 100 };
      const inName = terms.filter(t => name.includes(t)).length;
      const inNote = inName < terms.length ? terms.filter(t => (i.sourceNote ?? "").toLowerCase().includes(t)).length : 0;
      if (inName < terms.length && inName + inNote < terms.length) return null;
      return { i, score: (inName === terms.length ? 10 : 0) + (name.includes(phrase) ? 5 : 0) + (name.startsWith(phrase) ? 3 : 0) - name.length / 200 };
    })
    .filter((x): x is { i: WBIndicatorInfo; score: number } => !!x)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(x => x.i);
}

/** Metadata for one indicator (definition, source, unit). */
export async function getIndicatorInfo(indicatorId: string): Promise<WBIndicatorInfo | null> {
  const data = await api.get<WBResponse<WBIndicatorInfo>>(`/indicator/${indicatorId}`, { format: "json" });
  if (!Array.isArray(data) || data.length < 2) return null;
  return data[1]?.[0] ?? null;
}

/** Common aggregate/region codes the API accepts alongside country codes. */
export const WB_AGGREGATES: Record<string, string> = {
  WLD: "World", HIC: "High income", MIC: "Middle income", LIC: "Low income", LMY: "Low & middle income",
  EUU: "European Union", OED: "OECD members", EAS: "East Asia & Pacific", ECS: "Europe & Central Asia",
  LCN: "Latin America & Caribbean", MEA: "Middle East & North Africa", NAC: "North America", SAS: "South Asia", SSF: "Sub-Saharan Africa",
};

/**
 * Resolve a country name, ISO2, or ISO3 code to the ISO2 code the API expects.
 * "Kenya" → "KE", "KEN" → "KE", "United Kingdom" → "GB", "UK" → "GB". Aggregates (WLD, EUU) pass through.
 */
export async function resolveCountry(input: string): Promise<{ code: string; name: string } | null> {
  const q = input.trim();
  if (!q) return null;
  const up = q.toUpperCase();
  if (WB_AGGREGATES[up]) return { code: up, name: WB_AGGREGATES[up] };
  const aggByName = Object.entries(WB_AGGREGATES).find(([, name]) => name.toLowerCase() === q.toLowerCase());
  if (aggByName) return { code: aggByName[0], name: aggByName[1] };
  const aliases: Record<string, string> = { UK: "GB", USA: "US", "UNITED STATES": "US", "SOUTH KOREA": "KR", "NORTH KOREA": "KP", RUSSIA: "RU", IRAN: "IR", VIETNAM: "VN", SYRIA: "SY", LAOS: "LA", "CZECH REPUBLIC": "CZ", TURKEY: "TR", EGYPT: "EG", VENEZUELA: "VE", BOLIVIA: "BO", TANZANIA: "TZ", "IVORY COAST": "CI", "HONG KONG": "HK", MACAU: "MO", TAIWAN: "TW", "THE GAMBIA": "GM", "THE BAHAMAS": "BS" };
  const countries = await listCountries();
  const alias = aliases[up];
  const byCode = countries.find(c => c.iso2Code === (alias ?? up) || c.id === up);
  if (byCode) return { code: byCode.iso2Code, name: byCode.name };
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
  const nq = norm(q);
  // Non-Latin input normalizes to nothing — and "".includes matches every
  // country ("США" used to resolve to Cuba, the shortest name). Bail out.
  if (nq.length < 2) return null;
  const exact = countries.find(c => norm(c.name) === nq);
  if (exact) return { code: exact.iso2Code, name: exact.name };
  const partial = countries.filter(c => norm(c.name).includes(nq) || (nq.length >= 4 && nq.includes(norm(c.name))));
  if (partial.length) { partial.sort((a, b) => a.name.length - b.name.length); return { code: partial[0].iso2Code, name: partial[0].name }; }
  return null;
}

/** Resolve a list like "US;United Kingdom;KEN;World" to ISO2/aggregate codes, reporting anything unresolved. */
export async function resolveCountries(list: string[]): Promise<{ codes: string[]; names: Record<string, string>; unresolved: string[] }> {
  const codes: string[] = [], names: Record<string, string> = {}, unresolved: string[] = [];
  for (const item of list) {
    const r = await resolveCountry(item);
    if (r) { codes.push(r.code); names[r.code] = r.name; } else unresolved.push(item);
  }
  return { codes, names, unresolved };
}

/** List countries with metadata. */
export async function listCountries(perPage = 300): Promise<WBCountry[]> {
  const data = await api.get<WBResponse<WBCountry>>("/country", { format: "json", per_page: perPage });
  if (!Array.isArray(data) || data.length < 2) return [];
  return (data[1] ?? []).filter(c => c.region?.id !== "NA"); // filter out aggregates
}

/** Helper to fetch a simple WB list endpoint. */
async function wbList<T>(path: string): Promise<T[]> {
  const data = await api.get<WBResponse<T>>(path, { format: "json", per_page: 2000 });
  if (!Array.isArray(data) || data.length < 2) return [];
  return data[1] ?? [];
}

/** List the 21 thematic topics indicators are grouped under. */
export async function listTopics(): Promise<WBTopic[]> {
  return wbList<WBTopic>("/topic");
}

/** List all indicators belonging to a topic. */
export async function getTopicIndicators(topicId: string | number): Promise<WBIndicatorInfo[]> {
  return wbList<WBIndicatorInfo>(`/topic/${topicId}/indicator`);
}

/** List the data source databases (World Development Indicators, Doing Business, etc.). */
export async function listSources(): Promise<WBSource[]> {
  return wbList<WBSource>("/source");
}

/** List all indicators provided by a specific source database. */
export async function getSourceIndicators(sourceId: string | number): Promise<WBIndicatorInfo[]> {
  return wbList<WBIndicatorInfo>(`/source/${sourceId}/indicator`);
}

/** List geographic regions and regional aggregates. */
export async function listRegions(): Promise<WBRegion[]> {
  return wbList<WBRegion>("/region");
}

/** List income-level classifications (HIC, UMC, LMC, LIC, etc.). */
export async function listIncomeLevels(): Promise<WBClassification[]> {
  return wbList<WBClassification>("/incomelevel");
}

/** List lending-type classifications (IBRD, IDA, Blend, Unclassified). */
export async function listLendingTypes(): Promise<WBClassification[]> {
  return wbList<WBClassification>("/lendingtype");
}

/** Popular indicator IDs for quick reference. */
export const POPULAR_INDICATORS = {
  "NY.GDP.MKTP.CD": "GDP (current US$)",
  "NY.GDP.MKTP.KD.ZG": "GDP growth (annual %)",
  "NY.GDP.PCAP.CD": "GDP per capita (current US$)",
  "SP.POP.TOTL": "Population, total",
  "SP.DYN.LE00.IN": "Life expectancy at birth (years)",
  "SH.XPD.CHEX.PC.CD": "Health expenditure per capita (US$)",
  "SH.XPD.CHEX.GD.ZS": "Health expenditure (% of GDP)",
  "FP.CPI.TOTL.ZG": "Inflation, consumer prices (annual %)",
  "SL.UEM.TOTL.ZS": "Unemployment (% of labor force)",
  "GC.DOD.TOTL.GD.ZS": "Central gov't debt (% of GDP)",
  "NE.EXP.GNFS.ZS": "Exports of goods and services (% of GDP)",
  "NE.IMP.GNFS.ZS": "Imports of goods and services (% of GDP)",
  "SI.POV.GINI": "Gini index (income inequality)",
  "SE.XPD.TOTL.GD.ZS": "Education expenditure (% of GDP)",
  "EN.ATM.CO2E.PC": "CO2 emissions (metric tons per capita)",
  "IT.NET.USER.ZS": "Internet users (% of population)",
  "SM.POP.NETM": "Net migration",
} as const;

/**
 * Clear Cache.
 */
export function clearCache(): void { api.clearCache(); }
