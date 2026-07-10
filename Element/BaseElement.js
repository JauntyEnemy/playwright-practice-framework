import { expect } from '@playwright/test';

export default class BaseElement {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  get locator() {
    return this._locator;
  }

  get name() {
    return this._name;
  }

  async click() {
    await this._locator.click();
  }

  async waitForVisible() {
    await expect(this._locator, `${this._name} should be visible`).toBeVisible();
  }

  async verifyHidden() {
    await expect(this._locator, `${this._name} should be hidden`).toBeHidden();
  }

  async verifyText(expectedText) {
    await expect(this._locator, `${this._name} text should match`).toHaveText(expectedText);
  }

  async verifyContainsText(expectedText) {
    await expect(this._locator, `${this._name} should contain text`).toContainText(expectedText);
  }

  async verifyHasClass(className) {
    await expect(
      this._locator,
      `${this._name} should have ${className} class`
    ).toHaveClass(new RegExp(`(^|\\s)${className}(\\s|$)`));
  }

  async getText() {
    const text = await this._locator.textContent();
    return text?.trim() ?? '';
  }

  async scrollIntoView() {
    await this._locator.scrollIntoViewIfNeeded();
  }
}
