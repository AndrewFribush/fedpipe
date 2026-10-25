/**
 * FMCSA SDK — the Federal Motor Carrier Safety Administration QCMobile API
 * (mobile.fmcsa.dot.gov/qc), the machine interface to the SAFER company
 * snapshot: any interstate trucking or bus carrier's registration, fleet size,
 * safety rating, and BASIC safety-measurement scores.
 *
 * The road-safety complement to NHTSA (vehicles) and NTSB (crash investigations).
 *
 * Standalone — no MCP or Zod required:
 *   import { searchCarriers, getCarrier, getCarrierSafety } from "fedpipe/sdk/fmcsa";
 *
 * Requires FMCSA_WEBKEY (free): https://mobile.fmcsa.dot.gov/QCDevsite/docs/apiAccess
 * NOTE: pre-built and wired; endpoint paths confirmed keyless, but the response
 * shape below is pending a live audit once a webKey is configured.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://mobile.fmcsa.dot.gov",
  name: "fmcsa",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d
  auth: { type: "query", envParams: { webKey: "FMCSA_WEBKEY" } },
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface Carrier {
  dotNumber: number | null;
  legalName: string | null;
  dbaName: string | null;
  city: string | null;
  state: string | null;
  carrierOperation: string | null;
  totalDrivers: number | null;
  totalPowerUnits: number | null;
  safetyRating: string | null;
  safetyRatingDate: string | null;
  allowedToOperate: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const num = (v: unknown): number | null =>
  v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v);

/** The QCMobile responses wrap a carrier in various shapes; normalize. */
function toCarrier(c: any): Carrier {
  const car = c?.carrier ?? c ?? {};
  return {
    dotNumber: num(car.dotNumber),
    legalName: car.legalName ?? null,
    dbaName: car.dbaName ?? null,
    city: car.phyCity ?? null,
    state: car.phyState ?? null,
    carrierOperation: car.carrierOperation?.carrierOperationDesc ?? car.carrierOperation ?? null,
    totalDrivers: num(car.totalDrivers),
    totalPowerUnits: num(car.totalPowerUnits),
    safetyRating: car.safetyRating ?? null,
    safetyRatingDate: car.safetyRatingDate ?? null,
    allowedToOperate: car.allowedToOperate ?? null,
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/** Search carriers by name. */
export async function searchCarriers(name: string, limit = 25): Promise<Carrier[]> {
  const raw = await api.get<any>(`/qc/services/carriers/name/${encodeURIComponent(name)}`);
  const content: any[] = Array.isArray(raw?.content) ? raw.content : [];
  return content.slice(0, limit).map(toCarrier);
}

/** Full company snapshot for one carrier by USDOT number. */
export async function getCarrier(dotNumber: number | string): Promise<Carrier | null> {
  const raw = await api.get<any>(`/qc/services/carriers/${dotNumber}`);
  const content = raw?.content;
  if (!content) return null;
  return toCarrier(Array.isArray(content) ? content[0] : content);
}

/** BASIC safety-measurement scores for one carrier by USDOT number. */
export async function getCarrierSafety(dotNumber: number | string): Promise<Array<Record<string, unknown>>> {
  const raw = await api.get<any>(`/qc/services/carriers/${dotNumber}/basics`);
  const content: any[] = Array.isArray(raw?.content) ? raw.content : raw?.content ? [raw.content] : [];
  return content.map((b: any) => b?.basic ?? b);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
