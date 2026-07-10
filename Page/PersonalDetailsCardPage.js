import BasePage from './BasePage.js';
import CardIndicator from '../Element/CardIndicator.js';

export default class PersonalDetailsCardPage extends BasePage {
  constructor(page) {
    const pageIndicator = new CardIndicator(page);

    super(page, pageIndicator, 'Personal Details Card Page');

    this.pageIndicator = pageIndicator;
  }

  async verifyPageOpened() {
    await super.verifyPageOpened();
    await this.pageIndicator.verifyCurrentCard(3);
  }
}
