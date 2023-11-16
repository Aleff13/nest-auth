import { test } from '@playwright/test';
import { UserRole } from '../../shared';
import { AuthenticationPage } from '../../pages';

test('setup admin session', async ({ page }) => {
  const authPage = new AuthenticationPage(page);
  await authPage.visit();
  await authPage.login(UserRole.ADMIN);
});

test('setup employer session', async ({ page }) => {
  const authPage = new AuthenticationPage(page);
  await authPage.visit();
  await authPage.login(UserRole.EMPLOYER);
});

test('setup customer session', async ({ page }) => {
  const authPage = new AuthenticationPage(page);
  await authPage.visit();
  await authPage.login(UserRole.CUSTOMER);
});
