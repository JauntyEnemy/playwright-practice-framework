import { test } from '@playwright/test';
import WelcomePage from '../Page/WelcomePage.js';
import LoginCardPage from '../Page/LoginCardPage.js';
import InterestCardPage from '../Page/InterestCardPage.js';
import { getUserInyerfaceData } from '../Data/userInyerfaceDataReader.js';

test.use({ headless: false });

test('complete first two User Inyerface cards using framework', async ({ page }) => {
  test.setTimeout(30000);

  const testData = getUserInyerfaceData();

  const welcomePage = new WelcomePage(page);
  const loginCardPage = new LoginCardPage(page);
  const interestCardPage = new InterestCardPage(page);

  await welcomePage.open();
  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();

  await loginCardPage.verifyPageOpened();
  await loginCardPage.completeLoginCard(testData.loginCard);

  await interestCardPage.completeInterestCard(
    testData.interestCard,
    testData.avatar
  );

  await interestCardPage.verifyNextCardOpened();
});