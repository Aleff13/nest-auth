import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

interface IBasePage {
  page: Page;
  visit: () => Promise<void>;
}

abstract class BasePage implements IBasePage {
  public page: Page;
  protected abstract url: string;
  protected abstract title: string;

  //inject common components here
  constructor(page: Page) {
    this.page = page;
  }

  public async visit(): Promise<void> {
    this.page.goto(this.url);
  }

  public async assertUrl(url: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  public async assertTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}

export default BasePage;
