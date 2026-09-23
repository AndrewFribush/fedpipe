/**
 * fema-nri module metadata.
 */

import { HAZARDS } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fema-nri",
  displayName: "FEMA National Risk Index",
  category: "Infrastructure",
  description:
    "FEMA's National Risk Index — a composite natural-hazard risk score for every U.S. county, combining expected " +
    "annual loss from 18 hazards (wildfire, riverine & coastal flooding, hurricane, tornado, earthquake, heat, " +
    "drought, and more) with social vulnerability and community resilience. Per-county profile and per-state " +
    "ranking. Keyless (FEMA ArcGIS feature service).",
  workflow:
    "fema_nri_county(county_fips='08101') for one county's composite risk + per-hazard breakdown → " +
    "fema_nri_state(state='CO') to rank a state's counties by risk.",
  tips:
    "Scores are 0-100 (higher = more risk / vulnerability / resilience). Expected annual loss is in dollars/year. " +
    "The single best pairing for the county-dossier workflow — combine with fema_disaster_declarations (what has " +
    "already happened), usace-nid (dam hazard), and nasa/nws (live conditions).",
  domains: ["environment", "safety", "housing"],
  crossRef: [
    { question: "disasters", route: "fema_nri_county (composite + per-hazard risk), fema_nri_state (ranking)" },
    { question: "housing", route: "fema_nri_county (hazard risk & expected annual loss for a place)" },
  ],
  reference: {
    hazards: HAZARDS,
    docs: { "FEMA National Risk Index": "https://hazards.fema.gov/nri/" },
  },
} satisfies ModuleMeta;
