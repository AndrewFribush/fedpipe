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
import { TOOL_ARGS, ALLOWED_EMPTY, type Args, type DeriveCtx } from "./args.js";
import knownFailuresJson from "./known-upstream-failures.json" with { type: "json" };
import responseShapesJson from "./response-shapes.json" with { type: "json" };
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

/** Tools currently broken upstream — run with it.fails so recovery shows up as a red test. */
const RECORD_SHAPES = !!process.env.RECORD_SHAPES;
const OFFLINE = !!process.env.FEDPIPE_OFFLINE_REPLAY;
if (OFFLINE) {
  // Any cache miss surfaces as this sentinel — the test then skips rather
  // than fails, since offline replay can only cover what the cache holds.
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("OFFLINE_REPLAY_MISS");
  }) as typeof realFetch;
}
const SHAPES: Record<string, { dataType: string; columns?: string[] }> = responseShapesJson as never;
const recordedShapes: Record<string, { dataType: string; columns?: string[] }> = {};

/** Extract the comparable shape of a response envelope. */
function shapeOf(res: any): { dataType: string; columns?: string[] } | null {
  if (!res || typeof res !== "object" || !res.dataType) return null;
  const shape: { dataType: string; columns?: string[] } = { dataType: res.dataType };
  if (Array.isArray(res.data?.columns)) shape.columns = [...res.data.columns].sort();
  return shape;
}

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
    run(`${tool.name}${suffix}`, async (ctx0) => {
      let args: Args;
      try {
        args = await resolveArgs(tool);
      } catch (e: any) {
        if (OFFLINE && /OFFLINE_REPLAY_MISS/.test(String(e?.message ?? e))) ctx0.skip();
        throw e;
      }
      const parsed = (tool.parameters as any)?.safeParse?.(args);
      if (parsed && !parsed.success) throw new Error(`args in tests/live/args.ts do not satisfy schema: ${parsed.error.message}`);

      let out: unknown;
      // A transient upstream flap (5xx, timeout, DNS blip) gets two extra
      // attempts with backoff before failing the nightly — its job is to
      // catch persistent outages, not one-minute blips. Repo bugs (4xx)
      // fail immediately: they are deterministic.
      for (let attempt = 0; ; attempt++) {
        try {
          out = await tool.execute!(parsed?.data ?? args, ctx);
          break;
        } catch (e: any) {
          const msg = String(e?.message ?? e);
          if (OFFLINE && /OFFLINE_REPLAY_MISS/.test(msg)) {
            ctx0.skip(); // not in the local cache — nothing to replay
          }
          const status = /HTTP (\d{3})/.exec(msg)?.[1];
          const kind = /daily threshold|daily limit|quota/i.test(msg) ? "QUOTA EXHAUSTED (keyless daily cap hit — set the module's API key or wait for reset)"
            : status
            ? (status.startsWith("4") ? "REPO BUG (4xx)" : "UPSTREAM (5xx)")
            : /abort|timeout/i.test(msg) ? "UPSTREAM (timeout)"
            : /fetch failed|ENOTFOUND|ECONNRE|EAI_AGAIN/i.test(msg) ? "UPSTREAM (network/DNS)"
            : "THREW";
          // Timeouts are slow-fails: one extra attempt fits the test budget;
          // fast 5xx blips get two.
          const maxExtra = kind === "UPSTREAM (timeout)" ? 1 : 2;
          if (kind.startsWith("UPSTREAM") && attempt < maxExtra) {
            await new Promise(r => setTimeout(r, (attempt + 1) * 3000));
            continue;
          }
          throw new Error(`[${kind}] ${tool.name} ${JSON.stringify(args)}\n${msg.slice(0, 600)}`);
        }
      }
      const res = parse(out);
      const err = looksLikeError(res);
      if (OFFLINE && err && /OFFLINE_REPLAY_MISS/.test(typeof out === "string" ? out : JSON.stringify(out))) ctx0.skip(); // tool caught the network miss itself
      expect(err, `${tool.name} returned an error payload: ${err}`).toBeNull();
      expect(res, `${tool.name} returned nothing`).toBeTruthy();

      // Silent-empty guard: unless a tool is on the ALLOWED_EMPTY list, its
      // canned args target data that exists — an empty result means the
      // query pipeline broke somewhere, even though nothing errored.
      if (!ALLOWED_EMPTY.has(tool.name) && res && typeof res === "object") {
        const r: any = res;
        const allRowsEmpty = (arr: unknown[]) =>
          arr.length > 0 && arr.every(x => Array.isArray(x) ? x.length === 0 : (x && typeof x === "object" ? Object.keys(x).length === 0 : false));
        const emptyBecause =
          r.dataType === "empty" ? "dataType=empty"
          : Array.isArray(r.data?.rows) && r.data.rows.length === 0 ? "0 rows"
          : Array.isArray(r.data?.items) && r.data.items.length === 0 ? "0 items"
          : Array.isArray(r.data?.rows) && allRowsEmpty(r.data.rows) ? `${r.data.rows.length} rows, all empty (field-mapping bug?)`
          : Array.isArray(r.data?.items) && allRowsEmpty(r.data.items) ? `${r.data.items.length} items, all empty (field-mapping bug?)`
          : null;
        expect(emptyBecause,
          `[SILENT EMPTY] ${tool.name} returned no data for its canned args (${emptyBecause}). ` +
          `If this emptiness is legitimate, add the tool to ALLOWED_EMPTY in tests/live/args.ts with a reason.`,
        ).toBeNull();
      }

      // Schema-drift guard: the response's dataType and column set must match
      // the recorded baseline — agencies rename/add/remove fields without
      // notice, and nothing else would surface it. Regenerate baselines with
      // RECORD_SHAPES=1 npm run test:live.
      const shape = shapeOf(res);
      if (shape) {
        if (RECORD_SHAPES) {
          recordedShapes[tool.name] = shape;
        } else {
          const baseline = SHAPES[tool.name];
          if (baseline?.columns && shape.columns) {
            const missing = baseline.columns.filter(c => !shape.columns!.includes(c));
            const added = shape.columns.filter(c => !baseline.columns!.includes(c));
            expect(missing, `[SCHEMA DRIFT] ${tool.name}: upstream no longer returns column(s) ${missing.join(", ")}` +
              (added.length ? ` (new: ${added.join(", ")})` : "") +
              ` — verify and re-record with RECORD_SHAPES=1 npm run test:live`).toEqual([]);
          }
        }
      }
    });
  }
});


if (RECORD_SHAPES) {
  const { afterAll } = await import("vitest");
  afterAll(() => {
    const dir = dirname(fileURLToPath(import.meta.url));
    const merged = { ...SHAPES, ...recordedShapes };
    const sorted = Object.fromEntries(Object.keys(merged).sort().map(k => [k, merged[k]]));
    writeFileSync(join(dir, "response-shapes.json"), JSON.stringify(sorted, null, 1) + "\n");
    console.log(`Recorded response shapes for ${Object.keys(recordedShapes).length} tools.`);
  });
}
