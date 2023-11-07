import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: '20s', target: 50 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '1m', target: 50 }, // stay at 100 users for 30 minutes
    { duration: '20s', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const result = http.get('http://localhost:3000/users/list');
  sleep(1);
};
