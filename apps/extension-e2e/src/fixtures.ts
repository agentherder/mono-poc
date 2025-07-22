import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { realpathSync } from 'fs';

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
      headless: true,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },

  extensionId: async (_, use) => {
    const realPath = realpathSync(pathToExtension);
    const hex = createHash('sha256').update(realPath).digest('hex').slice(0, 32);
    const alphabet = 'abcdefghijklmnop';
    const id = [...hex].map((c) => alphabet[parseInt(c, 16)]).join('');
    await use(id);
  },
});

export const expect = test.expect;
