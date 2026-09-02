/**
 * IRS Form 990 SDK - typed client for ProPublica's Nonprofit Explorer API,
 * which mirrors IRS tax-exempt bulk data and 990 e-file extracts.
 *
 * API: {@link https://projects.propublica.org/nonprofits/api}
 *
 * No API key required. Be gentle: ProPublica asks for reasonable use.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://projects.propublica.org",
  name: "nonprofits",
  rateLimit: { perSecond: 1, burst: 3 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // IRS bulk data updates monthly
  timeoutMs: 30_000,
});

// ─── Types ───────────────────────────────────────────────────────────

export interface NonprofitHit {
  ein: number;
  einFormatted: string;
  name: string;
  city: string | null;
  state: string | null;
  nteeCode: string | null;
  subsection: number | null; // 3 = 501(c)(3), 4 = 501(c)(4), ...
}

export interface NonprofitSearchResult {
  total: number;
  hits: NonprofitHit[];
}

/** One year of 990 e-file extract data (fields absent for 990-N filers). */
export interface FilingYear {
  year: number;
  formType: string;
  totalRevenue: number | null;
  totalExpenses: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  contributions: number | null;
  programRevenue: number | null;
  officerCompPct: number | null;
  pdfUrl: string | null;
}

export interface NonprofitDetail {
  ein: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  subsection: number | null;
  nteeCode: string | null;
  rulingDate: string | null;
  latestAssetAmount: number | null;
  filings: FilingYear[];
}

// ─── API functions ───────────────────────────────────────────────────

/** Search tax-exempt organizations by name. */
export async function searchNonprofits(params: {
  query: string;
  state?: string;      // 2-letter
  nteePrefix?: number; // 1-10, ProPublica's major NTEE grouping
  subsection?: number; // 3, 4, 6, ...
  page?: number;
}): Promise<NonprofitSearchResult> {
  const q: Record<string, string | number> = { q: params.query };
  if (params.state) q["state[id]"] = params.state.toUpperCase();
  if (params.nteePrefix != null) q["ntee[id]"] = params.nteePrefix;
  if (params.subsection != null) q["c_code[id]"] = params.subsection;
  if (params.page) q.page = params.page;

  const res = await api.get<Record<string, any>>("/nonprofits/api/v2/search.json", q);
  const orgs = Array.isArray(res.organizations) ? res.organizations : [];
  return {
    total: Number(res.total_results ?? orgs.length),
    hits: orgs.map((o: Record<string, any>) => ({
      ein: Number(o.ein),
      einFormatted: String(o.strein ?? o.ein),
      name: String(o.name ?? ""),
      city: o.city ?? null,
      state: o.state ?? null,
      nteeCode: o.ntee_code ?? null,
      subsection: o.subseccd != null ? Number(o.subseccd) : null,
    })),
  };
}

const FORM_TYPES: Record<number, string> = { 0: "990", 1: "990-EZ", 2: "990-PF" };

/** Full organization record with multi-year 990 financials, by EIN. */
export async function getNonprofit(ein: number | string): Promise<NonprofitDetail | null> {
  const id = String(ein).replace(/\D/g, "");
  let res: Record<string, any>;
  try {
    res = await api.get<Record<string, any>>(`/nonprofits/api/v2/organizations/${id}.json`, {});
  } catch (e) {
    if (/404|not found/i.test(String((e as Error).message))) return null;
    throw e;
  }
  const o = res.organization ?? {};
  const filings = (Array.isArray(res.filings_with_data) ? res.filings_with_data : [])
    .map((f: Record<string, any>): FilingYear => ({
      year: Number(f.tax_prd_yr),
      formType: FORM_TYPES[Number(f.formtype)] ?? String(f.formtype),
      totalRevenue: f.totrevenue ?? null,
      totalExpenses: f.totfuncexpns ?? null,
      totalAssets: f.totassetsend ?? null,
      totalLiabilities: f.totliabend ?? null,
      contributions: f.totcntrbgfts ?? null,
      programRevenue: f.totprgmrevnue ?? null,
      officerCompPct: f.pct_compnsatncurrofcr != null ? Number(f.pct_compnsatncurrofcr) : null,
      pdfUrl: f.pdf_url ?? null,
    }))
    .sort((a: FilingYear, b: FilingYear) => b.year - a.year);

  return {
    ein: Number(o.ein ?? id),
    name: String(o.name ?? ""),
    address: o.address ?? null,
    city: o.city ?? null,
    state: o.state ?? null,
    subsection: o.subsection_code != null ? Number(o.subsection_code) : null,
    nteeCode: o.ntee_code ?? null,
    rulingDate: o.ruling_date ?? null,
    latestAssetAmount: o.asset_amount != null ? Number(o.asset_amount) : null,
    filings,
  };
}

// ─── Cache management ────────────────────────────────────────────────

export function clearCache(): void {
  api.clearCache();
}
