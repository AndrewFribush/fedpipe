# Contributing

Thanks for helping make U.S. government data more accessible. The short version:

```bash
git clone https://github.com/AndrewFribush/fedpipe && cd fedpipe
npm ci && npm run build && npm test        # 1000+ unit tests, no network needed
```

## The test ladder

| Command | Needs | What it checks |
|---|---|---|
| `npm test` | nothing | unit tests — logic, envelopes, hardening |
| `npm run test:offline` | a previously warmed cache | every tool end-to-end, no network |
| `npm run test:live` | network (+ free API keys for some modules) | every tool against the real APIs, with silent-empty and schema-drift guards |
| `npx fedpipe doctor --live` | network | one-shot connectivity check per module |

Run `npm run test:live -- -t <module>` to hit just one module. Keys go in `.env`
(see `.env.example`; `fedpipe doctor` shows what's missing and where to sign up).

## Adding or fixing a module

See [docs/guide/adding-modules.md](docs/guide/adding-modules.md) — a module is a
folder under `src/apis/` with `sdk.ts`, `tools.ts`, `meta.ts`, `index.ts`; the
server discovers it automatically. House rules the suites will hold you to:

- **Never return silently-wrong data.** Unknown params are rejected server-wide;
  malformed filter strings should throw with the correct syntax in the message;
  empty results should say what to try next.
- Every tool needs an entry in `tests/live/args.ts` whose canned args return
  real data (the suite fails "silent empties"), and its response shape gets
  baselined (`RECORD_SHAPES=1 npm run test:live`).
- Add the agency's API docs to `meta.ts` `reference.docs` — the nightly mirrors
  them and diffs agency changes over time.

## Reporting problems

`docs/tool-audit.md` records the known behavior of every tool. If a government
API changed under us, the nightly usually notices first ([live smoke](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml)) —
check its latest run summary before debugging locally.
