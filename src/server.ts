#!/usr/bin/env node
/**
 * FastMCP server — auto-discovers API modules from src/apis/{name}/ folders.
 *
 * Each module folder exports: name, displayName, description, auth?, workflow?, tips?, domains, crossRef?, reference?, tools[]
 * This file auto-registers tools, generates resources + instructions, and adds clear_cache.
 *
 * Adding a new API = create an apis/{name}/ folder with sdk.ts, meta.ts, tools.ts, index.ts.
 * No wiring needed — the server discovers it automatically.
 *
 * Supports:
 *   - stdio transport (default, for VS Code / Claude Desktop / Cursor)
 *   - HTTP Stream transport (for web apps, remote access)
 *   - Selective module loading (load only what you need)
 *
 * Usage:
 *   node dist/server.js                                   # stdio (default)
 *   node dist/server.js --transport httpStream --port 8080 # HTTP on port 8080
 *   MODULES=fred,bls,treasury node dist/server.js         # load only 3 modules
 *   node dist/server.js --modules fred,bls,treasury       # same via CLI flag
 *   node dist/server.js --list-modules                    # list all modules grouped by domain and exit
 *   node dist/server.js --list                            # alias for --list-modules
 *   node dist/server.js --list-modules --json             # same, as JSON (for scripting)
 */

import "dotenv/config";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FastMCP, type Tool, type InputPrompt } from "fastmcp";
import { z } from "zod";
import { buildInstructions } from "./server/instructions.js";
import { strictParams, normalizeArgs, capToolOutput, editDistance } from "./server/hardening.js";
import { buildAnalysisPrompts } from "./server/prompts.js";
import { executeInSandbox } from "./shared/sandbox.js";
import { DOMAINS, type ApiModule } from "./shared/types.js";
import { readFileSync } from "node:fs";

const PKG_VERSION = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
).version as `${number}.${number}.${number}`;

const logger = {
  ...console,
  warn: (...args: unknown[]) => {
    // Some MCP clients (including some VS Code builds) don't report capabilities during init.
    // FastMCP emits a warning after a short retry loop; it's typically harmless for stdio.
    if (
      args.some(
        a =>
          typeof a === "string" &&
          a.includes("[FastMCP warning] could not infer client capabilities"),
      )
    ) {
      return;
    }
    console.warn(...(args as [unknown, ...unknown[]]));
  },
};

const MODULES: ApiModule[] = [];

// Auto-discover API modules from apis/ subdirectories
const __dirname = dirname(fileURLToPath(import.meta.url));
const apisDir = join(__dirname, "apis");
const apiDirs = readdirSync(apisDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort();

for (const dir of apiDirs) {
  try {
    const mod = await import(`./apis/${dir}/index.js`);
    MODULES.push(mod.default as ApiModule);
  } catch (err) {
    console.error(`Failed to load module "${dir}":`, (err as Error).message);
  }
}

// ─── CLI arg + env parsing ───────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };

  const transport = (get("--transport") ?? process.env.MCP_TRANSPORT ?? "stdio") as "stdio" | "httpStream";
  const port = Number(get("--port") ?? process.env.MCP_PORT ?? 8080);
  const modulesFilter = get("--modules") ?? process.env.MODULES;
  const listModules = args.includes("--list-modules") || args.includes("--list");
  const doctor = args.includes("doctor") || args.includes("--doctor");

  return { transport, port, modulesFilter, listModules, doctor };
}

const { transport, port, modulesFilter, listModules, doctor } = parseArgs();

if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(PKG_VERSION);
  process.exit(0);
}
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`fedpipe ${PKG_VERSION} — MCP server for U.S. government data APIs

Usage:
  fedpipe                          start the MCP server (stdio transport)
  fedpipe --transport httpStream --port 8080
  fedpipe --modules fred,census    load only the named modules
  fedpipe --list-modules [--json]  list modules and their key requirements
  fedpipe doctor [--live] [--fresh] [--json]
                                   check key setup and API connectivity
  fedpipe --version

Env: API keys per module (see .env.example or 'fedpipe doctor').
Docs: https://github.com/AndrewFribush/fedpipe`);
  process.exit(0);
}

