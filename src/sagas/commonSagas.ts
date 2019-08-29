import axios from 'axios';
import { call, put } from 'redux-saga/effects';

const axiosInstance = axios.create({
  timeout: 10000, // 10초
});

interface IRequestApi {
  url: string;
  successfully: string;
  failure: string;
  payload: object;
}

/**
 * All API Request
 */
export function * requestApi ({ url, successfully, failure, payload} : IRequestApi) {
  try {
    const { data, status, statusText, error } = yield call(axiosInstance, url, payload);

    if (status === 200 || status === 201 || status === 202 || status === 204) {
      yield put({type: successfully, payload: data, prePayload: payload});
      return;
    }

    const errorResponse = {
      status,
      statusText,
      data
    };

    yield put({type: failure, error: errorResponse, prePayload: payload});
  } catch (error) {
    console.log(error);
    yield put({type: failure, error: error.response, prePayload: payload});
  }
}
