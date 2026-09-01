// Mirrors every upstream API doc page referenced in module metadata
// (reference.docs in each src/apis/*/meta.ts) into upstream-docs/<module>/.
// Output is committed, so re-running produces a reviewable git diff of
// what each agency changed. Run: npm run docs:pull  (builds first).

import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const APIS_DIR = join(ROOT, "dist/apis");
const OUT_DIR = join(ROOT, "upstream-docs");

if (!existsSync(APIS_DIR)) {
  console.error("dist/apis not found — run `npm run build` first");
  process.exit(1);
}

const CONTACT = process.env.SEC_CONTACT_EMAIL ?? "";
const USER_AGENT = `fedpipe-docs-mirror (https://github.com/AndrewFribush/fedpipe${CONTACT ? `; ${CONTACT}` : ""})`;
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const TIMEOUT_MS = 60_000; // fema.gov doc pages routinely take >30s
const CONCURRENCY = 6;
// Below this many characters of extracted text, the page is almost certainly
// a client-rendered JS shell — record that instead of an empty mirror.
const SHELL_THRESHOLD = 300;

// ── Collect (module, label, url) jobs from compiled metadata ──

const jobs = [];
for (const dir of readdirSync(APIS_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  const raw = await import(`file://${join(APIS_DIR, dir, "index.js").replace(/\\/g, "/")}`);
  const mod = raw.default ?? raw;
  const docs = mod.reference?.docs;
  if (!docs) continue;
  for (const [label, url] of Object.entries(docs)) {
    if (typeof url !== "string" || !url.startsWith("http")) continue;
    jobs.push({ module: mod.name ?? dir, label, url });
  }
}

// ── HTML → readable text ──

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", copy: "©", reg: "®", trade: "™", sect: "§" };

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function htmlToText(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|svg|iframe)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(nav|footer|header)\b[\s\S]*?<\/\1>/gi, "");
  // Preserve document structure as markdown-ish text.
  s = s
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${"#".repeat(Number(n))} ${t.replace(/<[^>]+>/g, " ")}\n\n`)
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|section|article|tr|table|ul|ol|dl|blockquote|pre)>/gi, "\n")
    .replace(/<(br|hr)\s*\/?>/gi, "\n")
    .replace(/<\/(td|th)>/gi, " | ")
    .replace(/<dt[^>]*>/gi, "\n**")
    .replace(/<\/dt>/gi, "**: ")
    .replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  return s
    .split("\n")
    .map(l => l.replace(/\s+/g, " ").replace(/(\s\|\s)+$/, "").trim())
    .map(l => (/^[-|•*\s]+$/.test(l) ? "" : l)) // empty list items from stripped nav menus
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ── Fetch one doc ──

async function fetchDoc({ module: mod, label, url }) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": attempt === 0 ? USER_AGENT : BROWSER_UA, Accept: "text/html,application/json,text/plain,text/markdown;q=0.9,*/*;q=0.5" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: "follow",
      });
      if (!res.ok) {
        // Some agencies bot-block the honest UA; retry once as a browser.
        if ((res.status >= 500 || res.status === 403) && attempt === 0) continue;
        return { mod, label, url, status: `HTTP ${res.status}`, body: null, transient: res.status >= 500 || res.status === 429 };
      }
      const type = (res.headers.get("content-type") ?? "").toLowerCase();
      if (type.includes("pdf")) return { mod, label, url, status: "pdf", body: null };
      // Anchored on the subtype: "openxmlformats" (xlsx) must not match "xml".
      if (!/^text\/|[/+](html|json|yaml|xml|markdown|csv|plain)\b/.test(type.split(";")[0])) {
        return { mod, label, url, status: `binary (${type.split(";")[0]})`, body: null };
      }
      const raw = await res.text();
      let body;
      if (type.includes("json")) {
        try { body = "```json\n" + JSON.stringify(JSON.parse(raw), null, 2) + "\n```"; }
        catch { body = raw; }
      } else if (type.includes("html")) {
        body = htmlToText(raw);
        if (body.length < SHELL_THRESHOLD) return { mod, label, url, status: "client-rendered", body: null };
      } else {
        body = raw.trim(); // markdown / plain text — keep verbatim
      }
      return { mod, label, url, status: "ok", body };
    } catch (err) {
      if (attempt === 0) continue;
      return { mod, label, url, status: `error: ${err.cause?.code ?? err.name}`, body: null, transient: true };
    }
  }
}

// ── Run with a small worker pool ──

console.log(`Fetching ${jobs.length} doc pages across ${new Set(jobs.map(j => j.module)).size} modules...`);
const results = [];
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < jobs.length) {
    const job = jobs[next++];
    const r = await fetchDoc(job);
    results.push(r);
    console.log(`  ${r.status === "ok" ? "ok  " : "SKIP"} ${r.mod}/${slugify(r.label)} ${r.status === "ok" ? "" : `(${r.status})`}`);
  }
}));

// ── Write mirror ──
// Never wipe upfront: a transient failure (timeout, 5xx, DNS blip) keeps the
// previous snapshot so flaky runs don't churn the git diff. Permanent skips
// (4xx, client-rendered, pdf, binary) remove any stale file. Files no longer
// referenced by any module's docs map are pruned.

mkdirSync(OUT_DIR, { recursive: true });

const { readdirSync: rd, unlinkSync, statSync } = await import("fs");
const expected = new Set(["README.md"]);
const skipped = [];

for (const r of results.sort((a, b) => a.mod.localeCompare(b.mod) || a.label.localeCompare(b.label))) {
  const rel = `${r.mod}/${slugify(r.label)}.md`;
  const file = join(OUT_DIR, rel);
  if (r.body !== null) {
    expected.add(rel);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, `# ${r.label}\n\nSource: ${r.url}\n\n---\n\n${r.body}\n`);
  } else if (r.transient && existsSync(file)) {
    expected.add(rel);
    skipped.push({ ...r, status: `${r.status} — kept previous snapshot` });
  } else {
    skipped.push(r);
  }
}

// Prune files that are no longer expected (removed links, renamed labels, permanent skips).
for (const modDir of rd(OUT_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  for (const f of rd(join(OUT_DIR, modDir))) {
    if (!expected.has(`${modDir}/${f}`)) unlinkSync(join(OUT_DIR, modDir, f));
  }
  if (rd(join(OUT_DIR, modDir)).length === 0) rmSync(join(OUT_DIR, modDir), { recursive: true });
}

const skippedLines = skipped.length
  ? skipped.map(r => `- \`${r.mod}\` — [${r.label}](${r.url}) — ${r.status}`).join("\n")
  : "_(none)_";
writeFileSync(join(OUT_DIR, "README.md"), `# Upstream API doc mirror

Text snapshots of every agency API doc page referenced in module metadata
(\`reference.docs\` in \`src/apis/*/meta.ts\`). Regenerate with \`npm run docs:pull\`;
the git diff then shows what each agency changed. No fetch timestamps are
embedded — \`git log upstream-docs/\` is the history.

Not mirrored this run (PDF, binary, client-rendered JS app, or fetch error — read in a browser):

${skippedLines}
`);

console.log(`\nWrote ${results.length - skipped.length} pages, skipped ${skipped.length} (see upstream-docs/README.md).`);
