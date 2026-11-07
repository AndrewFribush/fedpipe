/**
 * atf MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchFfls, datasetInfo, FFL_LISTING_PAGE } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "atf_ffls",
    description:
      "Query Federal Firearms Licensees (FFLs) — every ATF-licensed firearms dealer, manufacturer, and importer — " +
      "from the locally-ingested ATF listing. Filters are column→substring matches (see atf_dataset_info for the " +
      "column names, e.g. state, license type, business name).\n\n" +
      "ATF has no query API and serves rotating monthly files, so this reads a file you ingested deliberately " +
      `(from ${FFL_LISTING_PAGE}). If not yet ingested, this returns instructions. Needs Node >= 22.5.`,
    annotations: { title: "ATF: Federal Firearms Licensees", readOnlyHint: true },
    parameters: z.object({
      filters: z.record(z.string(), z.string()).optional()
        .describe("Column→substring filters, e.g. { PremiseState: 'CO', LicenseType: '01' }. Use atf_dataset_info for columns."),
      limit: z.number().int().max(200).optional().describe("Max rows (default 25)."),
    }),
    execute: async ({ filters, limit }) => {
      try {
        const { rows, total } = await searchFfls({ filters, limit });
        if (!rows.length) return emptyResponse("No FFLs match those filters.");
        return tableResponse(`ATF FFLs: ${total.toLocaleString()} match, showing ${rows.length}`, {
          rows, total, meta: { source: "ATF FFL listing (local ingest)" },
        });
      } catch (e) {
        return emptyResponse(e instanceof Error ? e.message : String(e));
      }
    },
  },

  {
    name: "atf_dataset_info",
    description:
      "Status of the locally-ingested ATF dataset — whether it has been ingested, the row count, the column names " +
      "(to use as filters in atf_ffls), the source file, and when it was built. Does not download anything.",
    annotations: { title: "ATF: Dataset Status", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      const summary = info.ingested
        ? `ATF local dataset: ${info.rowCount.toLocaleString()} rows (built ${info.builtAt})`
        : `ATF data not yet ingested — run ingest('<file url>') from the atf SDK (files at ${FFL_LISTING_PAGE}).`;
      return recordResponse(summary, info, { source: "ATF" });
    },
  },
];
