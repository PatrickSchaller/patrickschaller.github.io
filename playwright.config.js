import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:5100', browserName: 'chromium', trace: 'retain-on-failure' },
  reporter: 'list',
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:5100', reuseExistingServer: !process.env.CI }
});
