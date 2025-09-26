/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    exclude: [
      "node_modules",
      "dist",
      "e2e",
      "**/*.e2e.{test,spec}.{js,ts}",
      "tests-examples",
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
      ],
    },
  },
});
