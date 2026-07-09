import BaseElement from './BaseElement.js';

export default class TextBox extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
  }

  async fill(value) {
    await this.locator.fill(value);
  }

  async clear() {
    await this.locator.clear();
  }
}