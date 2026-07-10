import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import Button from '../Element/Button.js';

export default class GamePage extends BasePage {
  constructor(page) {
    const timer = new BaseElement(
      page.locator('.timer').first(),
      'Timer'
    );

    super(page, timer, 'Game Page');

    this.timer = timer;

    this.helpForm = new BaseElement(
      page.locator('.help-form'),
      'Help form'
    );

    this.hideHelpFormButton = new Button(
      page.locator('.help-form__send-to-bottom-button'),
      'Send help form to bottom button'
    );

    this.cookiesForm = new BaseElement(
      page.locator('.cookies'),
      'Cookies form'
    );

    this.acceptCookiesButton = new Button(
      page.getByRole('button', { name: 'Not really, no' }),
      'Accept cookies button'
    );
  }

  async hideHelpForm() {
    await this.hideHelpFormButton.click();
  }

  async verifyHelpFormContentHidden() {
    await this.helpForm.verifyHasClass('is-hidden');
  }

  async waitForCookiesFormOpened() {
    await this.cookiesForm.waitForVisible();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async verifyCookiesFormClosed() {
    await this.cookiesForm.verifyHidden();
  }

  async verifyTimerStartsFromZero() {
    await this.timer.verifyContainsText('00:00');
  }
}
