import { test } from '@playwright/test';
import WelcomePage from '../Page/WelcomePage.js';
import GamePage from '../Page/GamePage.js';
import LoginCardPage from '../Page/LoginCardPage.js';
import InterestCardPage from '../Page/InterestCardPage.js';
import { getUserInyerfaceData } from '../Data/userInyerfaceDataReader.js';

test.beforeEach(async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.open();
});

test('test case 1 - completes the first two registration cards', async ({ page }) => {
  const testData = getUserInyerfaceData();
  const welcomePage = new WelcomePage(page);
  const gamePage = new GamePage(page);
  const loginCardPage = new LoginCardPage(page);
  const interestCardPage = new InterestCardPage(page);

  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();
  await loginCardPage.verifyPageOpened();
  await loginCardPage.completeLoginCard(testData.loginCard);
  await interestCardPage.verifyPageOpened();
  await interestCardPage.completeInterestCard(
    testData.interestCard,
    testData.avatar
  );
  await gamePage.verifyCurrentCard(3);
});

test('test case 2 - hide help form', async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.verifyPageOpened();
  await welcomePage.hideHelpForm();
  await welcomePage.verifyHelpFormContentHidden();
});

test('test case 3 - accept cookies', async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.verifyPageOpened();
  await welcomePage.acceptCookies();
  await welcomePage.verifyCookiesFormClosed();
});

test('test case 4 - timer starts from zero', async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.verifyTimerStartsFrom('00:00');
});
