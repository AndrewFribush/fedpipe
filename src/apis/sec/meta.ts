/**
 * sec module metadata.
 */

import { xbrlConcepts } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "sec",
  displayName: "SEC EDGAR",
  category: "Financial",
  description: "Company filings, financial data (XBRL), and full-text search across SEC EDGAR",
  workflow: "sec_ticker_lookup (name/ticker → CIK; every tool also accepts a ticker directly) → sec_company_financials for XBRL metrics with YoY → sec_recent_filings (8-K events decoded) → sec_filing_text for risk factors / MD&A → sec_insider_transactions for Form 4 buys/sells → sec_concept_across_companies to rank every filer (or a peer set via companies=) on any concept; sec_company_concept for one metric's full history.",
  tips: "No API key required (set SEC_CONTACT_EMAIL for the User-Agent). Rate limit: 10 req/sec. Insider signal = codes P (buy) and S (sell); A/M/F are compensation mechanics. Balance-sheet frames need an instant period: 'CY2023Q4I'.",
  domains: ["finance"],
  crossRef: [
    { question: "drug investigation", route: "sec_company_financials (pharma company financials via XBRL)" },
    { question: "pharma-doctor payments", route: "sec_company_financials (company revenue context)" },
    { question: "banking", route: "sec_company_financials (bank holding company financials)" },
    { question: "consumer complaints", route: "sec_company_financials (company financial health context)" },
    { question: "patents", route: "sec_company_financials (patent holder financials)" },
    { question: "procurement/contracting", route: "sec_company_financials (contractor financial data)" },
    { question: "elections/campaign finance", route: "sec_company_financials (public company financial context for PAC/donor analysis)" },
    { question: "energy/climate", route: "sec_company_financials (energy company revenue, ESG disclosures)" },
  ],
  reference: {
  xbrlConcepts: xbrlConcepts as Record<string, string>,
  docs: {
    "Developer Resources": "https://www.sec.gov/about/developer-resources",
    "EDGAR APIs": "https://www.sec.gov/page/edgar-application-programming-interfaces-old",
    "Full-Text Search": "https://efts.sec.gov/LATEST/",
    "Fair Access Policy": "https://www.sec.gov/privacy.htm#security",
  },
},
} satisfies ModuleMeta;
