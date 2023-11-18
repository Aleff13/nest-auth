import { expect } from '@playwright/test';
import BasePage from './abstract.page';

class ListPage extends BasePage {
  protected url = '/users/list';
  protected title = 'Users list';

  protected tableHeaders = {
    name: this.page.getByTestId('name-table-header'),
    email: this.page.getByTestId('email-table-header'),
    role: this.page.getByTestId('role-table-header'),
  };

  private logoutButton = this.page.getByTestId('logout');

  async assertTableHeaders() {
    await expect(this.tableHeaders.name).toHaveText(`Name`);
    await expect(this.tableHeaders.email).toHaveText(`Email`);
    await expect(this.tableHeaders.role).toHaveText(`Role`);
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }
}

export default ListPage;
