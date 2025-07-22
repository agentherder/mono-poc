import { test, expect } from './fixtures';

test.describe('sidepanel', () => {
  test('renders', async ({ context, extensionId }) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await expect(page.getByText('Hello sidepanel!')).toBeVisible();
    await expect(page.getByText('Hello extension component!')).toBeVisible();
    await expect(page.getByText('Hello shared')).toBeVisible();
  });
});
