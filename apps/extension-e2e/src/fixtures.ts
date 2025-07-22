import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { resolve } from 'path';

const pathToExtension = resolve(
  __dirname,
  '../../extension/.output/chrome-mv3',
);

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async (_, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },

  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent('serviceworker');
    }
    const id = new URL(serviceWorker.url()).host;
    await use(id);
  },
});

export const expect = test.expect;
