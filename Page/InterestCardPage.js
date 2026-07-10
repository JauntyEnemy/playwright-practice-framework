import BasePage from './BasePage.js';
import BaseElement from '../Element/BaseElement.js';
import Button from '../Element/Button.js';

export default class InterestCardPage extends BasePage {
  constructor(page) {
    const pageIndicator = new BaseElement(
      page.locator('.page-indicator'),
      'Page indicator'
    );

    super(page, pageIndicator, 'Interest Card Page');

    this.pageIndicator = pageIndicator;

    this.unselectAllCheckbox = new Button(
      page.locator('label[for=interest_unselectall]'),
      'Unselect all checkbox'
    );

    this.uploadAvatarButton = new Button(
      page.locator('.avatar-and-interests__upload-button'),
      'Upload avatar button'
    );

    this.nextButton = new Button(
      page.getByRole('button', { name: 'Next' }),
      'Next button'
    );
  }

  async verifyPageOpened() {
    await this.pageIndicator.verifyText('2 / 4');
  }

  async verifyNextCardOpened() {
    await this.pageIndicator.verifyText('3 / 4');
  }

  async unselectAllInterests() {
    await this.unselectAllCheckbox.click();
  }

  async selectInterestById(interestId) {
    const interestCheckbox = new Button(
      this.page.locator(`label[for=${interestId}]`),
      `${interestId} checkbox`
    );

    await interestCheckbox.click();
  }

  getRandomInterests(availableInterests, interestsToSelect) {
    return [...availableInterests]
      .sort(() => Math.random() - 0.5)
      .slice(0, interestsToSelect);
  }

  async selectRandomInterests(availableInterests, interestsToSelect) {
    const selectedInterests = this.getRandomInterests(
      availableInterests,
      interestsToSelect
    );

    for (const interest of selectedInterests) {
      await this.selectInterestById(interest);
    }

    return selectedInterests;
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

  async completeInterestCard(interestCardData, avatarData) {
    await this.verifyPageOpened();
    await this.unselectAllInterests();

    await this.selectRandomInterests(
      interestCardData.availableInterests,
      interestCardData.interestsToSelect
    );

    await this.uploadAvatar(avatarData);
    await this.clickNext();
  }
}