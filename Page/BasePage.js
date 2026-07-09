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

  get pageName() {
    return this._pageName;
  }

  async open(url) {
    await this._page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  async waitForPageOpened() {
    await this._uniqueElement.waitForVisible();
  }

  async verifyPageOpened() {
    await expect(
      this._uniqueElement.locator,
      `${this._pageName} should be opened`
    ).toBeVisible();
  }

  async verifyUrlContains(expectedUrlPart) {
    await expect(this._page).toHaveURL(new RegExp(expectedUrlPart));
  }

  async waitForLoad() {
    await this._page.waitForLoadState('domcontentloaded');
  }

  async reload() {
    await this._page.reload({
      waitUntil: 'domcontentloaded',
    });
  }
}