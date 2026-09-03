/**
 * nasa MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getPowerPoint, getNaturalEvents, POWER_PARAMETERS, EONET_CATEGORIES } from "./sdk.js";
import { timeseriesResponse, tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nasa_power_point",
    description:
      "Satellite-derived surface weather & solar-energy data for ANY latitude/longitude on Earth, from NASA POWER. " +
      "Daily, monthly, or long-term climatology: temperature, precipitation, wind (10 m and 50 m hub height), " +
      "humidity, and the solar irradiance (ALLSKY_SFC_SW_DWN) used to size solar installations.\n\n" +
      "Global and gridded — works anywhere, including places with no ground station. Use for climate baselines, " +
      "renewable-energy siting, and agriculture. Keyless.",
    annotations: { title: "NASA POWER: Weather & Solar at a Point", readOnlyHint: true },
    parameters: z.object({
      lat: z.number().describe("Latitude in decimal degrees (e.g. 38.25)."),
      lon: z.number().describe("Longitude in decimal degrees (e.g. -104.61)."),
      temporal: z.enum(["daily", "monthly", "climatology"]).optional()
        .describe("'daily' (default), 'monthly' means, or 'climatology' (long-term monthly averages, no dates needed)."),
      parameters: z.string().optional()
        .describe(`Comma-separated POWER codes. Default: T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN,WS10M. Options: ${Object.keys(POWER_PARAMETERS).join(", ")}`),
      community: z.enum(["AG", "RE", "SB"]).optional()
        .describe("User community: 'AG' agroclimatology (default), 'RE' renewable energy, 'SB' sustainable buildings."),
      start: z.string().optional().describe("Start — daily: YYYY-MM-DD; monthly: YYYY. Default: last 30 days (daily) / last 5 years (monthly)."),
      end: z.string().optional().describe("End — daily: YYYY-MM-DD; monthly: YYYY."),
    }),
    execute: async ({ lat, lon, temporal, parameters, community, start, end }) => {
      const r = await getPowerPoint({ lat, lon, temporal, parameters, community, start, end });
      if (!r.rows.length) return emptyResponse("NASA POWER returned no data for that point/range.");

      const paramKeys = Object.keys(r.rows[0]).filter(k => k !== "period");
      const meta = {
        source: "NASA POWER",
        temporal: r.temporal,
        latitude: r.latitude,
        longitude: r.longitude,
        elevation_m: r.elevationMeters,
        units: r.units,
      };

      // Daily/monthly with a single primary parameter reads well as a timeseries.
      if (r.temporal !== "climatology" && paramKeys.length >= 1) {
        return timeseriesResponse(
          `NASA POWER ${r.temporal} at ${r.latitude}, ${r.longitude}: ${r.rows.length} periods`,
          {
            rows: r.rows,
            dateKey: "period",
            valueKey: paramKeys[0],
            extraFields: paramKeys.slice(1),
            meta,
          },
        );
      }
      return tableResponse(
        `NASA POWER ${r.temporal} at ${r.latitude}, ${r.longitude}`,
        { rows: r.rows, columns: ["period", ...paramKeys], meta },
      );
    },
  },

  {
    name: "nasa_natural_events",
    description:
      "Live feed of ongoing natural events worldwide from NASA EONET — wildfires, severe storms, volcanoes, " +
      "floods, drought, sea/lake ice, landslides — each with coordinates, a date, and a magnitude where known " +
      "(e.g. fire size in acres, storm category). Sourced from IRWIN, InciWeb, the Smithsonian Global Volcanism " +
      "Program, and others.\n\n" +
      "Pairs with FEMA disaster declarations, NWS alerts, and USGS earthquakes for a hazard picture. Keyless.",
    annotations: { title: "NASA EONET: Natural Events", readOnlyHint: true },
    parameters: z.object({
      category: z.enum(EONET_CATEGORIES as unknown as [string, ...string[]]).optional()
        .describe("Event category, e.g. 'wildfires', 'severeStorms', 'volcanoes', 'floods'."),
      status: z.enum(["open", "closed"]).optional().describe("'open' = currently active (default), 'closed' = concluded."),
      days: z.number().int().optional().describe("Only events updated in the last N days."),
      bbox: z.array(z.number()).length(4).optional()
        .describe("Geographic box [west, north, east, south] in decimal degrees."),
      limit: z.number().int().max(200).optional().describe("Max events (default 50)."),
    }),
    execute: async ({ category, status, days, bbox, limit }) => {
      const events = await getNaturalEvents({
        category, status, days, limit,
        bbox: bbox as [number, number, number, number] | undefined,
      });
      if (!events.length) return emptyResponse("No natural events match those filters.");
      return listResponse(
        `NASA EONET: ${events.length} ${status ?? "open"} event(s)${category ? ` — ${category}` : ""}`,
        { items: events, total: events.length, meta: { source: "NASA EONET v3" } },
      );
    },
  },
];
