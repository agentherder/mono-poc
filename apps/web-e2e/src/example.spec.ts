import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1').innerText()).toContain('Welcome');
  await expect(page.getByText('Hello shared component!')).toBeVisible();
});
