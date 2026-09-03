/**
 * grid-disturbances MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchEvents, getSummary } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "grid_disturbances_search",
    description:
      "Search U.S. electric grid disturbance & emergency events (DOE OE-417) — physical/cyber attacks, " +
      "severe weather, equipment failures, fuel supply emergencies, and load shed, as mandatorily " +
      "reported by utilities. Filter by state, cause, NERC region, date, or demand loss.\n\n" +
      "Coverage: calendar-year 2023 (the ORNL gov dataset's current extent).",
    annotations: { title: "Grid Disturbances (OE-417): Search", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("State/area substring, e.g. 'Texas', 'California'."),
      event_type: z.string().optional().describe("Cause substring, e.g. 'Vandalism', 'Severe Weather', 'Cyber', 'System Operations', 'Physical Attack'."),
      nerc_region: z.string().optional().describe("NERC region, e.g. 'WECC', 'RF', 'SERC', 'TRE', 'MRO', 'NPCC'."),
      start_date: z.string().optional().describe("Earliest event date (YYYY-MM-DD)."),
      end_date: z.string().optional().describe("Latest event date (YYYY-MM-DD)."),
      min_demand_loss_mw: z.number().optional().describe("Only events with at least this demand loss (MW)."),
      limit: z.number().int().max(100).default(50).describe("Max events (default 50, max 100)."),
      offset: z.number().int().optional().describe("Pagination offset."),
    }),
    execute: async ({ state, event_type, nerc_region, start_date, end_date, min_demand_loss_mw, limit, offset }) => {
      const { total, events } = await searchEvents({
        state, eventType: event_type, nercRegion: nerc_region,
        startDate: start_date, endDate: end_date, minDemandLossMw: min_demand_loss_mw, limit, offset,
      });
      if (!events.length) return emptyResponse("No grid disturbance events match those filters.");
      return tableResponse(`${total} OE-417 events, showing ${events.length}`, {
        rows: events,
        columns: ["date", "area", "event_type", "nerc_region", "demand_loss_mw", "customers_affected"],
      });
    },
  },

  {
    name: "grid_disturbances_summary",
    description:
      "Summarize U.S. grid disturbance events (DOE OE-417): counts broken down by cause, NERC region, " +
      "and month, plus total demand loss (MW) and customers affected. Optionally scope to a state, cause, " +
      "region, or date range.\n\nCoverage: calendar-year 2023.",
    annotations: { title: "Grid Disturbances (OE-417): Summary", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("State/area substring to scope the summary."),
      event_type: z.string().optional().describe("Cause substring to scope the summary."),
      nerc_region: z.string().optional().describe("NERC region to scope the summary."),
      start_date: z.string().optional().describe("Earliest event date (YYYY-MM-DD)."),
      end_date: z.string().optional().describe("Latest event date (YYYY-MM-DD)."),
    }),
    execute: async ({ state, event_type, nerc_region, start_date, end_date }) => {
      const s = await getSummary({ state, eventType: event_type, nercRegion: nerc_region, startDate: start_date, endDate: end_date });
      if (!s.total) return emptyResponse("No grid disturbance events match those filters.");
      return recordResponse(
        `${s.total} OE-417 events — ${Math.round(s.totalDemandLossMw).toLocaleString()} MW demand lost, ${Math.round(s.totalCustomersAffected).toLocaleString()} customers affected`,
        {
          total_events: s.total,
          total_demand_loss_mw: Math.round(s.totalDemandLossMw),
          total_customers_affected: Math.round(s.totalCustomersAffected),
          by_cause: s.byCause,
          by_nerc_region: s.byNercRegion,
          by_month: s.byMonth,
        },
        { source: "DOE OE-417 via ORNL Open Energy Data Portal", coverage: "2023" },
      );
    },
  },
];
