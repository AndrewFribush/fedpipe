/**
 * sec MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getCompanyByCik,
  getCompanyFacts,
  searchEdgar,
  extractConceptData,
  summarizeFinancials,
  lookupTicker,
  getRecentFilings,
  getInsiderTransactions,
  summarizeInsiderTransactions,
  getCompanyConcept,
  getFrame,
  getFilingText,
  extractSection,
  FILING_SECTIONS,
  EIGHT_K_ITEMS,
  xbrlConcepts,
  type SecFiling,
} from "./sdk.js";

/** Accept a ticker ("AAPL") or CIK; resolve tickers to CIKs. */
async function toCik(idOrTicker: string): Promise<string> {
  const s = idOrTicker.trim();
  if (/^\d+$/.test(s)) return s;
  const hits = await lookupTicker(s, 1);
  if (!hits.length) throw new Error(`sec: no company found for "${s}" — use sec_ticker_lookup to search by name`);
  return hits[0].cik;
}

/** Year-over-year changes for a sequence of annual observations. */
function withYoY(obs: { period: string | undefined; value: number; filed: string }[]) {
  return obs.map((o, i) => {
    const prev = obs[i - 1];
    const change = prev && prev.value ? (o.value - prev.value) / Math.abs(prev.value) : null;
    return { ...o, yoyChange: change == null ? null : Math.round(change * 10000) / 100 };
  });
}
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sec_company_search",
    description:
      "Look up a company on SEC EDGAR by CIK number. Returns company name, " +
      "tickers, SIC code, state, and recent filings list.\n\n" +
      "Common CIK numbers:\n" +
      "- Apple: 0000320193\n" +
      "- Microsoft: 0000789019\n" +
      "- Amazon: 0001018724\n" +
      "- Lockheed Martin: 0000936468\n" +
      "- Raytheon (RTX): 0000101829\n" +
      "- Boeing: 0000012927\n\n" +
      "To find CIK: search by company name using sec_filing_search.",
    annotations: { title: "SEC: Company Lookup", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK number (e.g., '0000320193' for Apple; leading zeros optional) or a ticker symbol ('AAPL')"),
    }),
    execute: async ({ cik: idOrTicker }) => {
      const cik = await toCik(idOrTicker);
      const res = await getCompanyByCik(cik);

      const filings = res.filings?.recent;
      const forms = filings?.form || [];
      const dates = filings?.filingDate || [];
      const descriptions = filings?.primaryDocDescription || [];
      const accessions = filings?.accessionNumber || [];

      // Last 15 non-insider filings (skip Form 3, 4, 5, 144)
      const majorFilings: SecFiling[] = [];
      for (let i = 0; i < forms.length && majorFilings.length < 15; i++) {
        if (["3", "4", "5", "144"].includes(forms[i])) continue;
        majorFilings.push({
          form: forms[i],
          date: dates[i],
          description: descriptions[i] || "No description",
          accessionNumber: accessions[i],
        });
      }

      return recordResponse(
        `SEC EDGAR: ${res.name || "Unknown"} (CIK ${res.cik}) — ${res.tickers?.join(", ") || "no tickers"}`,
        {
          company: {
            cik: res.cik,
            name: res.name,
            tickers: res.tickers || [],
            exchanges: res.exchanges || [],
            sic: res.sic,
            sicDescription: res.sicDescription,
            stateOfIncorporation: res.stateOfIncorporation,
            entityType: res.entityType,
            category: res.category,
            fiscalYearEnd: res.fiscalYearEnd,
            formerNames: res.formerNames || [],
          },
          recentFilings: majorFilings,
        },
      );
    },
  },

  {
    name: "sec_company_financials",
    description:
      "Get financial data (revenue, net income, assets, etc.) from SEC XBRL filings for a company. " +
      "Returns standardized financial data extracted from 10-K and 10-Q filings.\n\n" +
      "Requires CIK number. Use sec_company_search to look up filings first.\n\n" +
      "Common XBRL concepts: Revenues, NetIncomeLoss, Assets, Liabilities, " +
      "StockholdersEquity, EarningsPerShareBasic, CashAndCashEquivalentsAtCarryingValue",
    annotations: { title: "SEC: Company Financial Facts", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK number (e.g., '0000320193' for Apple) or ticker ('AAPL')"),
      metric: z.string().optional().describe(
        "Specific XBRL concept to retrieve (e.g., 'Revenues', 'NetIncomeLoss', 'Assets'). " +
        "Omit to get a summary of available key metrics. With a metric, annual values include year-over-year % change.",
      ),
    }),
    execute: async ({ cik: idOrTicker, metric }) => {
      const cik = await toCik(idOrTicker);
      const facts = await getCompanyFacts(cik);
      const usgaap = facts.facts["us-gaap"];

      if (!usgaap) {
        return emptyResponse(`No US-GAAP financial data found for CIK ${cik}.`);
      }

      // Specific metric requested
      if (metric) {
        const data = extractConceptData(facts, metric);
        if (!data) {
          const available = Object.keys(usgaap).slice(0, 30);
          return listResponse(
            `Metric "${metric}" not found for ${facts.entityName}. Showing first 30 available metrics.`,
            { items: available.map(m => ({ metric: m })) },
          );
        }
        return recordResponse(
          `${facts.entityName} — ${data.concept} (${data.label}): ${data.annual.length} annual + ${data.quarterly.length} quarterly observations`,
          {
            entityName: facts.entityName,
            concept: data.concept,
            label: data.label,
            description: data.description,
            unit: data.unit,
            annual: withYoY(data.annual.map(d => ({ period: d.end, value: d.val, filed: d.filed }))),
            quarterly: data.quarterly.map(d => ({ period: d.end, value: d.val, filed: d.filed })),
          },
        );
      }

      // Summary of key metrics
      const summary = summarizeFinancials(facts);
      return recordResponse(
        `SEC Financial Facts: ${summary.entityName} — ${summary.keyMetrics.length} key metrics found (${summary.totalMetrics} total available)`,
        summary,
      );
    },
  },

  {
    name: "sec_filing_search",
    description:
      "Full-text search across all SEC EDGAR filings. " +
      "Search by company name, keyword, or topic.\n\n" +
      "Form types: 10-K (annual), 10-Q (quarterly), 8-K (current events), " +
      "DEF 14A (proxy), S-1 (IPO registration)",
    annotations: { title: "SEC: Search Filings", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query — company name, keyword, or topic"),
      forms: z.string().optional().describe("Comma-separated form types to filter: '10-K', '10-Q', '8-K', 'DEF 14A', 'S-1'"),
      start_date: z.string().optional().describe("Start date YYYY-MM-DD"),
      end_date: z.string().optional().describe("End date YYYY-MM-DD"),
    }),
    execute: async ({ query, forms, start_date, end_date }) => {
      const result = await searchEdgar(query, {
        forms,
        startDate: start_date,
        endDate: end_date,
      });

      if (result.hits.length === 0) {
        return emptyResponse(`No filings found for "${query}".`);
      }

      const filings = result.hits.map(hit => ({
        company: hit.names[0] || "?",
        form: hit.form,
        date: hit.date,
        description: hit.description,
      }));

      return listResponse(
        `SEC filing search "${query}": ${result.total} results, showing ${filings.length}`,
        { items: filings, total: result.total },
      );
    },
  },

  {
    name: "sec_ticker_lookup",
    description:
      "Find a company's CIK from its ticker symbol or name using SEC's official ticker table. " +
      "Use this first — every other sec_* tool takes a CIK (or a ticker, which is resolved through this table).",
    annotations: { title: "SEC: Ticker → CIK", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Ticker ('AAPL', 'MSFT') or company name fragment ('lockheed', 'pfizer')"),
      limit: z.number().int().max(50).optional().describe("Max matches for name searches (default 10)"),
    }),
    execute: async ({ query, limit }) => {
      const hits = await lookupTicker(query, limit ?? 10);
      if (!hits.length) return emptyResponse(`No SEC registrant matches "${query}". Only exchange-listed companies appear in the ticker table — try sec_filing_search for others.`);
      return listResponse(`${hits.length} match(es) for "${query}"`, { items: hits, total: hits.length });
    },
  },

  {
    name: "sec_recent_filings",
    description:
      "List a company's recent filings with links, filtered by form type. 8-K item codes are decoded into plain-English events " +
      "(2.02 = earnings release, 5.02 = executive departure/appointment, 1.01 = material agreement, 4.02 = restatement, 1.05 = cybersecurity incident).\n" +
      "Forms: 10-K (annual), 10-Q (quarterly), 8-K (current events), DEF 14A (proxy), S-1/S-3 (offerings), 13F-HR (institutional holdings), 4 (insider trades).",
    annotations: { title: "SEC: Recent Filings", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK or ticker"),
      forms: z.string().optional().describe("Comma-separated form types: '8-K', '10-K,10-Q'. Default: all except insider forms 3/4/5/144"),
      since: z.string().optional().describe("Only filings on/after this date (YYYY-MM-DD)"),
      limit: z.number().int().max(200).optional().describe("Max filings (default 25)"),
    }),
    execute: async ({ cik: idOrTicker, forms, since, limit }) => {
      const cik = await toCik(idOrTicker);
      const wanted = forms ? forms.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined;
      const { company, filings } = await getRecentFilings(cik, { forms: wanted, since, limit: wanted ? limit : Math.max((limit ?? 25) * 3, 100) });
      const shown = (wanted ? filings : filings.filter(f => !["3", "4", "5", "144", "3/A", "4/A", "5/A"].includes(f.form))).slice(0, limit ?? 25);
      if (!shown.length) return emptyResponse(`No ${forms ?? ""} filings found for ${company}${since ? ` since ${since}` : ""}.`);
      return listResponse(`${company}: ${shown.length} filing(s)${forms ? ` (${forms})` : ""}`, {
        items: shown.map(f => ({
          form: f.form, filed: f.filingDate, reportDate: f.reportDate, description: f.description,
          ...(f.items.length ? { items: f.items, events: f.events } : {}),
          accessionNumber: f.accessionNumber, url: f.url,
        })),
        total: shown.length,
        meta: { cik, eightKItemCodes: forms?.includes("8-K") ? EIGHT_K_ITEMS : undefined },
      });
    },
  },

  {
    name: "sec_insider_transactions",
    description:
      "Insider trading activity from Form 4 filings: who bought or sold, how many shares, at what price, and their holdings afterward — " +
      "plus a summary of open-market buys vs sells (codes P and S) and net shares per insider.\n" +
      "Note: most Form 4 activity is compensation (A = award, M = option exercise, F = tax withholding), not conviction trades — look at P and S.",
    annotations: { title: "SEC: Insider Transactions", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK or ticker"),
      filings: z.number().int().max(50).optional().describe("How many recent Form 4 filings to parse (default 10; each is one request)"),
      since: z.string().optional().describe("Only filings on/after this date (YYYY-MM-DD)"),
      include_derivatives: z.boolean().optional().describe("Also include derivative (option/RSU) transactions (default false)"),
      transaction_codes: z.string().optional().describe("Only these codes, comma-separated: 'P,S' for open-market trades"),
    }),
    execute: async ({ cik: idOrTicker, filings, since, include_derivatives, transaction_codes }) => {
      const cik = await toCik(idOrTicker);
      const res = await getInsiderTransactions(cik, { filings, since, includeDerivatives: include_derivatives });
      const codes = transaction_codes ? new Set(transaction_codes.split(",").map((s: string) => s.trim().toUpperCase())) : null;
      const txs = codes ? res.transactions.filter(t => codes.has(t.code)) : res.transactions;
      if (!txs.length) return emptyResponse(`No insider transactions parsed for ${res.company} (${res.filingsParsed} Form 4 filings checked${codes ? `, codes ${transaction_codes}` : ""}).`);
      const summary = summarizeInsiderTransactions(txs, res.filingsParsed);
      return tableResponse(
        `${res.company}: ${txs.length} insider transaction(s) across ${res.filingsParsed} Form 4 filing(s) — ` +
        `${summary.openMarketBuys.count} open-market buy(s) ($${summary.openMarketBuys.value.toLocaleString()}), ` +
        `${summary.openMarketSells.count} open-market sell(s) ($${summary.openMarketSells.value.toLocaleString()})`,
        {
          rows: txs.map(t => ({ ...t })),
          columns: ["transactionDate", "owner", "relationship", "code", "acquiredOrDisposed", "shares", "pricePerShare", "value", "sharesOwnedAfter", "security", "ownership", "filingDate", "url"],
          total: txs.length,
          meta: { summary, cik },
        },
      );
    },
  },

  {
    name: "sec_filing_text",
    description:
      "Read the text of a filing (10-K, 10-Q, 8-K, proxy...). Extract one section — risk_factors, mdna, business, legal_proceedings, market_risk, controls " +
      "(10-Q: q_mdna, q_risk_factors) — or page through the whole document with offset/max_chars.\n" +
      "Get the accession number from sec_recent_filings.",
    annotations: { title: "SEC: Filing Text", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK or ticker"),
      accession_number: z.string().describe("Accession number, e.g. '0000320193-24-000123'"),
      section: z.enum(Object.keys(FILING_SECTIONS) as [string, ...string[]]).optional().describe("Section to extract (10-K item). Omit for the full document."),
      offset: z.number().int().min(0).optional().describe("Character offset to start from (for paging)"),
      max_chars: z.number().int().max(200000).optional().describe("Max characters to return (default 20000)"),
    }),
    execute: async ({ cik: idOrTicker, accession_number, section, offset, max_chars }) => {
      const cik = await toCik(idOrTicker);
      const doc = await getFilingText(cik, accession_number);
      let title = `${doc.form} filed ${doc.filingDate}`;
      let body = doc.text;
      if (section) {
        const s = extractSection(doc.text, section as keyof typeof FILING_SECTIONS);
        if (!s) return emptyResponse(`Section "${section}" not found in ${title}. It may be a ${doc.form}, which uses different item numbers — try omitting section and paging.`);
        title += ` — ${s.title}`; body = s.text;
      }
      const start = offset ?? 0, max = max_chars ?? 20000;
      const slice = body.slice(start, start + max);
      return recordResponse(`${title}: chars ${start}–${start + slice.length} of ${body.length}${start + slice.length < body.length ? " (more available — increase offset)" : ""}`, {
        form: doc.form, filingDate: doc.filingDate, url: doc.url, section: section ?? null,
        totalChars: body.length, offset: start, nextOffset: start + slice.length < body.length ? start + slice.length : null,
        text: slice,
      });
    },
  },
  {
    name: "sec_company_concept",
    description:
      "Get the full reported history of a single XBRL financial concept for one company.\n" +
      "Faster and smaller than sec_company_financials when you only need one metric's time series " +
      "(e.g. quarterly revenue for 10 years).\n\n" +
      "Common concepts: Revenues, NetIncomeLoss, Assets, Liabilities, StockholdersEquity, " +
      "EarningsPerShareBasic, CashAndCashEquivalentsAtCarryingValue.",
    annotations: { title: "SEC: Company Concept Time Series", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("CIK number (e.g. '0000320193' for Apple; leading zeros optional) or ticker ('AAPL')"),
      concept: z.string().describe("XBRL concept tag, e.g. 'Revenues', 'NetIncomeLoss', 'Assets'"),
      taxonomy: z.enum(["us-gaap", "ifrs-full", "dei", "srt"]).default("us-gaap").describe("XBRL taxonomy (default us-gaap)"),
    }),
    execute: async ({ cik: idOrTicker, concept, taxonomy }) => {
      const cik = await toCik(idOrTicker);
      let data;
      try {
        data = await getCompanyConcept(cik, concept, taxonomy);
      } catch (e) {
        if (e instanceof Error && /HTTP 404/.test(e.message)) {
          return emptyResponse(`Concept "${concept}" not reported by CIK ${cik} in taxonomy ${taxonomy}.`);
        }
        throw e;
      }
      if (!data) return emptyResponse(`No data for concept "${concept}" (CIK ${cik}).`);
      return recordResponse(
        `${data.entityName} — ${data.tag} (${data.label}): ${data.annual.length} annual + ${data.quarterly.length} quarterly observations [${data.unit}]`,
        {
          entityName: data.entityName,
          concept: data.tag,
          label: data.label,
          unit: data.unit,
          annual: data.annual.map(d => ({ period: d.end, value: d.val, fy: d.fy, filed: d.filed })),
          quarterly: data.quarterly.map(d => ({ period: d.end, value: d.val, fy: d.fy, fp: d.fp, filed: d.filed })),
        },
      );
    },
  },

  {
    name: "sec_concept_across_companies",
    description:
      "Compare a single XBRL financial concept across ALL reporting companies for one period (SEC frames API).\n" +
      "The most powerful cross-company tool: rank every filer by revenue, net income, assets, etc. in one call.\n\n" +
      "PERIOD FORMAT:\n" +
      "- 'CY2023' — full calendar year (use for flow concepts: Revenues, NetIncomeLoss)\n" +
      "- 'CY2023Q1' — single quarter (duration)\n" +
      "- 'CY2023Q4I' — instantaneous / point-in-time (use for balance-sheet concepts: Assets, Liabilities, StockholdersEquity)\n\n" +
      "UNITS: 'USD' (default), 'shares', 'USD-per-shares' (for EarningsPerShareBasic).",
    annotations: { title: "SEC: Concept Across Companies", readOnlyHint: true },
    parameters: z.object({
      concept: z.string().describe("XBRL concept tag, e.g. 'Revenues', 'NetIncomeLoss', 'Assets'"),
      period: z.string().regex(/^CY\d{4}(Q[1-4]I?)?$/, "Use CY2023, CY2023Q1, or CY2023Q4I").describe("Calendar period: 'CY2023', 'CY2023Q1', or instantaneous 'CY2023Q4I'"),
      taxonomy: z.enum(["us-gaap", "ifrs-full", "dei", "srt"]).default("us-gaap").describe("XBRL taxonomy (default us-gaap)"),
      unit: z.string().default("USD").describe("Unit of measure: USD, shares, USD-per-shares"),
      order: z.enum(["desc", "asc"]).default("desc").describe("Sort by value: desc (largest first) or asc"),
      limit: z.number().int().min(1).max(200).default(25).describe("Max companies to return (default 25)"),
      companies: z.string().optional().describe("Restrict to a peer set — comma-separated CIKs or tickers: 'AAPL,MSFT,GOOGL'"),
    }),
    execute: async ({ concept, period, taxonomy, unit, order, limit, companies }) => {
      const peerCiks = companies ? new Set(await Promise.all(companies.split(",").map((c: string) => toCik(c.trim()).then(Number)))) : null;
      let frame;
      try {
        frame = await getFrame({ tag: concept, period, taxonomy, unit });
      } catch (e) {
        if (e instanceof Error && /HTTP 404/.test(e.message)) {
          return emptyResponse(`No frame data for ${taxonomy}/${concept} (${unit}) in ${period}. Check the concept tag, unit, and whether the period needs the instantaneous 'I' suffix.`);
        }
        throw e;
      }
      const pool = peerCiks ? frame.data.filter(d => peerCiks.has(d.cik)) : frame.data;
      if (peerCiks && !pool.length) return emptyResponse(`None of ${companies} reported ${concept} for ${period} (check the period suffix — balance-sheet items need 'I').`);
      const sorted = [...pool].sort((a, b) => order === "asc" ? a.val - b.val : b.val - a.val);
      const top = sorted.slice(0, limit);
      return tableResponse(
        `${frame.label} (${frame.tag}) ${frame.period} [${frame.unit}]: ${peerCiks ? `${pool.length} of the requested companies reported` : `${frame.count} companies reported`}, showing ${order === "asc" ? "lowest" : "highest"} ${top.length}`,
        {
          rows: top.map(d => ({
            company: d.entityName,
            cik: d.cik,
            value: d.val,
            location: d.loc,
            periodEnd: d.end,
          })),
          total: frame.count,
          meta: { concept: frame.tag, period: frame.period, unit: frame.unit },
        },
      );
    },
  },
];
