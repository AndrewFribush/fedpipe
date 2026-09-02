/**
 * EIA SDK — typed API client for the U.S. Energy Information Administration API v2.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { queryEia } from "fedpipe/sdk/eia";
 *
 * Requires EIA_API_KEY env var — register at https://www.eia.gov/opendata/register.php
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.eia.gov/v2",
  name: "eia",
  auth: {
    type: "query",
    envParams: { api_key: "EIA_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — EIA data updates infrequently
  checkError: (data) => (data as any)?.error ?? null,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Eia Response. */
export interface EiaResponse {
  response: {
    total: number;
    data: EiaObservation[];
    description?: string;
    dateFormat?: string;
    frequency?: string;
  };
  request?: Record<string, unknown>;
}

/** Eia Observation. */
export interface EiaObservation {
  period: string;
  value: number | string | null;
  units?: string;
  unit?: string;
  "series-description"?: string;
  seriesDescription?: string;
  series?: string;
  stateDescription?: string;
  stateid?: string;
  stateId?: string;
  sectorName?: string;
  sectorid?: string;
  msn?: string;
  process?: string;
  [key: string]: unknown;
}

/** Eia Route. */
export interface EiaRoute {
  path: string;
  description: string;
  frequency: string[];
  facets?: string[];
}

// ─── Reference data ──────────────────────────────────────────────────

/** EIA State Energy Data System (SEDS) MSN codes for state energy profiles. */
export const sedsMsnCodes = {
  TETCB: "Total energy consumption (trillion BTU)",
  TETCD: "Total energy consumption per capita",
  TEPRB: "Total energy production (trillion BTU)",
  ESTCB: "Electricity total consumption",
  CLTCB: "Coal consumption",
  NNTCB: "Natural gas consumption",
  PATCB: "Petroleum consumption (all products)",
  RETCB: "Renewable energy consumption",
  NUETB: "Nuclear energy consumption",
  ELISB: "Electricity interstate flow",
  TETXB: "Total energy expenditures",
} as const;

/** Routes. */
export const routes: EiaRoute[] = [
  { path: "/petroleum/pri/spt/data", description: "Petroleum spot prices (WTI, Brent)", frequency: ["daily", "weekly", "monthly", "annual"], facets: ["series"] },
  { path: "/petroleum/pri/gnd/data", description: "Retail gasoline and diesel prices", frequency: ["weekly", "monthly", "annual"], facets: ["series", "product", "duoarea"] },
  { path: "/petroleum/crd/crpdn/data", description: "Crude oil production", frequency: ["monthly", "annual"], facets: ["duoarea", "product"] },
  { path: "/petroleum/sum/snd/data", description: "Petroleum supply and disposition", frequency: ["weekly", "monthly", "annual"] },
  { path: "/petroleum/stoc/wstk/data", description: "Weekly petroleum stocks", frequency: ["weekly"], facets: ["product", "duoarea"] },
  { path: "/petroleum/move/imp/data", description: "Petroleum imports", frequency: ["monthly", "annual"], facets: ["product", "originCountry"] },
  { path: "/electricity/retail-sales/data", description: "Electricity retail sales, revenue, prices, customers", frequency: ["monthly", "annual"], facets: ["stateid", "sectorid"] },
  { path: "/electricity/electric-power-operational-data/data", description: "Power plant operational data", frequency: ["monthly", "annual"], facets: ["stateid", "sectorid", "fueltypeid"] },
  { path: "/electricity/state-electricity-profiles/emissions-by-state-by-fuel/data", description: "CO2 emissions by state and fuel", frequency: ["annual"], facets: ["stateid"] },
  { path: "/natural-gas/pri/sum/data", description: "Natural gas prices summary", frequency: ["monthly", "annual"], facets: ["process", "duoarea"] },
  { path: "/natural-gas/sum/snd/data", description: "Natural gas supply and disposition", frequency: ["monthly", "annual"] },
  { path: "/natural-gas/prod/sum/data", description: "Natural gas production", frequency: ["monthly", "annual"] },
  { path: "/coal/production/data", description: "Coal production", frequency: ["quarterly", "annual"] },
  { path: "/coal/consumption-and-quality/data", description: "Coal consumption", frequency: ["quarterly", "annual"] },
  { path: "/seds/data", description: "State energy profiles (SEDS)", frequency: ["annual"], facets: ["stateId", "msn"] },
  { path: "/total-energy/data", description: "Monthly Energy Review — total US energy overview", frequency: ["monthly", "annual"], facets: ["msn"] },
  { path: "/aeo/data", description: "Annual Energy Outlook projections", frequency: ["annual"] },
  { path: "/international/data", description: "International energy data", frequency: ["monthly", "annual"] },
  { path: "/nuclear/status-operable-units/data", description: "Nuclear power plant status", frequency: ["monthly"] },
];

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Query the EIA API v2.
 * Uses bracket-style params: data[0], facets[series][], sort[0][column], etc.
 * String arrays produce repeated keys automatically via createClient.
 */
export async function queryEia(
  route: string,
  params: Record<string, string | number | string[] | undefined> = {},
): Promise<EiaResponse> {
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  return api.get<EiaResponse>(`${normalizedRoute}`, params);
}

