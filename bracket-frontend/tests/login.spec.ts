import { expect, test } from '@playwright/test';

const LOGIN_API_URL = '**/api/auth/login';

test.describe('Login form', () => {
  test('successful login routes to the home page', async ({ page }) => {
    await page.route(LOGIN_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'fake-jwt-token' })
      });
    });

    await page.goto('/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/home$/);
    await expect(page.locator('p')).toContainText('welcome!');
  });

  test('submit button stays disabled while the form is incomplete', async ({ page }) => {
    await page.goto('/login');
    const submitButton = page.locator('button[type="submit"]');

    await page.fill('#username', 'testuser');
    await page.fill('#password', '');
    await expect(submitButton).toBeDisabled();

    await page.fill('#username', '');
    await page.fill('#password', 'password123');
    await expect(submitButton).toBeDisabled();

    await page.fill('#username', 'testuser');
    await expect(submitButton).toBeEnabled();
  });

  test('unauthenticated visit to settings redirects to login, then back to settings after login', async ({
    page
  }) => {
    await page.route(LOGIN_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'fake-jwt-token' })
      });
    });

    await page.goto('/settings');
    await expect(page).toHaveURL(/\/login$/);

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.locator('p')).toContainText('settings');
  });

  test('clicking "Create account" navigates to the create-account page', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page).toHaveURL(/\/create-account$/);
  });

  test('banner is not shown on the login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('app-banner')).toHaveCount(0);
  });

  test('failed login shows an error message and stays on the login page', async ({ page }) => {
    await page.route(LOGIN_API_URL, async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' })
      });
    });

    await page.goto('/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error')).toContainText('Invalid username or password.');
    await expect(page).toHaveURL(/\/login$/);
  });
});
