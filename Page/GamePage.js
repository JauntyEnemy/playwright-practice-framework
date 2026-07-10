import BasePage from './BasePage.js';
import CardIndicator from '../Element/CardIndicator.js';

export default class GamePage extends BasePage {
  constructor(page) {
    const pageIndicator = new CardIndicator(page);

    super(page, pageIndicator, 'Game Page');

    this.pageIndicator = pageIndicator;
  }

  async verifyCurrentCard(cardNumber) {
    await this.pageIndicator.verifyCurrentCard(cardNumber);
  }
}
