/**
 * noaa-tides module metadata.
 */

import { PRODUCTS } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "noaa-tides",
  displayName: "NOAA Tides & Currents (CO-OPS)",
  category: "Environment",
  description:
    "NOAA CO-OPS — real-time and historical water levels, tide predictions, and coastal meteorology (water/air " +
    "temperature, wind, barometric pressure) from ~300 U.S. coastal and Great Lakes tide stations. The coastal " +
    "complement to USGS inland streamflow and NWS forecasts. Keyless.",
  workflow:
    "tides_stations(state='FL') or tides_stations(lat, lon) to find a station id → tides_water_level(station, " +
    "hours=24) for recent water level (or product='water_temperature', 'wind', etc.).",
  tips:
    "water_level and predictions are relative to a tidal datum (default MLLW). Use `hours` for a recent window or " +
    "begin/end for a date range; omit both for the latest reading. Units are English (feet, °F). Pairs with " +
    "usgs (river flow), nws (marine/coastal forecasts), and fema (coastal flooding).",
  domains: ["environment"],
  crossRef: [
    { question: "earthquakes/water", route: "tides_water_level (coastal water level & storm surge), tides_stations" },
    { question: "disasters", route: "tides_water_level (surge/high-water during coastal storms)" },
  ],
  reference: {
    products: PRODUCTS,
    docs: {
      "CO-OPS API": "https://api.tidesandcurrents.noaa.gov/api/prod/",
      "Station metadata": "https://api.tidesandcurrents.noaa.gov/mdapi/prod/",
    },
  },
} satisfies ModuleMeta;
