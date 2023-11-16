import test, { Page } from '@playwright/test';
import { UserRole, authenticationFilesPath } from './constants';

/**
 * This extension works with previous saved sessions that use setup
 */
const authenticatedTest = test.extend<{
  adminPage: Page;
  employerPage: Page;
  customerPage: Page;
}>({
  adminPage: async ({ browser }, use, options) => {
    const browserContext = await browser.newContext({
      storageState: authenticationFilesPath[UserRole.ADMIN],
    });

    const authPage = await browserContext.newPage();
    await use(authPage);
  },

  employerPage: async ({ browser }, use, options) => {
    const browserContext = await browser.newContext({
      storageState: authenticationFilesPath[UserRole.EMPLOYER],
    });

    const authPage = await browserContext.newPage();
    await use(authPage);
  },

  customerPage: async ({ browser }, use, options) => {
    const browserContext = await browser.newContext({
      storageState: authenticationFilesPath[UserRole.CUSTOMER],
    });

    const authPage = await browserContext.newPage();
    await use(authPage);
  },
});

export default authenticatedTest;
