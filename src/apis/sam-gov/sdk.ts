/**
 * SAM.gov SDK — the System for Award Management APIs (api.sam.gov).
 *
 * SAM.gov is the federal registration and eligibility system. This covers:
 *   - Entity Management: every entity registered to do business with the
 *     government (UEI, CAGE, legal name, address, NAICS, registration status).
 *   - Exclusions: the debarment list — entities/people barred from federal
 *     awards. The compliance screen that pairs with USAspending and SEC.
 *   - Contract Opportunities: active solicitations (the successor to FedBizOpps).
 *
 * Standalone — no MCP or Zod required:
 *   import { searchEntities, getExclusions, searchOpportunities } from "fedpipe/sdk/sam-gov";
 *
 * Requires SAM_API_KEY (free, from a SAM.gov account): https://sam.gov/content/api-keys
 * NOTE: pre-built and wired against SAM's documented v3/v4/v2 endpoints. SAM's
 * gateway rejects keyless/edge requests with a bare 404, so the response-field
 * mapping here is pending a live audit once a key is configured.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.sam.gov",
  name: "sam-gov",
  cacheTtlMs: 60 * 60 * 1000, // 1h
  timeoutMs: 45_000,
  auth: { type: "query", envParams: { api_key: "SAM_API_KEY" } },
  defaultHeaders: { "User-Agent": "fedpipe/1.0 (+https://github.com/AndrewFribush/fedpipe)" },
});

// ─── Public API ──────────────────────────────────────────────────────

/** Search registered entities by legal business name or UEI. */
export async function searchEntities(opts: {
  name?: string;
  uei?: string;
  limit?: number;
}): Promise<{ total: number; entities: Array<Record<string, unknown>> }> {
  const raw = await api.get<any>("/entity-information/v3/entities", qp({
    legalBusinessName: opts.name,
    ueiSAM: opts.uei,
    includeSections: "entityRegistration,coreData",
    registrationStatus: "A",
    page: 0,
    size: opts.limit ?? 10,
  }));
  const data: any[] = raw?.entityData ?? [];
  const entities = data.map((e) => {
    const reg = e.entityRegistration ?? {};
    const addr = e.coreData?.physicalAddress ?? {};
    return {
      uei: reg.ueiSAM ?? null,
      cage: reg.cageCode ?? null,
      name: reg.legalBusinessName ?? null,
      dba: reg.dbaName ?? null,
      status: reg.registrationStatus ?? null,
      registrationExpiration: reg.registrationExpirationDate ?? null,
      city: addr.city ?? null,
      state: addr.stateOrProvinceCode ?? null,
      country: addr.countryCode ?? null,
    };
  });
  return { total: raw?.totalRecords ?? entities.length, entities };
}

/** Search the exclusions (debarment) list by name. */
export async function getExclusions(opts: {
  name?: string;
  limit?: number;
}): Promise<{ total: number; exclusions: Array<Record<string, unknown>> }> {
  const raw = await api.get<any>("/entity-information/v4/exclusions", qp({
    exclusionName: opts.name,
    page: 0,
    size: opts.limit ?? 10,
  }));
  const data: any[] = raw?.excludedEntity ?? raw?.exclusionDetails ?? [];
  const exclusions = data.map((x) => ({
    name: x?.exclusionName ?? x?.name ?? null,
    type: x?.exclusionType ?? x?.classificationType ?? null,
    program: x?.exclusionProgram ?? null,
    agency: x?.excludingAgencyName ?? null,
    activeDate: x?.activeDate ?? null,
    terminationDate: x?.terminationDate ?? null,
  }));
  return { total: raw?.totalRecords ?? exclusions.length, exclusions };
}

/** Search active contract opportunities (solicitations). Date format MM/DD/YYYY. */
export async function searchOpportunities(opts: {
  title?: string;
  postedFrom: string;
  postedTo: string;
  limit?: number;
}): Promise<{ total: number; opportunities: Array<Record<string, unknown>> }> {
  const raw = await api.get<any>("/opportunities/v2/search", qp({
    title: opts.title,
    postedFrom: opts.postedFrom,
    postedTo: opts.postedTo,
    limit: opts.limit ?? 20,
  }));
  const data: any[] = raw?.opportunitiesData ?? [];
  const opportunities = data.map((o) => ({
    title: o.title ?? null,
    solicitationNumber: o.solicitationNumber ?? null,
    department: o.fullParentPathName ?? o.department ?? null,
    type: o.type ?? null,
    naics: o.naicsCode ?? null,
    postedDate: o.postedDate ?? null,
    responseDeadline: o.responseDeadLine ?? null,
    link: o.uiLink ?? null,
  }));
  return { total: raw?.totalRecords ?? opportunities.length, opportunities };
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
