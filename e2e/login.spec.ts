import { test, expect } from "@playwright/test";

test.describe("Login Flow E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form correctly", async ({ page }) => {
    // Check if the logo is visible
    await expect(page.getByText("b2bit")).toBeVisible();

    // Check if form elements are present
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    // Check if the form has proper styling
    await expect(page.locator("form")).toBeVisible();
  });

  test("should show validation errors for empty form submission", async ({
    page,
  }) => {
    // Click submit without filling the form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for validation errors - use locator to get multiple elements
    await expect(page.locator('text="Obrigatório"').first()).toBeVisible();
    await expect(page.locator('text="Obrigatório"')).toHaveCount(2);
  });

  test("should show validation error for invalid email format", async ({
    page,
  }) => {
    // Fill invalid email
    await page.getByLabel(/e-mail/i).fill("invalid-email");
    await page.getByLabel(/password/i).fill("password123");

    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for email validation error
    await expect(page.getByText("E-mail inválido")).toBeVisible();
  });

  test("should handle successful login flow", async ({ page }) => {
    // Intercept the login API call
    await page.route("**/auth/login/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          tokens: {
            access: "test_access_token",
            refresh: "test_refresh_token",
          },
          user: {
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
          },
        }),
      });
    });

    // Fill valid credentials
    await page.getByLabel(/e-mail/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");

    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should redirect to home page
    await expect(page).toHaveURL("/");
  });

  test("should handle login failure", async ({ page }) => {
    // Intercept the login API call with error
    await page.route("**/auth/login/", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Credenciais inválidas",
        }),
      });
    });

    // Fill credentials
    await page.getByLabel(/e-mail/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");

    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show error message
    await expect(page.getByText("Credenciais inválidas")).toBeVisible();

    // Should stay on login page
    await expect(page).toHaveURL("/login");
  });

  test("should disable submit button during submission", async ({ page }) => {
    // Intercept with delay to simulate slow network
    await page.route("**/auth/login/", async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          tokens: { access: "test_token", refresh: "test_refresh" },
          user: { id: 1, name: "Test", email: "test@example.com" },
        }),
      });
    });

    await page.getByLabel(/e-mail/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");

    const submitButton = page.getByRole("button", { name: /sign in/i });

    // Submit form
    await submitButton.click();

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();
  });
});

test.describe("Responsive Design E2E", () => {
  test("should display correctly on mobile devices", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/login");

    // Logo should be smaller on mobile
    const logo = page.getByText("b2bit");
    await expect(logo).toBeVisible();

    // Form should be responsive
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // All form elements should be accessible
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should display correctly on tablet devices", async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/login");

    // Check elements are visible and properly styled
    await expect(page.getByText("b2bit")).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });
});

test.describe("Accessibility E2E", () => {
  test("should have proper form labels and ARIA attributes", async ({
    page,
  }) => {
    await page.goto("/login");

    // Check form has proper labels
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();

    // Check button has accessible name
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    // Check form has proper structure
    const form = page.locator("form");
    await expect(form).toBeVisible();
  });

  test("should be navigable with keyboard", async ({ page }) => {
    await page.goto("/login");

    // Tab through form elements
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/e-mail/i)).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/password/i)).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: /sign in/i })).toBeFocused();
  });
});
