import { describe, it, expect } from "vitest";

/**
 * Live smoke for the server-level cross-agency resolvers (they orchestrate
 * module tools, so they live outside the per-module suite). Each case pins
 * a stable public entity and asserts the cross-agency joins actually join.
 */
import { z } from "zod";
import { moduleDirs, getModule, getTools } from "../helpers.js";

// Rebuild the same tool map the server uses.
const allToolMap = new Map<string, (a: unknown, c: unknown) => Promise<unknown>>();
for (const dir of moduleDirs) {
  const mod = getModule(dir) as { tools?: Array<{ name: string; execute: (a: unknown, c: unknown) => Promise<unknown> }> };
  for (const t of mod.tools ?? []) allToolMap.set(t.name, t.execute.bind(t));
}
const ctx = { log: { debug() {}, error() {}, info() {}, warn() {} } };
const call = async (tool: string, args: Record<string, unknown>) => {
  const out = await allToolMap.get(tool)!(args, ctx);
  return JSON.parse(typeof out === "string" ? out : JSON.stringify(out));
};

const hasKey = !!process.env.DATA_GOV_API_KEY;
const run = hasKey ? it : it.skip;

describe("cross-agency resolution joins", () => {
  run("company: ticker → SEC name → FEC PAC exists (Boeing)", async () => {
    const sec = await call("sec_ticker_lookup", { query: "BA", limit: 1 });
    const name = sec.data.items[0].name;
    expect(name).toMatch(/BOEING/i);
    const fec = await call("fec_search_committees", { name: "Boeing", per_page: 3 });
    expect(fec.data.items.some((c: { name: string }) => /BOEING/i.test(c.name))).toBe(true);
  }, 60_000);

  run("person: FEC candidate state → congressional delegation contains them (Fetterman)", async () => {
    const fec = await call("fec_search_candidates", { name: "Fetterman", per_page: 2 });
    const cand = fec.data.items[0];
    expect(cand.state).toBe("PA");
    const members = await call("congress_search_members", { state: "PA", currentMember: true, limit: 100 });
    expect(members.data.items.some((m: { name: string }) => /Fetterman/i.test(m.name))).toBe(true);
  }, 60_000);

  run("place: county FIPS → QCEW area returns wages (Deschutes)", async () => {
    const geo = await call("census_resolve_geography", { name: "Deschutes County, OR", level: "county" });
    const m = geo.data.items[0];
    expect(m.geoid).toBe("41017");
    const wages = await call("bls_county_wages", { area: m.geoid, year: 2024, quarter: 1, industry_code: "10" });
    expect(wages.data.rows.length).toBeGreaterThan(0);
  }, 60_000);
});
