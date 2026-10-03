# fedpipe

MCP server and TypeScript SDK for U.S. government and international public data.

[![npm version](https://img.shields.io/npm/v/fedpipe)](https://www.npmjs.com/package/fedpipe) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Live API smoke test](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml/badge.svg)](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml)

Query agencies through typed SDK functions or MCP tools, resolve identities across sources, and reduce large responses inside a WASM sandbox. This fork adds cross-source identity resolution, a discovery index, live response checks, bulk indexing, and recorded investigations with source provenance.

Start with the [Hurricane Ian investigation](#run-an-investigation): three public APIs, fixed queries, and recorded output with request provenance.

## Ownership and upstream credit

I maintain fedpipe as a fork of [Lucas Elzinga's us-gov-open-data-mcp](https://github.com/lzinga/us-gov-open-data-mcp), under the MIT license. The original module architecture, shared client, and government API integrations come from upstream.

My work in this fork includes:

- [Nightly live checks](.github/workflows/live-smoke.yml), [response-shape and empty-result checks](tests/live/tools.smoke.test.ts), and the [tool audit](docs/tool-audit.md).
- [Company, person, and place resolution](src/server.ts), an always-available discovery index, and module loading by agency or domain.
- [Bulk download and local indexing support](src/shared/bulk.ts), with modules for sources including Form 5500, the FAA aircraft registry, and IRS exempt organizations.
- [Expanded FRED, Census, SEC, and World Bank queries](docs/parity-notes.md), including the upstream contributions retained alongside this work.
- [Keyless NOAA climate access](src/apis/noaa/sdk.ts), [space-weather data](src/apis/space-weather/), and [DOE grid disturbances](src/apis/grid-disturbances/).

## Coverage and current health

The module manifest at [`66a8b87`](https://github.com/AndrewFribush/fedpipe/tree/66a8b87) contains **59 modules and 391 module tools**. The server registers seven additional discovery and utility tools, for 398 tools in eager mode. These are implemented interfaces, not a count of healthy endpoints. Recompute the inventory from any checkout after building:

```bash
node dist/server.js --list-modules --json | node --input-type=module -e '
let input = "";
for await (const chunk of process.stdin) input += chunk;
const modules = JSON.parse(input);
console.log({ modules: modules.length, moduleTools: modules.reduce((n, m) => n + m.toolCount, 0) });
'
```

The [October 3, 2026 nightly run](https://github.com/AndrewFribush/fedpipe/actions/runs/37120539053) failed. Some failures came from stale test baselines after intentional output changes; others involve access denials, non-JSON responses, missing fields, or empty results. The [dated health report](docs/live-api-status.md) separates the evidence, local repairs, and unresolved failures.

The live suite skips modules whose required keys are missing and seven bulk-ingest modules. One recorded FBI endpoint failure is expected to fail; its recovery makes the suite fail so the exception gets reviewed. A green badge would describe that suite's result, not prove every source works for every query. `doctor --live` probes one operation per reachable module.

## Run an investigation

**Which public records connect Hurricane Ian's Florida declaration to notices and federal contracts?** The [example script](examples/hurricane-ian.mjs) queries OpenFEMA, the Federal Register, and Treasury's USAspending API. It needs Node.js 20+ and no API keys.

```bash
git clone https://github.com/AndrewFribush/fedpipe.git
cd fedpipe
npm ci
npm run build
node examples/hurricane-ian.mjs > hurricane-ian.json
```

The script uses the SDK from this checkout, creates a fresh temporary cache, and fails if a source errors or a required result is empty. Its JSON output records the actual request URLs, POST body, fetch timestamps, and SHA-256 response hashes. [Recorded output from October 3, 2026](examples/hurricane-ian.2026-10-03.json) provides a concrete comparison; agency revisions can change future results.

The declaration and Federal Register notices share the identifier `FEMA-4673-DR`. The contracts are keyword matches within a fixed date window and Florida geography. Their current cumulative award values are neither spending within that window nor total disaster costs. The largest returned contract also covers Hurricane Nicole, so its full value cannot be attributed to Ian. See the [example notes](examples/README.md) for the observed results and limits.

## Use as an MCP server

Run the published npm release:

```bash
npx -y fedpipe
```

For this checkout's code, run `node dist/server.js` after building. The npm release and repository head may differ.

Add this to `claude_desktop_config.json` or an equivalent MCP configuration:

```json
{
  "mcpServers": {
    "fedpipe": {
      "command": "npx",
      "args": ["-y", "fedpipe"]
    }
  }
}
```

VS Code uses the same entry under `servers` in `.vscode/mcp.json`. Keyless sources work without an `env` block. Set the environment variables listed by `fedpipe doctor` for other sources; see [`.env.example`](.env.example) for the available settings.

### Loading modes

| Command | Tools registered at startup |
|---|---|
| `fedpipe` | Seven discovery and utility tools; load agencies on demand |
| `fedpipe --eager` | Every module plus the server tools |
| `fedpipe --modules sec,fec,congress` | Selected agencies plus the server tools |
| `fedpipe --modules finance` | The finance domain plus the server tools |

`find_tools` searches the entire catalog in every mode. `load_modules` accepts module names, domain names, or `all`. If your client does not refresh tool lists after `tools/list_changed`, use `--eager` or preload the agencies you need. Run `fedpipe --list-modules` for the current domains and key requirements.

### Check connectivity

```bash
npx -y fedpipe doctor                # key configuration and signup links
npx -y fedpipe doctor --live --fresh  # fresh connectivity probes
```

The SDK includes disk caching, rate limiting, and retries. These reduce repeated requests; they cannot resolve missing credentials, agency outages, or access restrictions.

## Use the TypeScript SDK

```bash
npm install fedpipe
```

```typescript
import { getDisasterDeclarations } from "fedpipe/sdk/fema";

const declarations = await getDisasterDeclarations({
  state: "FL", year: 2022, incidentType: "Hurricane", top: 100,
});
```

Each module has its own `fedpipe/sdk/<module>` import. An MCP server is not required. Query options, units, coverage, and authentication differ by agency; consult the module reference before combining results.

## Documentation and contributing

| Resource | Contents |
|---|---|
| [Getting started](docs/guide/getting-started.md) | Setup and client configuration |
| [SDK guide](docs/guide/sdk-usage.md) | Function imports and query examples |
| [Architecture](docs/guide/architecture.md) | Discovery, caching, resolvers, and code mode |
| [Adding modules](docs/guide/adding-modules.md) | Module structure and registration |
| [Contributing](CONTRIBUTING.md) | Local checks and bug reports |
| [Live API status](docs/live-api-status.md) | Dated failure evidence and follow-up work |

Run `npm run docs:dev` for the generated catalog and API reference locally. The previously linked GitHub Pages site returned 404 when checked on October 3, 2026; the source links above remain available.

AI tools help with documentation parsing, type definitions, and implementation. Agency schemas and access policies change, and some modules remain incomplete or fail live checks. Check provenance and source definitions before treating results as evidence, and report reproducible problems in [Issues](https://github.com/AndrewFribush/fedpipe/issues).

## License

[MIT](LICENSE), with upstream attribution preserved.
