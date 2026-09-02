// Mirrors every upstream API doc page referenced in module metadata
// (reference.docs in each src/apis/*/meta.ts) into upstream-docs/<module>/,
// plus deeper coverage from three extra source kinds:
//   CRAWLS      — follow an index page one level (FRED endpoint pages,
//                 Socrata SoQL reference, Congress GitHub Documentation/).
//   GENERATORS  — hit the APIs themselves where they self-describe
//                 (EIA route tree, Socrata dataset schemas, CMS metastore).
// Output is committed, so re-running produces a reviewable git diff of
// what each agency changed. Run: npm run docs:pull  (builds first).

import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { execFileSync } from "child_process";
import { tmpdir } from "os";
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

let HAS_PDFTOTEXT = false;
try { execFileSync("pdftotext", ["-v"], { stdio: "ignore" }); HAS_PDFTOTEXT = true; } catch { /* pdf pages will be skipped */ }

// ── Crawl sets: index page → linked doc pages (one level) ──
// linkRe runs against each href on the index page; slug groups name the file.

const CRAWLS = [
  {
    module: "fred", prefix: "endpoint",
    index: "https://fred.stlouisfed.org/docs/api/fred/",
    linkRe: /^(?:\/docs\/api\/fred\/)?([a-z0-9_]+)\.html$/,
  },
  // dev.socrata.com's indexes link subpages only through a JS menu, so the
  // stable page sets are listed explicitly.
  {
    module: "cdc", prefix: "soql",
    base: "https://dev.socrata.com/docs/queries/",
    pages: ["select", "where", "order", "group", "having", "limit", "offset", "query"],
  },
  {
    module: "cdc", prefix: "datatype",
    base: "https://dev.socrata.com/docs/datatypes/",
    pages: ["text", "number", "floating_timestamp", "point", "location", "url", "checkbox"],
  },
  {
    module: "congress", prefix: "endpoint",
    githubDir: { owner: "LibraryOfCongress", repo: "api.congress.gov", path: "Documentation" },
  },
];

// ── Load module metadata → base fetch jobs ──

const modules = {};
const jobs = [];
for (const dir of readdirSync(APIS_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  const raw = await import(`file://${join(APIS_DIR, dir, "index.js").replace(/\\/g, "/")}`);
  const mod = raw.default ?? raw;
  modules[mod.name ?? dir] = mod;
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

// Stable form for JSON specs: sorted object keys, and arrays of objects
// stable-sorted by their serialized form — some servers (FEC swagger) shuffle
// array order per request, which would churn the mirror diff every pull.
function canonicalJson(v) {
  if (Array.isArray(v)) {
    const mapped = v.map(canonicalJson);
    return mapped.every(x => x && typeof x === "object" && !Array.isArray(x))
      ? mapped.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
      : mapped;
  }
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.keys(v).sort().map(k => [k, canonicalJson(v[k])]));
  }
  return v;
}

// Pages that embed the current time in generated examples — scrub so the
// mirror only diffs on real content changes.
const VOLATILE = [
  { hostRe: /earthquake\.usgs\.gov/, re: /\b20\d{2}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?\b/g, sub: "<time>" },
];

