/**
 * WHO SDK — the World Health Organization Global Health Observatory (GHO)
 * OData API (ghoapi.azureedge.net).
 *
 * WHO's global health statistics for ~200 countries: life expectancy, mortality,
 * disease burden, immunization coverage, risk factors (tobacco, obesity, alcohol),
 * health-system capacity, and the SDG health indicators. The global public-health
 * complement to CDC (U.S.).
 *
 * Standalone — no MCP or Zod required:
 *   import { getIndicator, searchIndicators } from "fedpipe/sdk/who";
 *
 * Keyless: the GHO OData API serves open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://ghoapi.azureedge.net",
  name: "who",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d
});

// ─── Types ───────────────────────────────────────────────────────────

export interface IndicatorInfo {
  code: string;
  name: string;
}

export interface WhoObservation {
  country: string | null;
  region: string | null;
  year: number | null;
  dimension: string | null;
  value: number | null;
  display: string | null;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Observations for one GHO indicator, optionally filtered to a country and years.
 *
 * - `indicator`: a GHO indicator code (e.g. "WHOSIS_000001" life expectancy at birth).
 * - `country`: ISO-3 code (e.g. "USA"). Omit for all countries.
 * - `start`/`end`: 4-digit years.
 */
export async function getIndicator(opts: {
  indicator: string;
  country?: string;
  start?: number;
  end?: number;
  limit?: number;
}): Promise<WhoObservation[]> {
  const clauses: string[] = [];
  if (opts.country) clauses.push(`SpatialDim eq '${opts.country.toUpperCase()}'`);
  if (opts.start != null) clauses.push(`TimeDim ge ${opts.start}`);
  if (opts.end != null) clauses.push(`TimeDim le ${opts.end}`);

  const params: Record<string, string | number> = { "$top": opts.limit ?? 500 };
  if (clauses.length) params["$filter"] = clauses.join(" and ");

  const raw = await api.get<any>(`/api/${encodeURIComponent(opts.indicator)}`, qp(params));
  const rows: any[] = raw?.value ?? [];
  return rows
    .map((r) => ({
      country: r.SpatialDim ?? null,
      region: r.ParentLocation ?? null,
      year: r.TimeDim ?? null,
      dimension: r.Dim1 ?? null,
      value: r.NumericValue ?? null,
      display: r.Value ?? null,
    }))
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
}

/** Search the GHO indicator catalog by a substring of the name/code. */
export async function searchIndicators(query: string, limit = 40): Promise<IndicatorInfo[]> {
  const raw = await api.get<any>("/api/Indicator");
  const all: any[] = raw?.value ?? [];
  const q = query.toLowerCase();
  const out: IndicatorInfo[] = [];
  for (const r of all) {
    const name = String(r.IndicatorName ?? "");
    const code = String(r.IndicatorCode ?? "");
    if (!q || name.toLowerCase().includes(q) || code.toLowerCase().includes(q)) {
      out.push({ code, name });
      if (out.length >= limit) break;
    }
  }
  return out;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
