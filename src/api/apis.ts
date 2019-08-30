import Axios, {AxiosRequestConfig} from 'axios';

const baseUrl = '/api/v4';
export const FILTERS = `${baseUrl}/filters`;
export const JOBS = `${baseUrl}/jobs`;


//
// export const fetchJobListConfig = (params : jobListParams) : AxiosRequestConfig => {
//   return {
//     method: 'GET',
//     url: JOBS,
//     params: params
//   };
// };
//
// export const fetchJobFiltersConfig = () : AxiosRequestConfig => {
//   return {
//     method: 'GET',
//     url: FILTERS
//   };
// };

export default Axios.create({
  timeout: 10000, // 10초
});
