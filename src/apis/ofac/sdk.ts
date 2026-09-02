/**
 * OFAC Sanctions SDK — typed client for the U.S. Treasury OFAC Specially
 * Designated Nationals (SDN) list.
 *
 * Source: {@link https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.CSV}
 *
 * The SDN list is the register of sanctioned people, companies, vessels, and
 * aircraft. It's a small (~6MB) CSV that redirects to a signed download; this
 * fetches it (disk-cached), parses it, and answers "is this name sanctioned"
 * from an in-memory index. No API key. Works on any Node (no SQLite).
 */

import { createClient } from "../../shared/client.js";
import { csvRecords } from "../../shared/bulk.js";

const api = createClient({
  baseUrl: "https://sanctionslistservice.ofac.treas.gov",
  name: "ofac",
  rateLimit: { perSecond: 1, burst: 3 },
  cacheTtlMs: 12 * 60 * 60 * 1000, // OFAC updates as needed; refresh twice daily
  timeoutMs: 45_000,
});

/** One SDN entry. The CSV is headerless; columns are the standard SDN layout. */
export interface SdnEntry {
  id: string;
  name: string;
  type: string;        // individual / entity / vessel / aircraft
  programs: string[];  // sanctions programs, e.g. ["CUBA"], ["IRAN","SDGT"]
  title: string | null;
  remarks: string | null;
}

const clean = (v: string | undefined) => {
  const s = (v ?? "").trim();
  return s === "-0-" || s === "" ? null : s;
};

function mapRow(r: string[]): SdnEntry {
  const typeRaw = clean(r[2]);
  return {
    id: (r[0] ?? "").trim(),
    name: (r[1] ?? "").trim(),
    type: typeRaw ? typeRaw.toLowerCase() : "entity",
    programs: (clean(r[3]) ?? "").split(/;\s*|\s*\|\s*/).map(s => s.trim()).filter(Boolean),
    title: clean(r[4]),
    remarks: clean(r[11]),
  };
}

// Module-level parsed cache so we don't re-parse the ~6MB CSV every call.
let memo: { rows: SdnEntry[]; at: number } | null = null;
const MEMO_TTL = 6 * 60 * 60 * 1000;

async function entries(): Promise<SdnEntry[]> {
  if (memo && Date.now() - memo.at < MEMO_TTL) return memo.rows;
  const text = await api.getText("/api/PublicationPreview/exports/SDN.CSV");
  const rows: SdnEntry[] = [];
  for (const rec of csvRecords(text)) {
    if (rec.length < 4) continue;
    const e = mapRow(rec);
    if (e.name) rows.push(e);
  }
  memo = { rows, at: Date.now() };
  return rows;
}

/** Search the SDN list by name substring (case-insensitive). */
export async function searchSdn(query: string, limit = 25): Promise<{ matches: SdnEntry[]; total: number; listSize: number }> {
  const q = query.trim().toLowerCase();
  const all = await entries();
  const matches = all.filter(e => e.name.toLowerCase().includes(q));
  return { matches: matches.slice(0, limit), total: matches.length, listSize: all.length };
}

export function clearCache(): void {
  memo = null;
  api.clearCache();
}
