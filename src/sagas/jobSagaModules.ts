import {takeEvery, put, call, select} from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import {FILTERS, JOBS} from "../api/apis";
import { AxiosRequestConfig } from 'axios';
import axiosInstance from "../api/apis";
import { push } from 'connected-react-router';
import makeFilterQueryString from 'modules/makeFilterQueryString';
import queryString from 'query-string';

/**
 * Saga Action Types
 */
const JOB_SAGA = 'JOB_SAGA__';

// 공고 리스트 조회
export const GET_JOB_LIST_ASYNC = `${JOB_SAGA}GET_JOB_LIST_ASYNC`;
export const GET_JOB_LIST_SUCCESSFUL = `${JOB_SAGA}GET_JOB_LIST_SUCCESSFUL`;
export const GET_JOB_LIST_FAILURE = `${JOB_SAGA}GET_JOB_LIST_FAILURE`;
// 공고 필터 정보 조회
export const GET_JOB_FILTERS_ASYNC = `${JOB_SAGA}GET_JOB_FILTERS_ASYNC`;
export const GET_JOB_FILTERS_SUCCESSFUL = `${JOB_SAGA}GET_JOB_FILTERS_SUCCESSFUL`;
export const GET_JOB_FILTERS_FAILURE = `${JOB_SAGA}GET_JOB_FILTERS_FAILURE`;

/**
 * Saga Actions
 */
// 회원 목록 가져오기
export const fetchJobList = createAction(GET_JOB_LIST_ASYNC);
export const fetchJobFilters = createAction(GET_JOB_FILTERS_ASYNC);

interface jobListParams {
  country: string;
  tag_type_id?: number;
  job_sort?: string;
  year?: number;
  location?: string[];
}

/**
 * 공고 리스트 조회
 */
export function* jobListSagaAction(action: any) {
  const params : jobListParams = action.payload;
  yield jobListSaga(params);
}

export function* jobListSaga(params: jobListParams) {
  const requestConfig: AxiosRequestConfig ={
    method: 'GET',
    url: JOBS,
    params: params
  };

  try {
    const { data } = yield call(axiosInstance.request, requestConfig);

    yield put({type: GET_JOB_LIST_SUCCESSFUL, payload: data});
  } catch (error) {
    yield put({type: GET_JOB_LIST_FAILURE, payload: error});
  }

}

interface FilterParams {
  countries: any;
  job_sort: any;
  years: any;
  search: string;
}

const classifyUsingFilter = ({countries, job_sort, years, search} : FilterParams) => {
  const query = queryString.parse(search);

  if(Object.keys(query).length !== 0) {
    const country = countries.filter((item:any) => item.key === query.country)[0];
    const jobSort = job_sort.filter((item:any) => item.key === query.job_sort)[0];
    const year = years.filter((item:any) => item.key === query.year)[0];
    let locations = [];

    if(query.locations && country.locations.length > 0 && query.locations.length > 0) {
      locations = country.locations.filter((item:any) => {
        return query.locations && query.locations.includes(item.key)
      })
    }

    return {
      country,
      jobSort,
      year,
      locations
      }
  }

  const country = countries.filter((item:any) => item.selected)[0];
  const jobSort = job_sort.filter((item:any) => item.selected)[0];
  const year = years.filter((item:any) => item.selected)[0];
  const locations = country.locations.length > 0 ? country.locations.filter((item:any) => item.selected) : [];

   return {
     country,
      jobSort,
      year,
      locations
    }
};


/**
 * 공고 필터 정보 조회
 */
export function* jobFiltersSaga() {
  const requestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: FILTERS
  };

  try {
    const { data } = yield call(axiosInstance.request, requestConfig);
    const { countries, job_sort, years } = data;
    const { search } = yield select(state => state.router.location);

    const { country, jobSort, year, locations } = classifyUsingFilter({
      countries,
      job_sort,
      years,
      search
    })

    yield put({type: GET_JOB_FILTERS_SUCCESSFUL, payload: {
      ...data,
      country, 
      jobSort, 
      year,
      locations
      }
    });
 
    const filterQueryString = makeFilterQueryString(country.key, jobSort.key, year.key, locations);
    yield put(push(filterQueryString));

    const jobListParams = {
      tag_type_id: 669,
      country: country.key,
      job_sort: jobSort.key,
      year: year.key,
      location: locations.map((item:any) => item.key)
    }

    yield jobListSaga(jobListParams)
  } catch (error) {
    console.log(error);
    yield put({type: GET_JOB_FILTERS_FAILURE, payload: error});
  }
}

export default [
  takeEvery(GET_JOB_LIST_ASYNC, jobListSagaAction),
  takeEvery(GET_JOB_FILTERS_ASYNC, jobFiltersSaga),
];
