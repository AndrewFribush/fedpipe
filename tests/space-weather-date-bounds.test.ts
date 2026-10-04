import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const cacheDir = mkdtempSync(join(tmpdir(), "fedpipe-gfz-test-"));
vi.stubEnv("XDG_CACHE_HOME", cacheDir);
vi.useFakeTimers({ toFake: ["Date"] });
vi.setSystemTime(new Date("2026-10-03T14:15:16.789Z"));
const { getGeomagnetic, clearCache } = await import("../src/apis/space-weather/sdk.js");

beforeEach(() => {
  clearCache();
});
afterEach(() => {
  vi.unstubAllGlobals();
  clearCache();
});
afterAll(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  rmSync(cacheDir, { recursive: true, force: true });
});

function stubGfz() {
  const fetch = vi.fn(async (input: string | URL | Request) => {
    const url = new URL(String(input));
    for (const bound of ["start", "end"]) {
      const value = url.searchParams.get(bound);
      // GFZ's documented API rejects duplicate times and fractional seconds.
      expect(value).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
      expect(Number.isFinite(Date.parse(value!))).toBe(true);
    }
    return new Response(JSON.stringify({
      datetime: ["2025-10-03T00:00:00Z", "2025-10-04T00:00:00Z"],
      Ap: [28, 19],
    }), { headers: { "Content-Type": "application/json" } });
  });
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

describe("GFZ request date bounds", () => {
  it("sends valid default timestamps and returns the observed index values", async () => {
    const fetch = stubGfz();
    await expect(getGeomagnetic()).resolves.toEqual({
      points: [
        { time: "2025-10-03T00:00:00Z", value: 28 },
        { time: "2025-10-04T00:00:00Z", value: 19 },
      ],
      index: "Ap",
      frequency: "daily",
    });
    const params = new URL(String(fetch.mock.calls[0][0])).searchParams;
    expect(params.get("start")).toBe("2025-10-03T14:15:16Z");
    expect(params.get("end")).toBe("2026-10-03T23:59:59Z");
  });

  it.each([
    ["2024", "2024", "2024-01-01T00:00:00Z", "2024-12-31T23:59:59Z"],
    ["2024-02", "2024-02", "2024-02-01T00:00:00Z", "2024-02-29T23:59:59Z"],
    ["2025-02-03", "2025-02-04", "2025-02-03T00:00:00Z", "2025-02-04T23:59:59Z"],
    ["2025-02-03T12:30:00Z", "2025-02-04T14:00:00Z", "2025-02-03T12:30:00Z", "2025-02-04T14:00:00Z"],
    ["2025-02-03T12:30:00.123Z", "2025-02-04T14:00:00+02:00", "2025-02-03T12:30:00Z", "2025-02-04T12:00:00Z"],
  ])("normalizes %s through %s without changing the requested range", async (start, end, expectedStart, expectedEnd) => {
    const fetch = stubGfz();
    await getGeomagnetic({ start, end });
    const params = new URL(String(fetch.mock.calls[0][0])).searchParams;
    expect(params.get("start")).toBe(expectedStart);
    expect(params.get("end")).toBe(expectedEnd);
  });
});
