import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 1},
    { duration: '10s', target: 10},
    { duration: '10s', target: 100},
    { duration: '10s', target: 200}
  ]
}
export default () => {
  http.get('http://localhost:3000/reviews?product_id=2&page=1&count=5&sort=relevant');
}