import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ofac",
  displayName: "OFAC Sanctions (SDN)",
  category: "Financial",
  description:
    "U.S. Treasury OFAC Specially Designated Nationals (SDN) list — the register of sanctioned people, companies, vessels, and aircraft, with the sanctions program(s) that named each. 'Is this name sanctioned' in one lookup. The list (~6MB) is fetched and cached; queries run in memory. Keyless, works on any Node.",
  workflow:
    "ofac_search with a person or company name to screen against the SDN list. Pair with resolve_entity / resolve_person for compliance context.",
  tips:
    "Keyless. Matches names (and common name forms) on the primary SDN list; programs show why (e.g. CUBA, IRAN, SDGT for terrorism, RUSSIA-EO14024). A match is not legal advice — verify against OFAC's official record. This is the primary SDN list; the Consolidated (non-SDN) list is separate.",
  domains: ["finance", "international"],
  crossRef: [
    { question: "corporate structure/ownership", route: "ofac_search(company) — sanctions screening alongside gleif/resolve_entity" },
    { question: "banking", route: "ofac_search(name) to check OFAC SDN status" },
  ],
  reference: {
    docs: {
      "SDN list": "https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists",
      "Sanctions programs": "https://ofac.treasury.gov/sanctions-programs-and-country-information",
    },
  },
} satisfies ModuleMeta;
