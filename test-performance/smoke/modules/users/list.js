import http from 'k6/http';
import { check, sleep } from 'k6';

export function UsersList() {
  const result = http.get('http://localhost:3000/users/list');
  check(result, { 'status was 200': (r) => r.status == 200 });

  sleep(1);
}
