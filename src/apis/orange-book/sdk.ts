/**
 * FDA Orange Book SDK — Approved Drug Products with Therapeutic Equivalence
 * Evaluations, plus their patent and exclusivity data.
 *
 * Source: {@link https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book-data-files}
 *
 * The Orange Book is published only as a ~1MB ZIP of tilde-delimited text
 * files (no query API). It's small, so this fetches and parses it into memory
 * (no SQLite, works on any Node) and answers drug/patent lookups locally.
 * No API key.
 */

import { unzipEntries } from "../../shared/bulk.js";

const URL = "https://www.fda.gov/media/76860/download?attachment";
const MEMO_TTL = 24 * 60 * 60 * 1000;

export interface OrangeBookProduct {
  ingredient: string;
  tradeName: string;
  applicant: string;
  strength: string;
  dosageRoute: string;
  applType: string;      // N (NDA / brand) or A (ANDA / generic)
  applNo: string;
  productNo: string;
  teCode: string | null; // therapeutic-equivalence code
  approvalDate: string | null;
  marketingStatus: string; // RX / OTC / DISCN
  referenceListedDrug: boolean;
}

export interface OrangeBookPatent {
  applNo: string;
  productNo: string;
  patentNo: string;
  expires: string | null;
  drugSubstance: boolean;
  drugProduct: boolean;
  useCode: string | null;
}

interface Loaded { products: OrangeBookProduct[]; patents: OrangeBookPatent[]; at: number }
let memo: Loaded | null = null;

/** Parse a tilde-delimited file into rows keyed by header name. */
function parseTilde(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/);
  const header = (lines.shift() ?? "").split("~").map(h => h.trim());
  const out: Record<string, string>[] = [];
  for (const line of lines) {
    if (!line) continue;
    const cells = line.split("~");
    const row: Record<string, string> = {};
    header.forEach((h, i) => { row[h] = (cells[i] ?? "").trim(); });
    out.push(row);
  }
  return out;
}

async function load(): Promise<Loaded> {
  if (memo && Date.now() - memo.at < MEMO_TTL) return memo;
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`orange-book: download failed (HTTP ${res.status})`);
  const entries = unzipEntries(Buffer.from(await res.arrayBuffer()), ["products.txt", "patent.txt"]);
  const prodRaw = entries.get("products.txt");
  const patRaw = entries.get("patent.txt");
  if (!prodRaw || !patRaw) throw new Error("orange-book: expected products.txt and patent.txt in the archive");

  const products: OrangeBookProduct[] = parseTilde(prodRaw.toString("utf8")).map(r => ({
    ingredient: r.Ingredient ?? "",
    tradeName: r.Trade_Name ?? "",
    applicant: r.Applicant_Full_Name || r.Applicant || "",
    strength: r.Strength ?? "",
    dosageRoute: r["DF;Route"] ?? "",
    applType: r.Appl_Type ?? "",
    applNo: r.Appl_No ?? "",
    productNo: r.Product_No ?? "",
    teCode: r.TE_Code || null,
    approvalDate: r.Approval_Date || null,
    marketingStatus: r.Type ?? "",
    referenceListedDrug: (r.RLD ?? "").toLowerCase() === "yes",
  }));
  const patents: OrangeBookPatent[] = parseTilde(patRaw.toString("utf8")).map(r => ({
    applNo: r.Appl_No ?? "",
    productNo: r.Product_No ?? "",
    patentNo: r.Patent_No ?? "",
    expires: r.Patent_Expire_Date_Text || null,
    drugSubstance: (r.Drug_Substance_Flag ?? "").toUpperCase() === "Y",
    drugProduct: (r.Drug_Product_Flag ?? "").toUpperCase() === "Y",
    useCode: r.Patent_Use_Code || null,
  }));

  memo = { products, patents, at: Date.now() };
  return memo;
}

/** Search approved products by trade name or active ingredient (substring). */
export async function searchProducts(query: string, limit = 25): Promise<{ rows: OrangeBookProduct[]; total: number }> {
  const q = query.trim().toUpperCase();
  const { products } = await load();
  const rows = products.filter(p => p.tradeName.toUpperCase().includes(q) || p.ingredient.toUpperCase().includes(q));
  return { rows: rows.slice(0, limit), total: rows.length };
}

/** Patents (and expiry) listed for an application number. */
export async function patentsForApplication(applNo: string): Promise<{ product: OrangeBookProduct | null; patents: OrangeBookPatent[] }> {
  const no = applNo.replace(/\D/g, "");
  const { products, patents } = await load();
  const product = products.find(p => p.applNo === no) ?? null;
  return { product, patents: patents.filter(p => p.applNo === no) };
}

export function clearCache(): void {
  memo = null;
}
