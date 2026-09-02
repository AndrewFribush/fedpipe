import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchClaims } from "./sdk.js";
import type { NfipClaim } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

const fmtUsd = (n: number | null) => (n == null ? undefined : `$${n.toLocaleString()}`);

function brief(c: NfipClaim): Record<string, unknown> {
  return {
    dateOfLoss: c.dateOfLoss ?? undefined,
    location: [c.city, c.state].filter(Boolean).join(", ") || undefined,
    zip: c.zip ?? undefined,
    floodZone: c.floodZone ?? undefined,
    buildingPaid: fmtUsd(c.buildingPaid),
    contentsPaid: fmtUsd(c.contentsPaid),
    totalPaid: fmtUsd(c.totalPaid),
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "nfip_claims",
    description:
      "Query FEMA National Flood Insurance Program (NFIP) claims — flood-insurance payouts by state, year of loss, and flood zone, with building/contents amounts paid. Complements fema_disaster_declarations with the insured-loss dollars. Keyless; claims number in the millions, so filter by state and/or year.",
    annotations: { title: "NFIP: Flood Insurance Claims", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("2-letter state — e.g. 'LA', 'FL'"),
      year: z.number().int().optional().describe("Year of loss — e.g. 2021"),
      flood_zone: z.string().optional().describe("Rated flood zone — e.g. 'AE', 'VE', 'X'"),
      limit: z.number().int().max(100).default(20).describe("Max claims (default 20), newest loss first"),
    }),
    execute: async (args) => {
      if (!args.state && !args.year && !args.flood_zone) {
        return emptyResponse("Provide at least one of: state, year, or flood_zone (the full claims set is millions of records).");
      }
      const { claims, total } = await searchClaims({ state: args.state, year: args.year, floodZone: args.flood_zone, limit: args.limit });
      if (!claims.length) return emptyResponse("No NFIP claims match the criteria.");
      return listResponse(
        `${total.toLocaleString()} NFIP claim(s) match, showing ${claims.length} newest by date of loss (per-claim amounts below; not every claim was paid)`,
        { items: claims.map(brief), total },
      );
    },
  },
];
