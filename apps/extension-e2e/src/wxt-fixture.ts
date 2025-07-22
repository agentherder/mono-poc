import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const extensionPath = path.join(
  __dirname,
  '../../../apps/extension/.output/chrome-mv3',
);

let userDataDir: string;

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async (_, use) => {
    userDataDir = await fs.mkdtemp(
      path.join(os.tmpdir(), 'chromium-user-data-'),
    );
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: process.env.CI ? true : false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    await use(context);
    await context.close();
    await fs.rm(userDataDir, { recursive: true, force: true });
  },
  extensionId: async (_, use) => {
    const extensionsDir = path.join(userDataDir, 'Default', 'Extensions');
    const [id] = await fs.readdir(extensionsDir);
    await use(id);
  },
});

export const expect = test.expect;
