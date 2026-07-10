import BaseElement from './BaseElement.js';

const TOTAL_CARDS = 4;

export default class CardIndicator extends BaseElement {
  constructor(page) {
    super(page.locator('.page-indicator'), 'Page indicator');
  }

  async verifyCurrentCard(cardNumber) {
    await this.verifyText(`${cardNumber} / ${TOTAL_CARDS}`);
  }
}
