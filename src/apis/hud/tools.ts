/**
 * hud MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  listStates,
  listCounties,
  listMetroAreas,
  getFairMarketRents,
  getStateFairMarketRents,
  getIncomeLimits,
  getStateIncomeLimits,
  clearCache as sdkClearCache,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

/** HUD wraps every response in a {data: ...} envelope — unwrap it. */
function unwrapHud(raw: unknown): Record<string, any> {
  const r = raw as any;
  if (r && typeof r === "object" && r.data && typeof r.data === "object") return r.data;
  return (r as Record<string, any>) ?? {};
}

function fmrToRecord(area: Record<string, any>): Record<string, unknown> {
  // Entity FMR nests rents under basicdata; state metro/county items carry them inline.
  const basic = (area.basicdata ?? area) as Record<string, any>;
  return {
    area_name: area.area_name ?? area.metro_name ?? area.county_name ?? "Unknown area",
    year: area.year ?? null,
    efficiency: basic.Efficiency ?? basic.efficiency ?? basic.rent_eff ?? null,
    oneBedroom: basic["One-Bedroom"] ?? basic.one_bedroom ?? basic.rent_1br ?? null,
    twoBedroom: basic["Two-Bedroom"] ?? basic.two_bedroom ?? basic.rent_2br ?? null,
    threeBedroom: basic["Three-Bedroom"] ?? basic.three_bedroom ?? basic.rent_3br ?? null,
    fourBedroom: basic["Four-Bedroom"] ?? basic.four_bedroom ?? basic.rent_4br ?? null,
  };
}

function incomeLimitsToRecord(area: Record<string, any>): Record<string, unknown> {
  return {
    area_name: area.area_name ?? area.metro_name ?? area.county_name ??
      (area.statecode ? `State of ${area.statecode}` : "Unknown area"),
    year: area.year ?? null,
    median_income: area.median_income ?? area.median ?? null,
    very_low: area.very_low ?? null,
    extremely_low: area.extremely_low ?? null,
    low: area.low ?? null,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "hud_fair_market_rents",
    description:
      "Get HUD Fair Market Rents (FMR) for a county, metro area, or entire state. Shows monthly rent by bedroom count (efficiency through 4-bedroom). FMR determines Section 8 voucher amounts.",
    annotations: { title: "HUD: Fair Market Rents", readOnlyHint: true },
    parameters: z.object({
      state: z.string().max(2).optional().describe("Two-letter state code for state-wide FMR data (e.g. CA, TX)"),
      entity_id: z.string().optional().describe("County FIPS or CBSA code for specific area FMR (get from hud_list_counties)"),
      year: z.number().optional().describe("Fiscal year (e.g. 2024). Defaults to current year."),
    }),
    execute: async (args) => {
      let raw: unknown;
      if (args.entity_id) {
        raw = await getFairMarketRents(args.entity_id, args.year);
      } else if (args.state) {
        raw = await getStateFairMarketRents(args.state, args.year);
      } else {
        return emptyResponse("Provide either state or entity_id.");
      }

      const payload = unwrapHud(raw);
      // State FMR returns metroareas[] + counties[] — list them.
      if (Array.isArray(payload.metroareas) || Array.isArray(payload.counties)) {
        const areas = [...(payload.metroareas ?? []), ...(payload.counties ?? [])];
        const items = areas.map(fmrToRecord);
        return listResponse(
          `Fair Market Rents: ${items.length} area(s)${args.state ? ` in ${args.state.toUpperCase()}` : ""} (FY${payload.year ?? args.year ?? "?"})`,
          { items, total: items.length },
        );
      }
      const record = fmrToRecord(payload);
      return recordResponse(`Fair Market Rents — ${record.area_name}`, record);
    },
  },
  {
    name: "hud_income_limits",
    description:
      "Get HUD Income Limits for a county, metro area, or entire state. Shows Very Low, Extremely Low, and Low income thresholds by household size (1-8 persons). Used for affordable housing eligibility.",
    annotations: { title: "HUD: Income Limits", readOnlyHint: true },
    parameters: z.object({
      state: z.string().max(2).optional().describe("Two-letter state code for state-wide income limits"),
      entity_id: z.string().optional().describe("County FIPS or CBSA code (get from hud_list_counties)"),
      year: z.number().optional().describe("Fiscal year (e.g. 2024). Defaults to current year."),
    }),
    execute: async (args) => {
      let raw: unknown;
      if (args.entity_id) {
        raw = await getIncomeLimits(args.entity_id, args.year);
      } else if (args.state) {
        raw = await getStateIncomeLimits(args.state, args.year);
      } else {
        return emptyResponse("Provide either state or entity_id.");
      }

      const payload = unwrapHud(raw);
      // State income limits return a single aggregate record; entity likewise.
      if (Array.isArray(payload.metroareas) || Array.isArray(payload.counties)) {
        const areas = [...(payload.metroareas ?? []), ...(payload.counties ?? [])];
        const items = areas.map(incomeLimitsToRecord);
        return listResponse(`Income Limits: ${items.length} area(s)`, { items, total: items.length });
      }
      const record = incomeLimitsToRecord(payload);
      return recordResponse(`Income Limits — ${record.area_name}`, record);
    },
  },
  {
    name: "hud_list_states",
    description: "List all U.S. states with their HUD state codes. Use these codes with other HUD tools.",
    annotations: { title: "HUD: States", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const states = await listStates();
      if (!states.length) return emptyResponse("No states returned.");
      return listResponse(`${states.length} U.S. state(s)`, { items: states.map(s => ({ ...s })), total: states.length });
    },
  },
  {
    name: "hud_list_counties",
    description: "List counties in a state with their FIPS codes. Use FIPS codes as entity_id in hud_fair_market_rents and hud_income_limits.",
    annotations: { title: "HUD: Counties", readOnlyHint: true },
    parameters: z.object({
      state: z.string().max(2).describe("Two-letter state code (e.g. CA, TX, NY)"),
    }),
    execute: async (args) => {
      const counties = await listCounties(args.state);
      if (!counties.length) return emptyResponse(`No counties found for state '${args.state}'.`);
      return listResponse(
        `${counties.length} county/area(s) in ${args.state.toUpperCase()}`,
        { items: counties.map(c => ({ ...c })), total: counties.length },
      );
    },
  },
  {
    name: "hud_list_metro_areas",
    description: "List metropolitan/CBSA areas. CBSA codes can be used as entity_id in HUD tools.",
    annotations: { title: "HUD: Metro Areas", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const areas = await listMetroAreas();
      if (!areas.length) return emptyResponse("No metro areas returned.");
      return listResponse(
        `${areas.length} metro area(s)`,
        { items: areas.map(a => ({ ...a })), total: areas.length },
      );
    },
  },
];
