import {AxiosPromise, AxiosRequestConfig} from 'axios';
import {call, put} from 'redux-saga/effects';
import axiosInstance from "../api/apis";

interface IRequestApi {
  requestConfig: AxiosRequestConfig;
  successfully: string;
  failure: string;
}

/**
 * All API Request
 */
export function* requestApi({requestConfig, successfully, failure}: IRequestApi) {
  try {
    const response = yield call(axiosInstance.request, requestConfig);

    yield put({type: successfully, payload: response});
  } catch (error) {
    yield put({type: failure, payload: error});
  }
}
