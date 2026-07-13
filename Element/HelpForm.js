import BaseElement from './BaseElement.js';

export default class HelpForm extends BaseElement {
  constructor(page) {
    super(page.locator('.help-form'), 'Help form');

    this.hideButton = new BaseElement(
      page.locator('.help-form__send-to-bottom-button'),
      'Hide help form button'
    );
  }

  async hide() {
    await this.hideButton.click();
  }

  async verifyContentHidden() {
    await this.verifyHasClass('is-hidden');
  }
}
