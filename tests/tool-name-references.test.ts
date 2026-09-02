import { describe, it, expect } from "vitest";
import { moduleDirs, getModule, getTools } from "./helpers.js";

/**
 * Guard against doc rot: any token that *looks like* a tool name (prefix
 * matches a real tool family) inside workflow/tips/crossRef/prompt text must
 * BE a real tool. A renamed or deleted tool otherwise keeps being
 * recommended to LLM clients by stale instructions.
 */
const modsLoaded = moduleDirs.map(d => getModule(d)) as any[];

describe("tool-name references in metadata are real tools", () => {
const mods = modsLoaded;
  const allTools = new Set<string>();
  const prefixes = new Set<string>();
  for (const m of mods) {
    for (const t of getTools(m)) {
      allTools.add(t.name);
      prefixes.add(t.name.split("_")[0]);
    }
  }

  const findCandidates = (text: string): string[] =>
    [...text.matchAll(/\b([a-z][a-z0-9]*(?:_[a-z0-9]+)+)\b/g)]
      .map(m => m[1])
      .filter(tok => prefixes.has(tok.split("_")[0]) && !allTools.has(tok));

  // snake_case tokens that share a tool prefix but are argument/field names,
  // not tool references.
  const IGNORE = new Set([
    "search_as_drug", // clinical_trials_stats parameter, not a tool
  ]);
  const looksLikeField = (tok: string) =>
    /_(id|ids|key|code|codes|name|names|type|types|date|dates|year|years|url|number|num|nr|fips|cd|abbr|min|max|size|count|level|levels|range|term|field|value|values)$/.test(tok);

  for (const m of mods) {
    it(`${m.name} metadata + prompts reference only real tools`, () => {
      const texts: string[] = [m.workflow ?? "", m.tips ?? ""];
      for (const hint of m.crossRef ?? []) texts.push(hint.route ?? "");
      for (const p of (m as any).prompts ?? []) {
        texts.push(typeof p.load === "function" ? "" : "");
        texts.push(p.description ?? "");
        // static prompt text if present
        if (typeof (p as any).text === "string") texts.push((p as any).text);
      }
      const bad = new Set<string>();
      for (const text of texts) {
        for (const tok of findCandidates(text)) {
          if (!IGNORE.has(tok) && !looksLikeField(tok)) bad.add(tok);
        }
      }
      expect([...bad], `unknown tool-like references: ${[...bad].join(", ")}`).toEqual([]);
    });
  }
});
