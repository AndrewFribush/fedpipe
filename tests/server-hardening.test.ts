import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  strictParams, normalizeArgs, capToolOutput, MAX_TOOL_OUTPUT_CHARS,
} from "../src/server/hardening.js";

describe("strictParams", () => {
  const schema = strictParams(z.object({
    minmagnitude: z.number().optional(),
    series_id: z.string().optional(),
  }));

  it("accepts known keys", () => {
    expect(schema.safeParse({ minmagnitude: 5 }).success).toBe(true);
  });

  it("rejects unknown keys with a did-you-mean suggestion", () => {
    const r = schema.safeParse({ min_magnitude: 5 });
    expect(r.success).toBe(false);
    const msg = r.error!.issues.map(i => i.message).join(" ");
    expect(msg).toContain('did you mean "minmagnitude"');
    expect(msg).toContain("This tool accepts: minmagnitude, series_id");
  });

  it("matches across naming conventions (camelCase vs snake_case)", () => {
    const r = schema.safeParse({ seriesId: "UNRATE" });
    expect(r.success).toBe(false);
    expect(r.error!.issues.map(i => i.message).join(" ")).toContain('did you mean "series_id"');
  });

  it("suggests nothing for distant garbage keys", () => {
    const r = schema.safeParse({ bananas: 1 });
    expect(r.success).toBe(false);
    expect(r.error!.issues.map(i => i.message).join(" ")).not.toContain("did you mean");
  });
});

describe("normalizeArgs", () => {
  const shape = z.object({
    year: z.number().optional(),
    active: z.boolean().optional(),
    state: z.string().optional(),
    limit: z.number().int().default(10),
  }).shape;

  it("trims strings", () => {
    expect(normalizeArgs(shape, { state: "  CA  " })).toEqual({ state: "CA" });
  });

  it("coerces numeric strings for number fields", () => {
    expect(normalizeArgs(shape, { year: "2023", limit: "5" })).toEqual({ year: 2023, limit: 5 });
  });

  it("coerces boolean strings for boolean fields", () => {
    expect(normalizeArgs(shape, { active: "true" })).toEqual({ active: true });
    expect(normalizeArgs(shape, { active: "FALSE" })).toEqual({ active: false });
  });

  it("leaves non-coercible and unknown-typed values alone", () => {
    expect(normalizeArgs(shape, { state: "2023" })).toEqual({ state: "2023" });
    expect(normalizeArgs(shape, { year: "not-a-number" })).toEqual({ year: "not-a-number" });
    expect(normalizeArgs(shape, { unknown_key: " x " })).toEqual({ unknown_key: "x" });
  });

  it("strips zero-width characters from strings", () => {
    expect(normalizeArgs(shape, { state: "Harv\u200Bard\uFEFF" })).toEqual({ state: "Harvard" });
  });

  it("clamps negative pagination params (0 preserved for count-style queries)", () => {
    expect(normalizeArgs(shape, { limit: -5 })).toEqual({ limit: 1 });
    expect(normalizeArgs(shape, { limit: 0 })).toEqual({ limit: 0 });
    expect(normalizeArgs(shape, { offset: -3 } as any)).toEqual({ offset: 0 });
    expect(normalizeArgs(shape, { year: -1 })).toEqual({ year: -1 }); // non-pagination untouched
  });

  it("passes through non-object input", () => {
    expect(normalizeArgs(shape, undefined)).toBeUndefined();
    expect(normalizeArgs(shape, "raw")).toBe("raw");
  });
});

describe("capToolOutput", () => {
  it("passes small output through untouched", () => {
    const s = JSON.stringify({ summary: "ok", dataType: "table", data: { rows: [[1]] } });
    expect(capToolOutput(s)).toBe(s);
  });

  it("trims table rows, keeps valid JSON, and annotates the summary", () => {
    const rows = Array.from({ length: 5000 }, (_, i) => [i, "x".repeat(50)]);
    const s = JSON.stringify({ summary: "big", dataType: "table", data: { columns: ["a", "b"], rows, total: 5000, truncated: false } });
    expect(s.length).toBeGreaterThan(MAX_TOOL_OUTPUT_CHARS);
    const capped = capToolOutput(s);
    expect(capped.length).toBeLessThanOrEqual(MAX_TOOL_OUTPUT_CHARS);
    const env = JSON.parse(capped);
    expect(env.data.truncated).toBe(true);
    expect(env.data.rows.length).toBeLessThan(5000);
    expect(env.summary).toContain("[output capped");
  });

  it("truncates long record strings before shrinking structured arrays", () => {
    const env = {
      summary: "profile", dataType: "record",
      record: {
        doc: "y".repeat(200_000),
        timeline: Array.from({ length: 100 }, (_, i) => ({ n: i })),
      },
    };
    const capped = capToolOutput(JSON.stringify(env));
    const parsed = JSON.parse(capped);
    expect(capped.length).toBeLessThanOrEqual(MAX_TOOL_OUTPUT_CHARS);
    expect(parsed.record.timeline.length).toBe(100); // structure preserved
    expect(parsed.record.doc).toContain("…[truncated");
    expect(parsed.summary).toContain("long text field");
  });

  it("hard-truncates non-JSON output as a last resort", () => {
    const s = "z".repeat(MAX_TOOL_OUTPUT_CHARS + 1000);
    const capped = capToolOutput(s);
    expect(capped).toContain("…[truncated: response exceeded");
  });
});
