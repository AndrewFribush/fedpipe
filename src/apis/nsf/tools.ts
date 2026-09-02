import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchAwards, getAward } from "./sdk.js";
import type { NsfAward } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

const fmtUsd = (n: number | null) => (n == null ? undefined : `$${n.toLocaleString()}`);

function brief(a: NsfAward): Record<string, unknown> {
  return {
    id: a.id,
    title: a.title,
    awardee: a.awardee ?? undefined,
    pi: a.principalInvestigator ?? undefined,
    amount: fmtUsd(a.amount),
    startDate: a.startDate ?? undefined,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "nsf_search_awards",
    description:
      "Search National Science Foundation research grants by keyword, awardee institution, or principal investigator name. Returns award IDs, funding amounts, and dates. Keyless.",
    annotations: { title: "NSF: Search Awards", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Free-text search of title/abstract — e.g. 'quantum computing'"),
      awardee: z.string().optional().describe("Grantee institution name — e.g. 'Massachusetts Institute of Technology'"),
      pi_name: z.string().optional().describe("Principal investigator name"),
      state: z.string().optional().describe("2-letter awardee state"),
      limit: z.number().int().max(25).default(20).describe("Max results (default 20, API cap 25)"),
    }),
    execute: async (args) => {
      if (!args.keyword && !args.awardee && !args.pi_name && !args.state) {
        return emptyResponse("Provide at least one of: keyword, awardee, pi_name, or state.");
      }
      const rows = await searchAwards({ keyword: args.keyword, awardee: args.awardee, piName: args.pi_name, state: args.state, perPage: args.limit });
      if (!rows.length) return emptyResponse("No NSF awards match the criteria.");
      return listResponse(`${rows.length} NSF award(s) match`, { items: rows.map(brief), total: rows.length });
    },
  },
  {
    name: "nsf_award",
    description: "Get one NSF award's full detail by award ID, including the project abstract.",
    annotations: { title: "NSF: Award Detail", readOnlyHint: true },
    parameters: z.object({
      award_id: z.string().describe("NSF award ID — e.g. '2138259'"),
    }),
    execute: async (args) => {
      const a = await getAward(args.award_id);
      if (!a) return emptyResponse(`No NSF award ${args.award_id}.`);
      return recordResponse(
        `${a.title} — ${a.awardee ?? "?"}${a.amount != null ? `, ${fmtUsd(a.amount)}` : ""}`,
        { ...a, amount: fmtUsd(a.amount) },
      );
    },
  },
];
