/**
 * IRS Exempt Organizations (EO BMF) module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "exempt-orgs",
  displayName: "IRS Exempt Organizations (BMF)",
  category: "Financial",
  description:
    "IRS Exempt Organizations Business Master File — the registry of every U.S. tax-exempt organization (~1.8M) with EIN, name, address, subsection (501(c)(3)/(4)/(6)/…), NTEE mission code, IRS ruling year, and basic assets/income/revenue. This is the REGISTRY (all recognized orgs, filers or not), complementing the `nonprofits` module's detailed Form 990 financials. BULK-INGEST: the first query downloads the IRS's monthly CSV extracts and indexes them locally (~30s once), then serves fast queries. Requires Node >= 22.5. No API key.",
  workflow:
    "eo_search by name (optionally state/subsection/NTEE) -> eo_organization by EIN for the registry record -> nonprofit_financials(ein) for the detailed 990 filing if the org files one.",
  tips:
    "First call triggers a one-time ~30s download+index; later calls are instant. Subsection codes: 03=501(c)(3) charity, 04=501(c)(4) social welfare (politically active), 06=501(c)(6) trade association. NTEE prefixes classify mission (A=arts, B=education, E=health, T=philanthropy, X=religion). Names are UPPERCASE as filed. Asset/income/revenue are IRS-coded rounded figures, present only for orgs above the filing threshold. For actual 990 line items use the `nonprofits` module.",
  domains: ["finance", "spending"],
  crossRef: [
    { question: "nonprofits/charities", route: "eo_search / eo_organization (the IRS registry: existence, type, ruling date, NTEE), then nonprofit_financials for 990 detail" },
    { question: "elections/campaign finance", route: "eo_search(subsection='04') for politically active 501(c)(4)s, then fec_search_committees for affiliated PACs" },
  ],
  reference: {
    docs: {
      "EO BMF extract": "https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf",
      "NTEE codes": "https://nccs.urban.org/project/national-taxonomy-exempt-entities-ntee-codes",
    },
  },
} satisfies ModuleMeta;
