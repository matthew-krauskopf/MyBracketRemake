import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('auth_token', 'fake-jwt-token');
    });
  });

  test('displays the banner when authenticated', async ({ page }) => {
    await page.goto('/home');

    await expect(page.locator('.banner')).toBeVisible();
    await expect(page.locator('.banner button')).toHaveText('Logout');
    await expect(page.locator('p')).toContainText('welcome!');
  });

  test('logout button logs out and redirects to login', async ({ page }) => {
    await page.goto('/home');

    await page.click('.banner button');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('.banner')).not.toBeVisible();
  });
});