if (doctor) {
  const live = process.argv.includes("--live");
  const asJson = process.argv.includes("--json");
  if (asJson) {
    const report = MODULES.map(m => {
      const envVars = m.auth ? (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]) : [];
      const unset = envVars.filter(v => !process.env[v]);
      return {
        module: m.name,
        toolCount: m.tools.length,
        keyStatus: !envVars.length ? "not_required"
          : !unset.length ? "configured"
          : m.auth?.optional ? "optional_missing"
          : "missing",
        missingEnvVars: unset.length ? unset : undefined,
        signup: unset.length ? m.auth?.signup : undefined,
      };
    });
    console.log(JSON.stringify({ modules: report.length, tools: report.reduce((n, r) => n + r.toolCount, 0), report }, null, 2));
    process.exit(0);
  }
  const tty = process.stdout.isTTY ?? false;
  const green = (t: string) => (tty ? `\x1b[32m${t}\x1b[0m` : t);
  const red = (t: string) => (tty ? `\x1b[31m${t}\x1b[0m` : t);
  const dim = (t: string) => (tty ? `\x1b[2m${t}\x1b[0m` : t);

  console.log(`fedpipe doctor — ${MODULES.length} modules, ${MODULES.reduce((n, m) => n + m.tools.length, 0)} tools\n`);

  let keyless = 0, keyed = 0, missing = 0;
  const missingRows: string[] = [];
  for (const m of MODULES) {
    const envVars = m.auth ? (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]) : [];
    if (!envVars.length) { keyless++; continue; }
    const unset = envVars.filter(v => !process.env[v]);
    if (unset.length && m.auth?.optional) {
      keyless++; // works without a key; a key only raises the quota
      missingRows.push(`  ${dim("○")} ${m.name.padEnd(18)} works keyless ${dim(`(set ${unset.join(", ")} to raise quota — ${m.auth.signup})`)}`);
    } else if (unset.length) {
      missing++;
      missingRows.push(`  ${red("✗")} ${m.name.padEnd(18)} needs ${unset.join(", ")}${m.auth?.signup ? dim(`  → ${m.auth.signup}`) : ""}`);
    } else {
      keyed++;
    }
  }
  console.log(`${green("✓")} ${keyless} modules need no API key`);
  console.log(`${green("✓")} ${keyed} keyed modules have their keys set`);
  if (missingRows.length) {
    if (missing) console.log(`${red("✗")} ${missing} modules are missing required keys:`);
    for (const r of missingRows) console.log(r);
  }

  let liveFailures = 0;
  if (live) {
    if (process.argv.includes("--fresh")) {
      // True connectivity check: bypass the disk cache for these probes.
      for (const m of MODULES) {
        try { (await import(`./apis/${m.name}/sdk.js`) as { clearCache?: () => void }).clearCache?.(); } catch { /* no sdk cache */ }
      }
      console.log("\nLive connectivity — cache cleared, hitting the real APIs:");
    } else {
      console.log("\nLive connectivity (one no-argument tool per reachable module; may serve from cache — add --fresh to force network):");
    }
    const ctx: any = { log: { debug() {}, error() {}, info() {}, warn() {} } };
    for (const m of MODULES) {
      const envVars = m.auth ? (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]) : [];
      if (envVars.some(v => !process.env[v])) continue;
      const candidates = m.tools.filter(t => {
        const shape = (t.parameters as any)?.shape ?? {};
        return Object.values(shape).every((f: any) => {
          const tn = f?._def?.typeName ?? f?._def?.type;
          return tn === "ZodOptional" || tn === "optional" || tn === "ZodDefault" || tn === "default";
        });
      }).slice(0, 5);
      if (!candidates.length) { console.log(`  ${dim("–")} ${m.name.padEnd(18)} ${dim("(no argument-free tool to probe)")}`); continue; }
      let lastErr = "";
      let ok = false;
      for (const probe of candidates) {
        const t0 = Date.now();
        // Keep the probe cheap: ask for a single row when the tool paginates.
        const shape = (probe.parameters as any)?.shape ?? {};
        const limitKey = ["limit", "per_page", "page_size", "top", "pagesize", "rows", "length"].find(k => k in shape);
        const probeArgs = limitKey ? { [limitKey]: 1 } : {};
        try {
          const out = await Promise.race([
            probe.execute!(probeArgs, ctx),
            new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout after 15s")), 15_000)),
          ]);
          // A guarded "provide a filter" empty is not a connectivity signal — try the next tool.
          if (typeof out === "string" && /"dataType":"empty"/.test(out) && /provide|filter|required/i.test(out)) {
            lastErr = `${probe.name}: needs filters`;
            continue;
          }
          console.log(`  ${green("✓")} ${m.name.padEnd(18)} ${probe.name} ${dim(`(${Date.now() - t0}ms)`)}`);
          ok = true;
          break;
        } catch (e: any) {
          lastErr = `${probe.name}: ${String(e?.message ?? e).slice(0, 90)}`;
          if (/provide|required|filter/i.test(lastErr)) continue;
          break;
        }
      }
      if (!ok) {
        // "needs filters" is a probe limitation, not a connectivity failure.
        if (/needs filters|provide|required/i.test(lastErr)) {
          console.log(`  ${dim("–")} ${m.name.padEnd(18)} ${dim(`(no probe-able tool: ${lastErr})`)}`);
        } else {
          liveFailures++;
          console.log(`  ${red("✗")} ${m.name.padEnd(18)} ${lastErr}`);
        }
      }
    }
  } else {
    console.log(dim("\nRun with --live to also ping each module's API."));
  }
  // Scriptable: non-zero when required keys are missing or live probes failed.
  process.exit(missing > 0 || liveFailures > 0 ? 1 : 0);
}

if (listModules) {
  const asJson = process.argv.includes("--json");

  if (asJson) {
    const output = MODULES.map(m => ({
      name: m.name,
      displayName: m.displayName,
      description: m.description,
      toolCount: m.tools.length,
      requiresApiKey: !!m.auth,
      envVars: m.auth ? (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]) : null,
      signupUrl: m.auth?.signup ?? null,
      domains: m.domains,
    }));
    console.log(JSON.stringify(output, null, 2));
    process.exit(0);
  }

  // Group by primary (first) domain, in canonical DOMAINS order
  const groups = new Map<string, ApiModule[]>(DOMAINS.map(d => [d, []]));
  for (const m of MODULES) {
    const key = m.domains[0] ?? "other";
    groups.get(key)?.push(m);
  }

  const maxNameLen = Math.max(...MODULES.map(m => m.name.length));
  const maxDisplayLen = Math.max(...MODULES.map(m => m.displayName.length));
  const maxToolsLen = Math.max(...MODULES.map(m => `${m.tools.length} tools`.length));

  for (const [domain, mods] of groups) {
    if (mods.length === 0) continue;
    console.log(`\n${domain.charAt(0).toUpperCase() + domain.slice(1)}`);
    for (const m of mods) {
      const toolsStr = `${m.tools.length} tools`.padEnd(maxToolsLen);
      const envVars = m.auth ? (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]) : null;
      const authNote = envVars ? `  [${envVars.join(", ")}]  ${m.auth!.signup}` : "";
      console.log(`  ${m.name.padEnd(maxNameLen)}  ${m.displayName.padEnd(maxDisplayLen)}  ${toolsStr}${authNote}`);
    }
  }
  console.log(`\n${MODULES.length} modules total.`);
  process.exit(0);
}

