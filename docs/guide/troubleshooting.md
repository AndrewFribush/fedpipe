# Troubleshooting

Every error fedpipe returns is designed to tell you what to do next. This page
maps the messages you'll see to their causes.

## Setup

**`API key required (HTTP 401/403). Set the X_API_KEY environment variable…`**
The module needs a key you haven't set. Run `npx fedpipe doctor` for the full
key status with signup links (all keys are free).

**`HTTP 200 but the body is not valid JSON (0 bytes). Note: X is not set…`**
Some agencies (BEA) answer keyless requests with an empty page instead of an
auth error — same fix: set the named env var.

## Calling tools

**`Unknown parameter(s): "min_magnitude" (did you mean "minmagnitude"?)`**
Parameters are strict — a misspelled name is rejected instead of silently
ignored (which would return unfiltered data that *looks* right). The message
lists every parameter the tool accepts.

**`parameter validation failed: series_id: Invalid input: expected string…`**
A required parameter is missing or has the wrong type. Note that fedpipe
already normalizes the common cases for you: `" CA "` is trimmed, `"2023"` is
accepted for numeric params, `"true"`/`"false"` for booleans.

**`[output capped: showing 500 of 5000 rows…]` in a summary**
The response exceeded 120KB and was trimmed (structure first kept intact,
long embedded texts truncated before rows are dropped). Narrow the query or
paginate; the note says exactly what was trimmed.

**`No X found …` with a hint**
An honest empty. Resolver tools tell you the next step ("Use wb_countries to
search by name", "use nhtsa_models to list models"). Name inputs are fuzzy
where the agency's registry is picky — "cybertruck" finds "CYBERTRUCK (ALL
VARIANTS)" — so an empty result usually means the data really isn't there.

## Upstream problems

**`X: HTTP 500 — …` / timeouts**
The agency's API is having trouble. Requests retry automatically with backoff
(and honor Retry-After on 429s); responses are cached, so a retried question
may succeed instantly. The [nightly live run](https://github.com/AndrewFribush/fedpipe/actions/workflows/live-smoke.yml)
shows whether an outage is ongoing — every tool is exercised against the real
APIs each night.

**A tool that worked yesterday returns different columns**
Agencies change schemas without notice. The nightly suite diffs every
response's column set against a recorded baseline and fails with
`[SCHEMA DRIFT]` naming the changed columns, and the doc mirror
(`upstream-docs/`) commits agency documentation changes as reviewable diffs —
check both if something shifts.

**Whole-module outages**
`npx fedpipe doctor --live` pings one endpoint per configured module and
reports latency or the exact upstream error — fastest way to separate "my
config is wrong" from "the agency is down". Known long-term outages are
tracked in `tests/live/known-upstream-failures.json`.
