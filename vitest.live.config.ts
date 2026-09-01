import { defineConfig } from "vitest/config";

/** Live smoke suite — hits real government APIs. Run via `npm run test:live`. */
export default defineConfig({
  test: {
    include: ["tests/live/**/*.smoke.test.ts"],
    testTimeout: 90_000,
    hookTimeout: 90_000,
    // Upstream APIs are rate-limited; keep module files sequential and tools within a file sequential.
    fileParallelism: false,
    retry: 1,
  },
});
