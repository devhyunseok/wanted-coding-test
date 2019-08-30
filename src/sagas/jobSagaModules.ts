import {takeEvery, select, put} from 'redux-saga/effects';
import {requestApi} from "./commonSagas";
import { createAction } from 'redux-actions';
import {FILTERS, JOBS} from "../api/apis";

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

  yield requestApi({
    requestConfig: {
      method: 'GET',
      url: JOBS,
      params: params
    },
    successfully: GET_JOB_LIST_SUCCESSFUL,
    failure: GET_JOB_LIST_FAILURE
  });
}

/**
 * 공고 필터 정보 조회
 */
export function* jobFiltersSaga() {
  yield requestApi({
    requestConfig: {
      method: 'GET',
      url: FILTERS
    },
    successfully: GET_JOB_FILTERS_SUCCESSFUL,
    failure: GET_JOB_FILTERS_FAILURE
  });
}

export default [
  takeEvery(GET_JOB_LIST_ASYNC, jobListSaga),
  takeEvery(GET_JOB_FILTERS_ASYNC, jobFiltersSaga),
];
