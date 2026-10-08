/**
 * USACE National Inventory of Dams (NID) SDK — nid.sec.usace.army.mil.
 *
 * The U.S. Army Corps of Engineers' authoritative inventory of the nation's
 * ~92,000 dams: location, size (height, storage), purpose, owner, downstream
 * hazard potential, condition assessment, and emergency-action-plan status.
 * The natural join partner for FEMA flood declarations and USGS streamflow.
 *
 * Standalone — no MCP or Zod required:
 *   import { searchDams, getDam } from "fedpipe/sdk/usace-nid";
 *
 * Keyless: the NID public API serves open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://nid.sec.usace.army.mil",
  name: "usace-nid",
  cacheTtlMs: 7 * 24 * 60 * 60 * 1000, // 7d — the inventory changes slowly
});

// ─── Types ───────────────────────────────────────────────────────────

export interface DamMatch {
  id: string;
  name: string;
  countyState: string | null;
  federalId: string;
}

export interface DamRecord {
  name: string;
  federalId: string;
  river: string | null;
  city: string | null;
  county: string | null;
  state: string | null;
  yearCompleted: number | null;
  owner: string | null;
  heightFt: number | null;
  maxStorageAcreFt: number | null;
  normalStorageAcreFt: number | null;
  maxDischargeCfs: number | null;
  drainageAreaSqMi: number | null;
  condition: string | null;
  latitude: number | null;
  longitude: number | null;
  lastInspection: string | null;
  eapLastRevised: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const n = (v: unknown): number | null =>
  v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v);

const date = (v: unknown): string | null =>
  typeof v === "string" && v ? v.slice(0, 10) : null;

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search dams by free text — a dam name, city, or "County, State".
 * Returns matches with their federal ID (pass it to getDam for full detail).
 */
export async function searchDams(text: string, limit = 25): Promise<DamMatch[]> {
  // The NID typeahead expects a single fragment; a "Place, State" query confuses
  // it. Split on comma: search the first part, then prefer matches whose
  // county/state contains the remainder (e.g. "Pueblo, Colorado").
  const parts = String(text).split(",").map((s) => s.trim()).filter(Boolean);
  const term = parts[0] ?? text;
  const locality = parts.slice(1).join(", ").toLowerCase();

  const raw = await api.get<any>("/api/suggestions", qp({ text: term }));
  let dams: any[] = raw?.dams ?? [];

  if (locality) {
    const filtered = dams.filter((d) => String(d.countyState ?? "").toLowerCase().includes(locality));
    if (filtered.length) dams = filtered;
  }

  return dams.slice(0, limit).map((d) => ({
    id: String(d.id),
    name: d.name,
    countyState: d.countyState ?? null,
    federalId: d.federalId,
  }));
}

/**
 * Full inventory record for one dam, by its federal ID (e.g. "CO00299").
 * Reports the standard NID height and storage figures.
 */
export async function getDam(federalId: string): Promise<DamRecord | null> {
  const r = await api.get<any>(`/api/dams/${encodeURIComponent(federalId)}/inventory`);
  if (!r || !r.federalId) return null;
  return {
    name: r.name,
    federalId: r.federalId,
    river: r.riverName ?? null,
    city: r.city ?? null,
    county: r.county ?? null,
    state: r.state ?? null,
    yearCompleted: n(r.yearCompleted),
    owner: r.ownerNames ?? null,
    heightFt: n(r.nidHeight) ?? n(r.damHeight),
    maxStorageAcreFt: n(r.nidStorage) ?? n(r.maxStorage),
    normalStorageAcreFt: n(r.normalStorage),
    maxDischargeCfs: n(r.maxDischarge),
    drainageAreaSqMi: n(r.drainageArea),
    condition: r.conditionAssessDetail ?? null,
    latitude: n(r.latitude),
    longitude: n(r.longitude),
    lastInspection: date(r.inspectionDate),
    eapLastRevised: date(r.eapLastRevDate),
  };
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