function scrubVolatile(url, body) {
  for (const v of VOLATILE) if (v.hostRe.test(new URL(url).host)) body = body.replace(v.re, v.sub);
  return body;
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
        // 403 counts as transient for pruning: from a datacenter IP it almost
        // always means bot-blocking, not that the page is gone.
        return { mod, label, url, status: `HTTP ${res.status}`, body: null, transient: res.status >= 500 || res.status === 429 || res.status === 403 };
      }
      const type = (res.headers.get("content-type") ?? "").toLowerCase();
      if (type.includes("pdf")) {
        if (!HAS_PDFTOTEXT) return { mod, label, url, status: "pdf (install pdftotext to mirror)", body: null };
        const tmp = join(tmpdir(), `fedpipe-doc-${Date.now()}.pdf`);
        writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
        try {
          const text = execFileSync("pdftotext", ["-layout", tmp, "-"], { maxBuffer: 64 * 1024 * 1024 }).toString();
          return { mod, label, url, status: "ok", body: text.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim() };
        } finally { rmSync(tmp, { force: true }); }
      }
      // Anchored on the subtype: "openxmlformats" (xlsx) must not match "xml".
      // Some servers ship yaml/json specs as octet-stream (data.uspto.gov) — trust the extension.
      const textExt = /\.(ya?ml|json|md|txt)$/i.test(new URL(url).pathname);
      if (!textExt && !/^text\/|[/+](html|json|yaml|xml|markdown|csv|plain)\b/.test(type.split(";")[0])) {
        return { mod, label, url, status: `binary (${type.split(";")[0]})`, body: null };
      }
      const raw = await res.text();
      let body;
      if (type.includes("json") || (textExt && /\.json$/i.test(new URL(url).pathname) && !/^</.test(raw.trim()))) {
        try { body = "```json\n" + JSON.stringify(canonicalJson(JSON.parse(raw)), null, 2) + "\n```"; }
        catch { body = raw; }
      } else if (type.includes("html") && !textExt) {
        body = htmlToText(raw);
        if (body.length < SHELL_THRESHOLD) {
          // Some sites (huduser.gov) serve a JS shell to unknown UAs with HTTP 200.
          if (attempt === 0) continue;
          return { mod, label, url, status: "client-rendered", body: null };
        }
      } else {
        body = raw.trim(); // markdown / yaml / plain text — keep verbatim
        // A WAF can serve an HTML challenge in place of a spec file with HTTP 200.
        if (/^<(!doctype|html)/i.test(body)) {
          if (attempt === 0) continue;
          return { mod, label, url, status: "html challenge page", body: null };
        }
      }
      return { mod, label, url, status: "ok", body: scrubVolatile(url, body) };
    } catch (err) {
      if (attempt === 0) continue;
      return { mod, label, url, status: `error: ${err.cause?.code ?? err.name}`, body: null, transient: true };
    }
  }
}

// ── Expand crawl sets into page jobs ──

const failedCrawls = [];

