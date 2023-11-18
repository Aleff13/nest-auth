import CreatePage from '../../pages/create.page';
import ListPage from '../../pages/list.page';
import extendedTest from '../../shared/extendedTest';

extendedTest('Should admin can visit list page', async ({ adminPage }) => {
  const context = {
    expectedUrl: /users\/list/,
  };
  const listPage = new ListPage(adminPage);
  await listPage.visit();

  await listPage.assertUrl(context.expectedUrl);
});

extendedTest(
  'Should employer can visit list page',
  async ({ employerPage }) => {
    const context = {
      expectedUrl: /users\/list/,
    };
    const listPage = new ListPage(employerPage);
    await listPage.visit();

    await listPage.assertUrl(context.expectedUrl);
  },
);

extendedTest(
  'Should customer can not visit list page',
  async ({ customerPage }) => {
    const context = {
      expectedUrl: /login/,
    };
    const listPage = new ListPage(customerPage);
    await listPage.visit();

    await listPage.assertUrl(context.expectedUrl);
  },
);

extendedTest(
  'Should admin can visit create users page',
  async ({ adminPage }) => {
    const context = {
      expectedUrl: /users\/create/,
    };
    const createPage = new CreatePage(adminPage);
    await createPage.visit();

    await createPage.assertUrl(context.expectedUrl);
  },
);

extendedTest(
  'Should employer can not visit create users page',
  async ({ employerPage }) => {
    const context = {
      expectedUrl: /login/,
    };
    const createPage = new CreatePage(employerPage);
    await createPage.visit();

    await createPage.assertUrl(context.expectedUrl);
  },
);

extendedTest(
  'Should customer can not visit create users page',
  async ({ customerPage }) => {
    const context = {
      expectedUrl: /login/,
    };
    const createPage = new CreatePage(customerPage);
    await createPage.visit();

    await createPage.assertUrl(context.expectedUrl);
  },
);
