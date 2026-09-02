/**
 * Server-layer hardening for tool registration:
 *  - strict parameter schemas with did-you-mean rejection messages
 *  - LLM-typical argument normalization (trim, numeric/boolean coercion)
 *  - tool output size capping that degrades gracefully
 */

import { z } from "zod";

/** Edit distance for did-you-mean parameter suggestions. */
export function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

/**
 * Strict parameter schema with a self-service rejection message: names each
 * unknown key, suggests the closest valid parameter, and lists what the tool
 * accepts — so a misspelled filter is a one-step fix for the caller instead
 * of silently returning unfiltered data.
 */
/** Unwrap optional/default/nullable layers to find a field's base type. */
export function baseType(schema: any): string {
  let cur = schema;
  for (let i = 0; i < 6 && cur?._def; i++) {
    const tn = cur._def.typeName ?? cur._def.type;
    if (["ZodOptional", "optional", "ZodDefault", "default", "ZodNullable", "nullable"].includes(tn)) {
      cur = cur._def.innerType;
    } else {
      return String(tn).replace(/^Zod/, "").toLowerCase();
    }
  }
  return "unknown";
}

/**
 * Normalize LLM-typical argument sloppiness before validation: trim stray
 * whitespace on strings, and coerce numeric strings ("2023") / boolean
 * strings ("true") when the schema expects number/boolean.
 */
export function normalizeArgs(shape: Record<string, any>, input: unknown): unknown {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    const expected = shape[k] ? baseType(shape[k]) : null;
    let val = v;
    if (typeof val === "string") {
      // Strip zero-width/invisible characters (copy-paste artifacts) too.
      val = val.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
      if (expected === "number" && val !== "" && !Number.isNaN(Number(val))) val = Number(val);
      else if (expected === "boolean" && /^(true|false)$/i.test(val as string)) val = (val as string).toLowerCase() === "true";
    }
    // Pagination-family params can't be negative — several agencies 400 on
    // them; clamp to 1 (0 stays: some APIs use it for count-only queries).
    if (typeof val === "number" && val < 0 && /^(limit|per_page|page_size|pagesize|top|rows|length|max_results|page_number|offset|skip|page)$/.test(k)) {
      val = k === "offset" || k === "skip" || k === "page" || k === "page_number" ? 0 : 1;
    }
    out[k] = val;
  }
  return out;
}

export function strictParams(obj: z.ZodObject<any>): z.ZodObject<any> {
  const valid = Object.keys(obj.shape);
  return z.strictObject(obj.shape, {
    error: iss => {
      if (iss.code !== "unrecognized_keys") return undefined;
      const named = (iss.keys ?? []).map(k => {
        const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "");
        const best = valid
          .map(v => ({ v, d: editDistance(norm(k), norm(v)) }))
          .sort((a, b) => a.d - b.d)[0];
        return `"${k}"` + (best && best.d <= 3 ? ` (did you mean "${best.v}"?)` : "");
      }).join(", ");
      return `Unknown parameter(s): ${named}. This tool accepts: ${valid.join(", ") || "(no parameters)"}`;
    },
  });
}


/**
 * Cap tool output size so one tool call can't flood an LLM context window.
 * Structured envelopes are trimmed by dropping rows/items (keeping valid
 * JSON and setting truncated=true); anything else is hard-truncated.
 */
export const MAX_TOOL_OUTPUT_CHARS = 120_000;

export function capToolOutput(text: string): string {
  if (text.length <= MAX_TOOL_OUTPUT_CHARS) return text;
  try {
    const env = JSON.parse(text);
    const arrKey = Array.isArray(env?.data?.rows) ? "rows" : Array.isArray(env?.data?.items) ? "items" : null;
    if (arrKey) {
      const arr = env.data[arrKey];
      let keep = arr.length;
      while (keep > 1) {
        keep = Math.floor(keep / 2);
        env.data[arrKey] = arr.slice(0, keep);
        env.data.truncated = true;
        const candidate = JSON.stringify(env);
        if (candidate.length <= MAX_TOOL_OUTPUT_CHARS) {
          env.summary = `${env.summary ?? ""} [output capped: showing ${keep} of ${arr.length} ${arrKey}; narrow the query or paginate]`.trim();
          return JSON.stringify(env);
        }
      }
    } else if (env?.record && typeof env.record === "object") {
      const trimmedKeys: string[] = [];
      // Stage 1: truncate the longest string leaves first (a 40KB embedded
      // document is less information-dense than 100 structured rows).
      const strings: Array<{ container: any; key: string | number; len: number }> = [];
      const walk = (node: any, depth: number) => {
        if (!node || typeof node !== "object" || depth > 4) return;
        for (const [k, v] of Object.entries(node)) {
          if (typeof v === "string" && v.length > 5000) strings.push({ container: node, key: k, len: v.length });
          else if (v && typeof v === "object") walk(v, depth + 1);
        }
      };
      walk(env.record, 0);
      strings.sort((a, b) => b.len - a.len);
      for (const budget of [20_000, 8_000, 2_000]) {
        if (JSON.stringify(env).length <= MAX_TOOL_OUTPUT_CHARS) break;
        for (const st of strings) {
          const cur = st.container[st.key];
          if (typeof cur === "string" && cur.length > budget) {
            st.container[st.key] = cur.slice(0, budget) + ` …[truncated ${cur.length - budget} chars]`;
          }
        }
      }
      if (strings.length && JSON.stringify(env).length <= MAX_TOOL_OUTPUT_CHARS) {
        trimmedKeys.push(`${strings.length} long text field(s)`);
      }
      // Stage 2: if still over, shrink the largest embedded arrays
      // (depth 1 and 2 — profiles nest their bulk as record.section.items).
      if (JSON.stringify(env).length > MAX_TOOL_OUTPUT_CHARS) {
        const candidates: Array<{ container: any; key: string; label: string; arr: unknown[] }> = [];
        for (const [k, v] of Object.entries(env.record)) {
          if (Array.isArray(v) && v.length > 3) candidates.push({ container: env.record, key: k, label: k, arr: v });
          else if (v && typeof v === "object") {
            for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
              if (Array.isArray(v2) && v2.length > 3) candidates.push({ container: v, key: k2, label: `${k}.${k2}`, arr: v2 });
            }
          }
        }
        candidates.sort((a, b) => JSON.stringify(b.arr).length - JSON.stringify(a.arr).length);
        for (const c of candidates) {
          let keep = c.arr.length;
          while (keep > 3 && JSON.stringify(env).length > MAX_TOOL_OUTPUT_CHARS) {
            keep = Math.max(3, Math.floor(keep / 2));
            (c.container as any)[c.key] = c.arr.slice(0, keep);
          }
          if (keep < c.arr.length) trimmedKeys.push(`${c.label} (${keep}/${c.arr.length})`);
          if (JSON.stringify(env).length <= MAX_TOOL_OUTPUT_CHARS) break;
        }
      }
      if (JSON.stringify(env).length <= MAX_TOOL_OUTPUT_CHARS) {
        env.summary = `${env.summary ?? ""} [output capped: trimmed ${trimmedKeys.join(", ")}]`.trim();
        return JSON.stringify(env);
      }
    }
  } catch {
    // not a JSON envelope — fall through to hard truncation
  }
  return text.slice(0, MAX_TOOL_OUTPUT_CHARS) +
    `\n…[truncated: response exceeded ${MAX_TOOL_OUTPUT_CHARS} chars — narrow the query]`;
}

