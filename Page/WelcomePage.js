import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';

export default class WelcomePage extends BasePage {
  constructor(page) {
    const welcomeText = new BaseElement(
      page.getByText(/Hi and welcome to User Inyerface/),
      'Welcome text'
    );

    super(page, welcomeText, 'Welcome Page');

    this.startRegistrationLink = new BaseElement(
      page.getByRole('link', { name: 'HERE' }),
      'Start registration link'
    );

    this.helpForm = new BaseElement(
      page.locator('.help-form'),
      'Help form'
    );

    this.hideHelpFormButton = new BaseElement(
      page.locator('.help-form__send-to-bottom-button'),
      'Hide help form button'
    );

    this.cookiesForm = new BaseElement(
      page.locator('.cookies'),
      'Cookies form'
    );

    this.acceptCookiesButton = new BaseElement(
      page.locator('.cookies').getByRole('button'),
      'Accept cookies button'
    );

    this.timer = new BaseElement(
      page.locator('.timer').first(),
      'Timer'
    );
  }

  async startRegistration() {
    await this.startRegistrationLink.click();
  }

  async hideHelpForm() {
    await this.hideHelpFormButton.click();
  }

  async verifyHelpFormContentHidden() {
    await this.helpForm.verifyHasClass('is-hidden');
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async verifyCookiesFormClosed() {
    await this.cookiesForm.verifyHidden();
  }

  async verifyTimerStartsFrom(expectedTime) {
    await this.timer.verifyTextStartsWith(expectedTime);
  }
}