// ─── Selective module loading ────────────────────────────────────────

let activeModules = MODULES;

if (modulesFilter) {
  const wanted = new Set(modulesFilter.split(",").map(s => s.trim().toLowerCase()));
  activeModules = MODULES.filter(m => wanted.has(m.name.toLowerCase()));

  if (activeModules.length === 0) {
    console.error(
      `No modules matched "${modulesFilter}". Available: ${MODULES.map(m => m.name).join(", ")}`,
    );
    process.exit(1);
  }

  // A typo'd name silently loading a partial server is worse than an error.
  const known = new Set(MODULES.map(m => m.name.toLowerCase()));
  const unknown = [...wanted].filter(w => !known.has(w));
  for (const u of unknown) {
    const closest = MODULES
      .map(m => ({ n: m.name, d: editDistance(u, m.name.toLowerCase()) }))
      .sort((a, b) => a.d - b.d)[0];
    console.error(
      `WARNING: unknown module "${u}" in --modules ignored${closest && closest.d <= 3 ? ` (did you mean "${closest.n}"?)` : ""}`,
    );
  }

  console.error(
    `Loaded ${activeModules.length}/${MODULES.length} modules: ${activeModules.map(m => m.name).join(", ")}`,
  );
}

// ─── Startup validation ──────────────────────────────────────────────

for (const mod of activeModules) {
  if (mod.auth) {
    const vars = Array.isArray(mod.auth.envVar) ? mod.auth.envVar : [mod.auth.envVar];
    const missing = vars.filter(v => !process.env[v]);
    if (missing.length > 0) {
      // IMPORTANT: for MCP stdio transport, stdout must be reserved for JSON-RPC only.
      // VS Code treats stderr output as warnings; keep it minimal and only log actionable issues.
      console.warn(
        mod.auth.optional
          ? `\u26A0 ${mod.displayName}: works without ${missing.join(", ")}, but a free key raises the quota: ${mod.auth.signup}`
          : `\u26A0 ${mod.displayName}: ${missing.join(", ")} not set \u2014 tools will fail. Get key: ${mod.auth.signup}`,
      );
    }
  }
}

// ─── Server ──────────────────────────────────────────────────────────

const server = new FastMCP({
  name: "fedpipe",
  version: PKG_VERSION,
  logger,
  instructions: buildInstructions(activeModules),
});

// ─── Register all module tools + prompts ─────────────────────────────

/**
 * Default tool annotations applied to every module tool.
 *
 * All government data tools are read-only fetches against external APIs that
 * are safe to retry with identical args (data is published, not user-driven),
 * so they're idempotent and openWorld by default. Per-tool annotations
 * (e.g. `title`) are preserved via spread.
 */


// ─── Prompt argument completions ─────────────────────────────────────

const STATE_BY_FIPS: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE",
  "11": "DC", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
  "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM",
  "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
  "54": "WV", "55": "WI", "56": "WY", "72": "PR",
};

const US_STATES = ["AL Alabama","AK Alaska","AZ Arizona","AR Arkansas","CA California","CO Colorado","CT Connecticut","DE Delaware","DC District of Columbia","FL Florida","GA Georgia","HI Hawaii","ID Idaho","IL Illinois","IN Indiana","IA Iowa","KS Kansas","KY Kentucky","LA Louisiana","ME Maine","MD Maryland","MA Massachusetts","MI Michigan","MN Minnesota","MS Mississippi","MO Missouri","MT Montana","NE Nebraska","NV Nevada","NH New Hampshire","NJ New Jersey","NM New Mexico","NY New York","NC North Carolina","ND North Dakota","OH Ohio","OK Oklahoma","OR Oregon","PA Pennsylvania","RI Rhode Island","SC South Carolina","SD South Dakota","TN Tennessee","TX Texas","UT Utah","VT Vermont","VA Virginia","WA Washington","WV West Virginia","WI Wisconsin","WY Wyoming"];

/** Attach state-name completion to any prompt argument named "state". */
function withCompletions(prompts: unknown[]): unknown[] {
  return (prompts as Array<{ arguments?: Array<{ name: string; complete?: unknown }> }>).map(pr => ({
    ...pr,
    arguments: pr.arguments?.map(a =>
      a.name === "state" && !a.complete
        ? {
            ...a,
            complete: async (value: string) => {
              const q = value.trim().toLowerCase();
              const starts = US_STATES.filter(s => s.toLowerCase().startsWith(q) || s.slice(3).toLowerCase().startsWith(q));
              const contains = US_STATES.filter(s => q && s.toLowerCase().includes(q) && !starts.includes(s));
              const values = [...starts, ...contains]
                .map(s => (q.length <= 2 && /^[a-z]{0,2}$/.test(q) ? s.slice(0, 2) : s.slice(3)))
                .slice(0, 20);
              return { values };
            },
          }
        : a),
  }));
}

const DEFAULT_TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  idempotentHint: true,
  openWorldHint: true,
  destructiveHint: false,
} as const;

for (const mod of activeModules) {
  const annotated = mod.tools.map(t => ({
    ...t,
    execute: async (args: unknown, ctx: unknown) => {
      const out = await (t.execute as any)(args, ctx);
      return typeof out === "string" ? capToolOutput(out) : out;
    },
    // Reject unknown parameters instead of zod's default silent stripping —
    // a misspelled filter (min_magnitude vs minmagnitude) must error loudly,
    // not quietly return unfiltered data.
    parameters: t.parameters instanceof z.ZodObject
      ? z.preprocess(v => normalizeArgs((t.parameters as z.ZodObject<any>).shape, v), strictParams(t.parameters))
      : t.parameters,
    annotations: { ...DEFAULT_TOOL_ANNOTATIONS, ...(t.annotations ?? {}) },
  }));
  server.addTools(annotated as any);
  if (mod.prompts?.length) server.addPrompts(withCompletions(mod.prompts) as any);
}

