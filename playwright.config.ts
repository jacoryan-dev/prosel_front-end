import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false, // Disable parallel execution in CI for stability
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: process.env.CI ? 60000 : 30000, // Increase timeout in CI
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    actionTimeout: process.env.CI ? 30000 : 15000, // Increase action timeout
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Only run on Chromium in CI for stability
    ...(process.env.CI
      ? []
      : [
          {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
          },
          {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
          },
          {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
          },
        ]),
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
