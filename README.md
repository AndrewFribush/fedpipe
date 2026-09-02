<div align="center">

# fedpipe

**MCP server + TypeScript SDK for 40+ U.S. government data APIs — verified against the live endpoints every night**

[![npm version](https://img.shields.io/npm/v/fedpipe)](https://www.npmjs.com/package/fedpipe)
[![npm downloads](https://img.shields.io/npm/dm/fedpipe)](https://www.npmjs.com/package/fedpipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live API smoke test](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml/badge.svg)](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml)

355 tools covering economic, fiscal, health, education, energy, environment, lobbying, housing, patents, safety, banking, consumer protection, workplace safety, transportation, seismic, clinical trials, pharma payments, research funding, procurement, and legislative data.

**20+ APIs require no key** · The rest use free keys that take under a minute to get

[Getting Started](https://andrewfribush.github.io/fedpipe/guide/getting-started) · [API Reference](https://andrewfribush.github.io/fedpipe/api/) · [Documentation](https://andrewfribush.github.io/fedpipe/)

</div>

---

## Features

- **355 tools** across 42 government APIs — economic, health, legislative, financial, environmental, and more
- **Cross-referencing** — built-in instructions guide the LLM to combine data from multiple agencies (e.g., FDA adverse events + lobbying spend + campaign contributions)
- **Code mode** — WASM-sandboxed JavaScript execution reduces context window usage by 98-100% for large responses
- **Selective loading** — load only the modules you need: `--modules fred,treasury,congress`
- **Dual transport** — stdio for desktop clients, HTTP Stream for web/remote
- **TypeScript SDK** — every API is importable as a standalone typed client, no MCP required
- **Disk-backed caching** — responses cached to disk, survives restarts
- **Rate limiting + retry** — token-bucket rate limiter with exponential backoff on 429/503, tuned to each agency's published limits
- **Battle-tested nightly** — every tool runs against the live APIs each night, with silent-empty detection and schema-drift guards; agency doc changes land as reviewable commits
- **LLM-friendly hardening** — strict schemas with did-you-mean rejections, argument normalization (whitespace, numeric strings, zero-width chars), fuzzy name resolution (tickers, country/state names, vehicle models), and a 120KB output cap that degrades gracefully
- **`fedpipe doctor`** — one command to check key setup and live connectivity per module
- **Discovery built in** — `find_tools` searches all tools by topic; per-module reference data is browsable as MCP resources
- **Cross-agency resolvers** — `resolve_entity` (companies: SEC/FEC/lobbying/USAspending/OpenPayments/FAERS), `resolve_person` (politicians: FEC + Congress), and `resolve_place` (Census/QCEW/FEMA) each link identities across agencies in one call with ready-to-run follow-ups

## Quick Start

### MCP Server

```bash
npx fedpipe
```

Add to `.vscode/mcp.json` for VS Code / Copilot:

```json
{
  "servers": {
    "fedpipe": {
      "command": "npx",
      "args": ["-y", "fedpipe"],
      "env": {
        "FRED_API_KEY": "your_key",
        "DATA_GOV_API_KEY": "your_key"
      }
    }
  }
}
```

Add to `claude_desktop_config.json` for Claude Desktop:

```json
{
  "mcpServers": {
    "fedpipe": {
      "command": "npx",
      "args": ["-y", "fedpipe"],
      "env": {
        "FRED_API_KEY": "your_key",
        "DATA_GOV_API_KEY": "your_key"
      }
    }
  }
}
```

### Health check

```bash
npx fedpipe doctor         # key status per module, with signup links
npx fedpipe doctor --live  # plus a live ping of every reachable module
```

## Example Prompts

Once connected, ask your AI assistant natural language questions:

> **Economic:** "What's the current state of the U.S. economy? Show me GDP, unemployment, inflation, and interest rates."

> **Health:** "Show me the adverse event profile for Ozempic including clinical trials, FDA reports, and pharma payments to doctors."

> **Legislative:** "What happened with the Inflation Reduction Act? Who sponsored it, how did the vote break down by party?"

> **Follow the money:** "Which banking PACs gave money to members of the Senate Banking Committee, and how did those members vote on banking deregulation?"

> **Cross-reference:** "How has federal spending on healthcare changed over the last 5 years, and what health outcomes has it produced?"

### TypeScript SDK

```bash
npm install fedpipe
```

```typescript
import { getObservations } from "fedpipe/sdk/fred";
import { searchBills } from "fedpipe/sdk/congress";

const gdp = await getObservations("GDP", { sort: "desc", limit: 5 });
```

No MCP server required. All functions include caching, retry, and rate limiting.

## Documentation

Full documentation at **[andrewfribush.github.io/fedpipe](https://andrewfribush.github.io/fedpipe/)**

| | |
|---|---|
| [Getting Started](https://andrewfribush.github.io/fedpipe/guide/getting-started) | MCP setup, SDK install, client configs |
| [API Keys](https://andrewfribush.github.io/fedpipe/guide/api-keys) | Which APIs need keys, where to get them |
| [Data Sources](https://andrewfribush.github.io/fedpipe/guide/data-sources) | All 40+ APIs grouped by category |
| [API Reference](https://andrewfribush.github.io/fedpipe/api/) | Auto-generated from TypeScript — every function and type |
| [Examples](https://andrewfribush.github.io/fedpipe/guide/sdk-usage) | SDK code, MCP prompts, analysis showcases |
| [Architecture](https://andrewfribush.github.io/fedpipe/guide/architecture) | How the system works |
| [Adding Modules](https://andrewfribush.github.io/fedpipe/guide/adding-modules) | Add a new API — just create a folder |

## Data Sources

| Category | APIs |
|----------|------|
| **Economic** | Treasury, FRED, BLS, BEA, EIA |
| **Legislative** | Congress.gov, Federal Register, GovInfo, Regulations.gov |
| **Financial** | FEC, Senate Lobbying, SEC, FDIC, CFPB |
| **Spending** | USAspending, Open Payments |
| **Health & Safety** | CDC, FDA, CMS, ClinicalTrials.gov, NIH, NHTSA, DOL |
| **Environment** | EPA, NOAA, NREL, USGS |
| **Justice** | FBI Crime Data, DOJ News |
| **Education** | NAEP, College Scorecard, USPTO |
| **Demographics** | Census, HUD, FEMA |
| **Other** | BTS, USDA NASS, USDA FoodData, World Bank |

## Disclaimer

This project integrates **a significant number of government APIs**, many of which have large, complex, or inconsistently documented schemas. AI is used as a tool throughout this project to help parse API documentation, generate type definitions, and scaffold tool implementations — making it possible to cover this much surface area and get people access to government data faster than would otherwise be feasible. While every effort has been made to ensure accuracy, some endpoints may return unexpected results, have incomplete parameter coverage, or behave differently than documented.

This is a community-driven effort — if you find something that's broken or could be improved, **please open an issue or submit a PR**. Contributions that fix edge cases, improve schema accuracy, or expand coverage are especially welcome. The goal is to make U.S. government data as accessible and reliable as possible, together.

All data is sourced from official U.S. government and international APIs — the server does not generate, modify, or editorialize any data.

## Credits

fedpipe started as a fork of [lzinga/us-gov-open-data-mcp](https://github.com/lzinga/us-gov-open-data-mcp)
by Lucas Elzinga (MIT). The module architecture, shared client, and most of the 40+ API modules
originate there. fedpipe adds continuous live verification of every tool, the bug fixes that
verification surfaced, and deeper FRED / Census / SEC / World Bank coverage — see
[docs/parity-notes.md](docs/parity-notes.md).

## License

MIT
