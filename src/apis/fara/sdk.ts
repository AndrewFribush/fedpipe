/**
 * FARA SDK — typed client for the DOJ Foreign Agents Registration Act API.
 *
 * API: {@link https://efile.fara.gov/api/v1} (no key required)
 * Docs: {@link https://efile.fara.gov/ords/fara/f?p=API:ENDPOINTS}
 *
 * Who registers as an agent of a foreign principal (government, party, company)
 * — the foreign-influence transparency record. The active-registrants endpoint
 * returns the full list, so this filters by name in memory.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://efile.fara.gov",
  name: "fara",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 12 * 60 * 60 * 1000,
  timeoutMs: 30_000,
});

export interface FaraRegistrant {
  registrationNumber: string;
  name: string;
  businessName: string | null;
  location: string | null;
  registrationDate: string | null;
}

function mapRow(r: Record<string, any>): FaraRegistrant {
  return {
    registrationNumber: String(r.Registration_Number ?? ""),
    name: String(r.Name ?? ""),
    businessName: r.Business_Name ?? null,
    location: [r.City, r.State].filter(Boolean).join(", ") || null,
    registrationDate: r.Registration_Date ?? null,
  };
}

/** All currently active FARA registrants (the API returns the full list). */
export async function activeRegistrants(): Promise<FaraRegistrant[]> {
  const res = await api.get<Record<string, any>>("/api/v1/Registrants/json/Active", {});
  const rows = res.REGISTRANTS_ACTIVE?.ROW;
  return Array.isArray(rows) ? rows.map(mapRow) : rows ? [mapRow(rows)] : [];
}

/** Filter active registrants by name / business-name substring. */
export async function searchRegistrants(query: string): Promise<FaraRegistrant[]> {
  const q = query.toLowerCase();
  return (await activeRegistrants()).filter(r =>
    r.name.toLowerCase().includes(q) || (r.businessName ?? "").toLowerCase().includes(q));
}

export function clearCache(): void {
  api.clearCache();
}
