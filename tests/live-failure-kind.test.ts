import { describe, expect, it } from "vitest";
import { failureKind } from "./live/failure-kind.js";

describe("live failure diagnostics", () => {
  it("does not call a successful HTML response a 5xx", () => {
    expect(failureKind("cfpb: HTTP 200 but the body is not valid JSON")).toEqual({
      kind: "RESPONSE FORMAT (HTTP 200)", maxExtra: 2,
    });
  });

  it("does not infer a repository bug from an access denial", () => {
    expect(failureKind("open-payments: HTTP 403 <TITLE>Access Denied</TITLE>")).toEqual({
      kind: "HTTP 403 (access denied; investigate auth or service policy)", maxExtra: 0,
    });
  });

  it.each([
    ["HTTP 500", 2], ["HTTP 404", 0], ["HTTP 429", 0],
    ["body read timed out after 30000ms", 1], ["fetch failed", 2],
    ["daily threshold exceeded", 0], ["unexpected error", 0],
  ])("keeps bounded retries for %s", (message, maxExtra) => {
    expect(failureKind(message).maxExtra).toBe(maxExtra);
  });
});
