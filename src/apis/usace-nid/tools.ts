/**
 * usace-nid MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchDams, getDam } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "dams_search",
    description:
      "Search the National Inventory of Dams (U.S. Army Corps of Engineers) by free text — a dam name, city, or " +
      "'County, State'. Returns matching dams with their federal ID for use with dams_detail.\n\n" +
      "Example: 'Pueblo, Colorado' or 'Hoover Dam'. Keyless.",
    annotations: { title: "Dams (NID): Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Dam name, city, or 'County, State' (e.g. 'Pueblo, Colorado')."),
      limit: z.number().int().max(50).optional().describe("Max matches (default 25)."),
    }),
    execute: async ({ query, limit }) => {
      const matches = await searchDams(query, limit);
      if (!matches.length) return emptyResponse(`No dams match '${query}'.`);
      return tableResponse(`National Inventory of Dams: ${matches.length} match(es) for '${query}'`, {
        rows: matches,
        columns: ["name", "countyState", "federalId"],
        meta: { source: "USACE National Inventory of Dams", note: "Use federalId with dams_detail." },
      });
    },
  },

  {
    name: "dams_detail",
    description:
      "Full inventory record for one dam from the National Inventory of Dams, by federal ID (e.g. 'CO00299' — " +
      "Pueblo Dam). Returns location, river, owner, year completed, height, storage capacity, max discharge, " +
      "downstream drainage area, condition assessment, and inspection/emergency-action-plan dates.\n\n" +
      "Get a federal ID from dams_search. Pairs with FEMA flood declarations and USGS streamflow. Keyless.",
    annotations: { title: "Dams (NID): Detail", readOnlyHint: true },
    parameters: z.object({
      federal_id: z.string().describe("Dam federal ID, e.g. 'CO00299'."),
    }),
    execute: async ({ federal_id }) => {
      const dam = await getDam(federal_id);
      if (!dam) return emptyResponse(`No dam found with federal ID '${federal_id}'.`);
      return recordResponse(
        `${dam.name} — ${dam.river ?? "?"}, ${dam.county ?? "?"} County, ${dam.state ?? "?"}` +
          `${dam.heightFt != null ? ` · ${dam.heightFt} ft` : ""}${dam.condition ? ` · condition: ${dam.condition}` : ""}`,
        dam,
        { source: "USACE National Inventory of Dams", units: { heightFt: "feet", storage: "acre-feet", maxDischargeCfs: "ft³/s", drainageAreaSqMi: "square miles" } },
      );
    },
  },
];
