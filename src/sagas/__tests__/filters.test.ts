import {call, put, take} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {
  GET_JOB_FILTERS_ASYNC,
  GET_JOB_FILTERS_SUCCESSFUL,
  GET_JOB_FILTERS_FAILURE,
  jobFiltersSaga
} from 'sagas/jobSagaModules';
import axiosInstance, { FILTERS, JOBS} from "api/apis";
import {throwError} from "redux-saga-test-plan/providers";
import {AxiosRequestConfig} from "axios";

const requestPayload : AxiosRequestConfig = { method: 'GET', url: FILTERS};

// filter 정보 가져오기 성공
it('Fetch job filters successfully', () => {
  const mockJobs = {job_sort: [], employee_count: [], countries: [], years: []};

  return expectSaga(jobFiltersSaga)
    .provide([
      [call(axiosInstance.request, requestPayload), mockJobs]
    ])
    .put({type: GET_JOB_FILTERS_SUCCESSFUL, payload: mockJobs})
    .dispatch({type: GET_JOB_FILTERS_ASYNC})
    .run();
});

// filter 정보 가져오기 실패
it('Fetch job filters failure', () => {
  const mockError = new Error('Fetch Job filters failure');

  return expectSaga(jobFiltersSaga)
    .provide([
      [call(axiosInstance.request, requestPayload), throwError(mockError)]
    ])
    .put({type: GET_JOB_FILTERS_FAILURE, payload: mockError})
    .dispatch({type: GET_JOB_FILTERS_ASYNC})
    .run();
});
