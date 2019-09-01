import Axios from 'axios';

export const WANTED_URL = 'https://www.wanted.co.kr';

const baseUrl = '/api/v4';
export const FILTERS = `${baseUrl}/filters`;
export const JOBS = `${baseUrl}/jobs`;

export default Axios.create({
  timeout: 10000, // 10초
});
