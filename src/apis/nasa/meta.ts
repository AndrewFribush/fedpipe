/**
 * nasa module metadata.
 */

import { POWER_PARAMETERS, EONET_CATEGORIES } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nasa",
  displayName: "NASA (POWER + EONET)",
  category: "Environment",
  description:
    "NASA open Earth data: POWER satellite-derived surface meteorology and solar radiation for any lat/lon " +
    "(temperature, precipitation, wind, humidity, and the solar irradiance used to size PV) at daily, monthly, " +
    "or long-term-climatology resolution; and EONET, a live feed of ongoing natural events (wildfires, severe " +
    "storms, volcanoes, floods, drought) with coordinates and magnitudes. Both keyless.",
  workflow:
    "nasa_power_point(lat, lon) for climate/solar baselines anywhere on Earth (set temporal='climatology' for " +
    "long-term monthly means) → nasa_natural_events(category='wildfires') for the live hazard feed.",
  tips:
    "POWER is global and gridded — it answers where no ground station exists, complementing NWS/NOAA. For solar " +
    "siting use community='RE' and parameter ALLSKY_SFC_SW_DWN (kWh/m²/day). EONET magnitudes vary by category " +
    "(fire acres, storm category). Cross with FEMA declarations and USGS earthquakes for a full hazard view.",
  domains: ["environment", "energy", "agriculture"],
  crossRef: [
    { question: "energy/climate", route: "nasa_power_point (ALLSKY_SFC_SW_DWN solar, WS50M hub-height wind, climatology)" },
    { question: "disasters", route: "nasa_natural_events (wildfires/severeStorms/floods/volcanoes, live)" },
    { question: "agriculture", route: "nasa_power_point (temperature, precipitation, community=AG)" },
  ],
  reference: {
    powerParameters: POWER_PARAMETERS,
    eonetCategories: EONET_CATEGORIES,
    docs: {
      "NASA POWER": "https://power.larc.nasa.gov/",
      "POWER API": "https://power.larc.nasa.gov/docs/services/api/temporal/",
      "NASA EONET": "https://eonet.gsfc.nasa.gov/docs/v3",
    },
  },
} satisfies ModuleMeta;
