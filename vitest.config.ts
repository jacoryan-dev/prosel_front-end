/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // Prevent Node.js modules from being loaded in browser environment
    global: "globalThis",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    // Disable browser mode and mocker to prevent MSW conflicts
    browser: {
      enabled: false,
    },
    exclude: [
      "node_modules",
      "dist",
      "e2e",
      "**/*.e2e.{test,spec}.{js,ts}",
      "tests-examples",
      // Exclude MSW files to prevent module loading issues
      "**/server.ts",
      "**/handlers.ts",
      "**/server.ts.bak",
      "**/handlers.ts.bak",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "e2e/",
        "**/*.d.ts",
        "vite.config.ts",
        "tailwind.config.js",
        "eslint.config.js",
        // Also exclude MSW files from coverage
        "**/server.ts", 
        "**/handlers.ts",
        "**/server.ts.bak",
        "**/handlers.ts.bak",
      ],
    },
    // Optimized configuration for CI environment - disable features that load Node modules
    isolate: true,
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
        isolate: true,
      },
    },
    // Additional environment configuration
    env: {
      NODE_ENV: "test",
    },
    // Disable unstable features that might load external modules
    unstubEnvs: false,
    unstubGlobals: false,
  },
});
