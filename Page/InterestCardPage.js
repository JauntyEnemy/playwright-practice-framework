import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import CardIndicator from '../Element/CardIndicator.js';

export default class InterestCardPage extends BasePage {
  constructor(page) {
    const pageIndicator = new CardIndicator(page);

    super(page, pageIndicator, 'Interest Card Page');

    this.pageIndicator = pageIndicator;

    this.unselectAllCheckbox = new BaseElement(
      page.locator('label[for="interest_unselectall"]'),
      'Unselect all checkbox'
    );

    this.uploadAvatarButton = new BaseElement(
      page.locator('.avatar-and-interests__upload-button'),
      'Upload avatar button'
    );

    this.nextButton = new BaseElement(
      page.getByRole('button', { name: 'Next', exact: true }),
      'Next button'
    );
  }

  async verifyPageOpened() {
    await super.verifyPageOpened();
    await this.pageIndicator.verifyCurrentCard(2);
  }

  async unselectAllInterests() {
    await this.unselectAllCheckbox.click();
  }

  async selectInterestById(interestId) {
    const interestCheckbox = new BaseElement(
      this.page.locator(`label[for="${interestId}"]`),
      `${interestId} checkbox`
    );

    await interestCheckbox.click();
  }

  async selectInterests(selectedInterests) {
    for (const interest of selectedInterests) {
      await this.selectInterestById(interest);
    }
  }

  async uploadAvatar(avatarData) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadAvatarButton.click(),
    ]);

    await fileChooser.setFiles({
      name: avatarData.fileName,
      mimeType: avatarData.mimeType,
      buffer: avatarData.buffer,
    });
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async completeInterestCard({ selectedInterests }, avatarData) {
    await this.unselectAllInterests();
    await this.selectInterests(selectedInterests);
    await this.uploadAvatar(avatarData);
    await this.clickNext();
  }
}
