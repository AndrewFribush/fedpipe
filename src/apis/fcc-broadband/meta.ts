/**
 * fcc-broadband module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fcc-broadband",
  displayName: "FCC National Broadband Map (BDC)",
  category: "Infrastructure",
  description:
    "FCC Broadband Data Collection (BDC) — the National Broadband Map: fixed and mobile broadband availability by " +
    "provider, technology, and speed. The digital-divide layer that pairs with Census demographics. The public API " +
    "is catalog/download-oriented: list data vintages, then the availability datasets for one.",
  auth: {
    envVar: ["FCC_BDC_USERNAME", "FCC_BDC_TOKEN"],
    signup: "https://bdc.fcc.gov/",
  },
  workflow:
    "fcc_broadband_asof_dates() to see available vintages → fcc_broadband_datasets(as_of_date) to enumerate the " +
    "downloadable availability datasets for one.",
  tips:
    "Requires a free BDC account's username + token (sent as headers). Endpoint path is confirmed (returns 401 " +
    "without credentials); response mapping is pending a live audit once credentials are set. The BDC API serves " +
    "big availability files rather than point lookups — cross with census for the digital divide.",
  domains: ["economy"],
  crossRef: [
    { question: "economy", route: "fcc_broadband_datasets (fixed/mobile broadband availability — the digital divide)" },
    { question: "state-level", route: "fcc_broadband_datasets (availability by state/geography)" },
  ],
  reference: {
    docs: { "FCC BDC": "https://bdc.fcc.gov/", "National Broadband Map": "https://broadbandmap.fcc.gov/" },
  },
} satisfies ModuleMeta;
