import { expect } from '@playwright/test';

export default class BasePage {
  constructor(page, uniqueElement, pageName) {
    this._page = page;
    this._uniqueElement = uniqueElement;
    this._pageName = pageName;
  }

  get page() {
    return this._page;
  }

  async open(path = '/') {
    await this._page.goto(path, {
      waitUntil: 'domcontentloaded',
    });
  }

  async verifyPageOpened() {
    await expect(
      this._uniqueElement.locator,
      `${this._pageName} should be opened`
    ).toBeVisible();
  }
}
