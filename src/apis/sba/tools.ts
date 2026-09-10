/**
 * sba MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchLoans, datasetInfo } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sba_loans",
    description:
      "Search SBA 7(a) and 504 small-business loans (the SBA FOIA loan-level data) by borrower, lender, state, " +
      "program, or fiscal year. Returns matching loans (borrower, lender, approved amount, NAICS industry, status, " +
      "jobs supported) plus the total count and total dollars approved.\n\n" +
      "The small-business-lending complement to USAspending (contracts/grants) and HMDA (mortgages). Data is " +
      "downloaded from SBA and indexed locally on first use (recent-era files; needs Node >= 22.5). No API key.",
    annotations: { title: "SBA: 7(a) & 504 Loans", readOnlyHint: true },
    parameters: z.object({
      borrower: z.string().optional().describe("Borrower name (partial)."),
      lender: z.string().optional().describe("Lending bank or CDC name (partial)."),
      state: z.string().optional().describe("Two-letter borrower state, e.g. 'CO'."),
      program: z.enum(["7(a)", "504"]).optional().describe("Loan program."),
      fiscal_year: z.union([z.number(), z.string()]).optional().describe("Approval fiscal year, e.g. 2023."),
      limit: z.number().int().max(200).optional().describe("Max loans (default 25, ordered by amount)."),
    }),
    execute: async ({ borrower, lender, state, program, fiscal_year, limit }) => {
      if (!borrower && !lender && !state && !program && !fiscal_year) {
        return emptyResponse("Provide at least one filter (borrower, lender, state, program, or fiscal_year).");
      }
      const { rows, total, totalApprovedUsd } = await searchLoans({
        borrower, lender, state, program, fiscalYear: fiscal_year, limit,
      });
      if (!rows.length) return emptyResponse("No SBA loans match those filters.");
      return tableResponse(
        `SBA loans: ${total.toLocaleString()} match — $${Math.round(totalApprovedUsd).toLocaleString()} approved; showing ${rows.length}`,
        {
          rows,
          columns: ["borrower", "location", "program", "lender", "grossApproval", "approvalFY", "loanStatus", "jobsSupported"],
          total,
          meta: { source: "SBA 7(a)/504 FOIA data (local ingest)", totalApprovedUsd: Math.round(totalApprovedUsd) },
        },
      );
    },
  },

  {
    name: "sba_dataset_info",
    description:
      "Status of the locally-ingested SBA loan dataset — row count, the source files ingested, and when the local " +
      "database was built. Triggers the initial download/index if not yet present. No API key.",
    annotations: { title: "SBA: Dataset Status", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      return recordResponse(
        `SBA local dataset: ${info.rowCount.toLocaleString()} loans (built ${info.builtAt || "?"})`,
        info,
        { source: "SBA 7(a)/504 FOIA data" },
      );
    },
  },
];
