# Getting Started

## Features

- **300+ tools** across 40+ government APIs — economic, health, legislative, financial, environmental, and more
- **Cross-referencing** — built-in instructions guide the LLM to combine data from multiple agencies
- **[Code mode](/guide/code-mode)** — WASM-sandboxed JavaScript execution reduces context usage by 98-100% for large responses
- **Selective loading** — load only the modules you need: `--modules fred,treasury,congress`
- **Dual transport** — stdio for desktop clients, HTTP Stream for web/remote
- **TypeScript SDK** — every API is importable as a standalone typed client, no MCP required
- **Disk-backed caching** — responses cached to disk, survives restarts
- **Rate limiting + retry** — token-bucket rate limiter with exponential backoff

## MCP Server

### Quick Start

```bash
npx fedpipe
```

That's it — the server starts on stdio and works with any MCP client.

### VS Code / Copilot

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "fedpipe": {
      "command": "npx",
      "args": ["-y", "fedpipe"],
      "env": {
        "FRED_API_KEY": "your_key_here",
        "DATA_GOV_API_KEY": "your_key_here"
      }
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "fedpipe": {
      "command": "npx",
      "args": ["-y", "fedpipe"],
      "env": {
        "FRED_API_KEY": "your_key_here"
      }
    }
  }
}
```

### HTTP Stream

For web apps or remote access:

```bash
node dist/server.js --transport httpStream --port 8080
```

Endpoint: `http://localhost:8080/mcp`

### Selective Module Loading

Load only the modules you need — reduces startup time and context window usage:

```bash
# CLI flag
node dist/server.js --modules fred,treasury,congress

# Environment variable
MODULES=fred,bls,treasury node dist/server.js

# Combine with HTTP
node dist/server.js --modules fred,treasury --transport httpStream --port 8080
```

With all 45 modules, the server sends ~16K tokens of instructions to the LLM. With 3 modules, this drops to ~3K. Use selective loading when you only need a few data sources and want to minimize context overhead.

### Lazy Loading (the default)

A bare start is lazy — the server registers only 7 tools: the three cross-agency resolvers (`resolve_entity`, `resolve_person`, `resolve_place` — these work immediately, no loading required), `find_tools`, `load_modules`, `code_mode`, and `clear_cache`. The client's workflow is:

1. `find_tools("insider trading")` → matches name `sec` tools and says the module isn't loaded yet
2. `load_modules(modules=["sec"])` → registers SEC's tools; the server sends `notifications/tools/list_changed` so the client picks them up mid-session
3. Call the tools normally

Instructions shrink to a short module directory (~1K tokens) until modules load. Override the default three ways:

```bash
node dist/server.js --eager                    # register all modules up front
node dist/server.js --modules fred,bls         # register exactly these, eagerly
node dist/server.js --lazy --modules sec,fec   # lazy, only these loadable
```

`FEDPIPE_EAGER=1` / `FEDPIPE_LAZY=1` are the env equivalents.

**How it stays reliable:** lazy relies on `notifications/tools/list_changed` — after `load_modules` registers a module, the client re-fetches `tools/list` and sees the new tools. `load_modules` waits for the client's session to be fully registered before adding tools, so the notification always lands even when `load_modules` is the very first call of a session. The one client type that still needs `--eager` is one that ignores `tools/list_changed` entirely.

To see all available module names without starting the server:

```bash
npx fedpipe --list-modules
# or shorter:
npx fedpipe --list
```

Modules are grouped by domain, with tool count and env var name for modules that require an API key:

```
Economy
  bea    Bureau of Economic Analysis           13 tools  [BEA_API_KEY]  https://apps.bea.gov/API/signup/
  bls    Bureau of Labor Statistics             4 tools  [BLS_API_KEY]  https://www.bls.gov/developers/home.htm
  fred   Federal Reserve Economic Data          4 tools  [FRED_API_KEY]  https://fredaccount.stlouisfed.org/apikeys
  ...

Health
  cdc    CDC Health Data                       13 tools
  cms    Centers for Medicare & Medicaid        4 tools
  ...

45 modules total.
```

### Health check

`fedpipe doctor` reports your environment's readiness — which modules work
with no key, which keys you've set, and which are missing (with signup links):

```bash
npx fedpipe doctor
npx fedpipe doctor --live   # also ping one endpoint per reachable module
```

`--live` calls one argument-free tool per module (requesting a single row) and
reports latency or the exact upstream error — the fastest way to tell "my
config is wrong" from "the agency is down". Add `--fresh` to bypass the cache,
`--json` for machine-readable output; the exit code is non-zero when required
keys are missing or probes fail, so it drops straight into cron or a container
healthcheck.

For scripting or tooling, add `--json` to get structured output:

```bash
npx fedpipe --list-modules --json
```

```json
[
  {
    "name": "bea",
    "displayName": "Bureau of Economic Analysis",
    "toolCount": 13,
    "requiresApiKey": true,
    "envVars": ["BEA_API_KEY"],
    "signupUrl": "https://apps.bea.gov/API/signup/",
    "domains": ["economy", "international"]
  },
  ...
]
```

See full descriptions in the [Data Sources](/guide/data-sources) page.

---

## TypeScript SDK

Use the APIs directly in your code — no MCP server required.

### Install

```bash
npm install fedpipe
```

### Usage

```typescript
// Import individual modules
import { getObservations } from "fedpipe/sdk/fred";
import { searchBills } from "fedpipe/sdk/congress";
import { getLeadingCausesOfDeath } from "fedpipe/sdk/cdc";

// Or import everything
import * as sdk from "fedpipe/sdk";
const gdp = await sdk.fred.getObservations("GDP", { sort: "desc", limit: 5 });
```

All functions include disk-backed caching, retry with exponential backoff, and rate limiting — no extra setup.

See the [SDK Usage Examples](/guide/sdk-usage) for more, or browse the [API Reference](/api/) for every function and type.

---

## Next Steps

- **[API Keys](/guide/api-keys)** — Which APIs need keys and where to get them
- **[Data Sources](/guide/data-sources)** — All 40+ APIs at a glance
- **[Examples](/guide/sdk-usage)** — Code examples, MCP prompts, and analysis showcases
