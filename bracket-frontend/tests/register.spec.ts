import { expect, test } from '@playwright/test';

const REGISTER_API_URL = '**/api/auth/register';

test.describe('Register form', () => {
  test('successful registration shows a snackbar and routes back to the login page', async ({ page }) => {
    await page.route(REGISTER_API_URL, async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({}) });
    });

    await page.goto('/create-account');

    await page.fill('#username', 'testuser');
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');
    await page.click('button[type="submit"]');

    await expect(page.locator('.mat-mdc-snack-bar-label').last()).toContainText(
      'Account created successfully. Please log in.'
    );
    await expect(page).toHaveURL(/\/login$/);
  });

  test('submit button stays disabled and errors display when fields are empty', async ({ page }) => {
    await page.goto('/create-account');
    const submitButton = page.locator('button[type="submit"]');

    await expect(submitButton).toBeDisabled();

    await page.fill('#username', 'testuser');
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');
    await expect(submitButton).toBeEnabled();

    await page.fill('#username', '');
    await page.fill('#email', '');
    await page.fill('#password', '');
    await page.fill('#confirmPassword', '');
    await page.locator('#confirmPassword').blur();

    await expect(submitButton).toBeDisabled();
    await expect(page.locator('mat-error')).toContainText([
      'Username is required.',
      'Email is required.',
      'Password is required.'
    ]);
  });

  test('password must be at least 6 characters and confirm password must match', async ({ page }) => {
    await page.goto('/create-account');
    const submitButton = page.locator('button[type="submit"]');

    await page.fill('#username', 'testuser');
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', '123');
    await page.fill('#confirmPassword', '123');

    await expect(page.locator('mat-error')).toContainText('Password must be at least 6 characters.');
    await expect(submitButton).toBeDisabled();

    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password456');

    await expect(page.locator('mat-error')).toContainText('Passwords do not match.');
    await expect(submitButton).toBeDisabled();

    await page.fill('#confirmPassword', 'password123');
    await expect(submitButton).toBeEnabled();
  });

  test('failed registration shows an error snackbar', async ({ page }) => {
    await page.route(REGISTER_API_URL, async (route) => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Username is already taken.' })
      });
    });

    await page.goto('/create-account');

    await page.fill('#username', 'testuser');
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');
    await page.click('button[type="submit"]');

    await expect(page.locator('.mat-mdc-snack-bar-label').last()).toContainText('Username is already taken.');
    await expect(page).toHaveURL(/\/create-account$/);
  });
});
