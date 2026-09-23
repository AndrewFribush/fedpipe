/**
 * noaa-tides MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { findStations, getObservations, PRODUCTS } from "./sdk.js";
import { tableResponse, timeseriesResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "tides_stations",
    description:
      "Find NOAA CO-OPS tide/water-level stations — by state, or nearest to a latitude/longitude. Returns station " +
      "id, name, state, and coordinates (plus distance when a point is given). Use the id with tides_water_level.\n\n" +
      "Covers ~300 U.S. coastal and Great Lakes stations. Keyless.",
    annotations: { title: "NOAA Tides: Find Stations", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code, e.g. 'FL', 'CA'."),
      lat: z.number().optional().describe("Latitude for a nearest-station search."),
      lon: z.number().optional().describe("Longitude for a nearest-station search."),
      limit: z.number().int().max(100).optional().describe("Max stations (default 25)."),
    }),
    execute: async ({ state, lat, lon, limit }) => {
      const stations = await findStations({ state, lat, lon, limit });
      if (!stations.length) return emptyResponse("No tide stations match those filters.");
      const cols = lat != null && lon != null
        ? ["id", "name", "state", "distanceKm", "lat", "lng"]
        : ["id", "name", "state", "lat", "lng"];
      return tableResponse(`NOAA CO-OPS: ${stations.length} tide station(s)`, {
        rows: stations, columns: cols, meta: { source: "NOAA CO-OPS" },
      });
    },
  },

  {
    name: "tides_water_level",
    description:
      "Water level (or other coastal observations) at a NOAA CO-OPS station. Returns the latest reading by default, " +
      "or a recent window with `hours`, or an explicit date range.\n\n" +
      `Products: ${Object.entries(PRODUCTS).map(([k, v]) => `${k} = ${v}`).join("; ")}. ` +
      "water_level and predictions are relative to a datum (default MLLW). Get a station id from tides_stations. Keyless.",
    annotations: { title: "NOAA Tides: Water Level & Conditions", readOnlyHint: true },
    parameters: z.object({
      station: z.string().describe("CO-OPS station id, e.g. '8518750' (The Battery, NY)."),
      product: z.enum(Object.keys(PRODUCTS) as [string, ...string[]]).optional().describe("Data product (default 'water_level')."),
      hours: z.number().int().max(720).optional().describe("Return the last N hours. Omit for the latest single reading."),
      begin: z.string().optional().describe("Start date YYYY-MM-DD (with `end`)."),
      end: z.string().optional().describe("End date YYYY-MM-DD."),
      datum: z.string().optional().describe("Tidal datum for water_level/predictions (default 'MLLW'; also MSL, NAVD, etc.)."),
    }),
    execute: async ({ station, product, hours, begin, end, datum }) => {
      const { metadata, observations } = await getObservations({ station, product, hours, begin, end, datum });
      if (!observations.length) return emptyResponse(`No ${product ?? "water_level"} observations for station ${station}.`);

      const label = `${metadata.name ?? station} (${station})`;
      if (observations.length === 1) {
        return recordResponse(
          `NOAA CO-OPS — ${label}: ${observations[0].value} at ${observations[0].time}`,
          { station: metadata, product: product ?? "water_level", latest: observations[0] },
          { source: "NOAA CO-OPS", units: "english" },
        );
      }
      return timeseriesResponse(`NOAA CO-OPS ${product ?? "water_level"} — ${label}: ${observations.length} readings`, {
        rows: observations.map((o) => ({ time: o.time, value: o.value })),
        dateKey: "time",
        valueKey: "value",
        meta: { source: "NOAA CO-OPS", station: metadata, product: product ?? "water_level", units: "english" },
      });
    },
  },
];
