import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchSdn } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ofac_search",
    description:
      "Screen a person or company name against the U.S. Treasury OFAC Specially Designated Nationals (SDN) sanctions list. Returns matching sanctioned entities with the program(s) that designated them. First call fetches the ~6MB list (cached); queries are instant. Keyless.",
    annotations: { title: "OFAC: SDN Sanctions Search", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      name: z.string().describe("Person or company name (substring, case-insensitive) — e.g. 'Rosneft', 'Maduro', 'Wagner'"),
      limit: z.number().int().max(100).default(25).describe("Max matches (default 25)"),
    }),
    execute: async (args) => {
      const { matches, total, listSize } = await searchSdn(args.name, args.limit);
      if (!matches.length) {
        return emptyResponse(`No SDN match for "${args.name}" (screened against ${listSize.toLocaleString()} designations). No match is not a clearance — verify names, aliases, and the Consolidated list at ofac.treasury.gov.`);
      }
      return listResponse(
        `${total} OFAC SDN designation(s) match "${args.name}", showing ${matches.length}`,
        {
          items: matches.map(m => ({
            name: m.name,
            type: m.type,
            programs: m.programs.length ? m.programs.join(", ") : undefined,
            title: m.title ?? undefined,
            remarks: m.remarks ?? undefined,
            sdnId: m.id,
          })),
          total,
        },
      );
    },
  },
];
