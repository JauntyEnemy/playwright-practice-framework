import BaseElement from './BaseElement.js';

export default class CookiesForm extends BaseElement {
  constructor(page) {
    const formLocator = page.locator('.cookies');

    super(formLocator, 'Cookies form');

    this.acceptButton = new BaseElement(
      formLocator.getByRole('button'),
      'Accept cookies button'
    );
  }

  async accept() {
    await this.acceptButton.click();
  }

  async verifyClosed() {
    await this.verifyHidden();
  }
}
