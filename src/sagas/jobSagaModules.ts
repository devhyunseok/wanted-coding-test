import { takeEvery, select, put } from 'redux-saga/effects';
import { JOBS } from '../api/apiUrls';
import { requestApi } from "./commonSagas";

/**
 * Saga Action Types
 */
const JOB_SAGA = 'JOB_SAGA__';

// 공고 리스트 조회
export const GET_JOB_LIST_ASYNC = `${JOB_SAGA}GET_JOB_LIST_ASYNC`;
export const GET_JOB_LIST_SUCCESSFUL = `${JOB_SAGA}GET_JOB_LIST_SUCCESSFUL`;
export const GET_JOB_LIST_FAILURE = `${JOB_SAGA}GET_JOB_LIST_FAILURE`;

/**
 * 공고 리스트 조회
 */
function * getJobListAsync () {
  const payload = {
    method: 'GET',
    params: {
      country: 'kr'
    }
  };

  const requestConfig = {
    url: JOBS,
    successfully : GET_JOB_LIST_SUCCESSFUL,
    failure: GET_JOB_LIST_FAILURE,
    payload: payload
  };

  yield requestApi(requestConfig);
}

export default [
   takeEvery(GET_JOB_LIST_ASYNC, getJobListAsync),
];
