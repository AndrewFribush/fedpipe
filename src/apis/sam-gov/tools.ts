/**
 * sam-gov MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchEntities, getExclusions, searchOpportunities } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sam_entity_search",
    description:
      "Search entities registered in SAM.gov to do business with the federal government — by legal business name " +
      "or Unique Entity ID (UEI). Returns UEI, CAGE code, legal/DBA name, registration status & expiration, and " +
      "location. The registry that resolves a company to its federal identifiers (pairs with USAspending).\n\n" +
      "Requires SAM_API_KEY (free, from a SAM.gov account).",
    annotations: { title: "SAM.gov: Entity Search", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Legal business name (partial), e.g. 'Pfizer'."),
      uei: z.string().optional().describe("Unique Entity ID (12-char SAM UEI)."),
      limit: z.number().int().max(100).optional().describe("Max entities (default 10)."),
    }),
    execute: async ({ name, uei, limit }) => {
      if (!name && !uei) return emptyResponse("Provide a name or uei.");
      const { total, entities } = await searchEntities({ name, uei, limit });
      if (!entities.length) return emptyResponse("No registered entities match.");
      return tableResponse(`SAM.gov: ${total} registered entit(ies), showing ${entities.length}`, {
        rows: entities,
        columns: ["name", "uei", "cage", "status", "state", "registrationExpiration"],
        total,
        meta: { source: "SAM.gov Entity Management API" },
      });
    },
  },

  {
    name: "sam_exclusions",
    description:
      "Search the SAM.gov exclusions (debarment) list — entities and individuals barred or suspended from receiving " +
      "federal contracts, grants, or benefits. The compliance screen to run against a company before treating it as " +
      "an eligible awardee.\n\nRequires SAM_API_KEY (free).",
    annotations: { title: "SAM.gov: Exclusions (Debarment)", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Excluded entity or person name (partial)."),
      limit: z.number().int().max(100).optional().describe("Max records (default 10)."),
    }),
    execute: async ({ name, limit }) => {
      const { total, exclusions } = await getExclusions({ name, limit });
      if (!exclusions.length) return emptyResponse(`No exclusions match '${name}'.`);
      return tableResponse(`SAM.gov exclusions: ${total} match(es) for '${name}'`, {
        rows: exclusions,
        columns: ["name", "type", "agency", "activeDate", "terminationDate"],
        total,
        meta: { source: "SAM.gov Exclusions API" },
      });
    },
  },

  {
    name: "sam_opportunities",
    description:
      "Search active federal contract opportunities (solicitations) on SAM.gov — the successor to FedBizOpps. Filter " +
      "by title and posted-date window. Returns title, solicitation number, department, NAICS, and response deadline.\n\n" +
      "Requires SAM_API_KEY (free). Dates are MM/DD/YYYY and the window is required.",
    annotations: { title: "SAM.gov: Contract Opportunities", readOnlyHint: true },
    parameters: z.object({
      title: z.string().optional().describe("Keyword over the opportunity title."),
      posted_from: z.string().describe("Start of posted window, MM/DD/YYYY."),
      posted_to: z.string().describe("End of posted window, MM/DD/YYYY."),
      limit: z.number().int().max(100).optional().describe("Max opportunities (default 20)."),
    }),
    execute: async ({ title, posted_from, posted_to, limit }) => {
      const { total, opportunities } = await searchOpportunities({ title, postedFrom: posted_from, postedTo: posted_to, limit });
      if (!opportunities.length) return emptyResponse("No opportunities match those filters.");
      return tableResponse(`SAM.gov: ${total} opportunit(ies), showing ${opportunities.length}`, {
        rows: opportunities,
        columns: ["title", "department", "type", "naics", "postedDate", "responseDeadline"],
        total,
        meta: { source: "SAM.gov Opportunities API" },
      });
    },
  },
];
