/**
 * bjs MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchData, datasetInfo, NACJD_PAGE } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "bjs_data",
    description:
      "Query a locally-ingested Bureau of Justice Statistics extract (corrections, victimization, or federal-justice " +
      "data — NPS, NCRP, NCVS, FJSP). Filters are column→substring matches (see bjs_dataset_info for column names).\n\n" +
      "BJS has no query API — its datasets are downloadable/ICPSR-gated files — so this reads a delimited extract you " +
      "ingested deliberately. If not yet ingested, this returns instructions. Needs Node >= 22.5.",
    annotations: { title: "BJS: Justice Statistics", readOnlyHint: true },
    parameters: z.object({
      filters: z.record(z.string(), z.string()).optional()
        .describe("Column→substring filters. Use bjs_dataset_info for the column names of the ingested extract."),
      limit: z.number().int().max(200).optional().describe("Max rows (default 25)."),
    }),
    execute: async ({ filters, limit }) => {
      try {
        const { rows, total } = await searchData({ filters, limit });
        if (!rows.length) return emptyResponse("No BJS rows match those filters.");
        return tableResponse(`BJS: ${total.toLocaleString()} row(s) match, showing ${rows.length}`, {
          rows, total, meta: { source: "BJS extract (local ingest)" },
        });
      } catch (e) {
        return emptyResponse(e instanceof Error ? e.message : String(e));
      }
    },
  },

  {
    name: "bjs_dataset_info",
    description:
      "Status of the locally-ingested BJS dataset — whether it has been ingested, the row count, the column names " +
      "(filters for bjs_data), the source file, and when it was built. Does not download anything.",
    annotations: { title: "BJS: Dataset Status", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      const summary = info.ingested
        ? `BJS local dataset: ${info.rowCount.toLocaleString()} rows (built ${info.builtAt})`
        : `BJS data not yet ingested — run ingest('<url>') from the bjs SDK (datasets at ${NACJD_PAGE}).`;
      return recordResponse(summary, info, { source: "BJS" });
    },
  },
];
