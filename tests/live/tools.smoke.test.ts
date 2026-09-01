/**
 * Live smoke suite — calls every MCP tool once against the real upstream API.
 *
 * Not part of `npm test` (vitest.config.ts excludes *.smoke.test.ts). Run with:
 *
 *   npm run test:live                          # every module whose API key is set (or needs none)
 *   npm run test:live -- -t "usgs"             # one module
 *
 * Modules whose auth env var(s) are missing are skipped, with the env var named in the
 * skip reason. Failures are classified in the message: an HTTP 4xx is almost always a bug
 * in this repo (bad param, renamed field); 5xx / timeout is usually the upstream API.
 */

import { describe, it, expect } from "vitest";
import { moduleDirs, getModule, getTools, getAuth, type ModuleTool } from "../helpers.js";
import { TOOL_ARGS, type Args, type DeriveCtx } from "./args.js";
import knownFailuresJson from "./known-upstream-failures.json" with { type: "json" };

/** Tools currently broken upstream — run with it.fails so recovery shows up as a red test. */
const KNOWN_UPSTREAM: Record<string, { since: string; reason: string }> = Object.fromEntries(
  Object.entries(knownFailuresJson).filter(([k]) => !k.startsWith("_")) as [string, { since: string; reason: string }][],
);

/** Modules that declare an auth env var but degrade gracefully without one. */
const WORKS_WITHOUT_KEY = new Set(["fda", "bls"]);

const noop = () => {};
const ctx = { log: { info: noop, warn: noop, error: noop, debug: noop }, reportProgress: async () => {}, session: {} };

function parse(out: unknown): any {
  if (typeof out !== "string") return out;
  try { return JSON.parse(out); } catch { return { text: out }; }
}

/** First record of a parsed tool response, regardless of envelope type. */
function first(res: any): Record<string, any> | undefined {
  if (!res) return undefined;
  if (res.record) return res.record;
  const d = res.data ?? res;
  if (Array.isArray(d.items) && d.items.length) return d.items[0];
  if (Array.isArray(d.rows) && d.rows.length) {
    const row = d.rows[0];
    if (Array.isArray(row) && Array.isArray(d.columns)) return Object.fromEntries(d.columns.map((c: string, i: number) => [c, row[i]]));
    return row;
  }
  return undefined;
}

const toolIndex = new Map<string, ModuleTool>();
for (const dir of moduleDirs) for (const t of getTools(getModule(dir))) toolIndex.set(t.name, t);

const derive: DeriveCtx = {
  async run(name, args = {}) {
    const t = toolIndex.get(name);
    if (!t?.execute) throw new Error(`derive: unknown tool ${name}`);
    return parse(await t.execute(t.parameters && typeof (t.parameters as any).parse === "function" ? (t.parameters as any).parse(args) : args, ctx));
  },
  first,
};

async function resolveArgs(tool: ModuleTool): Promise<Args> {
  const entry = TOOL_ARGS[tool.name];
  if (typeof entry === "function") return entry(derive);
  return entry ?? {};
}

/** Heuristic: did the tool return an error-shaped payload instead of throwing? */
function looksLikeError(res: any): string | null {
  const s = res?.summary ?? res?.text ?? "";
  if (typeof s === "string" && /^(error|failed|unauthori[sz]ed|forbidden|invalid api key)/i.test(s.trim())) return s;
  return null;
}

function missingEnv(auth: { envVar: string | string[] } | undefined): string[] {
  if (!auth) return [];
  return ([] as string[]).concat(auth.envVar).filter((v) => !process.env[v]);
}

describe("args table covers every tool with required params", () => {
  for (const dir of moduleDirs) {
    for (const tool of getTools(getModule(dir))) {
      const acceptsEmpty = (tool.parameters as any)?.safeParse?.({}).success;
      if (acceptsEmpty) continue;
      it(`${tool.name} has an entry`, () => {
        expect(TOOL_ARGS[tool.name], `add ${tool.name} to tests/live/args.ts`).toBeDefined();
      });
    }
  }
});

describe.each(moduleDirs)("%s", (dir) => {
  const mod = getModule(dir);
  const missing = WORKS_WITHOUT_KEY.has(dir) ? [] : missingEnv(getAuth(mod));
  const runner = missing.length ? it.skip : it;
  const label = missing.length ? ` [skipped: set ${missing.join(", ")}]` : "";

  for (const tool of getTools(mod)) {
    const known = KNOWN_UPSTREAM[tool.name];
    const run = known && !missing.length ? it.fails : runner;
    const suffix = known ? ` [expected to fail — upstream since ${known.since}: ${known.reason}]` : label;
    run(`${tool.name}${suffix}`, async () => {
      const args = await resolveArgs(tool);
      const parsed = (tool.parameters as any)?.safeParse?.(args);
      if (parsed && !parsed.success) throw new Error(`args in tests/live/args.ts do not satisfy schema: ${parsed.error.message}`);

      let out: unknown;
      try {
        out = await tool.execute!(parsed?.data ?? args, ctx);
      } catch (e: any) {
        const msg = String(e?.message ?? e);
        const status = /HTTP (\d{3})/.exec(msg)?.[1];
        const kind = status
          ? (status.startsWith("4") ? "REPO BUG (4xx)" : "UPSTREAM (5xx)")
          : /abort|timeout/i.test(msg) ? "UPSTREAM (timeout)"
          : /fetch failed|ENOTFOUND|ECONNRE|EAI_AGAIN/i.test(msg) ? "UPSTREAM (network/DNS)"
          : "THREW";
        throw new Error(`[${kind}] ${tool.name} ${JSON.stringify(args)}\n${msg.slice(0, 600)}`);
      }
      const res = parse(out);
      const err = looksLikeError(res);
      expect(err, `${tool.name} returned an error payload: ${err}`).toBeNull();
      expect(res, `${tool.name} returned nothing`).toBeTruthy();
    });
  }
});
