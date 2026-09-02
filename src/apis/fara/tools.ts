import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchRegistrants } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fara_search",
    description:
      "Search active DOJ FARA registrants (agents representing foreign governments/principals in the U.S.) by person name or firm name. The foreign-influence transparency record — complements domestic lobbying in senate-lobbying. Keyless.",
    annotations: { title: "FARA: Search Registrants", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Registrant person or firm name (substring, case-insensitive) — e.g. 'Ballard', 'BGR', 'Podesta'"),
      limit: z.number().int().max(100).default(25).describe("Max results (default 25)"),
    }),
    execute: async (args) => {
      const rows = await searchRegistrants(args.name);
      if (!rows.length) return emptyResponse(`No active FARA registrant matches "${args.name}". This covers currently active registrants only.`);
      return listResponse(
        `${rows.length} active FARA registrant(s) match "${args.name}"`,
        {
          items: rows.slice(0, args.limit).map(r => ({
            registrationNumber: r.registrationNumber,
            name: r.name,
            firm: r.businessName ?? undefined,
            location: r.location ?? undefined,
            registered: r.registrationDate ?? undefined,
          })),
          total: rows.length,
        },
      );
    },
  },
];
