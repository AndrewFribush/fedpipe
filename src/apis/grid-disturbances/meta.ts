/**
 * grid-disturbances module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "grid-disturbances",
  displayName: "Grid Disturbances (DOE OE-417)",
  category: "Environment",
  description:
    "U.S. electric grid emergency & disturbance events from the DOE OE-417 mandatory utility reports — " +
    "physical and cyber attacks, severe weather, equipment failures, fuel emergencies, and load shed, " +
    "with demand loss (MW) and customers affected. Keyless (via ORNL's Open Energy Data Portal). " +
    "Coverage is calendar-year 2023, the reachable gov dataset's current extent.",
  workflow:
    "grid_disturbances_summary for the big picture (counts by cause / NERC region / month) → " +
    "grid_disturbances_search to pull the individual events, filtered by state, cause, region, or date.",
  tips:
    "Causes (event_type) include 'Vandalism', 'Severe Weather', 'System Operations', 'Cyber Event', " +
    "'Physical Attack'. Most demand-loss fields are blank (attacks/vandalism rarely shed load); use " +
    "min_demand_loss_mw to find the events that actually cut power. Pairs with the space-weather module " +
    "to test whether geomagnetic storms drive grid disturbances (they don't — attacks and weather do).",
  domains: ["energy", "safety"],
  crossRef: [
    { question: "energy/climate", route: "grid_disturbances_summary, grid_disturbances_search (grid reliability events)" },
    { question: "disasters", route: "grid_disturbances_search event_type='Severe Weather' (weather-driven grid outages)" },
  ],
  reference: {
    docs: {
      "DOE OE-417 form": "https://www.oe.netl.doe.gov/OE417_annual_summary.aspx",
      "ORNL Open Energy Data Portal": "https://openenergyhub.ornl.gov/explore/dataset/oe-417-annual-summaries/",
    },
  },
} satisfies ModuleMeta;
