import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import Button from '../Element/Button.js';

export default class WelcomePage extends BasePage {
  constructor(page) {
    const welcomeText = new BaseElement(
      page.getByText(/Hi and welcome to User Inyerface/),
      'Welcome text'
    );

    super(page, welcomeText, 'Welcome Page');

    this.hereLink = new Button(
      page.getByRole('link', { name: 'HERE' }),
      'HERE link'
    );
  }

  async open() {
    await super.open('https://userinyerface.com/');
  }

  async startRegistration() {
    await this.hereLink.click();
  }
}