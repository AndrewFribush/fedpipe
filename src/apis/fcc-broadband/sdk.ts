/**
 * FCC Broadband SDK — the FCC Broadband Data Collection (BDC) public API
 * (bdc.fcc.gov), the machine interface to the National Broadband Map:
 * fixed and mobile broadband availability by provider, technology, and speed,
 * down to the location level. The digital-divide layer that pairs with Census.
 *
 * The BDC API is catalog/download-oriented: you list the available data vintages
 * ("as-of dates") and the downloadable availability datasets for one.
 *
 * Standalone — no MCP or Zod required:
 *   import { getAsOfDates, listAvailabilityData } from "fedpipe/sdk/fcc-broadband";
 *
 * Requires FCC_BDC_USERNAME + FCC_BDC_TOKEN (free, from a bdc.fcc.gov account),
 * sent as request headers. NOTE: pre-built and wired; the confirmed path returns
 * HTTP 401 without credentials, so response mapping is pending a live audit.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://bdc.fcc.gov",
  name: "fcc-broadband",
  cacheTtlMs: 6 * 60 * 60 * 1000, // 6h
  timeoutMs: 45_000,
  auth: {
    type: "header",
    envParams: { username: "FCC_BDC_USERNAME", hash_value: "FCC_BDC_TOKEN" },
  },
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

// ─── Public API ──────────────────────────────────────────────────────

/** List the available data vintages ("as-of dates") for the National Broadband Map. */
export async function getAsOfDates(): Promise<Array<Record<string, unknown>>> {
  const raw = await api.get<any>("/api/public/map/listAsOfDates");
  if (Array.isArray(raw)) return raw;
  return raw?.data ?? raw?.asOfDates ?? [];
}

/**
 * List the downloadable broadband-availability datasets for one as-of date.
 * @param asOfDate e.g. "2024-06-30"
 */
export async function listAvailabilityData(opts: {
  asOfDate: string;
  category?: string;
  subcategory?: string;
}): Promise<Array<Record<string, unknown>>> {
  const raw = await api.get<any>(
    `/api/public/map/downloads/listAvailabilityData/${encodeURIComponent(opts.asOfDate)}`,
  );
  const rows: any[] = Array.isArray(raw) ? raw : raw?.data ?? [];
  let out = rows;
  if (opts.category) out = out.filter((r) => String(r.category ?? "").toLowerCase() === opts.category!.toLowerCase());
  if (opts.subcategory) out = out.filter((r) => String(r.subcategory ?? "").toLowerCase() === opts.subcategory!.toLowerCase());
  return out;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
