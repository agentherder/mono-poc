import { test, expect } from './fixtures';

test('popup loads correctly', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.getByText('Hello popup!')).toBeVisible();
  await expect(page.getByText('Hello extension component!')).toBeVisible();
  await expect(page.getByText('Hello shared component!')).toBeVisible();
});
