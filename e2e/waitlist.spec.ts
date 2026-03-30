import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("loads with all sections visible", async ({ page }) => {
    await page.goto("/");

    // Hero section
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByText("Stop nagging. Let AI do it.")
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Get Early Access" }).first()).toBeVisible();

    // Escalating tone badge
    await expect(
      page.getByText("Personas get meaner as your deadline approaches")
    ).toBeVisible();

    // Notification preview
    await expect(page.getByText("The Nagging Partner", { exact: true })).toBeVisible();
    await expect(page.getByText("Old Grandma").first()).toBeVisible();
  });

  test("shows all page sections on scroll", async ({ page }) => {
    await page.goto("/");

    // Problem section
    await expect(
      page.getByText("You asked them three times already.")
    ).toBeVisible();

    // Persona showcase
    await expect(page.getByText("Pick your nagger")).toBeVisible();
    await expect(page.getByText("Old Grandma").first()).toBeVisible();
    await expect(page.getByText("Drunk Irish Guy").first()).toBeVisible();
    await expect(page.getByText("Military Sergeant").first()).toBeVisible();

    // How it works
    await expect(page.getByText("How it works")).toBeVisible();
    await expect(page.getByText("Assign a task")).toBeVisible();
    await expect(page.getByText("Choose a persona")).toBeVisible();
    await expect(page.getByRole("heading", { name: "They get nagged" })).toBeVisible();

    // Benefits
    await expect(page.getByText("Why join early?")).toBeVisible();

    // Final CTA
    await expect(
      page.getByText("Don't make us send Grandma after you.")
    ).toBeVisible();

    // Footer
    await expect(page.getByText("All rights reserved")).toBeVisible();
  });
});

test.describe("Waitlist Form", () => {
  test("shows validation error for invalid email on blur", async ({ page }) => {
    await page.goto("/");

    const emailInput = page.getByPlaceholder("Enter your email").first();
    await emailInput.fill("notanemail");
    await emailInput.blur();

    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
  });

  test("clears validation error when valid email entered", async ({
    page,
  }) => {
    await page.goto("/");

    const emailInput = page.getByPlaceholder("Enter your email").first();
    await emailInput.fill("notanemail");
    await emailInput.blur();
    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();

    await emailInput.fill("valid@email.com");
    await emailInput.blur();
    await expect(
      page.getByText("Please enter a valid email address.")
    ).not.toBeVisible();
  });

  test("shows loading state on submit", async ({ page }) => {
    await page.goto("/");

    const emailInput = page.getByPlaceholder("Enter your email").first();
    await emailInput.fill("test-loading@example.com");

    const submitButton = page.getByRole("button", { name: "Get Early Access" }).first();
    await submitButton.click();

    // Should show loading state (button text changes)
    await expect(page.getByText("Joining...").first()).toBeVisible();
  });

  test("submit button shows loading text on submit", async ({ page }) => {
    await page.goto("/");

    const emailInput = page.getByPlaceholder("Enter your email").first();
    await emailInput.fill("test-disabled@example.com");

    // Intercept the API call to keep it pending
    await page.route("/api/waitlist", async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.fulfill({ json: { success: true, position: 1, referralCode: "abc", referralUrl: "http://localhost:3000?ref=abc", isDuplicate: false } });
    });

    const submitButton = page.getByRole("button", { name: "Get Early Access" }).first();
    await submitButton.click();

    // Button should show loading text
    await expect(page.getByText("Joining...").first()).toBeVisible();
  });

  test("prevents submit with empty email", async ({ page }) => {
    await page.goto("/");

    const submitButton = page.getByRole("button", { name: "Get Early Access" }).first();
    await submitButton.click();

    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
  });
});

test.describe("Persona Cards", () => {
  test("persona cards are keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab to first persona card
    const grandmaCard = page.getByRole("button", {
      name: /Old Grandma/,
    });
    await grandmaCard.focus();

    // Should have aria-expanded
    await expect(grandmaCard).toHaveAttribute("aria-expanded", "false");

    // Press Enter to expand
    await grandmaCard.press("Enter");
    await expect(grandmaCard).toHaveAttribute("aria-expanded", "true");

    // Should show alt message
    await expect(page.getByText("Back in my day")).toBeVisible();

    // Press Enter again to collapse
    await grandmaCard.press("Enter");
    await expect(grandmaCard).toHaveAttribute("aria-expanded", "false");
  });

  test("persona cards show escalation timeline", async ({ page }) => {
    await page.goto("/");

    // Check escalation labels exist
    await expect(page.getByText("Day 1").first()).toBeVisible();
    await expect(page.getByText("Day 3").first()).toBeVisible();
    await expect(page.getByText("Overdue").first()).toBeVisible();
  });
});

test.describe("Keyboard Navigation", () => {
  test("skip to content link works", async ({ page }) => {
    await page.goto("/");

    // First Tab should focus skip link
    await page.keyboard.press("Tab");
    const skipLink = page.getByText("Skip to content");
    await expect(skipLink).toBeFocused();

    // Enter should navigate to main content
    await page.keyboard.press("Enter");
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeAttached();
  });

  test("tab order follows logical sequence", async ({ page }) => {
    await page.goto("/");

    // Tab through elements and verify order
    await page.keyboard.press("Tab"); // Skip link
    await expect(page.getByText("Skip to content")).toBeFocused();

    await page.keyboard.press("Tab"); // Email input
    await expect(
      page.getByPlaceholder("Enter your email").first()
    ).toBeFocused();

    await page.keyboard.press("Tab"); // Submit button
    await expect(
      page.getByRole("button", { name: "Get Early Access" }).first()
    ).toBeFocused();
  });
});

test.describe("Responsive Design", () => {
  test("mobile layout is single column", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only test");
    await page.goto("/");

    // Email input and button should be stacked (full width)
    const emailInput = page.getByPlaceholder("Enter your email").first();
    const inputBox = await emailInput.boundingBox();
    expect(inputBox).toBeTruthy();
    if (inputBox) {
      expect(inputBox.width).toBeGreaterThan(300); // Should be nearly full width
    }
  });

  test("sticky CTA appears on mobile after scrolling past hero", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile only test");
    await page.goto("/");

    // Sticky CTA should not be visible initially (hero is in view)
    // Scroll past hero
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Sticky CTA should now be visible
    const stickyCta = page.locator(".fixed.bottom-0");
    await expect(stickyCta).toBeVisible();
  });
});

test.describe("SEO & Meta", () => {
  test("has correct meta tags", async ({ page }) => {
    await page.goto("/");

    // Title
    await expect(page).toHaveTitle(/The Nagging Partner/);

    // Meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      "content",
      /Assign tasks to your partner/
    );

    // OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /The Nagging Partner/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", /\/og/);

    // Twitter card
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image");
  });
});

test.describe("OG Image", () => {
  test("OG image endpoint returns an image", async ({ request }) => {
    const response = await request.get("/og");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});
