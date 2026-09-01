#!/usr/bin/env node
/**
 * Turn a vitest JSON report from the live smoke suite into a Markdown summary
 * (used for the GitHub Actions job summary). Usage: node scripts/live-summary.mjs live-results.json
 */
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? "live-results.json";
const report = JSON.parse(readFileSync(file, "utf8"));

const rows = [];
for (const f of report.testResults ?? []) {
  for (const t of f.assertionResults ?? []) {
    const module = t.ancestorTitles?.[0] ?? "?";
    if (module === "args table covers every tool with required params") continue;
    rows.push({ module, name: t.title, status: t.status, ms: t.duration ?? 0, msg: (t.failureMessages?.[0] ?? "").split("\n")[0] });
  }
}
const by = (s) => rows.filter((r) => r.status === s);
const passed = by("passed"), failed = by("failed"), skipped = by("skipped").concat(by("pending"));
const modules = new Map();
for (const r of rows) {
  const m = modules.get(r.module) ?? { passed: 0, failed: 0, skipped: 0 };
  m[r.status === "passed" ? "passed" : r.status === "failed" ? "failed" : "skipped"]++;
  modules.set(r.module, m);
}
const skippedKeyed = new Set(rows.filter((r) => r.status !== "passed" && r.status !== "failed" && /skipped: set (\S+)/.test(r.name)).map((r) => r.name.match(/skipped: set ([^\]]+)/)[1]));

const out = [];
out.push(`## Live API smoke test — ${new Date(report.startTime ?? Date.now()).toISOString().slice(0, 10)}`);
out.push("");
out.push(`**${passed.length} passed · ${failed.length} failed · ${skipped.length} skipped** (${rows.length} tools)`);
if (skippedKeyed.size) out.push(`Skipped for missing keys: ${[...skippedKeyed].join(", ")}`);
out.push("");
if (failed.length) {
  out.push("### Failures");
  out.push("| Module | Tool | Error |");
  out.push("|---|---|---|");
  for (const r of failed) out.push(`| ${r.module} | \`${r.name.replace(/ \[.*$/, "")}\` | ${r.msg.replace(/\|/g, "\\|").slice(0, 160)} |`);
  out.push("");
}
out.push("### By module");
out.push("| Module | ✅ | ❌ | ⏭ |");
out.push("|---|---|---|---|");
for (const [m, c] of [...modules.entries()].sort()) out.push(`| ${m} | ${c.passed} | ${c.failed || ""} | ${c.skipped || ""} |`);
console.log(out.join("\n"));
