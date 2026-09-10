/**
 * usitc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getSavedQueries, runReport } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "usitc_saved_queries",
    description:
      "List your saved USITC DataWeb queries — the trade-statistics reports you built in the DataWeb UI. Each can be " +
      "re-run with usitc_run_query using its definition. Returns query names and metadata.\n\n" +
      "Requires USITC_API_TOKEN (free).",
    annotations: { title: "USITC DataWeb: Saved Queries", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const queries = await getSavedQueries();
      if (!queries.length) return emptyResponse("No saved DataWeb queries (build one at dataweb.usitc.gov).");
      return listResponse(`USITC DataWeb: ${queries.length} saved quer(ies)`, {
        items: queries, total: queries.length, meta: { source: "USITC DataWeb" },
      });
    },
  },

  {
    name: "usitc_run_query",
    description:
      "Run a USITC DataWeb trade-statistics report from a full report definition and return the result — official " +
      "U.S. imports/exports by HTS commodity, country, and time period, plus tariffs. Build the query in the DataWeb " +
      "UI (dataweb.usitc.gov), export/copy its JSON definition, and pass it as `query`.\n\n" +
      "Requires USITC_API_TOKEN (free). The report-body schema is DataWeb-specific; this passes it through verbatim.",
    annotations: { title: "USITC DataWeb: Run Report", readOnlyHint: true },
    parameters: z.object({
      query: z.record(z.string(), z.any()).describe("The DataWeb runReport body (JSON object) — as exported from the DataWeb UI."),
    }),
    execute: async ({ query }) => {
      const result = await runReport(query);
      if (result == null) return emptyResponse("DataWeb returned no result for that report definition.");
      return recordResponse("USITC DataWeb report result", (result as Record<string, unknown>) ?? {}, {
        source: "USITC DataWeb",
      });
    },
  },
];
