export const authenticationFilesPath = {
  ADMIN: 'tests-e2e/sessions/admin.json',
  EMPLOYER: 'tests-e2e/sessions/employer.json',
  CUSTOMER: 'tests-e2e/sessions/customer.json',
};

export const globalTimeout = { timeout: 10000 };

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  CUSTOMER = 'CUSTOMER',
}
