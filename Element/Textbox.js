import BaseElement from './BaseElement.js';

export default class TextBox extends BaseElement {
  async fill(value) {
    await this.locator.fill(value);
  }
}
