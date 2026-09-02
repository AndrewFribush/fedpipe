/**
 * IRS Form 990 nonprofit MCP tools (ProPublica Nonprofit Explorer).
 *
 * API: https://projects.propublica.org/nonprofits/api
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchNonprofits, getNonprofit } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

const SUBSECTIONS: Record<number, string> = {
  3: "501(c)(3) charity",
  4: "501(c)(4) social welfare",
  5: "501(c)(5) labor/agricultural",
  6: "501(c)(6) trade association",
  7: "501(c)(7) social club",
};

const fmtUsd = (n: number | null) => (n == null ? null : `$${n.toLocaleString()}`);

export const tools: Tool<any, any>[] = [
  {
    name: "nonprofits_search",
    description:
      "Search 1.8M+ U.S. tax-exempt organizations (IRS Form 990 filers) by name: charities, foundations, hospital systems, universities, trade associations, and politically active 501(c)(4)s. Returns EINs for nonprofit_financials. Source: IRS bulk data via ProPublica Nonprofit Explorer.",
    annotations: { title: "Nonprofits: Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Organization name — e.g. 'Red Cross', 'Gates Foundation', 'NRA'"),
      state: z.string().optional().describe("2-letter state filter — e.g. 'NY'"),
      subsection: z.number().int().optional().describe("IRS subsection: 3 = 501(c)(3) charity, 4 = 501(c)(4) social welfare (politically active), 6 = trade association"),
      limit: z.number().int().max(25).default(10).describe("Max results (default 10; API pages at 25)"),
    }),
    execute: async (args) => {
      const res = await searchNonprofits({ query: args.query, state: args.state, subsection: args.subsection });
      if (!res.hits.length) {
        return emptyResponse(`No tax-exempt orgs match "${args.query}"${args.state ? ` in ${args.state}` : ""}. Names are as registered with the IRS — try a shorter form.`);
      }
      return listResponse(
        `${res.total.toLocaleString()} org(s) match "${args.query}", showing ${Math.min(args.limit, res.hits.length)}`,
        {
          items: res.hits.slice(0, args.limit).map(h => ({
            ein: h.einFormatted,
            name: h.name,
            location: [h.city, h.state].filter(Boolean).join(", ") || undefined,
            type: h.subsection != null ? (SUBSECTIONS[h.subsection] ?? `501(c)(${h.subsection})`) : undefined,
            ntee: h.nteeCode ?? undefined,
          })),
          total: res.total,
        },
      );
    },
  },
  {
    name: "nonprofit_financials",
    description:
      "Multi-year Form 990 financials for one nonprofit by EIN: revenue, expenses, assets, liabilities, contributions vs program revenue, officer compensation share, and links to the filed 990 PDFs. Small orgs filing 990-N postcards have no financial detail.",
    annotations: { title: "Nonprofits: 990 Financials", readOnlyHint: true },
    parameters: z.object({
      ein: z.string().describe("9-digit EIN, with or without dash — e.g. '53-0196605' (from nonprofits_search)"),
      years: z.number().int().max(20).default(5).describe("How many most-recent filing years to return (default 5)"),
    }),
    execute: async (args) => {
      const org = await getNonprofit(args.ein);
      if (!org) return emptyResponse(`No IRS record for EIN ${args.ein}. Find the right EIN with nonprofits_search.`);
      const filings = org.filings.slice(0, args.years);
      const latest = filings[0];
      const type = org.subsection != null ? (SUBSECTIONS[org.subsection] ?? `501(c)(${org.subsection})`) : "unknown type";
      return recordResponse(
        `${org.name} (${type}, EIN ${org.ein})` +
          (latest?.totalRevenue != null
            ? ` — FY${latest.year}: revenue ${fmtUsd(latest.totalRevenue)}, expenses ${fmtUsd(latest.totalExpenses)}, assets ${fmtUsd(latest.totalAssets)}`
            : filings.length ? ` — ${filings.length} filing(s), no e-file financial extract (likely 990-N/paper filer)` : " — no filings with data on record"),
        {
          ein: org.ein,
          name: org.name,
          location: [org.city, org.state].filter(Boolean).join(", ") || null,
          type,
          nteeCode: org.nteeCode,
          rulingDate: org.rulingDate,
          filings: filings.map(f => ({
            year: f.year,
            form: f.formType,
            revenue: fmtUsd(f.totalRevenue),
            expenses: fmtUsd(f.totalExpenses),
            assets: fmtUsd(f.totalAssets),
            liabilities: fmtUsd(f.totalLiabilities),
            contributions: fmtUsd(f.contributions),
            programRevenue: fmtUsd(f.programRevenue),
            officerCompPct: f.officerCompPct,
            pdf: f.pdfUrl,
          })),
        },
      );
    },
  },
];
