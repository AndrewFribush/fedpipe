/**
 * NIST NVD SDK — the National Vulnerability Database (services.nvd.nist.gov).
 *
 * The U.S. government's canonical catalog of software security vulnerabilities:
 * every published CVE with its CVSS severity score, the weakness type (CWE),
 * affected products (CPE), and reference links. Maintained by NIST.
 *
 * Standalone — no MCP or Zod required:
 *   import { searchCves, getCve } from "fedpipe/sdk/nist-nvd";
 *
 * Keyless, but rate-limited: ~5 requests / 30s without a key, ~50 with one.
 * Set NVD_API_KEY (free, https://nvd.nist.gov/developers/request-an-api-key)
 * to lift the limit. Requests are sent with the "apiKey" header when set.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://services.nvd.nist.gov",
  name: "nist-nvd",
  cacheTtlMs: 6 * 60 * 60 * 1000, // 6h
  timeoutMs: 45_000,
  // NVD throttles hard; keep well under the keyless ceiling.
  rateLimit: { perSecond: 0.2, burst: 2 },
  auth: {
    type: "header",
    envParams: { apiKey: "NVD_API_KEY" },
  },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface CveSummary {
  id: string;
  published: string;
  lastModified: string;
  status: string;
  description: string;
  cvssScore: number | null;
  cvssSeverity: string | null;
  cvssVersion: string | null;
  cvssVector: string | null;
  cwe: string | null;
  references: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────

/** Normalize a YYYY-MM-DD (or ISO) date to NVD's extended ISO instant. */
function toNvdDate(v: string | undefined, isEnd: boolean): string | undefined {
  if (!v) return undefined;
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return `${s}T${isEnd ? "23:59:59.999" : "00:00:00.000"}`;
  return s;
}

/** Pull the best available CVSS metric (v3.1 → v3.0 → v2). */
function pickCvss(metrics: any): { score: number | null; severity: string | null; version: string | null; vector: string | null } {
  const v31 = metrics?.cvssMetricV31?.[0]?.cvssData;
  const v30 = metrics?.cvssMetricV30?.[0]?.cvssData;
  const v2m = metrics?.cvssMetricV2?.[0];
  const v2 = v2m?.cvssData;
  if (v31) return { score: v31.baseScore ?? null, severity: v31.baseSeverity ?? null, version: "3.1", vector: v31.vectorString ?? null };
  if (v30) return { score: v30.baseScore ?? null, severity: v30.baseSeverity ?? null, version: "3.0", vector: v30.vectorString ?? null };
  if (v2) return { score: v2.baseScore ?? null, severity: v2m?.baseSeverity ?? null, version: "2.0", vector: v2.vectorString ?? null };
  return { score: null, severity: null, version: null, vector: null };
}

function toSummary(entry: any): CveSummary {
  const cve = entry?.cve ?? entry;
  const desc = (cve.descriptions ?? []).find((d: any) => d.lang === "en")?.value
    ?? cve.descriptions?.[0]?.value ?? "";
  const cvss = pickCvss(cve.metrics);
  const cwe = cve.weaknesses?.[0]?.description?.find((d: any) => d.lang === "en")?.value
    ?? cve.weaknesses?.[0]?.description?.[0]?.value ?? null;
  return {
    id: cve.id,
    published: cve.published,
    lastModified: cve.lastModified,
    status: cve.vulnStatus ?? "",
    description: desc,
    cvssScore: cvss.score,
    cvssSeverity: cvss.severity,
    cvssVersion: cvss.version,
    cvssVector: cvss.vector,
    cwe: cwe && cwe !== "NVD-CWE-noinfo" && cwe !== "NVD-CWE-Other" ? cwe : (cwe ?? null),
    references: (cve.references ?? []).map((r: any) => r.url).slice(0, 8),
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search CVEs in the National Vulnerability Database.
 *
 * - `keyword`: free-text over the CVE description (e.g. "log4j", "openssl heap").
 * - `severity`: CVSS v3 severity — LOW | MEDIUM | HIGH | CRITICAL.
 * - `cpeName`: an exact CPE match string (e.g. "cpe:2.3:a:openssl:openssl:3.0.0:*:*:*:*:*:*:*").
 * - `publishedAfter`/`publishedBefore`: YYYY-MM-DD (NVD caps a date range at 120 days).
 * - `limit` (resultsPerPage, max 2000) and `offset` (startIndex) page the results.
 */
export async function searchCves(opts: {
  keyword?: string;
  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  cpeName?: string;
  publishedAfter?: string;
  publishedBefore?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ total: number; results: CveSummary[] }> {
  const raw = await api.get<any>("/rest/json/cves/2.0", qp({
    keywordSearch: opts.keyword,
    cvssV3Severity: opts.severity,
    cpeName: opts.cpeName,
    pubStartDate: toNvdDate(opts.publishedAfter, false),
    pubEndDate: toNvdDate(opts.publishedBefore, true),
    resultsPerPage: opts.limit ?? 20,
    startIndex: opts.offset,
  }));
  return {
    total: raw?.totalResults ?? 0,
    results: (raw?.vulnerabilities ?? []).map(toSummary),
  };
}

/** Fetch a single CVE by ID (e.g. "CVE-2021-44228"). */
export async function getCve(cveId: string): Promise<CveSummary | null> {
  const raw = await api.get<any>("/rest/json/cves/2.0", qp({ cveId: cveId.toUpperCase() }));
  const entry = raw?.vulnerabilities?.[0];
  return entry ? toSummary(entry) : null;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
