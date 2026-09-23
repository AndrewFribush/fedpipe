/**
 * fmcsa module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fmcsa",
  displayName: "FMCSA Carrier Safety (SAFER)",
  category: "Transportation",
  description:
    "Federal Motor Carrier Safety Administration QCMobile API — the SAFER company snapshot for any interstate " +
    "trucking or bus carrier: registration, fleet size, safety rating, and BASIC safety-measurement scores " +
    "(unsafe driving, hours-of-service, maintenance, crashes). The road-safety complement to NHTSA and NTSB.",
  auth: {
    envVar: "FMCSA_WEBKEY",
    signup: "https://mobile.fmcsa.dot.gov/QCDevsite/docs/apiAccess",
  },
  workflow:
    "fmcsa_search_carriers('Swift') to find a carrier and its USDOT number → fmcsa_carrier(dot_number) for the " +
    "company snapshot → fmcsa_carrier_safety(dot_number) for BASIC safety scores.",
  tips:
    "Requires the free FMCSA webKey. Endpoint paths are confirmed; response-field mapping is pending a live audit " +
    "once a key is configured. Cross with nhtsa (vehicle recalls/complaints) and ntsb (crash investigations).",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "vehicle safety", route: "fmcsa_carrier_safety (BASIC scores), fmcsa_carrier (fleet & rating)" },
    { question: "transportation", route: "fmcsa_search_carriers → fmcsa_carrier (interstate carrier registry)" },
  ],
  reference: {
    docs: { "FMCSA QCMobile API": "https://mobile.fmcsa.dot.gov/QCDevsite/docs/apiAccess" },
  },
} satisfies ModuleMeta;
