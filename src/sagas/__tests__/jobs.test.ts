import {call, put, take} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {
  jobListSaga,
  GET_JOB_LIST_SUCCESSFUL,
  GET_JOB_LIST_ASYNC,
  GET_JOB_LIST_FAILURE,
  GET_JOB_FILTERS_ASYNC
} from 'sagas/jobSagaModules';
import axiosInstance, {JOBS} from "api/apis";
import {throwError} from "redux-saga-test-plan/providers";
import {AxiosRequestConfig} from "axios";

const actionPayload = { type: GET_JOB_FILTERS_ASYNC, payload: { country: 'kr '}};
const requestPayload : AxiosRequestConfig = { method: 'GET', url: JOBS, params: { country : 'kr'}};

// Job 리스트 가져오기 성공
it('Fetch job list successfully', () => {
  const mockJobs = {data: [{}], links: [{}]};

  return expectSaga(jobListSaga, actionPayload)
    .provide([
      [call(axiosInstance.request, requestPayload), mockJobs]
    ])
    .put({type: GET_JOB_LIST_SUCCESSFUL, payload: mockJobs})
    .dispatch({type: GET_JOB_LIST_ASYNC})
    .run();
});

// Job 리스트 가져오기 실패
it('Fetch job list failure', () => {
  const mockError = new Error('Fetch Job List Failure');

  return expectSaga(jobListSaga, actionPayload)
    .provide([
      [call(axiosInstance.request, requestPayload), throwError(mockError)]
    ])
    .put({type: GET_JOB_LIST_FAILURE, payload: mockError})
    .dispatch({type: GET_JOB_LIST_ASYNC})
    .run();
});
