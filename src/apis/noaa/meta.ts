/**
 * noaa module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "noaa",
  displayName: "NOAA Climate Data (NCEI)",
  category: "Environment",
  description: "Weather observations — temperature, precipitation, snow, wind — from NOAA/NCEI stations across the U.S. Keyless (NCEI Access + Search services).",
  workflow: "noaa_stations (by state or lat/lon) to find a station ID → noaa_climate_data for its observations",
  tips: "Datasets: GHCND (daily), GSOM (monthly), GSOY (annual). Search stations by state code (e.g. 'LA') or lat/lon, then pass the station ID to noaa_climate_data. Values in standard units (°F, inches). No API key needed.",
  domains: ["environment"],
  crossRef: [
    { question: "energy/climate", route: "noaa_climate_data (temperature, precipitation trends)" },
    { question: "agriculture", route: "noaa_climate_data (weather data for crop yield context)" },
    { question: "disasters", route: "noaa_climate_data (weather conditions during disasters)" },
    { question: "earthquakes/water", route: "noaa_climate_data (precipitation data for flood/water context)" },
    { question: "state-level", route: "noaa_stations, noaa_climate_data (weather/climate data by state FIPS location)" },
  ],
  reference: {
  docs: {
    "NCEI Access Data Service": "https://www.ncei.noaa.gov/access/services/data/v1",
    "NCEI Search Service": "https://www.ncei.noaa.gov/access/services/search/v1",
    "GHCN-Daily": "https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily",
  },
},
} satisfies ModuleMeta;
