import BaseElement from './BaseElement.js';

export default class Timer extends BaseElement {
  constructor(page) {
    super(page.locator('.timer').first(), 'Timer');
  }

  async verifyStartsFrom(expectedTime) {
    await this.verifyTextStartsWith(expectedTime);
  }
}
