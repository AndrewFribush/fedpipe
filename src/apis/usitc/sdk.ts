/**
 * USITC SDK — the U.S. International Trade Commission DataWeb API
 * (datawebws.usitc.gov/dataweb/api/v2), the machine interface to official U.S.
 * merchandise trade statistics: imports and exports by HTS commodity, country,
 * district, and month/year, plus tariff data. The authoritative source for
 * U.S. trade flows — the complement to Census foreign-trade and BEA's ITA.
 *
 * DataWeb is a query/report engine: build and save a query in the DataWeb UI,
 * then list and run it here — or POST a full report definition directly.
 *
 * Standalone — no MCP or Zod required:
 *   import { getSavedQueries, runReport } from "fedpipe/sdk/usitc";
 *
 * Requires USITC_API_TOKEN (free, generated in a dataweb.usitc.gov account),
 * sent as a Bearer token. NOTE: the report-body schema is DataWeb-specific and
 * pending a live audit once a token is configured.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://datawebws.usitc.gov",
  name: "usitc",
  cacheTtlMs: 6 * 60 * 60 * 1000, // 6h
  timeoutMs: 60_000,
  auth: {
    type: "header",
    envParams: { Authorization: "USITC_API_TOKEN" },
    prefix: "Bearer ",
  },
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

// ─── Public API ──────────────────────────────────────────────────────

/** List the caller's saved DataWeb queries (build them in the DataWeb UI). */
export async function getSavedQueries(): Promise<Array<Record<string, unknown>>> {
  const raw = await api.get<any>("/dataweb/api/v2/savedQuery/getAllSavedQueries");
  if (Array.isArray(raw)) return raw;
  return raw?.list ?? raw?.savedQueries ?? [];
}

/**
 * Run a DataWeb report from a full report definition.
 * The `query` object is the DataWeb runReport body (as exported/saved from the
 * DataWeb UI). Returns the report result as-is.
 */
export async function runReport(query: Record<string, unknown>): Promise<unknown> {
  return api.post<unknown>("/dataweb/api/v2/report2/runReport", query);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