// ─── clear_cache tool ────────────────────────────────────────────────

server.addTool({
  name: "resolve_entity",
  description:
    "Resolve a company across federal agencies in one call: SEC identity (CIK, tickers, exchange), " +
    "its corporate PACs (FEC committee IDs), lobbying activity (registrations as client), and federal " +
    "award activity (USAspending). Returns the identifiers every follow-up tool needs — the starting " +
    "point for any follow-the-money question. Sources that find nothing are reported as such.",
  annotations: { title: "Resolve Entity Across Agencies", readOnlyHint: true, idempotentHint: true, openWorldHint: true, destructiveHint: false },
  parameters: z.object({
    name: z.string().describe("Company name or stock ticker: 'Boeing', 'PFE', 'Lockheed Martin'"),
  }),
  execute: async ({ name }) => {
    const call = async (tool: string, args: Record<string, unknown>): Promise<any> => {
      const fn = allToolMap.get(tool);
      if (!fn) return null;
      try {
        const out = await (fn as (a: unknown, c: unknown) => Promise<unknown>)(args, { log: { debug() {}, error() {}, info() {}, warn() {} } });
        return JSON.parse(typeof out === "string" ? out : JSON.stringify(out));
      } catch (e) {
        return { _error: String((e as Error)?.message ?? e).slice(0, 160) };
      }
    };

    const sec = await call("sec_ticker_lookup", { query: name, limit: 3 });
    const secItems = sec?.data?.items ?? [];
    const secBest = secItems[0] ?? null;
    // A ticker input ("PLTR") resolves at SEC to the real company name —
    // search the other agencies with that, not the literal ticker.
    const looksLikeTicker = /^[A-Z]{1,5}$/.test(name.trim()) && secBest?.name;
    const searchName = looksLikeTicker
      ? String(secBest.name).replace(/[,.]?\s+(INC|CORP|CO|LLC|LP|PLC|LTD|HOLDINGS?|GROUP|COMPANY|TECHNOLOGIES)\.?$/i, "").trim()
      : name;

    const [fec, lobbyClient, spending, pharma, fdaEvents] = await Promise.all([
      call("fec_search_committees", { name: searchName, per_page: 5 }),
      call("lobbying_search", { client_name: searchName, page_size: 3 }),
      call("usa_spending_by_award", { recipient: searchName, limit: 3 }),
      call("open_payments_search", { company: searchName, year: "2023", limit: 1 }),
      call("fda_drug_counts", { count_field: "patient.reaction.reactionmeddrapt.exact", search: `patient.drug.openfda.manufacturer_name:"${searchName.toUpperCase()}"`, limit: 3 }),
    ]);
    const fecItems = (fec?.data?.items ?? []).map((c: any) => ({
      committeeId: c.committeeId, name: c.name, type: c.type, designation: c.designation, state: c.state,
    }));
    const lobbyTotal = Number(/(\d[\d,]*) total/.exec(lobbyClient?.summary ?? "")?.[1]?.replace(/,/g, "") ?? (lobbyClient?.data?.total ?? 0));
    const lobbyItems = (lobbyClient?.data?.items ?? []).map((f: any) => ({
      registrant: f.registrant, year: f.year, type: f.type, issues: f.issuesLobbied?.slice?.(0, 4),
    }));
    const awards = (spending?.data?.items ?? []).map((a: any) => ({
      recipientName: a.recipientName, awardAmount: a.awardAmount, awardingAgency: a.awardingAgency,
    }));

    const pharmaHit = (pharma?.data?.items?.length ?? pharma?.data?.rows?.length ?? 0) > 0;
    const pharmaTotal = Number(/([\d,]+) (?:total|record)/.exec(pharma?.summary ?? "")?.[1]?.replace(/,/g, "") ?? 0);
    const fdaTop = (fdaEvents?.data?.rows ?? []).map((r: unknown[]) => ({ reaction: r[0], count: r[1] }));

    const found: string[] = [];
    const notFound: string[] = [];
    (secBest ? found : notFound).push("SEC");
    (fecItems.length ? found : notFound).push("FEC");
    (lobbyItems.length ? found : notFound).push("lobbying");
    (awards.length ? found : notFound).push("USAspending");
    if (pharmaHit) found.push("OpenPayments");
    if (fdaTop.length) found.push("FDA-FAERS");

    return JSON.stringify({
      summary: `Entity "${name}": found in ${found.join(", ") || "no sources"}` +
        (notFound.length ? ` — nothing in ${notFound.join(", ")}` : "") +
        (secBest ? `. SEC: ${secBest.name ?? secBest.title ?? ""} CIK ${secBest.cik}` : ""),
      dataType: "record",
      record: {
        query: name,
        searchedAs: searchName !== name ? searchName : undefined,
        sec: secBest ? { matches: secItems } : (sec?._error ? { error: sec._error } : null),
        fecCommittees: fecItems.length ? fecItems : (fec?._error ? { error: fec._error } : null),
        lobbying: lobbyItems.length ? { totalFilings: lobbyTotal || undefined, recent: lobbyItems } : (lobbyClient?._error ? { error: lobbyClient._error } : null),
        federalAwards: awards.length ? awards : (spending?._error ? { error: spending._error } : null),
        pharma: pharmaHit ? { openPaymentsRecords2023: pharmaTotal || true, detail: `open_payments_by_company / open_payments_top(company='${searchName}')` } : undefined,
        fdaAdverseEvents: fdaTop.length ? { topReactions: fdaTop, detail: `fda_drug_events(search='patient.drug.openfda.manufacturer_name:\"${searchName.toUpperCase()}\"')` } : undefined,
        nextSteps: {
          financials: secBest ? `sec_company_financials(cik='${secBest.cik}')` : undefined,
          insiders: secBest ? `sec_insider_transactions(cik='${secBest.cik}')` : undefined,
          pacMoney: fecItems[0] ? `fec_committee_disbursements(committee_id='${fecItems[0].committeeId}', cycle=2026)` : undefined,
          lobbyingDetail: lobbyItems.length ? `lobbying_search(client_name='${searchName}', filing_year=2026)` : undefined,
          awardsDetail: awards.length ? `usa_spending_by_award(recipient='${searchName}', limit=25)` : undefined,
        },
      },
    });
  },
});

