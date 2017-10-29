
import { browser, element, by } from 'protractor';

export const path = require('path');
export const sleepTime = 500;
export const mediumSleepTime = 2000;
export const longSleepTime = 4000

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

