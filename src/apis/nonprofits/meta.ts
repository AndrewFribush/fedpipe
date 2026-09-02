/**
 * IRS Form 990 nonprofits module metadata (via ProPublica Nonprofit Explorer).
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nonprofits",
  displayName: "IRS Form 990 Nonprofits",
  category: "Financial",
  description:
    "IRS tax-exempt organization filings (Form 990) via ProPublica's Nonprofit Explorer mirror of IRS bulk data - 1.8M+ U.S. nonprofits with multi-year revenue, expenses, assets, liabilities, officer compensation share, and links to filed 990 PDFs. Every charity, foundation, university endowment, hospital system, and dark-money 501(c)(4) files here.",
  workflow:
    "nonprofits_search by name (optionally state/NTEE category) -> nonprofit_financials by EIN for the multi-year 990 trend and PDF links.",
  tips:
    "EINs are 9 digits (search returns them). subsection codes: 3 = 501(c)(3) charity, 4 = 501(c)(4) social welfare (political dark money files here), 6 = trade association. NTEE code prefixes classify mission (A=arts, B=education, E=health, T=philanthropy). Form types: 0 = full 990, 1 = 990-EZ, 2 = 990-PF (private foundation). Financial fields are absent for orgs filing 990-N postcards (small orgs).",
  domains: ["finance", "spending"],
  crossRef: [
    { question: "nonprofits/charities", route: "nonprofits_search -> nonprofit_financials (revenue, assets, officer comp share)" },
    { question: "elections/campaign finance", route: "nonprofits_search(subsection=4) for politically active 501(c)(4)s, then fec_search_committees for affiliated PACs" },
  ],
  reference: {
    docs: {
      "API docs": "https://projects.propublica.org/nonprofits/api",
      "NTEE codes": "https://nccs.urban.org/project/national-taxonomy-exempt-entities-ntee-codes",
    },
  },
} satisfies ModuleMeta;
