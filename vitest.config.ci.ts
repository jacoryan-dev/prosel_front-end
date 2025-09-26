/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    // Prevent Node.js global leakage
    process: "undefined",
  },
  optimizeDeps: {
    // Exclude problematic Node.js modules from dependency optimization
    exclude: ["msw", "webidl-conversions", "whatwg-url", "@vitest/mocker"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ci.ts"], // Use CI-specific setup
    css: true,
    // Very restrictive configuration for CI
    exclude: [
      "node_modules",
      "dist", 
      "e2e",
      "**/*.e2e.{test,spec}.{js,ts}",
      "tests-examples",
      "**/server.*",
      "**/handlers.*",
      "**/mock*",
      "**/msw*",
      "**/*mock*",
    ],
    // Use single-threaded execution to prevent conflicts
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
        isolate: true,
      },
    },
    // Disable all features that might load external modules
    coverage: {
      enabled: false,
    },
    // Clean environment
    env: {
      NODE_ENV: "test",
      VITEST_ENVIRONMENT: "jsdom",
      // Explicitly disable features that might cause conflicts
      DISABLE_MSW: "true",
      NO_MOCK: "true",
    },
    // Timeout settings
    testTimeout: 30000,
    hookTimeout: 10000,
  },
});