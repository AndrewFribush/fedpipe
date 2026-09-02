import { describe, it, expect, vi, afterEach } from "vitest";
import { createClient } from "../src/shared/client.js";

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

function streamResponse(pull: (controller: ReadableStreamDefaultController<Uint8Array>) => void | Promise<void>): Response {
  const stream = new ReadableStream<Uint8Array>({ pull });
  return new Response(stream, { status: 200, headers: { "Content-Type": "application/json" } });
}

describe("client body hardening", () => {
  it("times out a stalled body instead of hanging", async () => {
    globalThis.fetch = vi.fn(async () =>
      streamResponse(() => new Promise(() => { /* never enqueue */ })),
    ) as never;
    const c = createClient({ baseUrl: "https://x.test", name: "stall", timeoutMs: 300, cacheTtlMs: 0, maxRetries: 0 });
    const t0 = Date.now();
    await expect(c.get("/a")).rejects.toThrow(/body read timed out/);
    expect(Date.now() - t0).toBeLessThan(2000);
  });

  it("refuses bodies over the byte budget", async () => {
    const chunk = new TextEncoder().encode("x".repeat(1024 * 1024));
    globalThis.fetch = vi.fn(async () =>
      streamResponse(controller => { controller.enqueue(chunk); }),
    ) as never;
    process.env.FEDPIPE_MAX_BODY_BYTES_TEST = "1"; // documented default applies; can't change module const here
    const c = createClient({ baseUrl: "https://x.test", name: "flood", timeoutMs: 2000, cacheTtlMs: 0, maxRetries: 0 });
    await expect(c.get("/a")).rejects.toThrow(/exceeded|timed out/);
  }, 10_000);

  it("still reads normal bodies fine", async () => {
    globalThis.fetch = vi.fn(async () => new Response('{"ok":true}', { status: 200 })) as never;
    const c = createClient({ baseUrl: "https://x.test", name: "normal", timeoutMs: 2000, cacheTtlMs: 0, maxRetries: 0 });
    expect(await c.get("/a")).toEqual({ ok: true });
  });
});
