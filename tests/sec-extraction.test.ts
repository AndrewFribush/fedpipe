import { describe, it, expect } from "vitest";
import { htmlToText, extractSection } from "../src/apis/sec/sdk.js";
import { normalizeQcewArea } from "../src/apis/bls/sdk.js";

describe("sec htmlToText", () => {
  it("does not split words wrapped in nested inline spans", () => {
    // XBRL viewers render "RISK" as <span>RIS</span><span>K</span>
    const html = "<div>ITEM 1A. <span>RIS</span><span>K</span> <b>FACTORS</b></div>";
    expect(htmlToText(html)).toContain("RISK FACTORS");
  });

  it("still separates block elements with newlines", () => {
    const html = "<p>First</p><p>Second</p>";
    expect(htmlToText(html)).toMatch(/First\n ?Second/);
  });
});

describe("sec extractSection", () => {
  // Synthetic 10-K: table of contents, then body with running page headers
  // that repeat the section's own item number.
  const text = [
    "TABLE OF CONTENTS",
    "Item 1A. Risk Factors 14",
    "Item 1B. Unresolved Staff Comments 30",
    "PART I",
    "ITEM 1A. RISK FACTORS",
    "Our operations and financial results are subject to risks. " + "x".repeat(400),
    "Item 1A", // running page header — must NOT end the section
    "More risk content here. " + "y".repeat(400),
    "Item 1B. Unresolved Staff Comments",
    "Nothing to report.",
  ].join("\n");

  it("skips the table of contents and spans past running page headers", () => {
    const res = extractSection(text, "risk_factors" as never);
    expect(res).not.toBeNull();
    expect(res!.text).toContain("subject to risks");
    expect(res!.text).toContain("More risk content"); // past the running header
    expect(res!.text).not.toContain("Nothing to report"); // stops at Item 1B
    expect(res!.text.length).toBeGreaterThan(800);
  });
});

describe("bls normalizeQcewArea", () => {
  it("maps state codes, FIPS, and US variants", () => {
    expect(normalizeQcewArea("US")).toBe("US000");
    expect(normalizeQcewArea("tx")).toBe("48000");
    expect(normalizeQcewArea("48")).toBe("48000");
    expect(normalizeQcewArea("17031")).toBe("17031");
    expect(normalizeQcewArea("C1642")).toBe("C1642");
  });
});
