/**
 * SEC EDGAR SDK — typed API client for SEC EDGAR data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getCompanyByCik, getCompanyFacts, searchEdgar } from "fedpipe/sdk/sec";
 *
 * No API key required. Must include User-Agent with contact info.
 * Rate limit: 10 requests/second.
 */

import { createClient } from "../../shared/client.js";
import { XMLParser } from "fast-xml-parser";
import he from "he";

// ─── Clients ─────────────────────────────────────────────────────────

const USER_AGENT = `fedpipe/2.0 (${process.env.SEC_CONTACT_EMAIL || "contact@example.com"})`;

const dataApi = createClient({
  baseUrl: "https://data.sec.gov",
  name: "sec-data",
  defaultHeaders: { "User-Agent": USER_AGENT, Accept: "application/json" },
  rateLimit: { perSecond: 10, burst: 10 },
  cacheTtlMs: 30 * 60 * 1000, // 30 min
});

/** www.sec.gov — filing archives and the ticker→CIK table. */
const wwwApi = createClient({
  baseUrl: "https://www.sec.gov",
  name: "sec-www",
  defaultHeaders: { "User-Agent": USER_AGENT },
  rateLimit: { perSecond: 10, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // filings are immutable once published
});

const searchApi = createClient({
  baseUrl: "https://efts.sec.gov/LATEST",
  name: "sec-search",
  defaultHeaders: { "User-Agent": USER_AGENT, Accept: "application/json" },
  rateLimit: { perSecond: 10, burst: 10 },
  cacheTtlMs: 30 * 60 * 1000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Sec Company. */
export interface SecCompany {
  cik: string;
  name: string;
  tickers: string[];
  exchanges: string[];
  sic: string;
  sicDescription: string;
  stateOfIncorporation: string;
  entityType: string;
  category: string;
  fiscalYearEnd: string;
  formerNames: { name: string; from: string; to: string }[];
  filings: {
    recent: {
      form: string[];
      filingDate: string[];
      primaryDocDescription: string[];
      accessionNumber: string[];
    };
  };
}

/** Sec Filing. */
export interface SecFiling {
  form: string;
  date: string;
  description: string;
  accessionNumber: string;
}

/** Sec Company Facts. */
export interface SecCompanyFacts {
  cik: number;
  entityName: string;
  facts: {
    "us-gaap"?: Record<string, SecXbrlConcept>;
    [namespace: string]: Record<string, SecXbrlConcept> | undefined;
  };
}

/** Sec Xbrl Concept. */
export interface SecXbrlConcept {
  label?: string;
  description?: string;
  units: Record<string, SecXbrlObservation[]>;
}

/** Sec Xbrl Observation. */
export interface SecXbrlObservation {
  start?: string;
  end?: string;
  val: number;
  accn: string;
  fy: number;
  fp: string;
  form: string;
  filed: string;
  frame?: string;
}

/** Sec Search Result. */
export interface SecSearchResult {
  total: number;
  hits: {
    names: string[];
    form: string;
    date: string;
    description: string;
  }[];
}

/** A single XBRL concept's full time series for one company (companyconcept API). */
export interface SecCompanyConcept {
  cik: number;
  entityName: string;
  taxonomy: string;
  tag: string;
  label: string;
  description: string;
  unit: string;
  annual: SecXbrlObservation[];
  quarterly: SecXbrlObservation[];
}

/** One company's value for a concept in a reporting frame (frames API). */
export interface SecFrameDatum {
  accn: string;
  cik: number;
  entityName: string;
  loc: string | null;
  start?: string;
  end: string;
  val: number;
}

/** One XBRL concept across all reporting companies for a single period (frames API). */
export interface SecFrame {
  taxonomy: string;
  tag: string;
  label: string;
  description: string;
  unit: string;
  period: string; // ccp, e.g. "CY2023" or "CY2023Q1I"
  count: number;
  data: SecFrameDatum[];
}

/** One row of the SEC ticker table. */
export interface SecTickerEntry { cik: string; ticker: string; name: string }

/** A filing from a company's submissions feed. */
export interface SecRecentFiling {
  form: string;
  filingDate: string;
  reportDate: string | null;
  accessionNumber: string;
  primaryDocument: string;
  description: string;
  /** 8-K item codes, e.g. ["2.02", "9.01"]. */
  items: string[];
  /** Plain-English meaning of each 8-K item. */
  events: string[];
  url: string;
  isXBRL: boolean;
}

/** One non-derivative transaction reported on a Form 4. */
export interface SecInsiderTransaction {
  filingDate: string;
  accessionNumber: string;
  owner: string;
  relationship: string;
  security: string;
  transactionDate: string;
  code: string;
  codeMeaning: string;
  acquiredOrDisposed: "A" | "D" | string;
  shares: number | null;
  pricePerShare: number | null;
  value: number | null;
  sharesOwnedAfter: number | null;
  ownership: "D" | "I" | string;
  url: string;
}

/** Aggregated insider activity. */
export interface SecInsiderSummary {
  filings: number;
  transactions: number;
  openMarketBuys: { count: number; shares: number; value: number };
  openMarketSells: { count: number; shares: number; value: number };
  byOwner: { owner: string; relationship: string; bought: number; sold: number; netShares: number; lastTransaction: string }[];
}

// ─── Reference data ──────────────────────────────────────────────────

/** 8-K item codes → material event categories (Regulation S-K, Form 8-K). */
export const EIGHT_K_ITEMS: Record<string, string> = {
  "1.01": "Entry into a Material Definitive Agreement",
  "1.02": "Termination of a Material Definitive Agreement",
  "1.03": "Bankruptcy or Receivership",
  "1.04": "Mine Safety — Reporting of Shutdowns and Patterns of Violations",
  "1.05": "Material Cybersecurity Incident",
  "2.01": "Completion of Acquisition or Disposition of Assets",
  "2.02": "Results of Operations and Financial Condition (earnings release)",
  "2.03": "Creation of a Direct Financial Obligation or Off-Balance-Sheet Arrangement",
  "2.04": "Triggering Events That Accelerate a Financial Obligation",
  "2.05": "Costs Associated with Exit or Disposal Activities (restructuring)",
  "2.06": "Material Impairments",
  "3.01": "Notice of Delisting or Failure to Satisfy a Listing Rule",
  "3.02": "Unregistered Sales of Equity Securities",
  "3.03": "Material Modification to Rights of Security Holders",
  "4.01": "Changes in Registrant's Certifying Accountant",
  "4.02": "Non-Reliance on Previously Issued Financial Statements (restatement)",
  "5.01": "Changes in Control of Registrant",
  "5.02": "Departure/Election of Directors or Officers; Compensatory Arrangements",
  "5.03": "Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year",
  "5.04": "Temporary Suspension of Trading Under Employee Benefit Plans",
  "5.05": "Amendments to or Waiver of Code of Ethics",
  "5.06": "Change in Shell Company Status",
  "5.07": "Submission of Matters to a Vote of Security Holders",
  "5.08": "Shareholder Director Nominations",
  "6.01": "ABS Informational and Computational Material",
  "6.02": "Change of Servicer or Trustee",
  "6.03": "Change in Credit Enhancement or Other External Support",
  "6.04": "Failure to Make a Required Distribution",
  "6.05": "Securities Act Updating Disclosure",
  "7.01": "Regulation FD Disclosure",
  "8.01": "Other Events",
  "9.01": "Financial Statements and Exhibits",
};

/** Form 4 transaction codes. */
export const FORM4_CODES: Record<string, string> = {
  P: "Open-market or private purchase",
  S: "Open-market or private sale",
  A: "Grant, award, or other acquisition from the issuer",
  D: "Disposition to the issuer (e.g. forfeiture)",
  F: "Payment of exercise price or tax liability by delivering/withholding shares",
  M: "Exercise or conversion of derivative security (option exercise)",
  C: "Conversion of derivative security",
  X: "Exercise of in-the-money or at-the-money derivative",
  G: "Bona fide gift",
  V: "Transaction voluntarily reported earlier than required",
  J: "Other acquisition or disposition (see footnotes)",
  I: "Discretionary transaction under an employee benefit plan",
  W: "Acquisition or disposition by will or laws of descent",
  Z: "Deposit into or withdrawal from voting trust",
  K: "Equity swap or similar instrument",
  L: "Small acquisition under Rule 16a-6",
  U: "Disposition pursuant to a tender of shares in a change-of-control transaction",
};

/** 10-K / 10-Q section headings (Regulation S-K items), for filing text extraction. */
export const FILING_SECTIONS: Record<string, { pattern: RegExp; title: string }> = {
  business: { pattern: /item\s*1\.?\s*[—–-]?\s*business/i, title: "Item 1. Business" },
  risk_factors: { pattern: /item\s*1a\.?\s*[—–-]?\s*risk\s*factors/i, title: "Item 1A. Risk Factors" },
  legal_proceedings: { pattern: /item\s*3\.?\s*[—–-]?\s*legal\s*proceedings/i, title: "Item 3. Legal Proceedings" },
  mdna: { pattern: /item\s*7\.?\s*[—–-]?\s*management.s\s*discussion/i, title: "Item 7. Management's Discussion and Analysis" },
  market_risk: { pattern: /item\s*7a\.?\s*[—–-]?\s*quantitative\s*and\s*qualitative/i, title: "Item 7A. Quantitative and Qualitative Disclosures About Market Risk" },
  financial_statements: { pattern: /item\s*8\.?\s*[—–-]?\s*financial\s*statements/i, title: "Item 8. Financial Statements" },
  controls: { pattern: /item\s*9a\.?\s*[—–-]?\s*controls\s*and\s*procedures/i, title: "Item 9A. Controls and Procedures" },
  // 10-Q numbering
  q_mdna: { pattern: /item\s*2\.?\s*[—–-]?\s*management.s\s*discussion/i, title: "Item 2. Management's Discussion and Analysis (10-Q)" },
  q_risk_factors: { pattern: /item\s*1a\.?\s*[—–-]?\s*risk\s*factors/i, title: "Item 1A. Risk Factors (10-Q)" },
};

/** SEC XBRL financial concept codes to human-readable labels. */
export const xbrlConcepts = {
  Revenues: "Total revenue",
  RevenueFromContractWithCustomerExcludingAssessedTax: "Revenue from contracts (ASC 606)",
  NetIncomeLoss: "Net income (loss)",
  OperatingIncomeLoss: "Operating income",
  GrossProfit: "Gross profit",
  Assets: "Total assets",
  Liabilities: "Total liabilities",
  StockholdersEquity: "Total stockholders equity",
  CashAndCashEquivalentsAtCarryingValue: "Cash and cash equivalents",
  LongTermDebt: "Long-term debt",
  EarningsPerShareBasic: "Basic earnings per share",
  EarningsPerShareDiluted: "Diluted earnings per share",
  CommonStockSharesOutstanding: "Common shares outstanding",
  Goodwill: "Goodwill",
  ResearchAndDevelopmentExpense: "R&D expense",
  SellingGeneralAndAdministrativeExpense: "SG&A expense",
  InterestExpense: "Interest expense",
  IncomeTaxExpenseBenefit: "Income tax expense",
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────

function padCik(cik: string): string {
  return cik.padStart(10, "0");
}

// ─── Public API ──────────────────────────────────────────────────────

/** Look up a company by CIK number. */
export async function getCompanyByCik(cik: string): Promise<SecCompany> {
  return dataApi.get<SecCompany>(`/submissions/CIK${padCik(cik)}.json`);
}

/** Get company financial facts (XBRL data). */
export async function getCompanyFacts(cik: string): Promise<SecCompanyFacts> {
  return dataApi.get<SecCompanyFacts>(`/api/xbrl/companyfacts/CIK${padCik(cik)}.json`);
}

/** Full-text search across EDGAR filings. */
export async function searchEdgar(
  query: string,
  opts: { forms?: string; startDate?: string; endDate?: string } = {},
): Promise<SecSearchResult> {
  const params: Record<string, string | undefined> = {
    q: query,
    forms: opts.forms,
    startdt: opts.startDate,
    enddt: opts.endDate,
  };
  const raw = await searchApi.get<Record<string, unknown>>("/search-index", params);
  const hits = raw.hits as Record<string, unknown> | undefined;
  const total = (hits?.total as Record<string, unknown>)?.value as number || 0;
  const rawHits = (hits?.hits as Record<string, unknown>[]) || [];

  return {
    total,
    hits: rawHits.map(hit => {
      const source = hit._source as Record<string, unknown>;
      return {
        names: (source.display_names as string[]) || [],
        form: String(source.form || "?"),
        date: String(source.file_date || "?"),
        description: String(source.file_description || ""),
      };
    }),
  };
}

/**
 * Extract a specific XBRL concept from company facts.
 * Traverses facts["us-gaap"][concept].units.USD
 */
export function extractConceptData(
  facts: SecCompanyFacts,
  concept: string,
): { concept: string; label: string; description: string; unit: string; annual: SecXbrlObservation[]; quarterly: SecXbrlObservation[] } | null {
  const usgaap = facts.facts["us-gaap"];
  if (!usgaap) return null;

  // Try exact match, then case-insensitive
  let conceptData = usgaap[concept];
  let resolvedName = concept;
  if (!conceptData) {
    const key = Object.keys(usgaap).find(k => k.toLowerCase() === concept.toLowerCase());
    if (!key) return null;
    conceptData = usgaap[key];
    resolvedName = key;
  }

  const unitKey = Object.keys(conceptData.units)[0];
  if (!unitKey) return null;

  const allData = conceptData.units[unitKey];
  return {
    concept: resolvedName,
    label: conceptData.label || resolvedName,
    description: conceptData.description || "",
    unit: unitKey,
    annual: allData.filter(d => d.form === "10-K").slice(-20),
    quarterly: allData.filter(d => d.form === "10-Q").slice(-8),
  };
}

/**
 * Get a summary of key financial metrics from company facts.
 */
export function summarizeFinancials(facts: SecCompanyFacts): {
  entityName: string;
  totalMetrics: number;
  keyMetrics: { concept: string; label: string; value: number | null; unit: string | null; period: string | null }[];
} {
  const usgaap = facts.facts["us-gaap"];
  if (!usgaap) return { entityName: facts.entityName, totalMetrics: 0, keyMetrics: [] };

  const keyMetrics = Object.keys(xbrlConcepts)
    .filter(m => usgaap[m])
    .map(m => {
      const concept = usgaap[m];
      const unitKey = Object.keys(concept.units)[0];
      const data = unitKey ? concept.units[unitKey] : [];
      const latest = data[data.length - 1];
      return {
        concept: m,
        label: (xbrlConcepts as Record<string, string>)[m],
        value: latest ? latest.val : null,
        unit: unitKey || null,
        period: latest?.end || null,
      };
    });

  return {
    entityName: facts.entityName,
    totalMetrics: Object.keys(usgaap).length,
    keyMetrics,
  };
}

/**
 * Get the full reported time series of a single XBRL concept for one company
 * (companyconcept API). Smaller and faster than getCompanyFacts when you only
 * need one metric, and includes the `frame` field linking to the frames API.
 */
export async function getCompanyConcept(
  cik: string,
  tag: string,
  taxonomy = "us-gaap",
): Promise<SecCompanyConcept | null> {
  const raw = await dataApi.get<{
    cik: number; entityName: string; taxonomy?: string; tag?: string;
    label?: string; description?: string; units: Record<string, SecXbrlObservation[]>;
  }>(`/api/xbrl/companyconcept/CIK${padCik(cik)}/${taxonomy}/${tag}.json`);
  if (!raw || !raw.units) return null;
  // Prefer USD when a concept reports multiple units (e.g. EPS); else first available.
  const unit = raw.units["USD"] ? "USD" : Object.keys(raw.units)[0];
  if (!unit) return null;
  const obs = raw.units[unit] ?? [];
  // Annual: 10-K (domestic), 20-F/40-F (foreign filers), plus amendments (e.g. 10-K/A).
  const isAnnual = (f: string) => /^(10-K|20-F|40-F)/.test(f);
  const isQuarterly = (f: string) => /^10-Q/.test(f);
  return {
    cik: raw.cik,
    entityName: raw.entityName,
    taxonomy: raw.taxonomy ?? taxonomy,
    tag: raw.tag ?? tag,
    label: raw.label ?? tag,
    description: raw.description ?? "",
    unit,
    annual: obs.filter(d => isAnnual(d.form)).slice(-20),
    quarterly: obs.filter(d => isQuarterly(d.form)).slice(-12),
  };
}

/**
 * Get a single XBRL concept reported by every company for one calendar period
 * (frames API) — the basis for cross-company comparison and screening.
 *
 * Period formats:
 *   - "CY2023"      annual (calendar year, duration concept like Revenues)
 *   - "CY2023Q1"    quarterly duration
 *   - "CY2023Q1I"   instantaneous / point-in-time (balance-sheet concepts like Assets)
 *
 * Units: "USD" (default), "shares", "USD-per-shares" (e.g. EarningsPerShareBasic).
 */
export async function getFrame(opts: {
  tag: string;
  period: string;
  taxonomy?: string;
  unit?: string;
}): Promise<SecFrame> {
  const taxonomy = opts.taxonomy ?? "us-gaap";
  const unit = opts.unit ?? "USD";
  const raw = await dataApi.get<{
    taxonomy: string; tag: string; label?: string; description?: string;
    ccp: string; uom: string; pts?: number; data: SecFrameDatum[];
  }>(`/api/xbrl/frames/${taxonomy}/${opts.tag}/${unit}/${opts.period}.json`);
  const data = raw.data ?? [];
  return {
    taxonomy: raw.taxonomy ?? taxonomy,
    tag: raw.tag ?? opts.tag,
    label: raw.label ?? opts.tag,
    description: raw.description ?? "",
    unit: raw.uom ?? unit,
    period: raw.ccp ?? opts.period,
    count: raw.pts ?? data.length,
    data,
  };
}

/** Clear cached responses from both clients. */
// ─── Ticker → CIK ────────────────────────────────────────────────────

/** Look up companies by ticker or name fragment using SEC's official ticker table (~10k listed issuers). */
export async function lookupTicker(query: string, limit = 10): Promise<SecTickerEntry[]> {
  const table = await wwwApi.get<Record<string, { cik_str: number; ticker: string; title: string }>>("/files/company_tickers.json");
  const q = query.trim().toLowerCase();
  const rows = Object.values(table).map(r => ({ cik: String(r.cik_str).padStart(10, "0"), ticker: r.ticker, name: r.title }));
  const exact = rows.filter(r => r.ticker.toLowerCase() === q);
  if (exact.length) return exact;
  const nameHits = rows.filter(r => r.name.toLowerCase().includes(q) || r.ticker.toLowerCase().startsWith(q));
  nameHits.sort((a, b) => Number(!a.name.toLowerCase().startsWith(q)) - Number(!b.name.toLowerCase().startsWith(q)) || a.name.length - b.name.length);
  return nameHits.slice(0, limit);
}

// ─── Filings ─────────────────────────────────────────────────────────

function filingUrl(cik: string, accession: string, doc: string): string {
  return `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${accession.replace(/-/g, "")}/${doc}`;
}

/** Recent filings for a company, optionally filtered by form type, with 8-K items decoded. */
export async function getRecentFilings(cik: string, opts: { forms?: string[]; limit?: number; since?: string } = {}): Promise<{ company: string; filings: SecRecentFiling[] }> {
  const sub = await getCompanyByCik(cik);
  const r = sub.filings?.recent as unknown as Record<string, string[]> | undefined;
  if (!r) return { company: sub.name, filings: [] };
  const wanted = opts.forms?.map(f => f.toUpperCase());
  const out: SecRecentFiling[] = [];
  for (let i = 0; i < r.form.length && out.length < (opts.limit ?? 25); i++) {
    const form = r.form[i];
    if (wanted && !wanted.some(w => form.toUpperCase() === w || form.toUpperCase() === `${w}/A`)) continue;
    if (opts.since && r.filingDate[i] < opts.since) continue;
    const items = (r.items?.[i] ?? "").split(",").map(s => s.trim()).filter(Boolean);
    out.push({
      form, filingDate: r.filingDate[i], reportDate: r.reportDate?.[i] || null,
      accessionNumber: r.accessionNumber[i], primaryDocument: r.primaryDocument?.[i] ?? "",
      description: r.primaryDocDescription?.[i] ?? "",
      items, events: items.map(code => EIGHT_K_ITEMS[code] ?? `Item ${code}`),
      url: filingUrl(sub.cik, r.accessionNumber[i], r.primaryDocument?.[i] ?? ""),
      isXBRL: r.isXBRL?.[i] === "1" || (r.isXBRL?.[i] as unknown) === 1,
    });
  }
  return { company: sub.name, filings: out };
}

// ─── Insider transactions (Forms 3/4/5) ──────────────────────────────

const xml = new XMLParser({ ignoreAttributes: true, parseTagValue: false, trimValues: true });
const num = (v: unknown): number | null => { const n = Number(typeof v === "object" && v ? (v as { value?: unknown }).value : v); return Number.isFinite(n) ? n : null; };
const str = (v: unknown): string => (typeof v === "object" && v ? String((v as { value?: unknown }).value ?? "") : v == null ? "" : String(v));
const arr = <T>(v: T | T[] | undefined): T[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

function describeRelationship(o: Record<string, unknown> | undefined): string {
  if (!o) return "";
  const parts: string[] = [];
  const t = (k: string) => ["1", "true"].includes(String(o[k]).toLowerCase());
  if (t("isDirector")) parts.push("Director");
  if (t("isOfficer")) parts.push(String(o.officerTitle || "Officer"));
  if (t("isTenPercentOwner")) parts.push("10% owner");
  if (t("isOther")) parts.push(String(o.otherText || "Other"));
  return parts.join("; ");
}

/**
 * Parse insider transactions from a company's recent Form 4 (and optionally 3/5) filings.
 * Fetches each filing's XML from the EDGAR archive — one request per filing.
 */
export async function getInsiderTransactions(cik: string, opts: { filings?: number; forms?: string[]; since?: string; includeDerivatives?: boolean } = {}): Promise<{ company: string; transactions: SecInsiderTransaction[]; filingsParsed: number }> {
  const forms = opts.forms ?? ["4"];
  const { company, filings } = await getRecentFilings(cik, { forms, limit: opts.filings ?? 10, since: opts.since });
  const transactions: SecInsiderTransaction[] = [];
  let parsed = 0;
  for (const f of filings) {
    // primaryDocument is the styled view ("xslF345X06/form4.xml"); the raw XML is the bare filename
    const rawDoc = f.primaryDocument.replace(/^xsl[^/]+\//, "");
    if (!/\.xml$/i.test(rawDoc)) continue;
    let text: string;
    try { text = await wwwApi.getText(`/Archives/edgar/data/${Number(cik)}/${f.accessionNumber.replace(/-/g, "")}/${rawDoc}`); }
    catch { continue; }
    const doc = xml.parse(text)?.ownershipDocument;
    if (!doc) continue;
    parsed++;
    const owners = arr<Record<string, unknown>>(doc.reportingOwner);
    const owner = owners.map(o => str((o.reportingOwnerId as Record<string, unknown>)?.rptOwnerName)).filter(Boolean).join("; ");
    const relationship = owners.map(o => describeRelationship(o.reportingOwnerRelationship as Record<string, unknown>)).filter(Boolean).join("; ");
    const tables = [doc.nonDerivativeTable?.nonDerivativeTransaction, ...(opts.includeDerivatives ? [doc.derivativeTable?.derivativeTransaction] : [])];
    for (const tx of tables.flatMap(t => arr<Record<string, unknown>>(t as never))) {
      const amounts = tx.transactionAmounts as Record<string, unknown> | undefined;
      const post = tx.postTransactionAmounts as Record<string, unknown> | undefined;
      const coding = tx.transactionCoding as Record<string, unknown> | undefined;
      const code = str(coding?.transactionCode);
      const shares = num(amounts?.transactionShares);
      const price = num(amounts?.transactionPricePerShare);
      transactions.push({
        filingDate: f.filingDate, accessionNumber: f.accessionNumber, owner, relationship,
        security: str(tx.securityTitle), transactionDate: str(tx.transactionDate),
        code, codeMeaning: FORM4_CODES[code] ?? code,
        acquiredOrDisposed: str(amounts?.transactionAcquiredDisposedCode),
        shares, pricePerShare: price, value: shares != null && price != null ? Math.round(shares * price * 100) / 100 : null,
        sharesOwnedAfter: num(post?.sharesOwnedFollowingTransaction),
        ownership: str((tx.ownershipNature as Record<string, unknown>)?.directOrIndirectOwnership),
        url: f.url,
      });
    }
  }
  return { company, transactions, filingsParsed: parsed };
}

/** Aggregate insider transactions into buys/sells and per-owner totals. */
export function summarizeInsiderTransactions(txs: SecInsiderTransaction[], filings: number): SecInsiderSummary {
  const buys = { count: 0, shares: 0, value: 0 }, sells = { count: 0, shares: 0, value: 0 };
  const owners = new Map<string, SecInsiderSummary["byOwner"][number]>();
  for (const t of txs) {
    const o = owners.get(t.owner) ?? { owner: t.owner, relationship: t.relationship, bought: 0, sold: 0, netShares: 0, lastTransaction: t.transactionDate };
    if (t.code === "P") { buys.count++; buys.shares += t.shares ?? 0; buys.value += t.value ?? 0; }
    if (t.code === "S") { sells.count++; sells.shares += t.shares ?? 0; sells.value += t.value ?? 0; }
    if (t.acquiredOrDisposed === "A") { o.bought += t.shares ?? 0; o.netShares += t.shares ?? 0; }
    if (t.acquiredOrDisposed === "D") { o.sold += t.shares ?? 0; o.netShares -= t.shares ?? 0; }
    if (t.transactionDate > o.lastTransaction) o.lastTransaction = t.transactionDate;
    owners.set(t.owner, o);
  }
  const round = (x: { count: number; shares: number; value: number }) => ({ ...x, value: Math.round(x.value) });
  return { filings, transactions: txs.length, openMarketBuys: round(buys), openMarketSells: round(sells), byOwner: [...owners.values()].sort((a, b) => Math.abs(b.netShares) - Math.abs(a.netShares)) };
}

// ─── Filing text ─────────────────────────────────────────────────────

/** Strip HTML/iXBRL to readable text. */
export function htmlToText(html: string): string {
  return he.decode(
    html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<head[\s\S]*?<\/head>/gi, " ")
      .replace(/<ix:header[\s\S]*?<\/ix:header>/gi, " ")
      .replace(/<\/(p|div|tr|li|h[1-6]|table|br)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  ).replace(/[ \t\u00a0]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}

/** Locate a section (e.g. risk factors) in filing text. Skips the table of contents by taking the LAST heading match that has substantial body. */
export function extractSection(text: string, section: keyof typeof FILING_SECTIONS): { title: string; text: string } | null {
  const spec = FILING_SECTIONS[section];
  const re = new RegExp(spec.pattern.source, "gi");
  const starts: number[] = [];
  for (let m = re.exec(text); m; m = re.exec(text)) starts.push(m.index);
  if (!starts.length) return null;
  // Next "Item N." heading after the start marks the end
  const nextItem = /\n\s*item\s*\d+[a-c]?\.?\s+[A-Z]/gi;
  let best: { start: number; end: number } | null = null;
  for (const s of starts) {
    nextItem.lastIndex = s + 20;
    const n = nextItem.exec(text);
    const end = n ? n.index : text.length;
    if (!best || end - s > best.end - best.start) best = { start: s, end };
  }
  if (!best) return null;
  return { title: spec.title, text: text.slice(best.start, best.end).trim() };
}

/** Fetch a filing's primary document as plain text. Pass the accession number from sec_recent_filings. */
export async function getFilingText(cik: string, accessionNumber: string): Promise<{ form: string; filingDate: string; url: string; text: string }> {
  const { filings } = await getRecentFilings(cik, { limit: 1000 });
  const f = filings.find(x => x.accessionNumber === accessionNumber || x.accessionNumber.replace(/-/g, "") === accessionNumber.replace(/-/g, ""));
  if (!f) throw new Error(`sec: accession ${accessionNumber} not found in recent filings for CIK ${cik}`);
  const html = await wwwApi.getText(`/Archives/edgar/data/${Number(cik)}/${f.accessionNumber.replace(/-/g, "")}/${f.primaryDocument}`);
  return { form: f.form, filingDate: f.filingDate, url: f.url, text: htmlToText(html) };
}

/** Clear cached responses from all clients. */
export function clearCache(): void {
  dataApi.clearCache();
  searchApi.clearCache();
  wwwApi.clearCache();
}
