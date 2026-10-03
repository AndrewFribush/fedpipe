import { expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

it("separates expected failures from passes without hiding unexpected recovery", () => {
  const dir = mkdtempSync(join(tmpdir(), "fedpipe-summary-"));
  try {
    const report = join(dir, "report.json");
    const caseOf = (title: string, status: string, module = "fbi") => ({ title, status, ancestorTitles: [module] });
    writeFileSync(report, JSON.stringify({ startTime: 0, testResults: [{ assertionResults: [
      caseOf("working", "passed"),
      caseOf("outage [expected to fail since yesterday]", "passed"),
      caseOf("recovered [expected to fail since yesterday]", "failed"),
      caseOf("missing key", "skipped"),
      caseOf("has args", "passed", "args table covers every tool with required params"),
    ] }] }));
    const output = execFileSync(process.execPath, ["scripts/live-summary.mjs", report], { encoding: "utf8" });
    expect(output).toContain("1 passed · 1 expected failures · 1 failed · 1 skipped");
    expect(output).toContain("(4 tool and resolver cases)");
    expect(output).toContain("`recovered`");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