/** Get petroleum data (spot prices, gasoline, diesel). */
export async function getPetroleum(opts: {
  product?: string;
  frequency?: string;
  start?: string;
  end?: string;
  length?: number;
  offset?: number;
} = {}): Promise<EiaResponse> {
  // route + spot/retail series for each friendly product name. Spot-price
  // (spt) series ids: RWTC = Cushing WTI, RBRTE = Europe Brent.
  const productMap: Record<string, { route: string; facet?: [string, string] }> = {
    crude: { route: "/petroleum/pri/spt/data", facet: ["series", "RWTC"] },
    wti: { route: "/petroleum/pri/spt/data", facet: ["series", "RWTC"] },
    brent: { route: "/petroleum/pri/spt/data", facet: ["series", "RBRTE"] },
    gasoline: { route: "/petroleum/pri/gnd/data", facet: ["series", "EMM_EPMRU_PTE_NUS_DPG"] },
    diesel: { route: "/petroleum/pri/gnd/data", facet: ["series", "EMD_EPD2D_PTE_NUS_DPG"] },
    jet: { route: "/petroleum/pri/spt/data", facet: ["series", "EER_EPJK_PF4_RGC_DPG"] },
    propane: { route: "/petroleum/pri/spt/data", facet: ["series", "EER_EPLLPA_PF4_Y44MB_DPG"] },
    heating_oil: { route: "/petroleum/pri/spt/data", facet: ["series", "EER_EPD2F_PF4_Y35NY_DPG"] },
    all: { route: "/petroleum/pri/spt/data" },
  };

  const prod = (opts.product || "crude").toLowerCase().replace(/[\s-]+/g, "_");
  // An unknown product that looks like an EIA series id passes through as a
  // series facet on the spot route (e.g. "RWTC", "EER_EPJK_PF4_RGC_DPG").
  const entry = productMap[prod]
    ?? (opts.product && /^[A-Za-z0-9_]{3,}$/.test(opts.product)
      ? { route: "/petroleum/pri/spt/data", facet: ["series", opts.product.toUpperCase()] as [string, string] }
      : productMap.crude);
  const route = entry.route;

  const params = qp({
    frequency: opts.frequency || "monthly",
    "data[0]": "value",
    start: opts.start || `${new Date().getFullYear() - 2}-01`,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    end: opts.end,
    length: opts.length,
    offset: opts.offset,
  });

  if (entry.facet) params[`facets[${entry.facet[0]}][]`] = entry.facet[1];

  return queryEia(route, params);
}

/** Get electricity data (retail sales, prices, etc.). */
export async function getElectricity(opts: {
  state?: string;
  sector?: string;
  dataType?: string;
  fuelType?: string;
  frequency?: string;
  start?: string;
  end?: string;
  length?: number;
  offset?: number;
} = {}): Promise<EiaResponse> {
  // "generation" lives on the operational-data route (facets: location,
  // fueltypeid); price/revenue/sales/customers on retail-sales (stateid).
  const generation = opts.dataType === "generation";
  const params = qp({
    frequency: opts.frequency || "monthly",
    "data[0]": generation ? "generation" : (opts.dataType || "price"),
    start: opts.start || `${new Date().getFullYear() - 2}-01`,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    end: opts.end,
    length: opts.length,
    offset: opts.offset,
    [generation ? "facets[location][]" : "facets[stateid][]"]: opts.state?.toUpperCase(),
    "facets[sectorid][]": generation ? (opts.sector ?? "98") : opts.sector?.toUpperCase(), // 98 = electric power total
    "facets[fueltypeid][]": generation ? opts.fuelType?.toUpperCase() : undefined,
  });

  return queryEia(generation ? "/electricity/electric-power-operational-data/data" : "/electricity/retail-sales/data", params);
}

/** Get natural gas prices. */

// Friendly name → natural-gas price process code (facet values are codes
// like PRS, not words — "RESIDENTIAL" matches nothing).
const GAS_PROCESS: Record<string, string> = {
  residential: "PRS", commercial: "PCS", industrial: "PIN",
  citygate: "PG1", city_gate: "PG1", electric: "PEU", electric_power: "PEU",
  wellhead: "FWA", imports: "PM0", exports: "PEX", lng_imports: "PML", lng_exports: "PNG",
};

export async function getNaturalGas(opts: {
  process?: string;
  frequency?: string;
  start?: string;
  end?: string;
  length?: number;
  offset?: number;
} = {}): Promise<EiaResponse> {
  const params = qp({
    frequency: opts.frequency || "monthly",
    "data[0]": "value",
    start: opts.start || `${new Date().getFullYear() - 2}-01`,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    end: opts.end,
    length: opts.length,
    offset: opts.offset,
    "facets[process][]": opts.process ? (GAS_PROCESS[opts.process.toLowerCase()] ?? opts.process.toUpperCase()) : undefined,
  });

  return queryEia("/natural-gas/pri/sum/data", params);
}

/** Get state energy profile data (SEDS). */
export async function getStateEnergy(opts: {
  state?: string;
  msn?: string;
  start?: string;
  end?: string;
  length?: number;
  offset?: number;
} = {}): Promise<EiaResponse> {
  const params = qp({
    frequency: "annual",
    "data[0]": "value",
    start: opts.start || String(new Date().getFullYear() - 5),
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    end: opts.end,
    length: opts.length,
    offset: opts.offset,
    "facets[stateId][]": opts.state?.toUpperCase(),
    "facets[seriesId][]": (opts.msn || "TETCB").toUpperCase(),
  });

  return queryEia("/seds/data", params);
}

/** Get total energy overview. */
export async function getTotalEnergy(opts: {
  msn?: string;
  frequency?: string;
  start?: string;
  end?: string;
  length?: number;
  offset?: number;
} = {}): Promise<EiaResponse> {
  const params = qp({
    frequency: opts.frequency || "monthly",
    "data[0]": "value",
    start: opts.start || `${new Date().getFullYear() - 2}-01`,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    end: opts.end,
    length: opts.length,
    offset: opts.offset,
    "facets[msn][]": opts.msn?.toUpperCase(),
  });

  return queryEia("/total-energy/data", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
