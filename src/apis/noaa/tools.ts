/**
 * noaa MCP tools. Keyless — backed by NOAA/NCEI Access + Search services.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { listDatasets, searchStations, getClimateData } from "./sdk.js";
import { timeseriesResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "noaa_datasets",
    description: "List available NOAA/NCEI climate datasets — GHCND (daily), GSOM (monthly), GSOY (annual), and 1991–2020 normals — with their coverage and common measurement types.",
    annotations: { title: "NOAA: List Datasets", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const datasets = await listDatasets();
      return listResponse(`${datasets.length} NOAA climate datasets available`, { items: datasets });
    },
  },

  {
    name: "noaa_stations",
    description:
      "Find NOAA weather stations by U.S. state, lat/lon, or an explicit bounding box. " +
      "Returns station IDs (use with noaa_climate_data), names, coordinates, and coverage dates. Keyless.",
    annotations: { title: "NOAA: Search Stations", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter US state code, e.g. 'LA', 'CA', 'NY'."),
      lat: z.number().optional().describe("Center latitude (use with lon)."),
      lon: z.number().optional().describe("Center longitude (use with lat)."),
      radius_km: z.number().optional().describe("Search radius in km around lat/lon (default 50)."),
      bbox: z.string().optional().describe("Explicit bounding box 'north,west,south,east' (overrides state/lat-lon)."),
      dataset: z.enum(["GHCND", "GSOM", "GSOY"]).optional().describe("Dataset to search within (default GHCND daily)."),
      limit: z.number().int().max(1000).default(25).describe("Max stations (default 25)."),
    }),
    execute: async ({ state, lat, lon, radius_km, bbox, dataset, limit }) => {
      if (!state && bbox == null && (lat == null || lon == null)) {
        return emptyResponse("Provide a state (e.g. 'LA'), a lat/lon, or a bbox to search for stations.");
      }
      const stations = await searchStations({ state, lat, lon, radiusKm: radius_km, bbox, dataset, limit });
      if (!stations.length) return emptyResponse("No stations found for that area.");
      return listResponse(`${stations.length} stations found`, { items: stations });
    },
  },

  {
    name: "noaa_climate_data",
    description:
      "Get climate observations (temperature, precipitation, snow, wind) for a NOAA station. " +
      "Find a station first with noaa_stations. Values are in standard units (°F, inches). Keyless.",
    annotations: { title: "NOAA: Climate Data", readOnlyHint: true },
    parameters: z.object({
      dataset_id: z.enum(["GHCND", "GSOM", "GSOY"]).describe("Dataset: GHCND=daily, GSOM=monthly, GSOY=annual"),
      station_id: z.string().describe("Station ID from noaa_stations, e.g. 'USW00094728' (Central Park). A 'GHCND:' prefix is accepted and stripped."),
      start_date: z.string().describe("Start date YYYY-MM-DD"),
      end_date: z.string().describe("End date YYYY-MM-DD"),
      datatypes: z.string().optional().describe("Comma-separated measurements, e.g. 'TMAX,TMIN,PRCP'. Default: TMAX,TMIN,TAVG,PRCP,SNOW."),
      limit: z.number().int().max(5000).default(1000).describe("Max observations (default 1000)"),
    }),
    execute: async ({ dataset_id, station_id, start_date, end_date, datatypes, limit }) => {
      const result = await getClimateData({
        dataset: dataset_id, stationId: station_id, startDate: start_date, endDate: end_date, dataTypes: datatypes, limit,
      });
      if (!result.data.length) {
        return emptyResponse(`No observations for station ${station_id} in ${start_date}..${end_date}. Check the station ID (noaa_stations) and that it reports the requested measurements.`);
      }
      return timeseriesResponse(`${result.count} observations, ${start_date} to ${end_date}`, {
        rows: result.data,
        dateKey: "date",
        valueKey: "value",
        extraFields: ["datatype", "station"],
        total: result.count,
      });
    },
  },
];
