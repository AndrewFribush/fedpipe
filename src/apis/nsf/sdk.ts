/**
 * NSF Awards SDK — typed client for the National Science Foundation awards API.
 *
 * API: {@link https://api.nsf.gov/} (no key required)
 * Docs: {@link https://www.research.gov/common/webapi/awardapisearch-v1.htm}
 *
 * Research-funding data: who received NSF grants, for what, and how much.
 * Complements the NIH RePORTER coverage in the `nih` module.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.nsf.gov",
  name: "nsf",
  rateLimit: { perSecond: 3, burst: 10 },
  cacheTtlMs: 6 * 60 * 60 * 1000,
  timeoutMs: 30_000,
});

export interface NsfAward {
  id: string;
  title: string;
  awardee: string | null;
  awardeeState: string | null;
  principalInvestigator: string | null;
  amount: number | null;
  startDate: string | null;
  agency: string | null;
  abstract: string | null;
}

function mapAward(a: Record<string, any>): NsfAward {
  return {
    id: String(a.id ?? ""),
    title: String(a.title ?? ""),
    awardee: a.awardeeName ?? null,
    awardeeState: a.awardeeStateCode ?? null,
    principalInvestigator: [a.piFirstName, a.piLastName].filter(Boolean).join(" ") || a.pdPIName || null,
    amount: a.fundsObligatedAmt != null ? Number(a.fundsObligatedAmt) : null,
    startDate: a.startDate ?? null,
    agency: a.agency ?? null,
    abstract: a.abstractText ? String(a.abstractText).slice(0, 1200) : null,
  };
}

const FIELDS = "id,title,awardeeName,awardeeStateCode,piFirstName,piLastName,pdPIName,fundsObligatedAmt,startDate,agency,abstractText";

/** Search NSF awards by keyword, awardee (institution), or PI name. */
export async function searchAwards(params: {
  keyword?: string;
  awardee?: string;
  piName?: string;
  state?: string;
  offset?: number;
  perPage?: number;
}): Promise<NsfAward[]> {
  const q: Record<string, string | number> = { printFields: FIELDS, rpp: Math.min(params.perPage ?? 20, 25) };
  if (params.keyword) q.keyword = params.keyword;
  if (params.awardee) q.awardeeName = params.awardee;
  if (params.piName) q.pdPIName = params.piName;
  if (params.state) q.awardeeStateCode = params.state.toUpperCase();
  if (params.offset) q.offset = params.offset;
  const res = await api.get<Record<string, any>>("/services/v1/awards.json", q);
  const awards = res.response?.award;
  return Array.isArray(awards) ? awards.map(mapAward) : [];
}

/** Fetch one award by its NSF award ID. */
export async function getAward(id: string): Promise<NsfAward | null> {
  const res = await api.get<Record<string, any>>("/services/v1/awards.json", { id: id.replace(/\D/g, ""), printFields: FIELDS });
  const a = res.response?.award?.[0];
  return a ? mapAward(a) : null;
}

export function clearCache(): void {
  api.clearCache();
}
