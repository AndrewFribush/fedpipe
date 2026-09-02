/**
 * GLEIF (Global Legal Entity Identifier Foundation) module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "gleif",
  displayName: "GLEIF Legal Entity Identifiers",
  category: "Financial",
  description:
    "GLEIF LEI registry - the canonical global company identifier behind financial regulation. 2.5M+ legal entities with verified legal name, jurisdiction, addresses, registration status, and corporate parent/child ownership chains. The LEI is the join key across SEC, FDIC, swap-data, and international filings. Free, keyless, updated daily.",
  workflow:
    "gleif_search to find an entity's LEI by name -> gleif_record for the full registration -> gleif_ownership for its direct/ultimate parents and children (corporate structure).",
  tips:
    "Search matches legal names AND addresses via fulltext; use match='name' to restrict to legal names (supports trailing * wildcard). A 404 on parent lookups means the entity reports no parent (exemption or standalone) - that's an answer, not an error. LEIs are 20-char alphanumeric. US filers' LEIs also appear in SEC company facts.",
  domains: ["finance", "international"],
  crossRef: [
    { question: "corporate structure/ownership", route: "gleif_search (name -> LEI) -> gleif_ownership (direct + ultimate parents, subsidiaries)" },
    { question: "banking", route: "gleif_search to pin a bank's exact legal entity, then fdic_search_institutions with the verified name" },
  ],
  reference: {
    docs: {
      "API docs": "https://www.gleif.org/en/lei-data/gleif-api",
      "LEI search UI": "https://search.gleif.org/",
    },
  },
} satisfies ModuleMeta;