async function crawlJobs() {
  const out = [];
  for (const c of CRAWLS) {
    try {
      if (c.githubDir) {
        // GitHub directory of markdown files (one level of subdirs followed).
        const { owner, repo, path } = c.githubDir;
        const list = async p => {
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${p}`, {
            headers: { "User-Agent": USER_AGENT, Accept: "application/vnd.github+json" },
            signal: AbortSignal.timeout(TIMEOUT_MS),
          });
          if (!res.ok) throw new Error(`GitHub ${res.status} for ${p}`);
          return res.json();
        };
        for (const entry of await list(path)) {
          if (entry.type === "file" && entry.name.endsWith(".md")) {
            out.push({ module: c.module, label: `${c.prefix} ${entry.name.replace(/\.md$/, "")}`, url: entry.download_url });
          } else if (entry.type === "dir") {
            for (const sub of await list(entry.path)) {
              if (sub.type === "file" && sub.name.endsWith(".md")) {
                out.push({ module: c.module, label: `${c.prefix} ${entry.name} ${sub.name.replace(/\.md$/, "")}`, url: sub.download_url });
              }
            }
          }
        }
      } else if (c.pages) {
        for (const page of c.pages) {
          out.push({ module: c.module, label: `${c.prefix} ${page.replace(/[_-]+/g, " ")}`, url: `${c.base}${page}.html` });
        }
      } else {
        const res = await fetch(c.index, { headers: { "User-Agent": BROWSER_UA }, signal: AbortSignal.timeout(TIMEOUT_MS) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const seen = new Set();
        for (const m of html.matchAll(/href="([^"#?]+)"/g)) {
          let href = m[1];
          try { href = new URL(href, c.index).pathname + (href.endsWith(".html") || !href.endsWith("/") ? "" : "/"); } catch { continue; }
          const rel = href.startsWith("/") ? href : `/${href}`;
          const match = rel.match(c.linkRe) ?? m[1].match(c.linkRe);
          if (!match) continue;
          const page = match[1];
          if (page === "index" || seen.has(page)) continue;
          seen.add(page);
          out.push({ module: c.module, label: `${c.prefix} ${page.replace(/[_-]+/g, " ")}`, url: new URL(m[1], c.index).href });
        }
        if (seen.size === 0) console.warn(`  WARN crawl of ${c.index} matched no links`);
      }
    } catch (err) {
      console.warn(`  WARN crawl ${c.module}/${c.prefix} failed: ${err.message}`);
      failedCrawls.push(c);
    }
  }
  return out;
}

// ── Generators: pages produced by querying the APIs themselves ──

async function getJson(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json", ...extraHeaders },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function genEiaRouteMap() {
  const key = process.env.EIA_API_KEY;
  if (!key) return { mod: "eia", label: "Route Map (live)", url: "https://api.eia.gov/v2/", status: "skipped: EIA_API_KEY not set", body: null };
  const top = await getJson(`https://api.eia.gov/v2/?api_key=${key}`);
  const lines = ["The EIA APIv2 route tree, as reported by the API itself (`GET /v2/` and `GET /v2/{route}`)."];
  for (const r of top.response?.routes ?? []) {
    lines.push(`\n## ${r.id} — ${r.name}\n\n${r.description ?? ""}`);
    try {
      const child = await getJson(`https://api.eia.gov/v2/${r.id}?api_key=${key}`);
      const resp = child.response ?? {};
      for (const sub of resp.routes ?? []) lines.push(`- \`${r.id}/${sub.id}\` — ${sub.name}`);
      if (resp.data) lines.push(`- data columns: ${Object.keys(resp.data).map(k => `\`${k}\``).join(", ")}`);
      if (resp.frequency) lines.push(`- frequencies: ${(resp.frequency ?? []).map(f => f.id).join(", ")}`);
    } catch (err) {
      lines.push(`- (children unavailable: ${err.message})`);
    }
  }
  return { mod: "eia", label: "Route Map (live)", url: "https://api.eia.gov/v2/", status: "ok", body: lines.join("\n") };
}

async function genSocrataSchemas(mod, host) {
  const DATASETS = (await import(`file://${join(APIS_DIR, mod, "sdk.js").replace(/\\/g, "/")}`)).DATASETS;
  if (!DATASETS) throw new Error(`no DATASETS export in ${mod}/sdk.js`);
  const lines = [`Column schemas for every dataset this module wraps, as reported by ${host}'s metadata API (\`/api/views/{id}.json\`).`];
  for (const [k, d] of Object.entries(DATASETS)) {
    const v = await getJson(`https://${host}/api/views/${d.id}.json`);
    lines.push(`\n## ${k} — ${v.name} (\`${d.id}\`)\n`);
    if (v.description) lines.push(v.description.split("\n")[0], "");
    lines.push("| field | type | description |", "|---|---|---|");
    for (const col of v.columns ?? []) {
      const desc = (col.description ?? "").replace(/\s+/g, " ").slice(0, 200);
      lines.push(`| \`${col.fieldName}\` | ${col.dataTypeName} | ${desc.replace(/\|/g, "\\|")} |`);
    }
  }
  return { mod, label: "Dataset Schemas (live)", url: `https://${host}/api/views/`, status: "ok", body: lines.join("\n") };
}

async function genCmsSchemas() {
  const DATASETS = (await import(`file://${join(APIS_DIR, "cms", "sdk.js").replace(/\\/g, "/")}`)).DATASETS;
  const lines = ["Field lists for every provider dataset this module wraps, as reported by data.cms.gov's DKAN datastore (`/provider-data/api/1/datastore/query/{id}/0`)."];
  for (const [k, d] of Object.entries(DATASETS)) {
    const q = await getJson(`https://data.cms.gov/provider-data/api/1/datastore/query/${d.id}/0?limit=1&offset=0`);
    const fields = q.query?.properties ?? Object.keys(q.results?.[0] ?? {});
    lines.push(`\n## ${k} — ${d.name} (\`${d.id}\`)\n\n${d.description}\n`);
    lines.push(fields.length ? fields.map(f => `- \`${f}\``).join("\n") : "_(no fields reported)_");
  }
  return { mod: "cms", label: "Dataset Schemas (live)", url: "https://data.cms.gov/provider-data/api/1/", status: "ok", body: lines.join("\n") };
}

const GENERATORS = [
  genEiaRouteMap,
  () => genSocrataSchemas("bts", "data.bts.gov"),
  () => genSocrataSchemas("cdc", "data.cdc.gov"),
  genCmsSchemas,
];

// ── Run: crawl expansion, worker pool over pages, then generators ──

const crawled = await crawlJobs();
jobs.push(...crawled);
console.log(`Fetching ${jobs.length} doc pages (${crawled.length} from crawls) across ${new Set(jobs.map(j => j.module)).size} modules...`);

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

for (const gen of GENERATORS) {
  try {
    const r = await gen();
    results.push(r);
    console.log(`  ${r.status === "ok" ? "ok  " : "SKIP"} ${r.mod}/${slugify(r.label)} ${r.status === "ok" ? "(generated)" : `(${r.status})`}`);
  } catch (err) {
    console.warn(`  WARN generator failed: ${err.message}`);
  }
}

// ── Write mirror ──
// Never wipe upfront: a transient failure (timeout, 5xx, DNS blip) keeps the
// previous snapshot so flaky runs don't churn the git diff. Permanent skips
// (4xx, client-rendered, pdf, binary) remove any stale file. Files no longer
// referenced by any module's docs map are pruned.

mkdirSync(OUT_DIR, { recursive: true });

const expected = new Set(["README.md"]);
const skipped = [];

for (const r of results.sort((a, b) => a.mod.localeCompare(b.mod) || a.label.localeCompare(b.label))) {
  const rel = `${r.mod}/${slugify(r.label)}.md`;
  const file = join(OUT_DIR, rel);
  if (r.body !== null) {
    expected.add(rel);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, `# ${r.label}\n\nSource: ${r.url}\n\n---\n\n${r.body}\n`);
  } else if (existsSync(file) && !/^HTTP (404|410)$/.test(r.status)) {
    // Prune only on definitive gone (404/410) or when the link itself is
    // dropped from metadata; any other skip keeps the previous snapshot —
    // CI runner IPs get bot-blocked in ways a laptop doesn't.
    expected.add(rel);
    skipped.push({ ...r, status: `${r.status} — kept previous snapshot` });
  } else {
    skipped.push(r);
  }
}

// Prune files that are no longer expected (removed links, renamed labels, permanent skips).
const crawlProtected = (modDir, f) =>
  failedCrawls.some(c => c.module === modDir && f.startsWith(`${slugify(c.prefix)}-`));

for (const modDir of readdirSync(OUT_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  for (const f of readdirSync(join(OUT_DIR, modDir))) {
    if (!expected.has(`${modDir}/${f}`) && !crawlProtected(modDir, f)) unlinkSync(join(OUT_DIR, modDir, f));
  }
  if (readdirSync(join(OUT_DIR, modDir)).length === 0) rmSync(join(OUT_DIR, modDir), { recursive: true });
}

const skippedLines = skipped.length
  ? skipped.map(r => `- \`${r.mod}\` — [${r.label}](${r.url}) — ${r.status}`).join("\n")
  : "_(none)_";
writeFileSync(join(OUT_DIR, "README.md"), `# Upstream API doc mirror

Text snapshots of every agency API doc page referenced in module metadata
(\`reference.docs\` in \`src/apis/*/meta.ts\`), expanded by one-level crawls of
key doc indexes (FRED endpoints, Socrata SoQL reference, Congress GitHub
docs) and pages generated by querying the self-describing APIs themselves
(EIA route tree, Socrata/CMS dataset schemas). Regenerate with
\`npm run docs:pull\`; the git diff then shows what each agency changed.
No fetch timestamps are embedded — \`git log upstream-docs/\` is the history.

Not mirrored this run (PDF, binary, client-rendered JS app, or fetch error — read in a browser):

${skippedLines}
`);

console.log(`\nWrote ${results.length - skipped.length} pages, skipped ${skipped.length} (see upstream-docs/README.md).`);
