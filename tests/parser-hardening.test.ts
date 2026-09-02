import { describe, it, expect } from "vitest";
import { parseNaepJson } from "../src/apis/naep/sdk.js";

describe("parseNaepJson", () => {
  it("parses valid JSON unchanged", () => {
    expect(parseNaepJson('{"a": 1}')).toEqual({ a: 1 });
  });

  it("repairs unescaped quotes inside string values (NAEP survey labels)", () => {
    const bad = '{"label": "How much do you agree? "I can teach" and more", "n": 2}';
    expect(parseNaepJson(bad)).toEqual({ label: 'How much do you agree? "I can teach" and more', n: 2 });
  });

  it("keeps legitimately escaped quotes working", () => {
    const ok = '{"label": "already \\"escaped\\" fine"}';
    expect(parseNaepJson(ok)).toEqual({ label: 'already "escaped" fine' });
  });

  it("repairs quotes in arrays of objects", () => {
    const bad = '{"result": [{"shortLabel": "the "best" one"}, {"shortLabel": "plain"}]}';
    expect(parseNaepJson<any>(bad).result[1].shortLabel).toBe("plain");
    expect(parseNaepJson<any>(bad).result[0].shortLabel).toBe('the "best" one');
  });
});
