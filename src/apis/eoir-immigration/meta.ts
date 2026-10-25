/**
 * eoir-immigration module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "eoir-immigration",
  displayName: "EOIR Immigration Courts (bulk ingest)",
  category: "Justice",
  description:
    "U.S. immigration-court caseload from the Executive Office for Immigration Review (EOIR) FOIA case-data release — " +
    "removal and other proceedings, the government's own record (the source TRAC is built on). There is no query API: " +
    "EOIR publishes one multi-gigabyte ZIP. This module ingests the case table into local SQLite on a deliberate run " +
    "and answers queries locally, with a schema-generic loader (reads whatever columns the file provides).",
  workflow:
    "First, ingest once (deliberate, multi-GB): call ingest() from the eoir-immigration SDK. Then eoir_dataset_info " +
    "to see the columns, and eoir_cases(filters={...}) to query.",
  tips:
    "Bulk-ingest scaffold: no API key, but needs Node >= 22.5 and a deliberate multi-GB download (not triggered by a " +
    "query). The loader is schema-generic and sniffs the delimiter, so exact EOIR column names are confirmed on first " +
    "ingest (surfaced by eoir_dataset_info). FEDPIPE_EOIR_MAX_ROWS bounds the local table. For polished analyses, " +
    "TRAC (Syracuse) is the well-known third-party cut of this same data.",
  domains: ["justice"],
  crossRef: [
    { question: "courts/litigation", route: "eoir_cases (immigration-court proceedings), eoir_dataset_info (columns)" },
  ],
  reference: {
    docs: {
      "EOIR FOIA library": "https://www.justice.gov/eoir/foia-library-0",
      "Case data ZIP": "https://fileshare.eoir.justice.gov/EOIR%20Case%20Data.zip",
    },
  },
} satisfies ModuleMeta;
