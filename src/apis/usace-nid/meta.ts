/**
 * usace-nid module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "usace-nid",
  displayName: "Dams (USACE National Inventory of Dams)",
  category: "Infrastructure",
  description:
    "The U.S. Army Corps of Engineers' National Inventory of Dams — the authoritative record of the nation's " +
    "~92,000 dams: location, height, storage capacity, purpose, owner, downstream hazard, condition assessment, " +
    "and emergency-action-plan status. Search by name/place, then pull a full inventory record. Keyless.",
  workflow:
    "dams_search('Pueblo, Colorado') to find dams and their federal IDs → dams_detail(federal_id='CO00299') for " +
    "the full record (height, storage, condition, inspection dates).",
  tips:
    "Height is in feet, storage in acre-feet, discharge in ft³/s. Condition is the Corps' assessment " +
    "(e.g. POOR). Pairs with fema (flood declarations), usgs (streamflow), and nasa/nws (precipitation) for " +
    "flood-risk and infrastructure work.",
  domains: ["environment", "safety"],
  crossRef: [
    { question: "disasters", route: "dams_detail (downstream hazard, condition, storage), dams_search" },
    { question: "earthquakes/water", route: "dams_search + dams_detail (storage & discharge near a river/gage)" },
  ],
  reference: {
    docs: {
      "National Inventory of Dams": "https://nid.sec.usace.army.mil/",
    },
  },
} satisfies ModuleMeta;
