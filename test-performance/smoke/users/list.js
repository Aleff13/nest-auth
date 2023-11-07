import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

export default () => {
  const result = http.get('http://localhost:3000/users/list');
  check(result, { 'status was 200': (r) => r.status == 200 });

  sleep(1);
};
