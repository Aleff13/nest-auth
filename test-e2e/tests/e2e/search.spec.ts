import { expect } from '@playwright/test';
import SearchPage from '../../pages/search.page';
import extendedTest from '../../shared/extendedTest';

extendedTest(
  'Should employer can search users by email',
  async ({ employerPage }) => {
    const searchPage = new SearchPage(employerPage);
    await searchPage.visit();

    await searchPage.selectParameter(searchPage.parameterOptions.Email);
    await searchPage.fillSearchValue('@email.com');
    await searchPage.clickSubmit();

    expect(employerPage.getByText('employer@email.com')).toBeVisible();
  },
);

extendedTest(
  'Should employer can search users by name',
  async ({ employerPage }) => {
    const searchPage = new SearchPage(employerPage);
    await searchPage.visit();

    await searchPage.selectParameter(searchPage.parameterOptions.Name);
    await searchPage.fillSearchValue('admin');
    await searchPage.clickSubmit();

    expect(employerPage.getByText('admin').first()).toBeVisible();
  },
);

extendedTest(
  'Should employer can search users by role',
  async ({ employerPage }) => {
    const searchPage = new SearchPage(employerPage);
    await searchPage.visit();

    await searchPage.selectParameter(searchPage.parameterOptions.Role);
    await searchPage.fillSearchValue('1');
    await searchPage.clickSubmit();

    expect(employerPage.getByText('1').first()).toBeVisible();
  },
);
