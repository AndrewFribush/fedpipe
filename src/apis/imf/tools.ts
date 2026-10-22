/**
 * imf MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getIndicator, searchIndicators } from "./sdk.js";
import { timeseriesResponse, tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "imf_indicator",
    description:
      "Macroeconomic indicator values for countries over time from the IMF DataMapper (World Economic Outlook & " +
      "Fiscal Monitor) — GDP growth, inflation, government debt/deficit, current account, unemployment, and more. " +
      "IMF series extend several years into the future as forecasts.\n\n" +
      "Pass ISO-3 country codes (e.g. ['USA','CHN']). Find indicator codes with imf_search_indicators — common ones: " +
      "NGDP_RPCH (real GDP growth %), PCPIPCH (inflation %), GGXWDG_NGDP (gov gross debt %GDP), LUR (unemployment %). " +
      "The international complement to FRED/BEA. Keyless.",
    annotations: { title: "IMF: Macro Indicator", readOnlyHint: true },
    parameters: z.object({
      indicator: z.string().describe("IMF indicator code, e.g. 'NGDP_RPCH' (real GDP growth)."),
      countries: z.array(z.string()).optional().describe("ISO-3 country codes, e.g. ['USA','CHN','DEU']. Omit for all economies."),
      start_year: z.number().int().optional().describe("Earliest year (4-digit)."),
      end_year: z.number().int().optional().describe("Latest year (4-digit); IMF data includes forecast years."),
    }),
    execute: async ({ indicator, countries, start_year, end_year }) => {
      const { series } = await getIndicator({ indicator, countries, start: start_year, end: end_year });
      if (!series.length) return emptyResponse(`No IMF data for indicator '${indicator}'${countries ? ` and those countries` : ""}.`);

      if (series.length === 1) {
        const s = series[0];
        return timeseriesResponse(`IMF ${indicator} — ${s.iso3}: ${s.points.length} years`, {
          rows: s.points.map((p) => ({ year: p.year, value: p.value })),
          dateKey: "year",
          valueKey: "value",
          meta: { source: "IMF DataMapper", indicator, country: s.iso3 },
        });
      }
      const rows = series.flatMap((s) => s.points.map((p) => ({ country: s.iso3, year: p.year, value: p.value })));
      return tableResponse(`IMF ${indicator}: ${series.length} countries`, {
        rows,
        columns: ["country", "year", "value"],
        meta: { source: "IMF DataMapper", indicator },
      });
    },
  },

  {
    name: "imf_search_indicators",
    description:
      "Search the IMF DataMapper indicator catalog by keyword — returns matching indicator codes, labels, and " +
      "units to use with imf_indicator. Example: 'debt', 'inflation', 'current account'. Keyless.",
    annotations: { title: "IMF: Search Indicators", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Keyword over indicator label/code, e.g. 'gross debt'."),
      limit: z.number().int().max(100).optional().describe("Max results (default 40)."),
    }),
    execute: async ({ query, limit }) => {
      const results = await searchIndicators(query, limit);
      if (!results.length) return emptyResponse(`No IMF indicators match '${query}'.`);
      return listResponse(`IMF indicators matching '${query}': ${results.length}`, {
        items: results,
        total: results.length,
        meta: { source: "IMF DataMapper" },
      });
    },
  },
];
