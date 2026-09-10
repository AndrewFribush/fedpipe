/**
 * nist-nvd module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nist-nvd",
  displayName: "NIST National Vulnerability Database",
  category: "Technology & Security",
  description:
    "The U.S. government's canonical catalog of software security vulnerabilities (CVEs), maintained by NIST. " +
    "Every published CVE with its CVSS base score and severity, weakness type (CWE), affected products (CPE), " +
    "and references. Search by keyword, severity, product, or publication date.",
  auth: {
    envVar: "NVD_API_KEY",
    signup: "https://nvd.nist.gov/developers/request-an-api-key",
    optional: true,
  },
  workflow:
    "nvd_search(keyword='log4j') or nvd_search(severity='CRITICAL', published_after=..., published_before=...) " +
    "to find CVEs → nvd_cve(cve_id) for the full record on one.",
  tips:
    "Keyless but heavily rate-limited (~5 requests/30s); set NVD_API_KEY to lift it. Date ranges are capped at " +
    "120 days per request. CVSS score is reported best-of v3.1/v3.0/v2. CVE-2021-44228 is Log4Shell.",
  domains: ["safety"],
  crossRef: [
    { question: "workplace safety", route: "nvd_search (software vulnerabilities by product/severity), nvd_cve" },
  ],
  reference: {
    severities: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    docs: {
      "NVD": "https://nvd.nist.gov/",
      "NVD API 2.0": "https://nvd.nist.gov/developers/vulnerabilities",
    },
  },
} satisfies ModuleMeta;
