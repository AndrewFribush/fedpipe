/**
 * usitc module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "usitc",
  displayName: "USITC DataWeb (Trade Statistics)",
  category: "International & Economy",
  description:
    "U.S. International Trade Commission DataWeb — official U.S. merchandise trade statistics: imports and exports " +
    "by HTS commodity, country, and time period, plus tariff data. The authoritative source for U.S. trade flows, " +
    "complementing Census foreign-trade and BEA international transactions. A query/report engine: build a query in " +
    "the DataWeb UI, then list and run it here.",
  auth: {
    envVar: "USITC_API_TOKEN",
    signup: "https://dataweb.usitc.gov/",
  },
  workflow:
    "usitc_saved_queries() to see reports you saved in the DataWeb UI → usitc_run_query(query=<definition>) to run a " +
    "report (imports/exports by commodity & country) and return the data.",
  tips:
    "Requires a free DataWeb API token (Bearer). DataWeb reports are defined by a rich JSON body — build and export " +
    "it from dataweb.usitc.gov, then pass it to usitc_run_query. The exact schema is DataWeb-specific and pending a " +
    "live audit. For simpler trade series see census (foreign trade) and bea (international transactions).",
  domains: ["international", "economy"],
  crossRef: [
    { question: "international", route: "usitc_run_query (U.S. imports/exports by HTS commodity & country)" },
  ],
  reference: {
    docs: { "USITC DataWeb": "https://dataweb.usitc.gov/", "API": "https://www.usitc.gov/data/dataweb_api.htm" },
  },
} satisfies ModuleMeta;
