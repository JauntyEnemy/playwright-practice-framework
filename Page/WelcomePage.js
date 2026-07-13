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
  }

  async startRegistration() {
    await this.startRegistrationLink.click();
  }
}
