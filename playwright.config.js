import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 6000,
  },

  retries: isCI ? 2 : 0,

  reporter: isCI
    ? [
        ['list'],
        ['html', { open: 'never' }],
      ]
    : 'list',

  use: {
    baseURL: 'https://userinyerface.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});