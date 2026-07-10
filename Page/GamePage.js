import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import CardIndicator from '../Element/CardIndicator.js';

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

    this.hideHelpFormButton = new BaseElement(
      page.locator('.help-form__send-to-bottom-button'),
      'Send help form to bottom button'
    );

    this.cookiesForm = new BaseElement(
      page.locator('.cookies'),
      'Cookies form'
    );

    this.closeCookiesButton = new BaseElement(
      page.getByRole('button', { name: 'Not really, no' }),
      'Close cookies form button'
    );

    this.pageIndicator = new CardIndicator(page);
  }

  async hideHelpForm() {
    await this.hideHelpFormButton.click();
  }

  async verifyHelpFormContentHidden() {
    await this.helpForm.verifyHasClass('is-hidden');
  }

  async verifyCookiesFormOpened() {
    await this.cookiesForm.verifyVisible();
  }

  async closeCookiesForm() {
    await this.closeCookiesButton.click();
  }

  async verifyCookiesFormClosed() {
    await this.cookiesForm.verifyHidden();
  }

  async verifyTimerStartsFromZero() {
    await this.timer.verifyText('00:00:00');
  }

  async verifyCurrentCard(cardNumber) {
    await this.pageIndicator.verifyCurrentCard(cardNumber);
  }
}
