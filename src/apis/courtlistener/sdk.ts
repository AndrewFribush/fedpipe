/**
 * CourtListener SDK - typed client for the Free Law Project's REST API.
 *
 * API: {@link https://www.courtlistener.com/api/rest/v4/}
 * Docs: {@link https://www.courtlistener.com/help/api/rest/}
 *
 * Search works without credentials; opinion/docket detail endpoints require a
 * free API token (COURTLISTENER_API_TOKEN). Anonymous callers share a low
 * rate limit - the token also raises it.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://www.courtlistener.com",
  name: "courtlistener",
  auth: {
    type: "header",
    envParams: { Authorization: "COURTLISTENER_API_TOKEN" },
    prefix: "Token ",
  },
  rateLimit: { perSecond: 1, burst: 3 },
  cacheTtlMs: 60 * 60 * 1000,
  timeoutMs: 45_000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** One search hit, normalized across opinion (o) and docket (d) results. */
export interface CaseHit {
  caseName: string;
  court: string;
  courtId: string;
  dateFiled: string | null;
  docketNumber: string | null;
  url: string;               // absolute courtlistener.com URL
  docketId: number | null;
  // opinion-only
  citation: string[] | null;
  citeCount: number | null;
  opinionId: number | null;
  snippet: string | null;
  // docket-only
  judge: string | null;
  dateTerminated: string | null;
  natureOfSuit: string | null;
}

export interface CaseSearchResult {
  total: number;
  hits: CaseHit[];
}

// ─── Helpers ─────────────────────────────────────────────────────────

function mapHit(r: Record<string, any>): CaseHit {
  return {
    caseName: String(r.caseName ?? r.case_name ?? ""),
    court: String(r.court ?? ""),
    courtId: String(r.court_id ?? ""),
    dateFiled: r.dateFiled ?? null,
    docketNumber: r.docketNumber ?? null,
    url: r.absolute_url ? `https://www.courtlistener.com${r.absolute_url}` : (r.docket_absolute_url ? `https://www.courtlistener.com${r.docket_absolute_url}` : ""),
    docketId: r.docket_id != null ? Number(r.docket_id) : null,
    citation: Array.isArray(r.citation) ? r.citation : null,
    citeCount: r.citeCount != null ? Number(r.citeCount) : null,
    opinionId: Array.isArray(r.opinions) && r.opinions[0]?.id != null ? Number(r.opinions[0].id) : null,
    snippet: Array.isArray(r.opinions) && r.opinions[0]?.snippet ? String(r.opinions[0].snippet).slice(0, 300) : null,
    judge: r.judge || r.assignedTo || null,
    dateTerminated: r.dateTerminated ?? null,
    natureOfSuit: r.suitNature ?? null,
  };
}

// ─── API functions ───────────────────────────────────────────────────

/**
 * Full-text search over case law opinions (`type: "o"`), RECAP/PACER dockets
 * (`"d"`), or RECAP filed documents (`"r"`). Supports fielded queries like
 * `caseName:apple` and date bounds.
 */
export async function searchCases(params: {
  query: string;
  type?: "o" | "d" | "r";
  court?: string;
  filedAfter?: string;  // YYYY-MM-DD
  filedBefore?: string; // YYYY-MM-DD
  orderBy?: string;     // "score desc" (default), "dateFiled desc", "citeCount desc"
}): Promise<CaseSearchResult> {
  const q: Record<string, string> = {
    q: params.query,
    type: params.type ?? "o",
    order_by: params.orderBy ?? "score desc",
  };
  if (params.court) q.court = params.court;
  if (params.filedAfter) q.filed_after = params.filedAfter;
  if (params.filedBefore) q.filed_before = params.filedBefore;

  const res = await api.get<Record<string, unknown>>("/api/rest/v4/search/", q);
  const results = Array.isArray(res.results) ? res.results : [];
  return { total: Number(res.count ?? results.length), hits: results.map((r: Record<string, any>) => mapHit(r)) };
}

/** Full opinion record; `plain_text` can run to hundreds of KB. Requires token. */
export async function getOpinion(opinionId: number): Promise<{
  id: number;
  plainText: string;
  downloadUrl: string | null;
  author: string | null;
  perCuriam: boolean;
}> {
  const r = await api.get<Record<string, any>>(`/api/rest/v4/opinions/${opinionId}/`, {
    fields: "id,plain_text,download_url,author_str,per_curiam",
  });
  return {
    id: Number(r.id ?? opinionId),
    plainText: String(r.plain_text ?? ""),
    downloadUrl: r.download_url ?? null,
    author: r.author_str || null,
    perCuriam: !!r.per_curiam,
  };
}

/** Docket metadata by CourtListener docket ID (from search hits). Requires token. */
export async function getDocket(docketId: number): Promise<Record<string, unknown>> {
  const r = await api.get<Record<string, any>>(`/api/rest/v4/dockets/${docketId}/`, {});
  return {
    id: r.id,
    caseName: r.case_name,
    court: r.court_id,
    docketNumber: r.docket_number,
    dateFiled: r.date_filed,
    dateTerminated: r.date_terminated,
    assignedTo: r.assigned_to_str || null,
    cause: r.cause || null,
    natureOfSuit: r.nature_of_suit || null,
    jurisdictionType: r.jurisdiction_type || null,
    pacerCaseId: r.pacer_case_id || null,
    url: r.absolute_url ? `https://www.courtlistener.com${r.absolute_url}` : null,
  };
}

// ─── Cache management ────────────────────────────────────────────────

export function clearCache(): void {
  api.clearCache();
}
