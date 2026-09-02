import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchProducts, patentsForApplication } from "./sdk.js";
import type { OrangeBookProduct } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

function brief(p: OrangeBookProduct): Record<string, unknown> {
  return {
    tradeName: p.tradeName,
    ingredient: p.ingredient,
    strength: p.strength,
    form: p.dosageRoute,
    applicant: p.applicant,
    type: p.applType === "N" ? "brand (NDA)" : p.applType === "A" ? "generic (ANDA)" : p.applType,
    status: p.marketingStatus,
    teCode: p.teCode ?? undefined,
    approvalDate: p.approvalDate ?? undefined,
    applNo: p.applNo,
    productNo: p.productNo,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "orange_book_search",
    description:
      "Search FDA Orange Book approved drug products by trade name or active ingredient. Returns applicant, strength/form, brand-vs-generic status, TE code, approval date, and the application number (for orange_book_patents). Keyless.",
    annotations: { title: "Orange Book: Search Drugs", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      query: z.string().describe("Trade name or active ingredient (substring) — e.g. 'Ozempic', 'semaglutide', 'atorvastatin'"),
      limit: z.number().int().max(100).default(25).describe("Max results (default 25)"),
    }),
    execute: async (args) => {
      const { rows, total } = await searchProducts(args.query, args.limit);
      if (!rows.length) return emptyResponse(`No Orange Book product matches "${args.query}". Try the active ingredient or brand name.`);
      return listResponse(`${total} approved product(s) match "${args.query}", showing ${rows.length}`, { items: rows.map(brief), total });
    },
  },
  {
    name: "orange_book_patents",
    description:
      "List the patents (and their expiry dates) that protect an FDA-approved drug, by application number — the reference for generic-entry / patent-cliff timing. Use the applNo from orange_book_search.",
    annotations: { title: "Orange Book: Drug Patents", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      application_number: z.string().describe("Orange Book application number (digits) — e.g. '209637' (from orange_book_search)"),
    }),
    execute: async (args) => {
      const { product, patents } = await patentsForApplication(args.application_number);
      if (!product && !patents.length) return emptyResponse(`No Orange Book application ${args.application_number}. Find it via orange_book_search.`);
      const label = product ? `${product.tradeName} (${product.ingredient})` : `Application ${args.application_number}`;
      return recordResponse(
        `${label}: ${patents.length} listed patent(s)`,
        {
          product: product ? { tradeName: product.tradeName, ingredient: product.ingredient, applicant: product.applicant, applNo: product.applNo } : null,
          patents: patents.map(p => ({
            patentNo: p.patentNo,
            expires: p.expires ?? undefined,
            protects: [p.drugSubstance ? "substance" : "", p.drugProduct ? "product" : ""].filter(Boolean).join("+") || undefined,
            useCode: p.useCode ?? undefined,
          })),
        },
      );
    },
  },
];
