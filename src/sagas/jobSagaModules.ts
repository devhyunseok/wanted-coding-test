import {takeEvery, put, call} from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import {FILTERS, JOBS} from "../api/apis";
import { AxiosRequestConfig } from 'axios';
import axiosInstance from "../api/apis";
import { push } from 'connected-react-router';

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
export function* jobListSaga(action: any) {
  const params : jobListParams = action.payload;
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
    const country = countries.filter((item:any) => item.selected)[0];
    const jobSort = job_sort.filter((item:any) => item.selected)[0];
    const year = years.filter((item:any) => item.selected)[0];
    let locations = [];
    let locationsString = '';

    if(country.locations.length > 0) {
      locations = country.locations.filter((item:any) => item.selected);
      locationsString = locations.reduce((acc:any, cur:any) => {
        if(cur.selected) {
          return `${acc}&locations=${cur.key}`
        }
        return ''
      });
    }

    const queryString = `/?country=${country.key}&job_sort=${jobSort.key}&year=${year.key}${locationsString}`;

    yield put(push(queryString));
    yield put({type: GET_JOB_FILTERS_SUCCESSFUL, payload: {
        ...data,
        country: country,
        jobSort: jobSort,
        year: year,
        locations: locations
      }
    });
  } catch (error) {
    yield put({type: GET_JOB_FILTERS_FAILURE, payload: error});
  }
}

export default [
  takeEvery(GET_JOB_LIST_ASYNC, jobListSaga),
  takeEvery(GET_JOB_FILTERS_ASYNC, jobFiltersSaga),
];
