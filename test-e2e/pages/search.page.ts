import { faker } from '@faker-js/faker';
import BasePage from './abstract.page';

class SearchPage extends BasePage {
  protected url = '/users/search';
  protected title = 'Users search';
  private logoutButton = this.page.getByTestId('logout');

  protected form = {
    parameter: this.page.getByTestId('parameter-select'),
    value: this.page.getByTestId('search-value'),
    submit: this.page.getByTestId('submit'),
  };

  public parameterOptions = {
    Name: 'name',
    Email: 'email',
    Role: 'role',
  };

  async fillSearchValue(value = faker.internet.userName()): Promise<string> {
    await this.form.value.fill(value);
    return value;
  }

  async selectParameter(parameter: string): Promise<void> {
    await this.form.parameter.selectOption(parameter.toString());
  }

  async clickSubmit(): Promise<void> {
    await this.form.submit.click();
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }
}

export default SearchPage;
