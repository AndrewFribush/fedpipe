/**
 * GLEIF MCP tools.
 *
 * API: https://api.gleif.org/api/v1 (JSON:API)
 * Docs: https://www.gleif.org/en/lei-data/gleif-api
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchLei, getLeiRecord, getOwnership } from "./sdk.js";
import type { LeiRecord } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function brief(r: LeiRecord): Record<string, unknown> {
  return {
    lei: r.lei,
    name: r.legalName,
    jurisdiction: r.jurisdiction,
    status: r.status,
    registration: r.registrationStatus,
    location: [r.city, r.country].filter(Boolean).join(", ") || undefined,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "gleif_search",
    description:
      "Search the global LEI (Legal Entity Identifier) registry by company name. The LEI is the canonical cross-border company identifier used in financial regulation — the join key for matching one entity across SEC, FDIC, swap-data, and international filings. Covers 2.5M+ entities worldwide.",
    annotations: { title: "GLEIF: Search Entities", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Company name — e.g. 'Boeing', 'Deutsche Bank'"),
      match: z.enum(["name", "fulltext"]).default("name").describe("'name' matches legal names (with wildcards); 'fulltext' also matches addresses and former names"),
      country: z.string().optional().describe("2-letter legal-address country filter — e.g. 'US', 'DE'"),
      limit: z.number().int().max(50).default(10).describe("Max results (default 10)"),
    }),
    execute: async (args) => {
      const res = await searchLei({ query: args.query, match: args.match, country: args.country, pageSize: args.limit });
      if (!res.records.length) {
        return emptyResponse(`No LEI records match "${args.query}"${args.country ? ` in ${args.country}` : ""}. Try match='fulltext' or drop the country filter.`);
      }
      return listResponse(
        `${res.total.toLocaleString()} LEI record(s) match "${args.query}", showing ${res.records.length}`,
        { items: res.records.map(brief), total: res.total },
      );
    },
  },
  {
    name: "gleif_record",
    description:
      "Get the full LEI registration for one entity by its 20-character LEI: verified legal name, jurisdiction, legal form, addresses, local business-registry number, and registration status.",
    annotations: { title: "GLEIF: Entity Record", readOnlyHint: true },
    parameters: z.object({
      lei: z.string().length(20).describe("20-character LEI — e.g. 'RVHJWBXLJ1RFUBSY1F30'"),
    }),
    execute: async (args) => {
      const r = await getLeiRecord(args.lei);
      if (!r) return emptyResponse(`No LEI record for ${args.lei}. LEIs are 20-char alphanumeric; find one with gleif_search.`);
      return recordResponse(
        `${r.legalName} (${r.jurisdiction}) — LEI ${r.lei}, entity ${r.status}, registration ${r.registrationStatus}`,
        r as unknown as Record<string, unknown>,
      );
    },
  },
  {
    name: "gleif_ownership",
    description:
      "Corporate structure for an LEI: direct parent, ultimate parent, and direct children (subsidiaries). A missing parent means the entity reports none to GLEIF (standalone, or using a reporting exemption) — that's an answer, not an error.",
    annotations: { title: "GLEIF: Ownership Structure", readOnlyHint: true },
    parameters: z.object({
      lei: z.string().length(20).describe("20-character LEI of the entity"),
    }),
    execute: async (args) => {
      const own = await getOwnership(args.lei);
      const bits: string[] = [];
      bits.push(own.ultimateParent ? `ultimate parent: ${own.ultimateParent.legalName}` : "no ultimate parent reported");
      if (own.directParent && own.directParent.lei !== own.ultimateParent?.lei) bits.push(`direct parent: ${own.directParent.legalName}`);
      bits.push(own.childrenTotal ? `${own.childrenTotal} direct child(ren)` : "no children reported");
      return recordResponse(`LEI ${args.lei}: ${bits.join("; ")}`, {
        directParent: own.directParent ? brief(own.directParent) : null,
        ultimateParent: own.ultimateParent ? brief(own.ultimateParent) : null,
        children: own.children.map(brief),
        childrenTotal: own.childrenTotal,
      });
    },
  },
];
