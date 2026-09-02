import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fara",
  displayName: "FARA Foreign Agents",
  category: "Legal",
  description:
    "DOJ Foreign Agents Registration Act (FARA) registry — who is registered as an agent representing a foreign government, party, or principal in the U.S. (the foreign-influence transparency record). Search active registrants by name or firm. Keyless.",
  workflow:
    "fara_search by name/firm to find active foreign-agent registrants. Pair with senate-lobbying (domestic lobbying) and resolve_entity/resolve_person for the full influence picture.",
  tips:
    "Keyless. Covers currently ACTIVE registrants (agents), matched by person name or business/firm name. FARA registrants act on behalf of foreign principals — the counterpart to domestic Lobbying Disclosure Act filings in `senate-lobbying`. Registration_Number identifies the filer.",
  domains: ["justice", "international"],
  crossRef: [
    { question: "courts/litigation", route: "fara_search — foreign-agent registrations, complementing senate-lobbying (domestic)" },
    { question: "elections/campaign finance", route: "fara_search(name) to see if a person/firm represents a foreign principal" },
  ],
  reference: {
    docs: {
      "FARA API": "https://efile.fara.gov/api",
      "FARA eFile": "https://efile.fara.gov/",
    },
  },
} satisfies ModuleMeta;
