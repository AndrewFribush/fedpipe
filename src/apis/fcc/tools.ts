import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchFilings } from "./sdk.js";
import type { EcfsFiling } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

function brief(f: EcfsFiling): Record<string, unknown> {
  return {
    id: f.id,
    proceedings: f.proceedings.length ? f.proceedings.join(", ") : undefined,
    filers: f.filers.length ? f.filers.join(", ") : undefined,
    type: f.type ?? undefined,
    dateReceived: f.dateReceived ?? undefined,
    excerpt: f.text ?? undefined,
    documents: f.documentUrls.length || undefined,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "fcc_search_filings",
    description:
      "Search FCC ECFS public comments and filings by proceeding docket (e.g. '17-108'), filer name, or keyword. Find who is weighing in on FCC rulemakings on spectrum, broadband, net neutrality, and media. Newest first.",
    annotations: { title: "FCC: Search Filings", readOnlyHint: true },
    parameters: z.object({
      proceeding: z.string().optional().describe("Docket number — e.g. '17-108', '23-320'"),
      filer: z.string().optional().describe("Filer/commenter name — e.g. 'Verizon', 'Public Knowledge'"),
      query: z.string().optional().describe("Full-text keyword search"),
      limit: z.number().int().max(50).default(15).describe("Max results (default 15)"),
    }),
    execute: async (args) => {
      if (!args.proceeding && !args.filer && !args.query) {
        return emptyResponse("Provide at least one of: proceeding, filer, or query.");
      }
      const rows = await searchFilings(args);
      if (!rows.length) return emptyResponse("No ECFS filings match the criteria.");
      return listResponse(`${rows.length} FCC filing(s) match, newest first`, { items: rows.map(brief), total: rows.length });
    },
  },
];