server.addTool({
  name: "resolve_person",
  description:
    "Resolve a federal politician across agencies in one call: FEC candidate identity (candidate ID, " +
    "office, party, latest fundraising) and their congressional identity (BioGuide ID for bills, votes, " +
    "and committee lookups). The follow-the-money starting point for people, as resolve_entity is for companies.",
  annotations: { title: "Resolve Politician Across Agencies", readOnlyHint: true, idempotentHint: true, openWorldHint: true, destructiveHint: false },
  parameters: z.object({
    name: z.string().describe("Politician's name: 'Fetterman', 'Katie Britt', 'Ocasio-Cortez'"),
  }),
  execute: async ({ name }) => {
    const call = async (tool: string, args: Record<string, unknown>): Promise<any> => {
      const fn = allToolMap.get(tool);
      if (!fn) return null;
      try {
        const out = await (fn as (a: unknown, c: unknown) => Promise<unknown>)(args, { log: { debug() {}, error() {}, info() {}, warn() {} } });
        return JSON.parse(typeof out === "string" ? out : JSON.stringify(out));
      } catch (e) {
        return { _error: String((e as Error)?.message ?? e).slice(0, 160) };
      }
    };

    const fec = await call("fec_search_candidates", { name, per_page: 5 });
    const candidates = (fec?.data?.items ?? []).map((c: any) => ({
      candidateId: c.candidateId, name: c.name, office: c.office, party: c.party,
      state: c.state, district: c.district, electionYears: c.electionYears?.slice?.(-3),
      incumbency: c.incumbency, status: c.status,
    }));
    const best = candidates[0] ?? null;

    // Congress-side: no name search upstream — pull the state delegation and
    // match on name tokens.
    let member: any = null;
    if (best?.state) {
      const members = await call("congress_search_members", { state: best.state, currentMember: true, limit: 100 });
      const tokens = name.toLowerCase().split(/[\s,.-]+/).filter((t: string) => t.length > 1);
      member = (members?.data?.items ?? []).find((m: any) =>
        tokens.every((t: string) => String(m.name ?? "").toLowerCase().includes(t)) ||
        String(m.name ?? "").toLowerCase().includes(tokens[tokens.length - 1]));
    }

    // Latest fundraising for the top candidate match.
    let money: any = null;
    if (best?.candidateId) {
      const fin = await call("fec_candidate_financials", { candidate_id: best.candidateId });
      // Table envelope: columns + rows, one row per cycle, newest last.
      const cols: string[] = fin?.data?.columns ?? [];
      const rows: unknown[][] = fin?.data?.rows ?? [];
      if (rows.length && !fin?._error) {
        // Row order varies — pick the cycle with the latest coverage end.
        const endIdx = cols.indexOf("coverageEnd");
        const last = [...rows].sort((a, b) => String(a[endIdx] ?? "").localeCompare(String(b[endIdx] ?? "")))[rows.length - 1] as unknown[];
        const at = (c: string) => last[cols.indexOf(c)] ?? null;
        money = {
          receipts: at("receipts"),
          disbursements: at("disbursements"),
          cashOnHand: at("cashOnHand"),
          coverageThrough: at("coverageEnd"),
        };
      }
    }

    const found: string[] = [];
    const notFound: string[] = [];
    (best ? found : notFound).push("FEC");
    (member ? found : notFound).push("Congress");

    return JSON.stringify({
      summary: `Person "${name}": found in ${found.join(", ") || "no sources"}` +
        (notFound.length ? ` — nothing in ${notFound.join(", ")}` : "") +
        (best ? `. FEC: ${best.name} (${best.party?.[0] ?? "?"}-${best.state}, ${best.office})` : "") +
        (member ? `; BioGuide ${member.bioguideId}` : ""),
      dataType: "record",
      record: {
        query: name,
        fecCandidates: candidates.length ? candidates : (fec?._error ? { error: fec._error } : null),
        congressMember: member ? { bioguideId: member.bioguideId, name: member.name, party: member.party, state: member.state } : null,
        latestFundraising: money,
        nextSteps: {
          fundraisingDetail: best ? `fec_candidate_financials(candidate_id='${best.candidateId}', cycle=<year>)` : undefined,
          outsideSpending: best ? `fec_outside_spending_by_candidate(candidate_id='${best.candidateId}', cycle=<year>)` : undefined,
          bills: member ? `congress_member_bills(bioguide_id='${member.bioguideId}')` : undefined,
          fullBio: member ? `congress_member_details(bioguide_id='${member.bioguideId}')` : undefined,
          contributions: best ? `fec_individual_contributions(committee_id=<their committee>, cycle=<year>)` : undefined,
        },
      },
    });
  },
});

