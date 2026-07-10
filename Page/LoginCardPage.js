import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import CardIndicator from '../Element/CardIndicator.js';
import Dropdown from '../Element/Dropdown.js';
import TextBox from '../Element/Textbox.js';

export default class LoginCardPage extends BasePage {
  constructor(page) {
    const pageIndicator = new CardIndicator(page);

    super(page, pageIndicator, 'Login Card Page');

    this.pageIndicator = pageIndicator;

    this.passwordInput = new TextBox(
      page.getByPlaceholder('Choose Password'),
      'Password input'
    );

    this.emailNameInput = new TextBox(
      page.getByPlaceholder('Your email'),
      'Email name input'
    );

    this.emailDomainInput = new TextBox(
      page.getByPlaceholder('Domain'),
      'Email domain input'
    );

    this.domainDropdown = new Dropdown(
      page.locator('.dropdown__header'),
      page.locator('.dropdown__list-item'),
      'Email domain dropdown'
    );

    this.acceptTermsCheckbox = new BaseElement(
      page.locator('label[for="accept-terms-conditions"]'),
      'Accept terms and conditions checkbox'
    );

    this.nextLink = new BaseElement(
      page.locator('a.button--secondary', { hasText: 'Next' }),
      'Next link'
    );
  }

  async verifyPageOpened() {
    await super.verifyPageOpened();
    await this.pageIndicator.verifyCurrentCard(1);
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
    await this.nextLink.click();
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
