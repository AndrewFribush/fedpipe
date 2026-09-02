/**
 * CourtListener MCP tools.
 *
 * API: https://www.courtlistener.com/api/rest/v4/
 * Docs: https://www.courtlistener.com/help/api/rest/
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCases, getOpinion, getDocket } from "./sdk.js";
import type { CaseHit } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function hitToRecord(h: CaseHit, type: string): Record<string, unknown> {
  const rec: Record<string, unknown> = {
    caseName: h.caseName,
    court: h.court,
    dateFiled: h.dateFiled,
    docketNumber: h.docketNumber,
    url: h.url,
  };
  if (type === "o") {
    if (h.citation?.length) rec.citation = h.citation[0];
    if (h.citeCount) rec.citedBy = h.citeCount;
    if (h.opinionId) rec.opinionId = h.opinionId;
    if (h.snippet) rec.snippet = h.snippet;
  } else {
    if (h.judge) rec.judge = h.judge;
    if (h.dateTerminated) rec.terminated = h.dateTerminated;
    if (h.natureOfSuit) rec.natureOfSuit = h.natureOfSuit;
    if (h.docketId) rec.docketId = h.docketId;
  }
  return rec;
}

export const tools: Tool<any, any>[] = [
  {
    name: "courts_search",
    description:
      "Search U.S. court records via CourtListener: 10M+ judicial opinions (type 'o') and the RECAP mirror of PACER dockets (type 'd'). Find lawsuits by party name, case law by topic, or filings in a specific court. Supports fielded queries like caseName:tesla and date bounds. Keyless.",
    annotations: { title: "Courts: Search Cases", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search terms — party name, topic, or fielded query like 'caseName:Boeing' or '\"737 MAX\" fraud'"),
      type: z.enum(["o", "d", "r"]).default("o").describe("'o' = opinions (case law), 'd' = dockets (PACER/RECAP lawsuits), 'r' = filed documents"),
      court: z.string().optional().describe("Court slug — 'scotus', 'ca9', 'nysd', 'txnd', 'deb' (leave off to search all courts)"),
      filed_after: z.string().optional().describe("Earliest filing date, YYYY-MM-DD"),
      filed_before: z.string().optional().describe("Latest filing date, YYYY-MM-DD"),
      order_by: z.string().optional().describe("'score desc' (default), 'dateFiled desc' (newest), 'citeCount desc' (most-cited, opinions only)"),
      limit: z.number().int().max(20).default(10).describe("Max results shown (default 10; the API pages at 20)"),
    }),
    execute: async (args) => {
      const res = await searchCases({
        query: args.query, type: args.type, court: args.court,
        filedAfter: args.filed_after, filedBefore: args.filed_before, orderBy: args.order_by,
      });
      if (!res.hits.length) {
        return emptyResponse(`No ${args.type === "o" ? "opinions" : "dockets"} match "${args.query}"${args.court ? ` in ${args.court}` : ""}. Try type='${args.type === "o" ? "d" : "o"}', broader terms, or drop the court filter.`);
      }
      const kind = args.type === "o" ? "opinion(s)" : args.type === "d" ? "docket(s)" : "document(s)";
      return listResponse(
        `${res.total.toLocaleString()} ${kind} match "${args.query}", showing ${Math.min(args.limit, res.hits.length)}`,
        { items: res.hits.slice(0, args.limit).map(h => hitToRecord(h, args.type)), total: res.total },
      );
    },
  },
  {
    name: "courts_opinion",
    description:
      "Get a judicial opinion's text by opinion ID (from courts_search type='o' results). Returns the author, PDF link, and the opinion text (truncated to max_chars — use code_mode to process longer opinions). Requires a free COURTLISTENER_API_TOKEN.",
    annotations: { title: "Courts: Opinion Text", readOnlyHint: true },
    parameters: z.object({
      opinion_id: z.number().int().describe("Opinion ID from courts_search results (opinionId field)"),
      max_chars: z.number().int().max(100_000).default(8_000).describe("Max characters of opinion text (default 8000)"),
    }),
    execute: async (args) => {
      const op = await getOpinion(args.opinion_id);
      if (!op.plainText && !op.downloadUrl) return emptyResponse(`Opinion ${args.opinion_id} has no stored text.`);
      const text = op.plainText.trim();
      const truncated = text.length > args.max_chars;
      return recordResponse(
        `Opinion ${op.id}${op.author ? ` by ${op.author}` : op.perCuriam ? " (per curiam)" : ""} — ${text.length.toLocaleString()} chars${truncated ? `, showing first ${args.max_chars.toLocaleString()}` : ""}`,
        {
          author: op.author,
          perCuriam: op.perCuriam,
          pdfUrl: op.downloadUrl,
          totalChars: text.length,
          text: text.slice(0, args.max_chars) + (truncated ? "\n…[truncated — raise max_chars or process via code_mode]" : ""),
        },
      );
    },
  },
  {
    name: "courts_docket",
    description:
      "Get a lawsuit's docket metadata by docket ID (from courts_search type='d' results): parties in the case name, court, judge, filing/termination dates, cause of action, and nature of suit. Requires a free COURTLISTENER_API_TOKEN.",
    annotations: { title: "Courts: Docket Detail", readOnlyHint: true },
    parameters: z.object({
      docket_id: z.number().int().describe("Docket ID from courts_search results (docketId field)"),
    }),
    execute: async (args) => {
      const d = await getDocket(args.docket_id);
      return recordResponse(
        `${d.caseName} (${d.court} ${d.docketNumber ?? ""})${d.dateFiled ? `, filed ${d.dateFiled}` : ""}${d.dateTerminated ? `, terminated ${d.dateTerminated}` : " — open"}`,
        d,
      );
    },
  },
];
