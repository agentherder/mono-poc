import { test, expect } from '@playwright/test';

// WXT is not yet set up for E2E testing so this is just a test scaffold
test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  expect(await page.title()).toContain('Example');
});
