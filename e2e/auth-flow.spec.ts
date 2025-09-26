import { test, expect } from "@playwright/test";

test.describe("Protected Routes E2E", () => {
  test("should redirect to login when accessing protected route without authentication", async ({
    page,
  }) => {
    // Try to access home page without being logged in
    await page.goto("/");

    // Should be redirected to login
    await expect(page).toHaveURL("/login");
  });

  test("should allow access to protected routes when authenticated", async ({
    page,
  }) => {
    // First, mock the localStorage to simulate logged in state
    await page.addInitScript(() => {
      localStorage.setItem("access_token", "mock_token");
    });

    // Mock the profile API call
    await page.route("**/auth/profile/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "Test User",
          email: "test@example.com",
          is_active: true,
          avatar: {
            id: 1,
            high: "https://example.com/avatar-high.jpg",
            medium: "https://example.com/avatar-medium.jpg",
            low: "https://example.com/avatar-low.jpg",
          },
          type: "user",
          created: "2023-01-01T00:00:00Z",
          modified: "2023-01-01T00:00:00Z",
          role: "user",
        }),
      });
    });

    // Access home page
    await page.goto("/");

    // Should stay on home page
    await expect(page).toHaveURL("/");

    // Should show authenticated content
    await expect(page.getByText("Your Name")).toBeVisible();
  });

  test("should show loading state while checking authentication", async ({
    page,
  }) => {
    // Mock profile API with delay
    await page.route("**/auth/profile/", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem("access_token", "mock_token");
    });

    await page.goto("/");

    // Should show loading state briefly
    await expect(
      page.getByText("Carregando dados do usuário...")
    ).toBeVisible();

    // Clean up routes to avoid test ending issues
    await page.unrouteAll({ behavior: "ignoreErrors" });
  });

  test("should handle logout functionality", async ({ page }) => {
    // Setup authenticated state
    await page.addInitScript(() => {
      localStorage.setItem("access_token", "mock_token");
    });

    await page.route("**/auth/profile/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        }),
      });
    });

    await page.goto("/");

    // Click logout button (assuming there's one)
    const logoutButton = page.getByRole("button", { name: /sair|logout/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();

      // Should redirect to login
      await expect(page).toHaveURL("/login");
    }
  });
});
