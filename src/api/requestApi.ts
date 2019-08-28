import axios from 'axios';

const baseUrl = 'http://www.wanted.co.kr/api/v4';
export const filters = `${baseUrl}/filters`;
export const jobs = `${baseUrl}/jobs`;

export default axios.create({
  timeout: 10000, // 10초
});
