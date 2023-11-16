import { UserRole, authenticationFilesPath } from '../shared';
import BasePage from './abstract.page';

export class AuthenticationPage extends BasePage {
  protected usernameInput = this.page.getByTestId('username');
  protected passwordInput = this.page.getByTestId('password');
  protected submitBtn = this.page.getByTestId('submit');
  protected title = '/Login';
  protected url = '/login';

  async login(userType: UserRole, saveSession = true) {
    const { username, password, path } = this.getCredentials(userType);

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();

    if (saveSession) await this.setSession(path);
  }

  protected credentials = {
    ADMIN: {
      username: process.env.E2E_ADMIN_USER,
      password: process.env.E2E_ADMIN_PASSWORD,
      path: authenticationFilesPath.ADMIN,
    },
    EMPLOYER: {
      username: process.env.E2E_EMPLOYER_USER,
      password: process.env.E2E_EMPLOYER_PASSWORD,
      path: authenticationFilesPath.EMPLOYER,
    },
    CUSTOMER: {
      username: process.env.E2E_CUSTOMER_USER,
      password: process.env.E2E_CUSTOMER_PASSWORD,
      path: authenticationFilesPath.CUSTOMER,
    },
  };

  protected async setSession(path: string) {
    await this.page.context().storageState({ path });
  }

  protected getCredentials(userType: UserRole) {
    const { username, password, path } = this.credentials[userType];

    if (!username || !password) {
      throw new Error(
        'Credentials not found, please provide username and password in .env',
      );
    }

    return { username, password, path };
  }
}