server.addTool({
  name: "resolve_place",
  description:
    "Resolve a U.S. place across agencies in one call: Census identity (FIPS, ucgid, ready-to-use " +
    "census_query params), quick demographics (population, income, home value), the QCEW area code for " +
    "county wage data, and recent FEMA disaster history for its state. Accepts county/city/state names " +
    "or a 5-digit ZIP. The geographic sibling of resolve_entity and resolve_person.",
  annotations: { title: "Resolve Place Across Agencies", readOnlyHint: true, idempotentHint: true, openWorldHint: true, destructiveHint: false },
  parameters: z.object({
    name: z.string().describe("Place: 'Deschutes County, OR', 'Pittsburgh, PA', 'Vermont', or a ZIP like '96813'"),
  }),
  execute: async ({ name }) => {
    const call = async (tool: string, args: Record<string, unknown>): Promise<any> => {
      const fn = allToolMap.get(tool);
      if (!fn) return null;
      try {
        const out = await (fn as (a: unknown, c: unknown) => Promise<unknown>)(args, { log: { debug() {}, error() {}, info() {}, warn() {} } });
        return JSON.parse(typeof out === "string" ? out : JSON.stringify(out));
      } catch (e) {
        return { _error: String((e as Error)?.message ?? e).slice(0, 160) };
      }
    };

    const geo = await call("census_resolve_geography", { name, limit: 3 });
    const match = geo?.data?.items?.[0] ?? null;
    if (!match) {
      return JSON.stringify({ summary: `No Census geography matched "${name}". Try 'City, ST', 'X County, ST', a state, or a 5-digit ZIP.`, dataType: "empty", data: null });
    }

    const [demo, fema] = await Promise.all([
      call("census_query", {
        dataset: "2023/acs/acs5",
        variables: "B01001_001E,B19013_001E,B25077_001E",
        ...(match.ucgid ? { ucgid: match.ucgid } : { for_geo: match.forGeo, ...(match.inGeo ? { in_geo: match.inGeo } : {}) }),
      }),
      match.fips?.state
        ? call("fema_disaster_declarations", { state: STATE_BY_FIPS[match.fips.state] ?? "", top: 3 })
        : Promise.resolve(null),
    ]);

    const row = demo?.data?.rows?.[0] ?? null;
    const cols = demo?.data?.columns ?? [];
    const at = (v: string) => (row ? row[cols.indexOf(v)] : null);
    const qcewArea = match.level === "county" ? `${match.fips.state}${match.fips.county}`
      : match.level === "state" ? `${match.fips.state}000`
      : match.level === "zcta" ? null : null;
    const disasters = (fema?.data?.rows ?? []).map((r: unknown[]) => {
      const fcols = fema?.data?.columns ?? [];
      return { title: r[fcols.indexOf("declarationTitle")], type: r[fcols.indexOf("incidentType")], date: String(r[fcols.indexOf("declarationDate")] ?? "").slice(0, 10) };
    });

    return JSON.stringify({
      summary: `${match.name} — ${match.level}, GEOID ${match.geoid}` +
        (at("B01001_001E") ? `. Population ${Number(at("B01001_001E")).toLocaleString()}, median income $${Number(at("B19013_001E")).toLocaleString()}, median home $${Number(at("B25077_001E")).toLocaleString()}` : ""),
      dataType: "record",
      record: {
        query: name,
        census: { level: match.level, name: match.name, geoid: match.geoid, fips: match.fips, forGeo: match.forGeo, inGeo: match.inGeo, ucgid: match.ucgid },
        demographics: row ? { population: at("B01001_001E"), medianHouseholdIncome: at("B19013_001E"), medianHomeValue: at("B25077_001E"), source: "ACS 2023 5-year" } : (demo?._error ? { error: demo._error } : null),
        qcewArea,
        recentStateDisasters: disasters.length ? disasters : undefined,
        otherMatches: (geo?.data?.items ?? []).slice(1).map((m: any) => ({ level: m.level, name: m.name, geoid: m.geoid })),
        nextSteps: {
          moreDemographics: `census_query(dataset='2023/acs/acs5', variables='...', ${match.ucgid ? `ucgid='${match.ucgid}'` : `for_geo='${match.forGeo}'${match.inGeo ? `, in_geo='${match.inGeo}'` : ""}`})`,
          wages: qcewArea ? `bls_county_wages(area='${qcewArea}', year=2024, quarter='a')` : undefined,
          disasters: match.fips?.state ? `fema_disaster_declarations(state='${STATE_BY_FIPS[match.fips.state] ?? "??"}', top=20)` : undefined,
          healthIndicators: match.level === "county" ? `cdc_places_health(state='${STATE_BY_FIPS[match.fips.state] ?? "??"}')` : undefined,
        },
      },
    });
  },
});

server.addTool({
  name: "find_tools",
  description:
    "Search this server's " + String(activeModules.reduce((n, m) => n + m.tools.length, 0)) + " tools by keyword. " +
    "Matches tool names, descriptions, and module names; returns the best matches with their descriptions. " +
    "Use when you're unsure which tool covers a topic ('drought', 'insider trading', 'school lunch').",
  annotations: { title: "Find Tools", readOnlyHint: true, idempotentHint: true, openWorldHint: false, destructiveHint: false },
  parameters: z.object({
    query: z.string().describe("Topic or keyword(s): 'wildfire', 'mortgage rates', 'clinical trial results'"),
    limit: z.number().int().max(50).default(10).describe("Max matches (default 10)"),
  }),
  execute: async ({ query, limit }) => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return JSON.stringify({ summary: "Provide a search keyword.", dataType: "empty", data: null });
    const scored: Array<{ tool: string; module: string; description: string; score: number }> = [];
    for (const mod of activeModules) {
      for (const t of mod.tools) {
        const name = t.name.toLowerCase();
        const desc = (t.description ?? "").toLowerCase();
        let score = 0;
        for (const tok of tokens) {
          if (name.includes(tok)) score += 5;
          if (mod.name.toLowerCase().includes(tok)) score += 3;
          if (desc.includes(tok)) score += 1;
        }
        if (score > 0) {
          scored.push({ tool: t.name, module: mod.name, description: (t.description ?? "").split("\n")[0].slice(0, 160), score });
        }
      }
    }
    scored.sort((a, b) => b.score - a.score || a.tool.localeCompare(b.tool));
    const top = scored.slice(0, limit);
    if (!top.length) return JSON.stringify({ summary: `No tools match "${query}".`, dataType: "empty", data: null });
    return JSON.stringify({
      summary: `${scored.length} tool(s) match "${query}", showing ${top.length}`,
      dataType: "list",
      data: { items: top.map(({ score: _s, ...r }) => r), total: scored.length },
    });
  },
});

