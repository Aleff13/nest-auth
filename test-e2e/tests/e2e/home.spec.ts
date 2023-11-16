import HomePage from '../../pages/home.page';
import extendedTest from '../../shared/extendedTest';

extendedTest('Verify home page and logout for admin', async ({ adminPage }) => {
  const context = {
    username: 'admin',
    email: 'admin@gmail.com',
  };
  const homePage = new HomePage(adminPage);

  await homePage.assertUsername(context.username);
  await homePage.assertEmail(context.email);

  await homePage.clickOnLogoutButton();
  await homePage.assertUrl(/login/);
});

extendedTest(
  'Verify home page and logout for employer',
  async ({ employerPage }) => {
    const context = {
      username: 'employer',
      email: 'employer@email.com',
    };
    const homePage = new HomePage(employerPage);

    await homePage.assertUsername(context.username);
    await homePage.assertEmail(context.email);

    await homePage.clickOnLogoutButton();
    await homePage.assertUrl(/login/);
  },
);

extendedTest(
  'Verify home page and logout for customer',
  async ({ customerPage }) => {
    const context = {
      username: 'customer',
      email: 'customer@email.com',
    };
    const homePage = new HomePage(customerPage);

    await homePage.assertUsername(context.username);
    await homePage.assertEmail(context.email);

    await homePage.clickOnLogoutButton();
    await homePage.assertUrl(/login/);
  },
);
