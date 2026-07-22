import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

const baseURL = process.env.BASE_URL || 'https://userinyerface.com';

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
        [
          'allure-playwright',
          {
            resultsDir: 'allure-results',
          },
        ],
      ]
    : 'list',

  use: {
    baseURL,
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