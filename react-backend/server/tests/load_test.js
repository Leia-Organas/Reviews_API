import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 1},
    { duration: '10s', target: 10},
    { duration: '10s', target: 100},
    { duration: '10s', target: 500}
  ]
}
export default () => {
  http.get('http://localhost:3000/reviews/meta?product_id=2');
}