/**
 * GLEIF SDK - typed client for the Global LEI Foundation registry.
 *
 * API: {@link https://api.gleif.org/api/v1} (JSON:API format)
 * Docs: {@link https://www.gleif.org/en/lei-data/gleif-api}
 *
 * No API key required. Rate limit: 60 requests/minute per IP.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.gleif.org",
  name: "gleif",
  rateLimit: { perSecond: 1, burst: 5 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // golden copy republishes daily
  timeoutMs: 30_000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Flattened LEI record (from the JSON:API attributes envelope). */
export interface LeiRecord {
  lei: string;
  legalName: string;
  jurisdiction: string;
  status: string;            // entity status: ACTIVE / INACTIVE
  registrationStatus: string; // LEI registration: ISSUED / LAPSED / ...
  category: string | null;
  legalForm: string | null;
  city: string | null;
  country: string | null;
  headquartersCity: string | null;
  headquartersCountry: string | null;
  registeredAs: string | null; // local business-registry number
  otherNames: string[];
  successorLei: string | null;
}

export interface LeiSearchResult {
  total: number;
  records: LeiRecord[];
}

// ─── Helpers ─────────────────────────────────────────────────────────

function mapRecord(raw: Record<string, unknown>): LeiRecord {
  const a = (raw.attributes ?? {}) as Record<string, any>;
  const e = a.entity ?? {};
  return {
    lei: String(a.lei ?? raw.id ?? ""),
    legalName: String(e.legalName?.name ?? ""),
    jurisdiction: String(e.jurisdiction ?? ""),
    status: String(e.status ?? ""),
    registrationStatus: String(a.registration?.status ?? ""),
    category: e.category ?? null,
    legalForm: e.legalForm?.other ?? e.legalForm?.id ?? null,
    city: e.legalAddress?.city ?? null,
    country: e.legalAddress?.country ?? null,
    headquartersCity: e.headquartersAddress?.city ?? null,
    headquartersCountry: e.headquartersAddress?.country ?? null,
    registeredAs: e.registeredAs ?? null,
    otherNames: Array.isArray(e.otherNames) ? e.otherNames.map((n: any) => String(n?.name ?? n)).filter(Boolean) : [],
    successorLei: e.successorEntity?.lei ?? null,
  };
}

/** GLEIF reports "no parent" as HTTP 404 - treat it as absence. */
async function relatedOrNull(path: string): Promise<LeiRecord | null> {
  try {
    const res = await api.get<Record<string, unknown>>(path, {});
    const data = res.data as Record<string, unknown> | undefined;
    return data ? mapRecord(data) : null;
  } catch (e) {
    if (/404|not found/i.test(String((e as Error).message))) return null;
    throw e;
  }
}

// ─── API functions ───────────────────────────────────────────────────

/**
 * Search LEI records. `match: "name"` restricts to legal names (supports a
 * trailing `*` wildcard); `"fulltext"` (default) also matches addresses and
 * other names.
 */
export async function searchLei(params: {
  query: string;
  match?: "fulltext" | "name";
  country?: string;
  page?: number;
  pageSize?: number;
}): Promise<LeiSearchResult> {
  const q: Record<string, string | number> = {
    "page[number]": params.page ?? 1,
    "page[size]": params.pageSize ?? 10,
  };
  if (params.match === "name") {
    // Auto-wildcard: exact legalName matching is almost never what a caller
    // wants ("Boeing" should find "Boeing Company").
    q["filter[entity.legalName]"] = /[*]/.test(params.query) ? params.query : `*${params.query}*`;
  } else {
    q["filter[fulltext]"] = params.query;
  }
  if (params.country) q["filter[entity.legalAddress.country]"] = params.country.toUpperCase();

  const res = await api.get<Record<string, unknown>>("/api/v1/lei-records", q);
  const meta = res.meta as Record<string, any> | undefined;
  const data = Array.isArray(res.data) ? res.data : [];
  return {
    total: Number(meta?.pagination?.total ?? data.length),
    records: data.map((d: Record<string, unknown>) => mapRecord(d)),
  };
}

/** Fetch one LEI record by its 20-character LEI. */
export async function getLeiRecord(lei: string): Promise<LeiRecord | null> {
  return relatedOrNull(`/api/v1/lei-records/${encodeURIComponent(lei.trim().toUpperCase())}`);
}

/**
 * Corporate structure for an LEI: direct parent, ultimate parent, and
 * direct children. Missing parents (404) mean the entity reports none.
 */
export async function getOwnership(lei: string): Promise<{
  directParent: LeiRecord | null;
  ultimateParent: LeiRecord | null;
  children: LeiRecord[];
  childrenTotal: number;
}> {
  const id = encodeURIComponent(lei.trim().toUpperCase());
  const [directParent, ultimateParent, childrenRes] = await Promise.all([
    relatedOrNull(`/api/v1/lei-records/${id}/direct-parent`),
    relatedOrNull(`/api/v1/lei-records/${id}/ultimate-parent`),
    api.get<Record<string, unknown>>(`/api/v1/lei-records/${id}/direct-children`, { "page[size]": 25 })
      .catch(() => ({}) as Record<string, unknown>),
  ]);
  const childData = Array.isArray(childrenRes.data) ? childrenRes.data : [];
  const childMeta = childrenRes.meta as Record<string, any> | undefined;
  return {
    directParent,
    ultimateParent,
    children: childData.map((d: Record<string, unknown>) => mapRecord(d)),
    childrenTotal: Number(childMeta?.pagination?.total ?? childData.length),
  };
}

// ─── Cache management ────────────────────────────────────────────────

export function clearCache(): void {
  api.clearCache();
}
