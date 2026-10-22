/**
 * eoir-immigration MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCases, datasetInfo } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "eoir_cases",
    description:
      "Query the U.S. immigration-court caseload from the EOIR FOIA case-data release — the government's own record " +
      "of removal and other proceedings (the data TRAC is built on). Filter on any column present in the ingested " +
      "case table (see eoir_dataset_info for the column list); filters are substring matches.\n\n" +
      "This source has no query API: it is a multi-gigabyte bulk release ingested locally on a deliberate first run " +
      "(needs Node >= 22.5). If it hasn't been ingested yet, this returns instructions.",
    annotations: { title: "EOIR: Immigration-Court Cases", readOnlyHint: true },
    parameters: z.object({
      filters: z.record(z.string(), z.string()).optional()
        .describe("Column→substring filters, e.g. { NAT: 'MEX', CASE_TYPE: 'RMV' }. Use eoir_dataset_info for column names."),
      limit: z.number().int().max(200).optional().describe("Max rows (default 25)."),
    }),
    execute: async ({ filters, limit }) => {
      try {
        const { rows, total } = await searchCases({ filters, limit });
        if (!rows.length) return emptyResponse("No immigration-court cases match those filters.");
        return tableResponse(`EOIR cases: ${total.toLocaleString()} match, showing ${rows.length}`, {
          rows, total, meta: { source: "EOIR FOIA case data (local ingest)" },
        });
      } catch (e) {
        return emptyResponse(e instanceof Error ? e.message : String(e));
      }
    },
  },

  {
    name: "eoir_dataset_info",
    description:
      "Status of the locally-ingested EOIR immigration-court dataset — whether it has been ingested, the row count, " +
      "the case table's column names (to use as filters in eoir_cases), and when it was built. Does not trigger the " +
      "large download.",
    annotations: { title: "EOIR: Dataset Status", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      const summary = info.ingested
        ? `EOIR local dataset: ${info.rowCount.toLocaleString()} cases from ${info.table} (built ${info.builtAt})`
        : "EOIR data not yet ingested — run ingest() from the eoir-immigration SDK (multi-GB, Node >= 22.5).";
      return recordResponse(summary, info, { source: "EOIR FOIA case data" });
    },
  },
];
