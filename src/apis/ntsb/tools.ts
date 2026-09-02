/**
 * NTSB Aviation Accident MCP tools (bulk-ingest — see sdk.ts).
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { accidentsByNNumber, searchAccidents, datasetInfo } from "./sdk.js";
import type { Accident } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function brief(a: Accident): Record<string, unknown> {
  return {
    ntsbNo: a.ntsbNo,
    date: a.date,
    type: a.type,
    aircraft: [a.make, a.model].filter(Boolean).join(" ") || undefined,
    nNumber: a.nNumber ?? undefined,
    injury: a.injuryLevel,
    fatalities: a.fatalities ?? undefined,
    damage: a.damage,
    location: a.location ?? undefined,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "ntsb_aircraft_history",
    description:
      "NTSB accident/incident history for one aircraft by N-number (tail number): every recorded event with date, injury severity, fatalities, and damage. Pairs with faa_aircraft (current registration) for the same tail number. First call downloads and indexes the NTSB dataset (~1-2 min once).",
    annotations: { title: "NTSB: Aircraft Accident History", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      n_number: z.string().describe("Tail number, with or without the leading 'N' — e.g. 'N530NA'"),
    }),
    execute: async (args) => {
      const rows = await accidentsByNNumber(args.n_number);
      if (!rows.length) return emptyResponse(`No NTSB events for ${args.n_number.toUpperCase()} in the 2008-present extract. Older events are in separate NTSB archives.`);
      const fatal = rows.filter(r => r.injuryLevel === "fatal").length;
      return listResponse(
        `${rows.length} NTSB event(s) for ${rows[0].nNumber}${fatal ? `, ${fatal} fatal` : ""}`,
        { items: rows.map(brief), total: rows.length },
      );
    },
  },
  {
    name: "ntsb_search",
    description:
      "Search NTSB aviation accidents/incidents by aircraft make/model, state, year, or fatal-only. Find the safety record of an aircraft type or accidents in a place/time. Ordered newest first.",
    annotations: { title: "NTSB: Search Accidents", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      make: z.string().optional().describe("Aircraft make (substring) — e.g. 'Cessna', 'Boeing', 'Robinson'"),
      model: z.string().optional().describe("Aircraft model (substring) — e.g. '172', 'R44'"),
      state: z.string().optional().describe("2-letter state — e.g. 'AK'"),
      year: z.number().int().optional().describe("Event year — e.g. 2023"),
      fatal_only: z.boolean().optional().describe("Only events with a fatal highest-injury level"),
      limit: z.number().int().max(100).default(20).describe("Max results (default 20)"),
    }),
    execute: async (args) => {
      if (!args.make && !args.model && !args.state && !args.year && !args.fatal_only) {
        return emptyResponse("Provide at least one of: make, model, state, year, or fatal_only.");
      }
      const { rows, total } = await searchAccidents({ make: args.make, model: args.model, state: args.state, year: args.year, fatalOnly: args.fatal_only, limit: args.limit });
      if (!rows.length) return emptyResponse("No NTSB events match the criteria (2008-present extract).");
      return listResponse(
        `${total.toLocaleString()} NTSB event(s) match, showing ${rows.length} (newest first)`,
        { items: rows.map(brief), total },
      );
    },
  },
  {
    name: "ntsb_dataset_info",
    description:
      "Report the local NTSB dataset status: event-aircraft row count, NTSB source date, and when it was last indexed. Triggers the one-time download/index if not yet built.",
    annotations: { title: "NTSB: Dataset Info", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await datasetInfo();
      return recordResponse(
        `NTSB aviation: ${info.rowCount.toLocaleString()} event-aircraft records indexed locally (NTSB source dated ${info.sourceLastModified || "unknown"})`,
        info as unknown as Record<string, unknown>,
      );
    },
  },
];
