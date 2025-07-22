import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: { trace: 'on-first-retry' },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
