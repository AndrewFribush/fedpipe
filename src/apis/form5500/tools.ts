/**
 * DOL Form 5500 MCP tools (bulk-ingest — see sdk.ts).
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchPlans, getPlansByEin, datasetInfo, DEFAULT_YEAR } from "./sdk.js";
import type { PlanRow } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function brief(p: PlanRow): Record<string, unknown> {
  return {
    sponsor: p.sponsor,
    ein: p.ein,
    plan: p.planName,
    planNumber: p.planNumber,
    type: p.planType,
    activeParticipants: p.activeParticipants,
    location: p.location ?? undefined,
    planYear: p.planYear,
    ackId: p.ackId,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "form5500_search",
    description:
      "Search DOL Form 5500 benefit-plan filings by sponsor/plan name, sponsor EIN, or state. Finds a company's 401(k), pension, and health/welfare plans with participant counts. First call downloads and indexes DOL's ~29MB annual dataset (~30-60s once), then queries are instant.",
    annotations: { title: "Form 5500: Search Plans", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Sponsor or plan name (substring, case-insensitive) — e.g. 'Boeing', 'Google', 'United Way'"),
      ein: z.string().optional().describe("Sponsor EIN (9 digits, dashes ok) — exact match"),
      state: z.string().optional().describe("2-letter sponsor state — e.g. 'WA'"),
      year: z.number().int().optional().describe(`Plan year dataset (default ${DEFAULT_YEAR}; 2023-2025 available)`),
      limit: z.number().int().max(100).default(20).describe("Max results (default 20), ordered by active participants"),
    }),
    execute: async (args) => {
      if (!args.name && !args.ein && !args.state) {
        return emptyResponse("Provide at least one of: name, ein, or state.");
      }
      const { rows, total, year } = await searchPlans(args);
      if (!rows.length) {
        return emptyResponse(`No Form 5500 (${year}) filings match. Names are UPPERCASE as filed; try a shorter fragment or a different year.`);
      }
      return listResponse(
        `${total.toLocaleString()} Form 5500 (${year}) filing(s) match, showing ${rows.length} by participant count`,
        { items: rows.map(brief), total },
      );
    },
  },
  {
    name: "form5500_sponsor",
    description:
      "All Form 5500 plans filed by one sponsor, by EIN — a company's full benefit-plan footprint for a year (retirement + welfare plans, participant totals). Use the EIN from form5500_search, or a company's EIN from resolve_entity/SEC filings.",
    annotations: { title: "Form 5500: Sponsor Plans", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      ein: z.string().describe("Sponsor EIN (9 digits, dashes ok)"),
      year: z.number().int().optional().describe(`Plan year dataset (default ${DEFAULT_YEAR})`),
    }),
    execute: async (args) => {
      const { rows, year } = await getPlansByEin(args.ein, args.year);
      if (!rows.length) {
        return emptyResponse(`No Form 5500 (${year}) plans for EIN ${args.ein}. This dataset covers larger plans (100+ participants) and DFEs; small plans file 5500-SF (a separate dataset).`);
      }
      const totalActive = rows.reduce((n, r) => n + (r.activeParticipants ?? 0), 0);
      return recordResponse(
        `${rows[0].sponsor} (EIN ${args.ein}): ${rows.length} plan(s) in ${year}, ${totalActive.toLocaleString()} total active participants`,
        {
          sponsor: rows[0].sponsor,
          ein: args.ein,
          year,
          planCount: rows.length,
          totalActiveParticipants: totalActive,
          plans: rows.map(brief),
        },
      );
    },
  },
  {
    name: "form5500_dataset_info",
    description:
      "Report the local Form 5500 dataset status for a year: row count, DOL source date, and when it was last indexed. Triggers the one-time download/index if not yet built.",
    annotations: { title: "Form 5500: Dataset Info", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      year: z.number().int().optional().describe(`Plan year (default ${DEFAULT_YEAR})`),
    }),
    execute: async (args) => {
      const info = await datasetInfo(args.year);
      return recordResponse(
        `Form 5500 ${info.year}: ${info.rowCount.toLocaleString()} filings indexed locally (DOL source dated ${info.sourceLastModified || "unknown"})`,
        info as unknown as Record<string, unknown>,
      );
    },
  },
];
