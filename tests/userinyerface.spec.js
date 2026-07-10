import { test } from '@playwright/test';
import WelcomePage from '../Page/WelcomePage.js';
import GamePage from '../Page/GamePage.js';
import LoginCardPage from '../Page/LoginCardPage.js';
import InterestCardPage from '../Page/InterestCardPage.js';
import { getUserInyerfaceData } from '../Data/userInyerfaceDataReader.js';


test('test case 1 - complete first two User Inyerface cards', async ({ page }) => {
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

test('test case 2 - hide help form', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const gamePage = new GamePage(page);

  await welcomePage.open();
  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();

  await gamePage.verifyPageOpened();
  await gamePage.hideHelpForm();
  await gamePage.verifyHelpFormContentHidden();
});

test('test case 3 - accept cookies', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const gamePage = new GamePage(page);

  await welcomePage.open();
  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();

  await gamePage.verifyPageOpened();
  await gamePage.waitForCookiesFormOpened();
  await gamePage.acceptCookies();
  await gamePage.verifyCookiesFormClosed();
});

test('test case 4 - timer starts from zero', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const gamePage = new GamePage(page);

  await welcomePage.open();
  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();

  await gamePage.verifyPageOpened();
  await gamePage.verifyTimerStartsFromZero();
});
