/**
 * FAA Aircraft Registry MCP tools (bulk-ingest — see sdk.ts).
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getAircraft, searchByOwner, datasetInfo } from "./sdk.js";
import type { Aircraft } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function brief(a: Aircraft): Record<string, unknown> {
  return {
    nNumber: a.nNumber,
    owner: a.owner,
    make: a.make,
    model: a.model,
    year: a.yearManufactured ?? undefined,
    registrantType: a.registrantType,
    location: a.location ?? undefined,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "faa_aircraft",
    description:
      "Look up one U.S.-registered aircraft by N-number (tail number): its owner, make/model/year, registrant type, location, and Mode S code. First call downloads and indexes the FAA's ~80MB registry (~1-2 min once), then queries are instant.",
    annotations: { title: "FAA: Aircraft by N-Number", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      n_number: z.string().describe("Tail number, with or without the leading 'N' — e.g. 'N628TS', '12345'"),
    }),
    execute: async (args) => {
      const a = await getAircraft(args.n_number);
      if (!a) return emptyResponse(`No current FAA registration for ${args.n_number.toUpperCase()}. It may be deregistered (a separate dataset) or the number is unassigned.`);
      return recordResponse(
        `${a.nNumber}: ${a.make} ${a.model}${a.yearManufactured ? ` (${a.yearManufactured})` : ""} — ${a.owner} (${a.registrantType})${a.location ? `, ${a.location}` : ""}`,
        a as unknown as Record<string, unknown>,
      );
    },
  },
  {
    name: "faa_owner_fleet",
    description:
      "Find all aircraft registered to an owner by name (substring) — a company's or individual's fleet, with make/model and location. Owner names are UPPERCASE as filed with the FAA.",
    annotations: { title: "FAA: Aircraft by Owner", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      name: z.string().describe("Owner name (substring, case-insensitive) — e.g. 'NETJETS', 'GOOGLE', 'WALMART'"),
      state: z.string().optional().describe("2-letter registrant state filter — e.g. 'NV'"),
      limit: z.number().int().max(100).default(25).describe("Max results (default 25)"),
    }),
    execute: async (args) => {
      const { rows, total } = await searchByOwner(args);
      if (!rows.length) return emptyResponse(`No aircraft registered to an owner matching "${args.name}". Names are UPPERCASE as filed; try a shorter fragment.`);
      return listResponse(
        `${total.toLocaleString()} aircraft registered to owner(s) matching "${args.name}", showing ${rows.length}`,
        { items: rows.map(brief), total },
      );
    },
  },
  {
    name: "faa_dataset_info",
    description:
      "Report the local FAA registry dataset status: aircraft count, FAA source date, and when it was last indexed. Triggers the one-time download/index if not yet built.",
    annotations: { title: "FAA: Dataset Info", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      return recordResponse(
        `FAA registry: ${info.rowCount.toLocaleString()} aircraft indexed locally (FAA source dated ${info.sourceLastModified || "unknown"})`,
        info as unknown as Record<string, unknown>,
      );
    },
  },
];
