import { test, expect } from './wxt-fixture';

test('Popup page should load and render correctly', async ({
  page,
  extensionId,
}) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.getByText('Hello popup!')).toBeVisible();
  await expect(page.getByText('Hello extension component!')).toBeVisible();
  await expect(page.getByText('Hello shared component!')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Toggle Sidepanel' }),
  ).toBeVisible();
});
