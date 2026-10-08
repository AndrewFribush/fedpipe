/**
 * fema-nri MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getCountyRisk, getStateRisk } from "./sdk.js";
import { recordResponse, tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fema_nri_county",
    description:
      "FEMA National Risk Index profile for one county — the composite natural-hazard risk score and rating, " +
      "expected annual loss ($), social vulnerability, and community resilience, plus a per-hazard breakdown " +
      "(wildfire, riverine & coastal flood, hurricane, tornado, earthquake, heat, drought, and more) ranked by " +
      "risk.\n\n" +
      "Identify the county by 5-digit FIPS (e.g. '08101') or state + county name. Pairs directly with the county " +
      "dossier, FEMA disaster declarations, and USACE dams. Keyless.",
    annotations: { title: "FEMA National Risk Index: County", readOnlyHint: true },
    parameters: z.object({
      county_fips: z.string().optional().describe("5-digit county FIPS, e.g. '08101' (Pueblo County, CO)."),
      state: z.string().optional().describe("Two-letter state code (with `county`)."),
      county: z.string().optional().describe("County name, e.g. 'Pueblo' (with `state`)."),
    }),
    execute: async ({ county_fips, state, county }) => {
      if (!county_fips && !(state && county)) {
        return emptyResponse("Provide county_fips, or both state and county.");
      }
      const r = await getCountyRisk({ countyFips: county_fips, state, county });
      if (!r) return emptyResponse(`No National Risk Index record for ${county_fips ?? `${county}, ${state}`}.`);
      return recordResponse(
        `${r.county} County, ${r.state} — risk ${r.riskRating ?? "?"} (score ${r.riskScore?.toFixed(1) ?? "?"}); ` +
          `top hazard: ${r.hazards[0]?.hazard ?? "n/a"}`,
        r,
        { source: "FEMA National Risk Index", units: { expectedAnnualLossUsd: "USD/year", scores: "0-100 (higher = more)" } },
      );
    },
  },

  {
    name: "fema_nri_state",
    description:
      "Counties in a state ranked by FEMA National Risk Index composite score (highest risk first), with each " +
      "county's rating, expected annual loss ($), and population. Use to find the highest-risk counties in a state. " +
      "Keyless.",
    annotations: { title: "FEMA National Risk Index: State Ranking", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state code, e.g. 'CO'."),
      limit: z.number().int().max(100).optional().describe("Max counties (default 25)."),
    }),
    execute: async ({ state, limit }) => {
      const rows = await getStateRisk(state, limit);
      if (!rows.length) return emptyResponse(`No National Risk Index counties for '${state}'.`);
      return tableResponse(`FEMA NRI — ${rows.length} ${state.toUpperCase()} counties by risk (highest first)`, {
        rows,
        columns: ["county", "risk_rating", "risk_score", "expected_annual_loss_usd", "population", "stcofips"],
        meta: { source: "FEMA National Risk Index" },
      });
    },
  },
];
