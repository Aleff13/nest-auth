import http from 'k6/http';
import { check, sleep } from 'k6';

export function UsersCreate() {
  const result = http.get('http://localhost:3000/users/create');
  check(result, { 'status was 200': (r) => r.status == 200 });

  sleep(1);
}
