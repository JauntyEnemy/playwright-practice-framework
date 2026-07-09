import BaseElement from './BaseElement.js';

export default class Dropdown extends BaseElement {
  constructor(headerLocator, optionLocator, name) {
    super(headerLocator, name);
    this._optionLocator = optionLocator;
  }

  async open() {
    await this.locator.click();
  }

  async selectOptionByText(optionText) {
    await this.open();
    await this._optionLocator.filter({ hasText: optionText }).click();
  }
}