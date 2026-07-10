import { test } from '@playwright/test';
import WelcomePage from '../Page/WelcomePage.js';
import GamePage from '../Page/GamePage.js';
import LoginCardPage from '../Page/LoginCardPage.js';
import InterestCardPage from '../Page/InterestCardPage.js';
import { getUserInyerfaceData } from '../Data/userInyerfaceDataReader.js';

test.beforeEach(async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.open();
  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();
});

test('test case 1 - completes the first two registration cards', async ({ page }) => {
  const testData = getUserInyerfaceData();
  const gamePage = new GamePage(page);
  const loginCardPage = new LoginCardPage(page);
  const interestCardPage = new InterestCardPage(page);

  await loginCardPage.verifyPageOpened();
  await loginCardPage.completeLoginCard(testData.loginCard);
  await interestCardPage.completeInterestCard(
    testData.interestCard,
    testData.avatar
  );
  await gamePage.verifyCurrentCard(3);
});

test('test case 2 - hide help form', async ({ page }) => {
  const gamePage = new GamePage(page);

  await gamePage.verifyPageOpened();
  await gamePage.hideHelpForm();
  await gamePage.verifyHelpFormContentHidden();
});

test('test case 3 - close the cookies form', async ({ page }) => {
  const gamePage = new GamePage(page);

  await gamePage.verifyPageOpened();
  await gamePage.verifyCookiesFormOpened();
  await gamePage.closeCookiesForm();
  await gamePage.verifyCookiesFormClosed();
});

test('test case 4 - timer starts from zero', async ({ page }) => {
  const gamePage = new GamePage(page);

  await gamePage.verifyPageOpened();
  await gamePage.verifyTimerStartsFromZero();
});
