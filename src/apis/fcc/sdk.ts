/**
 * FCC ECFS SDK — typed client for the FCC Electronic Comment Filing System.
 *
 * API: {@link https://publicapi.fcc.gov/ecfs} (uses an api.data.gov key)
 * Docs: {@link https://www.fcc.gov/ecfs/public-api-docs.html}
 *
 * Public comments and filings on FCC proceedings (net neutrality, spectrum,
 * broadband, media). The Regulations.gov analogue for the FCC.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://publicapi.fcc.gov",
  name: "fcc",
  auth: { type: "query", envParams: { api_key: "DATA_GOV_API_KEY" } },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000,
  timeoutMs: 30_000,
});

export interface EcfsFiling {
  id: string;
  proceedings: string[];
  filers: string[];
  type: string | null;
  dateReceived: string | null;
  text: string | null;
  documentUrls: string[];
}

function mapFiling(f: Record<string, any>): EcfsFiling {
  return {
    id: String(f.id_submission ?? ""),
    proceedings: Array.isArray(f.proceedings) ? f.proceedings.map((p: any) => String(p.name ?? "")).filter(Boolean) : [],
    filers: Array.isArray(f.filers) ? f.filers.map((p: any) => String(p.name ?? "")).filter(Boolean) : [],
    type: f.submissiontype?.description ?? f.submissiontype?.short ?? null,
    dateReceived: f.date_received ?? f.date_disseminated ?? null,
    text: f.text_data ? String(f.text_data).replace(/\s+/g, " ").trim().slice(0, 600) : null,
    documentUrls: Array.isArray(f.documents) ? f.documents.map((d: any) => d.src ?? d.download_url).filter(Boolean) : [],
  };
}

/** Search ECFS filings by proceeding docket, filer name, or full text. */
export async function searchFilings(params: {
  proceeding?: string;
  filer?: string;
  query?: string;
  limit?: number;
}): Promise<EcfsFiling[]> {
  const q: Record<string, string | number> = {
    limit: Math.min(params.limit ?? 15, 50),
    sort: "date_received,DESC",
  };
  if (params.proceeding) q["proceedings.name"] = params.proceeding;
  if (params.filer) q["filers.name"] = params.filer;
  if (params.query) q.q = params.query;
  const res = await api.get<Record<string, any>>("/ecfs/filings", q);
  const filings = res.filing ?? res.filings;
  return Array.isArray(filings) ? filings.map(mapFiling) : [];
}

export function clearCache(): void {
  api.clearCache();
}
