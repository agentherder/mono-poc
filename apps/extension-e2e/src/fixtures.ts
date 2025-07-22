import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { createHash } from 'crypto';
import { realpathSync } from 'fs';
import { resolve } from 'path';

// @see https://playwright.dev/docs/chrome-extensions

const pathToExtension = resolve(
  __dirname,
  '../../extension/.output/chrome-mv3',
);

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless: true,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let id = '';

    // Manifest v3 service-worker
    const [sw] = context.serviceWorkers();
    // This `waitForEvent` from playwright docs never resolves
    // if (!sw) sw = await context.waitForEvent('serviceworker');
    if (sw) id = sw.url().split('/')[2];

    // Fallback to manifest v2 background page
    if (!id) {
      const [bg] = context.backgroundPages();
      // if (!bg) bg = await context.waitForEvent('backgroundpage');
      if (bg) id = await bg.evaluate('chrome.runtime.id');
      if (id) console.log('Using extension manifest v2 background page id');
    }

    // Fallback mimic Chrome extensionid
    if (!id) {
      const realPath = realpathSync(pathToExtension);
      const hex = createHash('sha256')
        .update(realPath)
        .digest('hex')
        .slice(0, 32);
      const alphabet = 'abcdefghijklmnop';
      id = [...hex].map((c) => alphabet[parseInt(c, 16)]).join('');
      if (id) console.log('Using fallback mimic Chrome extension id');
    }

    await use(id);
  },
});

export const expect = test.expect;
