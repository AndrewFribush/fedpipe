/**
 * nist-nvd MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCves, getCve } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nvd_search",
    description:
      "Search the NIST National Vulnerability Database — the U.S. government's catalog of software security " +
      "vulnerabilities (CVEs). Filter by keyword, CVSS severity, affected product (CPE), or publication date. " +
      "Returns each CVE's description, CVSS base score and severity, weakness type (CWE), and references.\n\n" +
      "Examples: keyword='log4j'; severity='CRITICAL' + published_after for a recent-critical sweep. " +
      "Date ranges are capped at 120 days by NVD. Keyless (rate-limited; NVD_API_KEY lifts the limit).",
    annotations: { title: "NVD: Search Vulnerabilities (CVEs)", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Free-text over the CVE description, e.g. 'openssl', 'log4j remote code execution'."),
      severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional().describe("CVSS v3 base severity."),
      cpe_name: z.string().optional().describe("Exact CPE match, e.g. 'cpe:2.3:a:openssl:openssl:3.0.0:*:*:*:*:*:*:*'."),
      published_after: z.string().optional().describe("Earliest publication date (YYYY-MM-DD). Requires published_before; NVD caps the range at 120 days."),
      published_before: z.string().optional().describe("Latest publication date (YYYY-MM-DD)."),
      limit: z.number().int().max(2000).optional().describe("Results per page (default 20, max 2000)."),
      offset: z.number().int().optional().describe("Pagination start index."),
    }),
    execute: async ({ keyword, severity, cpe_name, published_after, published_before, limit, offset }) => {
      const { total, results } = await searchCves({
        keyword, severity, cpeName: cpe_name,
        publishedAfter: published_after, publishedBefore: published_before,
        limit, offset,
      });
      if (!results.length) return emptyResponse("No CVEs match those filters.");
      return tableResponse(`NVD: ${total.toLocaleString()} CVEs match, showing ${results.length}`, {
        rows: results,
        columns: ["id", "cvssSeverity", "cvssScore", "published", "status", "description"],
        total,
        meta: { source: "NIST NVD 2.0", cvss: "base score/severity, best of v3.1/v3.0/v2" },
      });
    },
  },

  {
    name: "nvd_cve",
    description:
      "Get full detail for a single CVE by ID (e.g. 'CVE-2021-44228', the Log4Shell vulnerability). Returns the " +
      "description, CVSS score/severity/vector, weakness type (CWE), publication and last-modified dates, and " +
      "reference links. Keyless.",
    annotations: { title: "NVD: CVE Detail", readOnlyHint: true },
    parameters: z.object({
      cve_id: z.string().describe("CVE identifier, e.g. 'CVE-2021-44228'."),
    }),
    execute: async ({ cve_id }) => {
      const cve = await getCve(cve_id);
      if (!cve) return emptyResponse(`No record found for ${cve_id}.`);
      return recordResponse(
        `${cve.id} — ${cve.cvssSeverity ?? "unscored"}${cve.cvssScore != null ? ` (CVSS ${cve.cvssScore})` : ""}`,
        cve,
        { source: "NIST NVD 2.0" },
      );
    },
  },
];
