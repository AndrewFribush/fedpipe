/**
 * FEMA NFIP SDK — National Flood Insurance Program claims, via OpenFEMA.
 *
 * API: {@link https://www.fema.gov/api/open/v3/NfipClaims} (OpenFEMA; no key)
 *
 * Redacted flood-insurance claim records — where floods caused insured losses,
 * what was paid, and why. Complements the `fema` disaster-declarations module
 * with the dollars-and-place view of flood damage.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://www.fema.gov",
  name: "nfip",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 12 * 60 * 60 * 1000,
  timeoutMs: 45_000,
});

export interface NfipClaim {
  dateOfLoss: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
  countyCode: string | null;
  floodZone: string | null;
  causeOfDamage: string | null;
  occupancyType: number | null;
  buildingPaid: number | null;
  contentsPaid: number | null;
  totalPaid: number | null;
  buildingCoverage: number | null;
}

const n = (v: unknown) => { const x = Number(v); return Number.isFinite(x) && v != null ? x : null; };

function mapClaim(c: Record<string, any>): NfipClaim {
  const bp = n(c.amountPaidOnBuildingClaim), cp = n(c.amountPaidOnContentsClaim);
  return {
    dateOfLoss: c.dateOfLoss ? String(c.dateOfLoss).slice(0, 10) : null,
    state: c.state ?? null,
    city: c.reportedCity ?? null,
    zip: c.reportedZipCode != null ? String(c.reportedZipCode) : null,
    countyCode: c.countyCode != null ? String(c.countyCode) : null,
    floodZone: c.ratedFloodZone ?? null,
    causeOfDamage: c.causeOfDamage != null ? String(c.causeOfDamage) : null,
    occupancyType: n(c.occupancyType),
    buildingPaid: bp,
    contentsPaid: cp,
    totalPaid: bp != null || cp != null ? (bp ?? 0) + (cp ?? 0) : null,
    buildingCoverage: n(c.totalBuildingInsuranceCoverage),
  };
}

const SELECT = "dateOfLoss,state,reportedCity,reportedZipCode,countyCode,ratedFloodZone,causeOfDamage,occupancyType,amountPaidOnBuildingClaim,amountPaidOnContentsClaim,totalBuildingInsuranceCoverage";

/** Query NFIP flood-insurance claims by state, year, or flood zone. */
export async function searchClaims(params: {
  state?: string;
  year?: number;
  floodZone?: string;
  limit?: number;
}): Promise<{ claims: NfipClaim[]; total: number }> {
  const filters: string[] = [];
  if (params.state) filters.push(`state eq '${params.state.toUpperCase()}'`);
  if (params.year) filters.push(`yearOfLoss eq ${params.year}`);
  if (params.floodZone) filters.push(`ratedFloodZone eq '${params.floodZone.toUpperCase()}'`);
  const q: Record<string, string | number> = {
    $select: SELECT,
    $top: Math.min(params.limit ?? 20, 100),
    $orderby: "dateOfLoss desc",
    $inlinecount: "allpages",
  };
  if (filters.length) q.$filter = filters.join(" and ");
  const res = await api.get<Record<string, any>>("/api/open/v3/NfipClaims", q);
  const claims = Array.isArray(res.NfipClaims) ? res.NfipClaims.map(mapClaim) : [];
  const total = Number(res.metadata?.count ?? claims.length);
  return { claims, total };
}

export function clearCache(): void {
  api.clearCache();
}
