import BasePage from './abstract.page';
import { expect } from '@playwright/test';

class HomePage extends BasePage {
  protected url = '/home';
  protected title = 'Home';

  private logoutButton = this.page.getByTestId('logout');
  private username = this.page.getByTestId('username-label');
  private email = this.page.getByTestId('email-label');

  async assertUsername(username: string): Promise<void> {
    await expect(this.username).toHaveText(`Name: ${username}`);
  }

  async assertEmail(email: string): Promise<void> {
    await expect(this.email).toHaveText(`Email: ${email}`);
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }
}

export default HomePage;
