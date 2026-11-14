/**
 * FEMA National Risk Index (NRI) SDK.
 *
 * FEMA's composite natural-hazard risk score for every U.S. county, combining
 * the expected annual loss from 18 hazards (wildfire, riverine & coastal flood,
 * hurricane, tornado, earthquake, heat, drought, ...) with social vulnerability
 * and community resilience. Served from FEMA's public ArcGIS FeatureServer.
 *
 * Standalone — no MCP or Zod required:
 *   import { getCountyRisk, getStateRisk } from "fedpipe/sdk/fema-nri";
 *
 * Keyless: FEMA's hosted feature service is open.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://services.arcgis.com",
  name: "fema-nri",
  cacheTtlMs: 7 * 24 * 60 * 60 * 1000, // 7d — the NRI is republished infrequently
  timeoutMs: 45_000,
});

const LAYER = "/XG15cJAlne2vxtgt/arcgis/rest/services/National_Risk_Index_Counties/FeatureServer/0/query";

// ─── Reference ───────────────────────────────────────────────────────

/** The 18 NRI hazard field prefixes → human names. */
export const HAZARDS: Record<string, string> = {
  AVLN: "Avalanche", CFLD: "Coastal Flooding", CWAV: "Cold Wave", DRGT: "Drought",
  ERQK: "Earthquake", HAIL: "Hail", HWAV: "Heat Wave", HRCN: "Hurricane",
  ISTM: "Ice Storm", LNDS: "Landslide", LTNG: "Lightning", RFLD: "Riverine Flooding",
  SWND: "Strong Wind", TRND: "Tornado", TSUN: "Tsunami", VLCN: "Volcanic Activity",
  WFIR: "Wildfire", WNTW: "Winter Weather",
};

// ─── Types ───────────────────────────────────────────────────────────

export interface CountyRisk {
  county: string;
  state: string;
  stcofips: string;
  population: number | null;
  riskScore: number | null;
  riskRating: string | null;
  riskPercentile: number | null;
  expectedAnnualLossUsd: number | null;
  socialVulnerability: number | null;
  communityResilience: number | null;
  hazards: Array<{ hazard: string; score: number | null; rating: string | null; expectedAnnualLossUsd: number | null }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const n = (v: unknown): number | null =>
  v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v);

async function query<T = any>(params: Record<string, string | number>): Promise<any> {
  return api.get<T>(LAYER, qp({ f: "json", returnGeometry: "false", ...params }));
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Full risk profile for one county — by 5-digit FIPS, or state + county name.
 */
export async function getCountyRisk(opts: {
  countyFips?: string;
  state?: string;
  county?: string;
}): Promise<CountyRisk | null> {
  let where: string;
  if (opts.countyFips) {
    where = `STCOFIPS='${opts.countyFips.replace(/[^0-9]/g, "").padStart(5, "0")}'`;
  } else if (opts.state && opts.county) {
    where = `STATEABBRV='${opts.state.toUpperCase()}' AND UPPER(COUNTY)='${opts.county.toUpperCase().replace(/'/g, "''")}'`;
  } else {
    throw new Error("fema-nri: provide countyFips, or state + county.");
  }

  const raw = await query({ where, outFields: "*" });
  const a = raw?.features?.[0]?.attributes;
  if (!a) return null;

  const hazards = Object.entries(HAZARDS)
    .map(([prefix, name]) => ({
      hazard: name,
      score: n(a[`${prefix}_RISKS`]),
      rating: a[`${prefix}_RISKR`] ?? null,
      expectedAnnualLossUsd: n(a[`${prefix}_EALT`]),
    }))
    .filter((h) => h.score != null)
    .sort((x, y) => (y.score ?? 0) - (x.score ?? 0));

  return {
    county: a.COUNTY,
    state: a.STATE,
    stcofips: a.STCOFIPS,
    population: n(a.POPULATION),
    riskScore: n(a.RISK_SCORE),
    riskRating: a.RISK_RATNG ?? null,
    riskPercentile: n(a.RISK_SPCTL),
    expectedAnnualLossUsd: n(a.EAL_VALT),
    socialVulnerability: n(a.SOVI_SCORE),
    communityResilience: n(a.RESL_SCORE),
    hazards,
  };
}

/**
 * Counties in a state ranked by composite risk score (highest first).
 */
export async function getStateRisk(state: string, limit = 25): Promise<Array<Record<string, unknown>>> {
  const raw = await query({
    where: `STATEABBRV='${state.toUpperCase()}'`,
    outFields: "COUNTY,STCOFIPS,RISK_SCORE,RISK_RATNG,EAL_VALT,POPULATION",
    orderByFields: "RISK_SCORE DESC",
    resultRecordCount: limit,
  });
  return (raw?.features ?? []).map((f: any) => {
    const a = f.attributes;
    return {
      county: a.COUNTY,
      stcofips: a.STCOFIPS,
      risk_score: n(a.RISK_SCORE),
      risk_rating: a.RISK_RATNG ?? null,
      expected_annual_loss_usd: n(a.EAL_VALT) != null ? Math.round(n(a.EAL_VALT)!) : null,
      population: n(a.POPULATION),
    };
  });
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
