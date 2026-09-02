/**
 * DOL Form 5500 module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "form5500",
  displayName: "DOL Form 5500 Benefit Plans",
  category: "Financial",
  description:
    "DOL Form 5500 filings — the annual disclosure every private-sector employee benefit plan (401(k)s, pensions, and health/welfare plans) must file. Covers plan sponsor (by EIN), plan name, participant counts, plan type, and location for ~230K larger plans per year (~$10T+ in assets). NOTE: this is a BULK-INGEST module — the first query downloads DOL's ~29MB annual dataset and indexes it into a local SQLite database (takes ~30-60s once), then serves fast local queries. Requires Node >= 22.5. No API key.",
  workflow:
    "form5500_search by sponsor/plan name or state to find plans and their sponsor EINs -> form5500_sponsor with an EIN for all plans that sponsor filed. Join to resolve_entity: a company's EIN links its retirement/health plans here to its SEC/FEC/lobbying footprint.",
  tips:
    "First call for a given year triggers a one-time ~30-60s download+index; later calls are instant. Data lags ~1 year (default year 2024). This is the base Form 5500 (larger plans, 100+ participants and DFEs); small-plan 5500-SF filings and dollar-value schedules (Schedule H assets) are separate DOL datasets not yet ingested — so participant counts are present but plan asset dollars are not. Sponsor names are UPPERCASE as filed. EINs are 9 digits.",
  domains: ["finance", "spending"],
  crossRef: [
    { question: "nonprofits/charities", route: "form5500_search (a nonprofit's employee benefit/retirement plans), complementing nonprofit_financials" },
    { question: "banking", route: "form5500_sponsor(ein) to see a company's retirement/health plans by sponsor EIN" },
  ],
  reference: {
    docs: {
      "Form 5500 datasets": "https://www.dol.gov/agencies/ebsa/researchers/data/form-5500-datasets",
      "Data dictionary": "https://www.dol.gov/agencies/ebsa/researchers/data/form-5500-datasets",
    },
  },
} satisfies ModuleMeta;
