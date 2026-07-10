import { expect } from '@playwright/test';

export default class BaseElement {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  get locator() {
    return this._locator;
  }

  async click() {
    await this._locator.click();
  }

  async verifyVisible() {
    await expect(this._locator, `${this._name} should be visible`).toBeVisible();
  }

  async verifyHidden() {
    await expect(this._locator, `${this._name} should be hidden`).toBeHidden();
  }

  async verifyText(expectedText) {
    await expect(this._locator, `${this._name} text should match`).toHaveText(expectedText);
  }

  async verifyTextStartsWith(expectedText) {
    const escapedText = expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    await expect(
      this._locator,
      `${this._name} text should start with ${expectedText}`
    ).toHaveText(new RegExp(`^${escapedText}`));
  }

  async verifyHasClass(className) {
    await expect(
      this._locator,
      `${this._name} should have ${className} class`
    ).toHaveClass(new RegExp(`(^|\\s)${className}(\\s|$)`));
  }
}
