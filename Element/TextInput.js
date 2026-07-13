import BaseElement from './BaseElement.js';

export default class TextInput extends BaseElement {
  async fill(value) {
    await this.locator.fill(value);
  }
}
