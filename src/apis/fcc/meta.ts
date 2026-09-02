import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fcc",
  displayName: "FCC Comment Filing (ECFS)",
  category: "Legal",
  description:
    "FCC Electronic Comment Filing System (ECFS) — public comments and filings on FCC proceedings (net neutrality, spectrum auctions, broadband, media ownership). Search by docket number, filer, or full text. The Regulations.gov analogue for the FCC. Uses a free api.data.gov key.",
  workflow:
    "fcc_search_filings by proceeding docket (e.g. '17-108'), filer name, or keyword to find comments/filings and their documents.",
  tips:
    "Uses DATA_GOV_API_KEY (the shared api.data.gov key — one key covers this, Congress, FEC, and more). Proceeding dockets look like '17-108' (net neutrality) or '23-320'. filers.name matches the commenting party. Newest first.",
  domains: ["legislation"],
  auth: {
    envVar: "DATA_GOV_API_KEY",
    signup: "https://api.data.gov/signup/",
  },
  crossRef: [
    { question: "executive actions", route: "fcc_search_filings(proceeding=) for public comments on an FCC rulemaking (the FCC counterpart to regulations_search_documents)" },
  ],
  reference: {
    docs: { "ECFS API": "https://www.fcc.gov/ecfs/public-api-docs.html" },
  },
} satisfies ModuleMeta;
