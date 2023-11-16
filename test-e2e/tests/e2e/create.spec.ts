import { expect } from '@playwright/test';
import CreatePage from '../../pages/create.page';
import ListPage from '../../pages/list.page';
import extendedTest from '../../shared/extendedTest';

extendedTest('Should admin can create a new user', async ({ adminPage }) => {
  const context = {
    expectedUrl: /users\/create/,
    afterCreateUrl: /users\/list/,
  };
  const createPage = new CreatePage(adminPage);
  const listPage = new ListPage(adminPage);
  await createPage.visit();

  await createPage.assertUrl(context.expectedUrl);

  const username = await createPage.fillUsername();
  const email = await createPage.fillEmail();
  await createPage.fillPassword();
  await createPage.selectRole();
  await createPage.clickSubmit();

  await listPage.assertTableHeaders();
  expect(listPage.page.getByText(username)).toBeVisible();
  expect(listPage.page.getByText(email)).toBeVisible();
});
