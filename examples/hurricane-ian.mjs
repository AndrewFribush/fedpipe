// Run after npm ci && npm run build. No API keys or MCP client required.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Isolate the SDK cache so this report always comes from fresh API responses.
const cache = mkdtempSync(join(tmpdir(), "fedpipe-ian-"));
process.env.XDG_CACHE_HOME = cache;
const requests = [];
const fetchOriginal = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const response = await fetchOriginal(url, options);
  requests.push({
    url: String(url), method: options?.method ?? "GET",
    ...(options?.body ? { body: JSON.parse(options.body) } : {}),
    status: response.status, fetchedAt: new Date().toISOString(),
    sha256: createHash("sha256").update(Buffer.from(await response.clone().arrayBuffer())).digest("hex"),
  });
  return response;
};

try {
  const [fema, register, spending] = await Promise.all([
    import("fedpipe/sdk/fema"), import("fedpipe/sdk/federal-register"), import("fedpipe/sdk/usaspending"),
  ]);
  const declarations = await fema.queryDataset({
    dataset: "disaster_declarations", filter: "disasterNumber eq 4673 and state eq 'FL'",
    select: "disasterNumber,declarationTitle,declarationDate,designatedArea,fipsCountyCode",
    orderBy: "designatedArea asc", top: 100,
  });
  assert(declarations.length > 0 && declarations.length < 100, "Expected a complete, nonempty declaration result");
  assert(declarations.every(d => d.disasterNumber === 4673 && d.declarationTitle === "HURRICANE IAN"));

  const notices = await register.searchRules({
    keyword: "FEMA-4673-DR", agency: "federal-emergency-management-agency",
    start_date: "2022-09-01", end_date: "2023-12-31", per_page: 3,
  });
  assert(notices.results.length > 0, "Expected Federal Register notices for disaster 4673");
  const contracts = await spending.searchAwards({
    keyword: "Hurricane Ian", agency: "Department of Homeland Security", awardType: "contracts",
    state: "FL", startDate: "2022-09-01", endDate: "2023-12-31", limit: 3,
  });
  assert(contracts.awards.length > 0, "Expected matching DHS contracts");
  assert(contracts.awards.every(a => Number.isFinite(a.awardAmount) && /ian/i.test(a.description ?? "")));

  console.log(JSON.stringify({
    question: "Which public records connect Hurricane Ian's Florida declaration to notices and federal contracts?",
    declaration: {
      number: 4673, title: declarations[0].declarationTitle,
      date: declarations[0].declarationDate, designatedAreas: declarations.length,
      countyAreas: declarations.filter(d => d.fipsCountyCode !== "000").length,
      otherAreas: declarations.filter(d => d.fipsCountyCode === "000").map(d => d.designatedArea),
    },
    notices: {
      matchingDocuments: notices.count,
      latest: notices.results.map(d => ({ number: d.document_number, date: d.publication_date, title: d.title, url: d.html_url })),
    },
    contracts: {
      hasMore: contracts.hasNext,
      largestMatching: contracts.awards.map(({ recipientName, awardAmount, description, startDate, endDate, state }) =>
        ({ recipientName, awardAmount, description, startDate, endDate, state })),
    },
    interpretation: [
      "Declaration rows are designated areas, not separate disasters; county and tribal areas are counted separately.",
      "Notices share disaster identifier FEMA-4673-DR. Contracts are keyword matches, not an exhaustive disaster-ID join.",
      "Award amounts are current cumulative USD values for matching awards, not spending during the query window or total Ian costs.",
      "Check descriptions for other disasters, including Hurricane Nicole. Do not attribute a whole multi-disaster award to Ian or sum these examples as a disaster total.",
      "The fixed date window selects records; later modifications and agency revisions can change a rerun's results.",
    ],
    provenance: requests,
  }, null, 2));
} finally {
  globalThis.fetch = fetchOriginal;
  // The SDK flushes its cache on exit. Register cleanup after that handler.
  process.on("exit", () => rmSync(cache, { recursive: true, force: true }));
}
