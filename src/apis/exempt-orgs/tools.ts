/**
 * IRS Exempt Organizations (EO BMF) MCP tools (bulk-ingest — see sdk.ts).
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchOrgs, getOrg, datasetInfo, SUBSECTION } from "./sdk.js";
import type { ExemptOrg } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";
import { describeEnum } from "../../shared/enum-utils.js";

const fmtUsd = (n: number | null) => (n == null ? undefined : `$${n.toLocaleString()}`);

function brief(o: ExemptOrg): Record<string, unknown> {
  return {
    ein: o.ein,
    name: o.name,
    type: o.subsection,
    location: o.location ?? undefined,
    ntee: o.nteeCode ?? undefined,
    rulingYear: o.rulingYear ?? undefined,
    revenue: fmtUsd(o.revenue),
    assets: fmtUsd(o.assets),
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "eo_search",
    description:
      "Search the IRS registry of tax-exempt organizations (~1.8M) by name — every recognized 501(c) org, whether or not it files a Form 990. Filter by state, subsection (501(c)(3)/(4)/(6)/…), or NTEE mission code. Returns EINs for eo_organization / nonprofit_financials. First call downloads and indexes the IRS monthly extract (~30s once).",
    annotations: { title: "Exempt Orgs: Search Registry", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Organization name (substring, case-insensitive) — e.g. 'Sierra Club', 'Gates Foundation'"),
      state: z.string().optional().describe("2-letter state filter — e.g. 'CA'"),
      subsection: z.string().optional().describe(`IRS subsection code: ${describeEnum(SUBSECTION)}`),
      ntee: z.string().optional().describe("NTEE code prefix — e.g. 'A' (arts), 'E' (health), 'B25' (secondary schools)"),
      limit: z.number().int().max(100).default(20).describe("Max results (default 20), ordered by revenue"),
    }),
    execute: async (args) => {
      if (!args.name && !args.state && !args.subsection && !args.ntee) {
        return emptyResponse("Provide at least one of: name, state, subsection, or ntee.");
      }
      const { rows, total } = await searchOrgs({ name: args.name, state: args.state, subsection: args.subsection, nteePrefix: args.ntee, limit: args.limit });
      if (!rows.length) return emptyResponse("No exempt organizations match. Names are UPPERCASE as filed; try a shorter fragment.");
      return listResponse(
        `${total.toLocaleString()} exempt org(s) match, showing ${rows.length} by revenue`,
        { items: rows.map(brief), total },
      );
    },
  },
  {
    name: "eo_organization",
    description:
      "Get the IRS registry record for one tax-exempt organization by EIN: legal name, subsection/type, NTEE mission code, IRS ruling year, status, and basic assets/income/revenue. For detailed 990 line items, use nonprofit_financials with the same EIN.",
    annotations: { title: "Exempt Orgs: Organization by EIN", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      ein: z.string().describe("9-digit EIN, with or without dash — e.g. '94-3242767'"),
    }),
    execute: async (args) => {
      const o = await getOrg(args.ein);
      if (!o) return emptyResponse(`No exempt-org registry record for EIN ${args.ein}. It may not be tax-exempt, or the EIN is wrong — try eo_search by name.`);
      return recordResponse(
        `${o.name} — ${o.subsection}, EIN ${o.ein}${o.rulingYear ? `, IRS ruling ${o.rulingYear}` : ""}${o.revenue != null ? `, revenue ${fmtUsd(o.revenue)}` : ""}`,
        { ...o, revenue: fmtUsd(o.revenue), assets: fmtUsd(o.assets), income: fmtUsd(o.income), next: `nonprofit_financials(ein='${o.ein}')` },
      );
    },
  },
  {
    name: "eo_dataset_info",
    description:
      "Report the local IRS EO BMF dataset status: org count, IRS source date, and when it was last indexed. Triggers the one-time download/index if not yet built.",
    annotations: { title: "Exempt Orgs: Dataset Info", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      return recordResponse(
        `IRS EO BMF: ${info.rowCount.toLocaleString()} exempt orgs indexed locally (IRS source dated ${info.sourceLastModified || "unknown"})`,
        info as unknown as Record<string, unknown>,
      );
    },
  },
];
