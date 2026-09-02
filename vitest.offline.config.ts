import { defineConfig } from "vitest/config";

// Offline replay of the live suite: network disabled, responses served from
// the local disk cache (~/.cache/fedpipe). Tools without warm cache entries
// skip instead of failing — run `npm run test:live` first to warm it.
// Fast full-tool regression with zero network: `npm run test:offline`.
export default defineConfig({
  test: {
    include: ["tests/live/tools.smoke.test.ts"],
    testTimeout: 15_000,
    env: { FEDPIPE_OFFLINE_REPLAY: "1" },
  },
});
