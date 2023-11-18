import test, { Page } from '@playwright/test';
import { UserRole } from './constants';
import { AuthenticationPage } from '../pages';

/**
 * This extension logs in to each authenticated page
 */
const extendedTest = test.extend<{
  adminPage: Page;
  employerPage: Page;
  customerPage: Page;
}>({
  adminPage: async ({ page }, use, options) => {
    const authPage = new AuthenticationPage(page);
    await authPage.visit();
    await authPage.login(UserRole.ADMIN);

    await use(page);
  },

  employerPage: async ({ page }, use, options) => {
    const authPage = new AuthenticationPage(page);
    await authPage.visit();
    await authPage.login(UserRole.EMPLOYER);

    await use(page);
  },

  customerPage: async ({ page }, use, options) => {
    const authPage = new AuthenticationPage(page);
    await authPage.visit();
    await authPage.login(UserRole.CUSTOMER);

    await use(page);
  },
});

export default extendedTest;
