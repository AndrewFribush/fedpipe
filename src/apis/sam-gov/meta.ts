/**
 * sam-gov module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "sam-gov",
  displayName: "SAM.gov (Entities, Exclusions, Opportunities)",
  category: "Government & Spending",
  description:
    "System for Award Management (SAM.gov) — the federal registration and eligibility system: registered entities " +
    "(UEI, CAGE, status), the exclusions/debarment list (who is barred from federal awards), and active contract " +
    "opportunities. The registry that resolves a company to its federal identifiers and screens it for eligibility — " +
    "the missing half of the procurement picture alongside USAspending.",
  auth: {
    envVar: "SAM_API_KEY",
    signup: "https://sam.gov/content/api-keys",
  },
  workflow:
    "sam_entity_search(name='Pfizer') to get a UEI/CAGE and registration status → sam_exclusions(name) to screen " +
    "for debarment → sam_opportunities(title, posted_from, posted_to) for open solicitations.",
  tips:
    "Requires a free SAM.gov API key. Endpoints target SAM's documented v3 (entities) / v4 (exclusions) / v2 " +
    "(opportunities) APIs; field mapping is pending a live audit once a key is set (SAM's gateway 404s keyless " +
    "requests). Opportunity dates are MM/DD/YYYY. Cross with usaspending (awards) and sec (public companies).",
  domains: ["spending", "finance"],
  crossRef: [
    { question: "procurement/contracting", route: "sam_entity_search (UEI/CAGE), sam_opportunities (open solicitations)" },
    { question: "corporate structure/ownership", route: "sam_entity_search (registered entity identity), sam_exclusions (debarment screen)" },
  ],
  reference: {
    docs: {
      "SAM.gov API keys": "https://sam.gov/content/api-keys",
      "Entity API": "https://open.gsa.gov/api/entity-api/",
      "Opportunities API": "https://open.gsa.gov/api/get-opportunities-public-api/",
    },
  },
} satisfies ModuleMeta;
