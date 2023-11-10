import { UsersList, UsersCreate } from './modules/users/index.js';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '10s', // This can be shorter or just a few iterations
};

export default function () {
  UsersList();
  UsersCreate();
}
