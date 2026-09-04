/**
 * IMF SDK — the International Monetary Fund DataMapper API
 * (imf.org/external/datamapper/api/v1).
 *
 * The IMF's headline macro indicators for ~200 economies: GDP growth, inflation,
 * government debt and deficits, current account, unemployment, and more — the
 * World Economic Outlook and Fiscal Monitor series, with IMF forecasts extending
 * several years past the present. The international complement to FRED/BEA/BLS.
 *
 * Standalone — no MCP or Zod required:
 *   import { getIndicator, searchIndicators } from "fedpipe/sdk/imf";
 *
 * Keyless: the IMF DataMapper serves open data with no signup.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://www.imf.org",
  name: "imf",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

const PREFIX = "/external/datamapper/api/v1";

// ─── Types ───────────────────────────────────────────────────────────

export interface IndicatorInfo {
  code: string;
  label: string;
  unit: string | null;
  source: string | null;
}

export interface CountrySeries {
  iso3: string;
  points: Array<{ year: string; value: number | null }>;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Values of one indicator for one or more countries over time.
 *
 * - `indicator`: an IMF indicator code (e.g. "NGDP_RPCH" real GDP growth,
 *   "PCPIPCH" inflation, "GGXWDG_NGDP" gov gross debt %GDP). Use searchIndicators.
 * - `countries`: ISO-3 codes (e.g. ["USA","CHN"]). Omit for all economies.
 * - `start`/`end`: 4-digit years to bound the series (IMF data includes forecasts).
 */
export async function getIndicator(opts: {
  indicator: string;
  countries?: string[];
  start?: number;
  end?: number;
}): Promise<{ indicator: string; series: CountrySeries[] }> {
  const codes = (opts.countries ?? []).map((c) => c.toUpperCase());
  const path = codes.length ? `${PREFIX}/${opts.indicator}/${codes.join("/")}` : `${PREFIX}/${opts.indicator}`;
  const raw = await api.get<any>(path);

  const byCountry: Record<string, Record<string, number>> = raw?.values?.[opts.indicator] ?? {};
  const wanted = codes.length ? codes : Object.keys(byCountry);

  const series: CountrySeries[] = wanted
    .filter((iso3) => byCountry[iso3])
    .map((iso3) => {
      let years = Object.keys(byCountry[iso3]).sort();
      if (opts.start != null) years = years.filter((y) => Number(y) >= opts.start!);
      if (opts.end != null) years = years.filter((y) => Number(y) <= opts.end!);
      return { iso3, points: years.map((y) => ({ year: y, value: byCountry[iso3][y] ?? null })) };
    });

  return { indicator: opts.indicator, series };
}

/** Search the IMF indicator catalog by a substring of the label/description. */
export async function searchIndicators(query: string, limit = 40): Promise<IndicatorInfo[]> {
  const raw = await api.get<any>(`${PREFIX}/indicators`);
  const bag: Record<string, any> = raw?.indicators ?? {};
  const q = query.toLowerCase();
  const out: IndicatorInfo[] = [];
  for (const [code, info] of Object.entries(bag)) {
    const label = String(info?.label ?? "");
    if (!q || label.toLowerCase().includes(q) || code.toLowerCase().includes(q)) {
      out.push({ code, label, unit: info?.unit ?? null, source: info?.source ?? null });
    }
    if (out.length >= limit) break;
  }
  return out;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