server.addTool({
  name: "clear_cache",
  description: "Clear cached API responses to force fresh data on next query. " +
    "Specify a source name or omit to clear all.",
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  parameters: z.object({
    source: z.string().optional().describe(
      `Module name to clear: ${activeModules.map(m => m.name).join(", ")}. Omit for all.`
    ),
  }),
  execute: async ({ source }) => {
    const target = source?.toLowerCase();
    const cleared: string[] = [];
    for (const mod of activeModules) {
      if (target && mod.name.toLowerCase() !== target) continue;
      if (mod.clearCache) { mod.clearCache(); cleared.push(mod.name); }
    }
    return cleared.length
      ? `Cache cleared: ${cleared.join(", ")}. Next queries will fetch fresh data.`
      : source ? `Unknown source "${source}". Available: ${activeModules.map(m => m.name).join(", ")}` : "No caches to clear.";
  },
});

// ─── Cross-cutting analysis prompts ──────────────────────────────────

server.addPrompts(withCompletions(buildAnalysisPrompts(activeModules)) as any);

// ─── Code mode tool ──────────────────────────────────────────────────

/**
 * Tool-name alias map. Resolves old/legacy names to current canonical names
 * inside `code_mode` so cached client prompts and saved system messages keep
 * working after a tool rename. Empty today — populate when a tool is renamed.
 */
const TOOL_ALIASES: Record<string, string> = {
  // Example for future use:
  // "fda_search_events": "fda_drug_events",
};

// Build a lookup map of all registered tools for code_mode to call
const allToolMap = new Map<string, (args: Record<string, unknown>) => Promise<unknown>>();
for (const mod of activeModules) {
  for (const tool of mod.tools) {
    allToolMap.set(tool.name, (tool as any).execute);
  }
}

