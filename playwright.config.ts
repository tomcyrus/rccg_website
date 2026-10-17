import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 60000,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    launchOptions: process.env.PLAYWRIGHT_CHROME_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROME_EXECUTABLE } : {},
    screenshot: 'only-on-failure', trace: 'retain-on-failure',
  },
  webServer: { command: `"${process.execPath}" node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 3000 --strictPort`, url: 'http://127.0.0.1:3000', reuseExistingServer: false },
});
