import { test } from '@playwright/test';
import WelcomePage from '../Page/WelcomePage.js';
import LoginCardPage from '../Page/LoginCardPage.js';
import InterestCardPage from '../Page/InterestCardPage.js';
import PersonalDetailsCardPage from '../Page/PersonalDetailsCardPage.js';
import HelpForm from '../Element/HelpForm.js';
import CookiesForm from '../Element/CookiesForm.js';
import Timer from '../Element/Timer.js';
import { getUserInyerfaceData } from '../Data/userInyerfaceDataReader.js';

test.beforeEach(async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.open();
});

test('test case 1 - completes the first two registration cards', async ({ page }) => {
  const testData = getUserInyerfaceData();
  const welcomePage = new WelcomePage(page);
  const loginCardPage = new LoginCardPage(page);
  const interestCardPage = new InterestCardPage(page);
  const personalDetailsCardPage = new PersonalDetailsCardPage(page);

  await welcomePage.verifyPageOpened();
  await welcomePage.startRegistration();
  await loginCardPage.verifyPageOpened();
  await loginCardPage.completeLoginCard(testData.loginCard);
  await interestCardPage.verifyPageOpened();
  await interestCardPage.completeInterestCard(
    testData.interestCard,
    testData.avatar
  );
  await personalDetailsCardPage.verifyPageOpened();
});

test('test case 2 - hide help form', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const helpForm = new HelpForm(page);

  await welcomePage.verifyPageOpened();
  await helpForm.hide();
  await helpForm.verifyContentHidden();
});

test('test case 3 - accept cookies', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const cookiesForm = new CookiesForm(page);

  await welcomePage.verifyPageOpened();
  await cookiesForm.accept();
  await cookiesForm.verifyClosed();
});

test('test case 4 - timer starts from zero', async ({ page }) => {
  const timer = new Timer(page);

  await timer.verifyStartsFrom('00:00');
});