server.addTool({
  name: "code_mode",
  description:
    "Run a JavaScript processing script against any tool's output in a WASM sandbox.\n" +
    "Calls the specified tool first, then runs your script with the raw response as `DATA` (string).\n" +
    "Only your script's console.log() output enters context — typically 65-99% smaller.\n\n" +
    "USE THIS when you need specific fields, counts, or filters from a large response.\n" +
    "DO NOT use this when you need to read and interpret the full data for cross-referencing or analysis.\n\n" +
    "The script can: JSON.parse(DATA), use loops/map/filter/reduce, Math, string ops, console.log().\n" +
    "The script CANNOT: access files, network, Node.js APIs, or import modules.\n\n" +
    "Example — count serious reactions for a drug:\n" +
    "  tool='fda_drug_events', tool_args={\"search\":\"patient.drug.openfda.brand_name:aspirin\",\"limit\":100},\n" +
    "  code='const d=JSON.parse(DATA);const data=d.data||d;const items=data.items||data.results||[];' +\n" +
    "       'const counts={};items.forEach(r=>{const rxs=r.reactions||[];rxs.forEach(rx=>{counts[rx]=(counts[rx]||0)+1})});' +\n" +
    "       'Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10).forEach(([k,v])=>console.log(k+\": \"+v))'",
  annotations: {
    title: "Code Mode: Process Tool Output",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
    destructiveHint: false,
  },
  parameters: z.object({
    tool: z.string().describe(
      "Name of the MCP tool to call (e.g. 'fda_drug_events', 'fred_series_data', 'congress_search_bills')"
    ),
    tool_args: z.record(z.string(), z.unknown()).optional().describe(
      "Arguments to pass to the tool, as a JSON object (e.g. {\"search\": \"serious:1\", \"limit\": 50})"
    ),
    code: z.string().describe(
      "JavaScript code to process the result. The tool's full response is available as DATA (string). " +
      "Use JSON.parse(DATA) to parse it. Use console.log() to produce output. " +
      "Only console.log output is returned — keep it concise."
    ),
  }),
  execute: async ({ tool: toolName, tool_args: toolArgs, code }, { reportProgress }) => {
    // Resolve any deprecated alias to the current canonical name
    const resolvedName = TOOL_ALIASES[toolName] ?? toolName;
    const toolFn = allToolMap.get(resolvedName);
    if (!toolFn) {
      const names = [...allToolMap.keys()];
      const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "");
      const closest = names
        .map(n => ({ n, d: editDistance(norm(toolName), norm(n)) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 5)
        .filter(x => x.d <= Math.max(3, toolName.length / 2))
        .map(x => x.n);
      return `Error: tool '${toolName}' not found.` +
        (closest.length ? ` Did you mean: ${closest.join(", ")}?` : "") +
        ` (${names.length} tools available — see tools/list.)`;
    }

    await reportProgress({ progress: 0, total: 2 });

    // Call the underlying tool
    let rawResult: string;
    try {
      const result = await toolFn(toolArgs ?? {});
      rawResult = typeof result === "string" ? result : JSON.stringify(result);
    } catch (err) {
      return `Error calling '${toolName}': ${(err as Error).message}`;
    }

    await reportProgress({ progress: 1, total: 2 });

    // Execute script in sandbox
    const { stdout, beforeBytes, afterBytes, reductionPct, error } =
      await executeInSandbox(rawResult, code);

    await reportProgress({ progress: 2, total: 2 });

    if (error) {
      // The sandbox reports interruption as raw engine internals — translate.
      const friendlyError = /"message":"interrupted"|InternalError.*interrupted/.test(String(error))
        ? "Script exceeded the execution time limit (infinite loop or unbounded work?). Keep scripts to simple parse/filter/aggregate passes over DATA."
        : error;
      const previewLen = Math.min(200, rawResult.length);
      const preview = rawResult.length > 200 ? rawResult.slice(0, 200) + "…" : rawResult;
      const argsJson = JSON.stringify(toolArgs ?? {});
      return (
        `Script error: ${friendlyError}\n\n` +
        `Called '${toolName}' with args ${argsJson} — returned ${(beforeBytes / 1024).toFixed(1)}KB. ` +
        `Fix the script and try again. The DATA variable contains the tool's raw response as a string.\n\n` +
        `DATA preview (first ${previewLen} chars):\n${preview}`
      );
    }

    const tag = `[code-mode: ${(beforeBytes / 1024).toFixed(1)}KB → ${(afterBytes / 1024).toFixed(1)}KB (${reductionPct.toFixed(1)}% reduction)]`;
    return stdout ? `${stdout}\n\n${tag}` : `(script produced no console.log output)\n${tag}`;
  },
});

// ─── Auto-generate resources ─────────────────────────────────────────

// Per-module reference data (lookup tables, dataset maps, docs links) as
// browsable resources — saves tool calls for things that never change.
for (const mod of activeModules) {
  if (!mod.reference || !Object.keys(mod.reference).length) continue;
  server.addResource({
    uri: `govdata://reference/${mod.name}`,
    name: `${mod.displayName} reference data`,
    description: `Lookup tables for the ${mod.name} module: ${Object.keys(mod.reference).join(", ")}`,
    mimeType: "application/json",
    load: async () => ({ text: JSON.stringify(mod.reference, null, 2) }),
  });
}

server.addResource({
  uri: "govdata://reference",
  name: "API Reference",
  mimeType: "text/markdown",
  load: async () => {
    const noKey = activeModules.filter(m => !m.auth);
    const withKey = activeModules.filter(m => m.auth);

    // Group keyed APIs by env var
    const keyGroups: Record<string, { envVar: string; signup: string; apis: string[] }> = {};
    for (const m of withKey) {
      const vars = Array.isArray(m.auth!.envVar) ? m.auth!.envVar : [m.auth!.envVar];
      for (const v of vars) {
        if (!keyGroups[v]) keyGroups[v] = { envVar: v, signup: m.auth!.signup, apis: [] };
        keyGroups[v].apis.push(m.displayName);
      }
    }

    // Check which keys are actually configured
    const configuredKeys = Object.keys(keyGroups).filter(k => !!process.env[k]);
    const missingKeys = Object.keys(keyGroups).filter(k => !process.env[k]);

    let md = `# US Government Open Data — API Reference\n\n`;
    md += `**${activeModules.length} APIs loaded** · ${noKey.length} require no key · ${configuredKeys.length}/${Object.keys(keyGroups).length} API keys configured\n\n`;

    // Status section
    if (missingKeys.length) {
      md += `## Missing API Keys\n\n`;
      md += `These APIs are loaded but will fail without keys:\n\n`;
      md += `| Key | APIs Affected | Get Key |\n|---|---|---|\n`;
      for (const k of missingKeys) {
        const g = keyGroups[k];
        md += `| \`${k}\` | ${g.apis.join(", ")} | [Sign up](${g.signup}) |\n`;
      }
      md += `\n`;
    }

    if (configuredKeys.length) {
      md += `## Configured API Keys\n\n`;
      for (const k of configuredKeys) {
        md += `- \`${k}\` → ${keyGroups[k].apis.join(", ")}\n`;
      }
      md += `\n`;
    }

    // Free APIs
    md += `## No Key Required (${noKey.length} APIs)\n\n`;
    md += noKey.map(m => `- **${m.displayName}** (${m.tools.length} tools) — ${m.description.split(".")[0]}.`).join("\n");
    md += `\n\n`;

    // All APIs with tools
    md += `## All APIs & Tools\n\n`;
    for (const m of activeModules) {
      const status = !m.auth ? "No key needed"
        : (Array.isArray(m.auth.envVar) ? m.auth.envVar : [m.auth.envVar]).every(v => !!process.env[v])
          ? "Key configured"
          : "Key missing";
      md += `### ${m.displayName} — ${status}\n\n`;
      md += `${m.tools.length} tools: ${m.tools.map(t => `\`${t.name}\``).join(", ")}\n\n`;
      if (m.workflow) md += `**Workflow:** ${m.workflow}\n\n`;
    }

    return { text: md };
  },
});

// ─── Start ───────────────────────────────────────────────────────────

if (transport === "httpStream") {
  server.start({
    transportType: "httpStream",
    httpStream: {
      port,
      // Bind to localhost only — prevents network exposure.
      // Set MCP_HOST=0.0.0.0 to allow external access (e.g. behind a reverse proxy).
      host: process.env.MCP_HOST ?? "127.0.0.1",
    },
  });
  const host = process.env.MCP_HOST ?? "127.0.0.1";
  console.error(`MCP server listening on http://${host}:${port}/mcp (HTTP Stream)`);
  console.error(`${activeModules.length} modules, ${activeModules.reduce((n, m) => n + m.tools.length, 0)} tools`);
} else {
  server.start({ transportType: "stdio" });
}
