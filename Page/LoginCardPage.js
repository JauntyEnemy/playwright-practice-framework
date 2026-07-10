import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import Button from '../Element/Button.js';
import Dropdown from '../Element/Dropdown.js';
import TextBox from '../Element/TextBox.js';

export default class LoginCardPage extends BasePage {
  constructor(page) {
    const pageIndicator = new BaseElement(
      page.locator('.page-indicator'),
      'Page indicator'
    );

    super(page, pageIndicator, 'Login Card Page');

    const loginInputs = page.locator('input.input');

    this.pageIndicator = pageIndicator;

    this.passwordInput = new TextBox(
      loginInputs.nth(0),
      'Password input'
    );

    this.emailNameInput = new TextBox(
      loginInputs.nth(1),
      'Email name input'
    );

    this.emailDomainInput = new TextBox(
      loginInputs.nth(2),
      'Email domain input'
    );

    this.domainDropdown = new Dropdown(
      page.locator('.dropdown__header'),
      page.locator('.dropdown__list-item'),
      'Email domain dropdown'
    );

    this.acceptTermsCheckbox = new Button(
      page.locator('label[for=accept-terms-conditions]'),
      'Accept terms and conditions checkbox'
    );

    this.nextButton = new Button(
      page.locator('a.button--secondary', { hasText: 'Next' }),
      'Next button'
    );
  }

  async verifyPageOpened() {
    await this.pageIndicator.verifyText('1 / 4');
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillEmailName(emailName) {
    await this.emailNameInput.fill(emailName);
  }

  async fillEmailDomain(emailDomain) {
    await this.emailDomainInput.fill(emailDomain);
  }

  async selectEmailExtension(extension) {
    await this.domainDropdown.selectOptionByText(extension);
  }

  async acceptTerms() {
    await this.acceptTermsCheckbox.click();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async completeLoginCard({ password, emailName, emailDomain, extension }) {
    await this.fillPassword(password);
    await this.fillEmailName(emailName);
    await this.fillEmailDomain(emailDomain);
    await this.selectEmailExtension(extension);
    await this.acceptTerms();
    await this.clickNext();
  }
}