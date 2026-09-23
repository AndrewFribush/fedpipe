/**
 * sba module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "sba",
  displayName: "SBA 7(a) & 504 Loans (bulk ingest)",
  category: "Finance & Spending",
  description:
    "Small Business Administration 7(a) and 504 loan-level FOIA data. SBA publishes no query API — only CSV extracts " +
    "— so this module downloads the current files (resolved from SBA's DKAN metastore) and indexes them into a local " +
    "SQLite database, then answers queries locally: loans by borrower, lender, state, program, or fiscal year, with " +
    "approved dollars and jobs supported. The small-business-lending complement to USAspending and HMDA.",
  workflow:
    "sba_loans(state='CO', program='504') or sba_loans(borrower='Acme') to search loans → sba_dataset_info for the " +
    "local ingest status. First query downloads and indexes the data (recent-era files).",
  tips:
    "Bulk-ingest module: the first query downloads SBA's FOIA CSVs and builds a local SQLite DB (needs Node >= 22.5); " +
    "later queries are local. Recent-era files are ingested (FY2010+ for 504, FY2020+ for 7(a)); clear_cache forces a " +
    "refresh. Amounts are approval dollars. Cross with usaspending (federal awards) and census (local economy).",
  domains: ["finance", "spending", "economy"],
  crossRef: [
    { question: "banking", route: "sba_loans (small-business lending by lender/state/program)" },
    { question: "spending/budget", route: "sba_loans (SBA-backed loan volume by geography — complements USAspending)" },
  ],
  reference: {
    programs: { "7(a)": "General small-business loan guarantees", "504": "Fixed-asset financing via Certified Development Companies" },
    docs: { "SBA open data": "https://data.sba.gov/", "7(a) & 504 FOIA": "https://data.sba.gov/dataset/7-a-504-foia" },
  },
} satisfies ModuleMeta;
