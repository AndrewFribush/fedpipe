/**
 * HMDA SDK — the Home Mortgage Disclosure Act data browser, served by the
 * Consumer Financial Protection Bureau (ffiec.cfpb.gov).
 *
 * HMDA is the near-census of U.S. mortgage lending: nearly every application
 * for a home loan, with the action taken (originated, denied, ...), loan type
 * and purpose, and the applicant's race, sex, and ethnicity. It is the primary
 * dataset for studying mortgage access and fair lending.
 *
 * This wraps the aggregations endpoint, which returns loan *counts* and total
 * *dollar volume* for a filtered slice — grouped automatically when you pass
 * multiple values of a dimension (e.g. several races → one row per race).
 *
 * Standalone — no MCP or Zod required:
 *   import { getLendingAggregations } from "fedpipe/sdk/hmda";
 *
 * Keyless: the CFPB serves this open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://ffiec.cfpb.gov",
  name: "hmda",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d — annual data
  timeoutMs: 45_000,
});

// ─── Reference ───────────────────────────────────────────────────────

export const ACTIONS: Record<string, string> = {
  "1": "Loan originated",
  "2": "Approved but not accepted",
  "3": "Denied",
  "4": "Withdrawn by applicant",
  "5": "File closed for incompleteness",
  "6": "Purchased loan",
  "7": "Preapproval denied",
  "8": "Preapproval approved but not accepted",
};

export const LOAN_TYPES: Record<string, string> = {
  "1": "Conventional",
  "2": "FHA-insured",
  "3": "VA-guaranteed",
  "4": "RHS/FSA-guaranteed",
};

export const LOAN_PURPOSES: Record<string, string> = {
  "1": "Home purchase",
  "2": "Home improvement",
  "31": "Refinancing",
  "32": "Cash-out refinancing",
  "4": "Other",
  "5": "Not applicable",
};

export const RACES = [
  "American Indian or Alaska Native", "Asian", "Black or African American",
  "Native Hawaiian or Other Pacific Islander", "White", "2 or more minority races",
  "Joint", "Free Form Text Only", "Race Not Available",
] as const;

export const SEXES = ["Male", "Female", "Joint", "Sex Not Available"] as const;

export const ETHNICITIES = [
  "Hispanic or Latino", "Not Hispanic or Latino", "Joint",
  "Ethnicity Not Available", "Free Form Text Only",
] as const;

// ─── Types ───────────────────────────────────────────────────────────

export interface LendingGroup {
  count: number;
  loanVolumeUsd: number;
  /** Echoed dimension values (e.g. { races: "White", actions_taken: "1" }), labeled where known. */
  [dimension: string]: string | number;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const join = (v: string | string[] | undefined): string | undefined =>
  v == null ? undefined : Array.isArray(v) ? v.join(",") : v;

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Filtered HMDA loan aggregations — count and total dollar volume.
 *
 * Provide a year and a geography (state or county), plus at least one filter
 * dimension. Passing multiple comma-separated values of a dimension groups the
 * result by that dimension (one row per value) — the key to fair-lending cuts.
 *
 * - `state`: 2-letter code (e.g. "CO"); or `county`: 5-digit FIPS (e.g. "08101").
 * - `actions`, `loanTypes`, `loanPurposes`, `races`, `sexes`, `ethnicities`:
 *   single value or array. Defaults to actions=["1"] (originations) if no
 *   dimension filter is supplied.
 */
export async function getLendingAggregations(opts: {
  year: number;
  state?: string;
  county?: string;
  actions?: string | string[];
  loanTypes?: string | string[];
  loanPurposes?: string | string[];
  races?: string | string[];
  sexes?: string | string[];
  ethnicities?: string | string[];
}): Promise<{ parameters: Record<string, unknown>; groups: LendingGroup[] }> {
  // Default to originated loans (action 1) — the meaningful base for any cut —
  // unless the caller specifies which actions they want. This also satisfies
  // the API's "at least one filter dimension" requirement.
  const actions = join(opts.actions) ?? "1";

  const raw = await api.get<any>("/v2/data-browser-api/view/aggregations", qp({
    years: opts.year,
    states: opts.state ? opts.state.toUpperCase() : undefined,
    counties: opts.county,
    actions_taken: actions,
    loan_types: join(opts.loanTypes),
    loan_purposes: join(opts.loanPurposes),
    races: join(opts.races),
    sexes: join(opts.sexes),
    ethnicities: join(opts.ethnicities),
  }));

  const groups: LendingGroup[] = (raw?.aggregations ?? []).map((a: any) => {
    const g: LendingGroup = {
      count: a.count ?? 0,
      loanVolumeUsd: Math.round(a.sum ?? 0),
    };
    for (const [k, v] of Object.entries(a)) {
      if (k === "count" || k === "sum") continue;
      g[k] = v as string | number;
      if (k === "actions_taken" && ACTIONS[String(v)]) g.action_label = ACTIONS[String(v)];
      if (k === "loan_types" && LOAN_TYPES[String(v)]) g.loan_type_label = LOAN_TYPES[String(v)];
      if (k === "loan_purposes" && LOAN_PURPOSES[String(v)]) g.loan_purpose_label = LOAN_PURPOSES[String(v)];
    }
    return g;
  });

  return { parameters: raw?.parameters ?? {}, groups };
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
