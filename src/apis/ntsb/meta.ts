/**
 * NTSB Aviation Accident Database module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ntsb",
  displayName: "NTSB Aviation Accidents",
  category: "Transportation",
  description:
    "NTSB civil aviation accident and incident database — the authoritative federal record of aircraft accidents (2008-present in the standard extract): date, location, aircraft make/model, N-number, injury severity, fatalities, and damage. BULK-INGEST: the first query downloads the NTSB's ~96MB dataset (a Microsoft Access DB) and indexes it into a local SQLite database (~1-2 min once), then serves fast local queries. Requires Node >= 22.5. No API key.",
  workflow:
    "ntsb_aircraft_history with an N-number for one aircraft's accident record -> ntsb_search by make/model/state/year/severity for patterns. Join to the `faa` module: an aircraft's current registration + its accident history by the same N-number.",
  tips:
    "First call triggers a one-time ~1-2min download+index; later calls are instant. The standard NTSB extract covers 2008-present; older events (Pre2008/PRE1982) are separate archives not yet ingested. N-numbers accepted with or without the leading 'N'. injury_level is the event's highest (fatal/serious/minor/none); fatalities and total_aboard are event totals. type is accident vs incident.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "vehicle safety", route: "ntsb_aircraft_history(n_number) for an aircraft's accidents; ntsb_search(make/model) for a type's safety record — pair with faa_aircraft for current registration" },
    { question: "disasters", route: "ntsb_search(state=, year=, fatal_only=true) for fatal aviation accidents by place/time" },
  ],
  reference: {
    docs: {
      "NTSB avdata": "https://data.ntsb.gov/avdata",
      "CAROL query": "https://data.ntsb.gov/carol-main-public/",
    },
  },
} satisfies ModuleMeta;
