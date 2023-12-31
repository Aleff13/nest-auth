import { faker } from '@faker-js/faker';
import BasePage from './abstract.page';

class CreatePage extends BasePage {
  protected url = '/users/create';
  protected title = 'Create new user';
  private logoutButton = this.page.getByTestId('logout');

  protected form = {
    username: this.page.getByTestId('username-input'),
    email: this.page.getByTestId('email-input'),
    password: this.page.getByTestId('password-input'),
    role: this.page.getByTestId('role-select'),
    submit: this.page.getByTestId('submit'),
  };

  protected roles = {
    admin: '1',
    employer: '2',
    customer: '3',
  };

  async fillUsername(username = faker.internet.userName()): Promise<string> {
    await this.form.username.fill(username);
    return username;
  }

  async fillEmail(email = faker.internet.email()): Promise<string> {
    await this.form.email.fill(email);
    return email;
  }

  async fillPassword(password = faker.internet.password()): Promise<void> {
    await this.form.password.fill(password);
  }

  async selectRole(
    role = faker.number.int({
      min: 1,
      max: 3,
    }),
  ): Promise<void> {
    await this.form.role.selectOption(role.toString());
  }

  async clickSubmit(): Promise<void> {
    await this.form.submit.click();
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }
}

export default CreatePage;
