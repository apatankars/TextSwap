import { test, expect } from "@playwright/test";

test("[Appearance] Test to Make sure the Homepage Loads", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("TextSwap").nth(1)).toBeVisible();
  await expect(page.getByText("Your campus community")).toBeVisible();
  await expect(page.getByRole("button", { name: "Get Started" })).toBeVisible();
});

test("[Appearance] The Footer Properly Appears", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.getByRole("heading", { name: "About Us" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Quick Links" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
});

test("[Functionality] Make sure the Logo button properly reroutes", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("TextSwap").nth(1)).toBeVisible();
  await expect(page.getByText("Your campus community")).toBeVisible();
  await expect(page.getByRole("button", { name: "TextSwap" })).toBeVisible();
  await page.getByRole("button", { name: "TextSwap" }).click();
  await expect(page.getByText("TextSwap").nth(1)).toBeVisible();
});

async function loginAsMock1(page) {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Get Started" }).click();
  await page.getByPlaceholder("Enter email or username").fill("mock1");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByPlaceholder("Enter your password").fill("mock1pass");
  await page.getByRole("button", { name: "Continue" }).click();
}

async function loginAsMock2(page) {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Get Started" }).click();
  await page.getByPlaceholder("Enter email or username").fill("mock2");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByPlaceholder("Enter your password").fill("mock2pass");
  await page.getByRole("button", { name: "Continue" }).click();
}

test("[Appearance] Complete Profile Page Loads will all fields", async ({
  page,
}) => {
  await loginAsMock1(page);
  await expect(
    page.getByRole("heading", { name: "Complete Your Profile" })
  ).toBeVisible();
  await expect(page.getByText("Courses (up to 4):")).toBeVisible();
  await expect(page.getByText("University Level")).toBeVisible();
});

test("[Functionality] Complete Profile Page loads fields and updates", async ({
  page,
}) => {
  await loginAsMock1(page);
  await expect(
    page.getByRole("heading", { name: "Complete Your Profile" })
  ).toBeVisible();
  await expect(page.getByText("Courses (up to 4):")).toBeVisible();
  await expect(page.getByText("University Level")).toBeVisible();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Update Profile" }).click();
});

test("[Appearance] Once a user logs in, they are able to log out", async ({
  page,
}) => {
  await loginAsMock1(page);
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("TextSwap").nth(1)).toBeVisible();
  await expect(page.getByLabel("Open user button")).toBeVisible();
  await expect(page.locator("#root")).toContainText("Sign Out");
});

test("[Appearance] Shop Page is Properly Set up", async ({ page }) => {
  await loginAsMock1(page);
  await page.goto("http://localhost:3000/home");
  await expect(
    page.getByRole("button", { name: "Search Books" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "List a Book Sell your used" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Manage Courses Add or edit" })
  ).toBeVisible();
  await expect(
    page.getByText("Textbooks for you", { exact: true })
  ).toBeVisible();
});

test("[Appearance] Adding a listing properly appears with all of ther required componetns", async ({
  page,
}) => {
  await loginAsMock1(page);
  await page.goto("http://localhost:3000/home");
  await expect(
    page.getByRole("button", { name: "List a Book Sell your used" })
  ).toBeVisible();
  await page
    .getByRole("button", { name: "List a Book Sell your used" })
    .click();
  await expect(page.locator(".MuiBackdrop-root")).toBeVisible();
  await expect(page.getByLabel("Create Book Listing")).toContainText(
    "Create Book Listing"
  );
  await expect(
    page.getByRole("heading", { name: "Book Information" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Listing Information" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});

test("[Appearance] Book Cards Properly", async ({ page }) => {
  await loginAsMock1(page);
  await page.goto("http://localhost:3000/home");
  await expect(page.locator(".MuiPaper-root").first()).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: "More Details" })
    .getByRole("button")
    .first()
    .click();
});

test("[Functionality] Ensure the logged out users cannot access data", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Home" }).first().click();
  await expect(page.getByText("Please sign in to continue.")).toBeVisible();
  await page.getByRole("link", { name: "Offers" }).first().click();
  await expect(page.getByText("Please sign in to view your")).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).first().click();
  await expect(page.getByText("Please sign in to access the")).toBeVisible();
});

test("[Appearance] Offers Page Is Set Up Properly", async ({ page }) => {
  await loginAsMock1(page);
  await page.goto("http://localhost:3000/offer");
  await expect(page.getByRole("button", { name: "BUYING" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SELLING" })).toBeVisible();
  await expect(page.locator("#root")).toContainText("MY OFFERS");
  await expect(page.getByRole("button", { name: "ACTIVE" })).toBeVisible();
  await expect(page.getByRole("button", { name: "HISTORY" })).toBeVisible();
});

test("[Functionality] Buy Now Offer", async ({ page }) => {
  await loginAsMock2(page);
  await page.goto("http://localhost:3000/shop");
  await page
    .locator("div")
    .filter({ hasText: /^\$80\$70VIEW DETAILS$/ })
    .getByRole("button")
    .click();
  await expect(page.getByRole("button", { name: "Buy Now" })).toBeVisible();
  await page.getByRole("button", { name: "Buy Now" }).click();
  await expect(
    page.getByRole("heading", { name: "Confirm Purchase" })
  ).toBeVisible();
  await expect(page.getByText("Price: $")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Introduction to Quantum" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Confirm" })).toBeVisible();
});

test("[Functionality] Successful Login with Mocked API", async ({ page }) => {
  // Intercept the login API request and mock a successful response
  await page.route("**/api/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: "mock-token",
        user: { username: "mock1" },
      }),
    });
  });

  await page.goto("http://localhost:3000/login");

  // Perform login
  await page.getByPlaceholder("Enter email or username").fill("mock1");
  await page.getByPlaceholder("Enter your password").fill("mock1pass");
  await page.getByRole("button", { name: "Continue" }).click();

  // Verify successful login by checking user-specific content
  await expect(page.getByText("Welcome, mock1")).toBeVisible();
});

test("[Functionality] Failed Login with Mocked API", async ({ page }) => {
  // Intercept the login API request and mock a failed response
  await page.route("**/api/login", async (route) => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ error: "Invalid credentials" }),
    });
  });

  await page.goto("http://localhost:3000/login");

  // Attempt login with invalid credentials
  await page.getByPlaceholder("Enter email or username").fill("invalidUser");
  await page.getByPlaceholder("Enter your password").fill("wrongPass");
  await page.getByRole("button", { name: "Continue" }).click();

  // Verify error message is displayed
  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("[Functionality] User Registration and Profile Completion", async ({
  page,
}) => {
  // Mock the registration API
  await page.route("**/api/register", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        token: "new-user-token",
        user: { username: "newUser" },
      }),
    });
  });

  // Mock the profile completion API
  await page.route("**/api/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  // Navigate to registration page
  await page.goto("http://localhost:3000/register");

  // Fill and submit the registration form
  await page.getByPlaceholder("Enter your email").fill("newuser@example.com");
  await page.getByPlaceholder("Enter your password").fill("securePass123");
  await page.getByRole("button", { name: "Register" }).click();

  // Verify redirection to profile completion page
  await expect(
    page.getByRole("heading", { name: "Complete Your Profile" })
  ).toBeVisible();

  // Fill in profile details
  await page.getByPlaceholder("Enter your full name").fill("New User");
  await page.getByPlaceholder("Enter your university").fill("Mock University");
  await page.getByRole("button", { name: "Submit" }).click();

  // Verify successful profile completion
  await expect(page.getByText("Profile updated successfully")).toBeVisible();
});
