import { test, expect } from './fixtures';

test.describe('popup', () => {
  test('renders', async ({ context, extensionId }) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
    await expect(page.getByText('Hello popup!')).toBeVisible();
    await expect(page.getByText('Hello extension component!')).toBeVisible();
    await expect(page.getByText('Hello shared component!')).toBeVisible();
  });
});
