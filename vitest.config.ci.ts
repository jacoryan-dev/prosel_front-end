/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    // Exclude problematic Node.js modules from dependency optimization
    exclude: ["msw", "webidl-conversions", "whatwg-url"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    // Minimal configuration for CI to avoid any Node.js module conflicts
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
    ],
    // Use threads pool instead of forks to avoid Node.js module loading
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    // Disable all advanced features that might trigger Node.js modules
    coverage: {
      enabled: false,
    },
    env: {
      NODE_ENV: "test",
      VITEST_ENVIRONMENT: "jsdom",
    },
  },
});