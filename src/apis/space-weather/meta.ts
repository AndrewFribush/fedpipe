/**
 * space-weather module metadata.
 */

import { AP_STORM_SCALE } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "space-weather",
  displayName: "Space Weather (NOAA SWPC + GFZ)",
  category: "Environment",
  description:
    "Solar and geomagnetic activity: monthly sunspot number (NOAA SWPC, since 1749) & F10.7 solar flux (from 2004), " +
    "the Ap/Kp geomagnetic storm index (GFZ Potsdam / IAGA archive, since 1932), and the current NOAA " +
    "G/S/R storm scales. Space weather drives auroras and geomagnetically induced currents that stress " +
    "power grids, transformers, pipelines, satellites, and HF radio/GPS.",
  workflow:
    "space_weather_current for the live picture → space_weather_solar_cycle for the 11-year sunspot/flux " +
    "cycle → space_weather_geomagnetic (index=Ap, min_ap=50) to list geomagnetic storm days that can induce grid currents.",
  tips:
    "Daily-Ap storm scale: <30 quiet, 30-50 G1, 50-100 G2-G3, 100-200 G4 (severe), 200+ G5 (extreme). " +
    "The 1989 Quebec grid collapse and 2003 Halloween storms hit Ap ~200+. Both upstreams are keyless (open data).",
  domains: ["energy", "environment", "safety"],
  crossRef: [
    { question: "energy/climate", route: "space_weather_geomagnetic (Ap storm days → grid GIC risk), space_weather_current" },
    { question: "disasters", route: "space_weather_geomagnetic (severe geomagnetic storms), space_weather_current (G-scale)" },
  ],
  reference: {
    apStormScale: AP_STORM_SCALE,
    docs: {
      "NOAA SWPC": "https://www.swpc.noaa.gov/",
      "SWPC data services": "https://services.swpc.noaa.gov/",
      "GFZ Kp/ap/Ap archive": "https://kp.gfz.de/en/",
    },
  },
} satisfies ModuleMeta;
