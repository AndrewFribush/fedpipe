/**
 * who MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getIndicator, searchIndicators } from "./sdk.js";
import { timeseriesResponse, tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "who_indicator",
    description:
      "Global health statistics from the WHO Global Health Observatory (GHO) — life expectancy, mortality, disease " +
      "burden, immunization coverage, risk factors (tobacco, obesity, alcohol), and health-system capacity, for " +
      "~200 countries and the SDG health targets.\n\n" +
      "Pass an ISO-3 country code (e.g. 'USA') and a GHO indicator code — find codes with who_search_indicators " +
      "(e.g. WHOSIS_000001 = life expectancy at birth). The global complement to CDC. Keyless.",
    annotations: { title: "WHO: Global Health Indicator", readOnlyHint: true },
    parameters: z.object({
      indicator: z.string().describe("GHO indicator code, e.g. 'WHOSIS_000001' (life expectancy at birth)."),
      country: z.string().optional().describe("ISO-3 country code, e.g. 'USA'. Omit for all countries."),
      start_year: z.number().int().optional().describe("Earliest year (4-digit)."),
      end_year: z.number().int().optional().describe("Latest year (4-digit)."),
      limit: z.number().int().max(2000).optional().describe("Max observations (default 500)."),
    }),
    execute: async ({ indicator, country, start_year, end_year, limit }) => {
      const obs = await getIndicator({ indicator, country, start: start_year, end: end_year, limit });
      if (!obs.length) return emptyResponse(`No WHO GHO data for '${indicator}'${country ? ` in ${country}` : ""}.`);

      // A single-country series with one dimension value reads as a timeseries.
      const dims = new Set(obs.map((o) => o.dimension));
      if (country && dims.size <= 1) {
        return timeseriesResponse(`WHO ${indicator} — ${country.toUpperCase()}: ${obs.length} points`, {
          rows: obs.map((o) => ({ year: o.year, value: o.value, display: o.display })),
          dateKey: "year",
          valueKey: "value",
          extraFields: ["display"],
          meta: { source: "WHO GHO", indicator, country: country.toUpperCase() },
        });
      }
      return tableResponse(`WHO ${indicator}: ${obs.length} observations`, {
        rows: obs,
        columns: ["country", "year", "dimension", "value", "display"],
        meta: { source: "WHO GHO", indicator },
      });
    },
  },

  {
    name: "who_search_indicators",
    description:
      "Search the WHO Global Health Observatory indicator catalog by keyword — returns matching indicator codes " +
      "and names to use with who_indicator. Example: 'life expectancy', 'tobacco', 'measles immunization'. Keyless.",
    annotations: { title: "WHO: Search Indicators", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Keyword over indicator name/code, e.g. 'life expectancy'."),
      limit: z.number().int().max(100).optional().describe("Max results (default 40)."),
    }),
    execute: async ({ query, limit }) => {
      const results = await searchIndicators(query, limit);
      if (!results.length) return emptyResponse(`No WHO GHO indicators match '${query}'.`);
      return listResponse(`WHO GHO indicators matching '${query}': ${results.length}`, {
        items: results,
        total: results.length,
        meta: { source: "WHO GHO" },
      });
    },
  },
];
