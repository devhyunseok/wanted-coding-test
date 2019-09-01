import {takeEvery, put, call, select} from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import {FILTERS, JOBS} from "../api/apis";
import { AxiosRequestConfig } from 'axios';
import axiosInstance from "../api/apis";
import { push } from 'connected-react-router';
import makeFilterQueryString from 'modules/makeFilterQueryString';
import queryString from 'query-string';
import { IJobFilterParams, IFilterParams } from 'dataStructure/IJobFilter';
import { classifySelectedFilter } from 'modules/jobFilterUtils';

/**
 * Saga Action Types
 */
const JOB_SAGA = 'JOB_SAGA__';

// 공고 리스트 조회
export const GET_JOB_LIST_ASYNC = `${JOB_SAGA}GET_JOB_LIST_ASYNC`;
export const GET_JOB_LIST_SUCCESSFUL = `${JOB_SAGA}GET_JOB_LIST_SUCCESSFUL`;
export const GET_JOB_LIST_FAILURE = `${JOB_SAGA}GET_JOB_LIST_FAILURE`;
// 공고 리스트 다음 페이지 조회
export const GET_JOB_LIST_NEXT_ASYNC = `${JOB_SAGA}GET_JOB_LIST_NEXT_ASYNC`;
export const GET_JOB_LIST_NEXT_SUCCESSFUL = `${JOB_SAGA}GET_JOB_LIST_NEXT_SUCCESSFUL`;
export const GET_JOB_LIST_NEXT_FAILURE = `${JOB_SAGA}GET_JOB_LIST_NEXT_FAILURE`;
// 공고 필터 정보 조회
export const GET_JOB_FILTERS_ASYNC = `${JOB_SAGA}GET_JOB_FILTERS_ASYNC`;
export const GET_JOB_FILTERS_SUCCESSFUL = `${JOB_SAGA}GET_JOB_FILTERS_SUCCESSFUL`;
export const GET_JOB_FILTERS_FAILURE = `${JOB_SAGA}GET_JOB_FILTERS_FAILURE`;

/**
 * Saga Actions
 */
// 회원 목록 가져오기
export const fetchJobList = createAction(GET_JOB_LIST_ASYNC);
export const fetchNextJobList = createAction(GET_JOB_LIST_NEXT_ASYNC);
export const fetchJobFilters = createAction(GET_JOB_FILTERS_ASYNC);

/**
 * 공고 리스트 조회
 */
function* jobListSagaAction(action: any) {
  const params : IJobFilterParams = action.payload;
  yield jobListSaga(params, GET_JOB_LIST_SUCCESSFUL, GET_JOB_LIST_FAILURE);
}

/**
 * 공고 리스트 추가 조회
 */
function* nextJobListSagaAction(action: any) {
  const params : IJobFilterParams = action.payload;
  yield jobListSaga(params, GET_JOB_LIST_NEXT_SUCCESSFUL, GET_JOB_LIST_NEXT_FAILURE);
}

function* jobListSaga(params: IJobFilterParams, successfully: string, failure: string) {
  var newParams = new URLSearchParams();
  newParams.append('country', params.country);
  newParams.append('tag_type_id', String(params.tag_type_id));
  newParams.append('job_sort', params.job_sort);
  newParams.append('year', String(params.year));
  if(params.offset && typeof params.offset !== 'undefined') {
    newParams.append('offset', String(params.offset));
  }
  if(params.limit && typeof params.limit !== 'undefined') {
    newParams.append('limit', String(params.limit));
  }
  if(Array.isArray(params.locations)) {
    params.locations.forEach((item:any) => { newParams.append("locations", item); })
  } else {
    newParams.append("locations", params.locations);
  }
 

  const requestConfig: AxiosRequestConfig ={
    method: 'GET',
    url: `${JOBS}`,
    params: newParams
  };

  try {
    const { data } = yield call(axiosInstance.request, requestConfig);

    console.log(data);

    yield put({type: successfully, payload: {
      data: data.data,
      next: data.links.next && queryString.parse(data.links.next.split(JOBS)[1]),
      prev: data.links.prev && queryString.parse(data.links.prev)
    }});
  } catch (error) {
    yield put({type: failure, payload: error});
  }

}

const classifyUsingFilter = ({countries, job_sort, years} : IFilterParams, search: string) => {
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
  return classifySelectedFilter({countries, job_sort, years});
};


/**
 * 공고 필터 정보 조회
 */
function* jobFiltersSaga() {
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
      years
    }, search)

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
      locations: locations.map((item:any) => item.key)
    }

    yield jobListSaga(jobListParams, GET_JOB_LIST_SUCCESSFUL, GET_JOB_LIST_FAILURE)
  } catch (error) {
    console.log(error);
    yield put({type: GET_JOB_FILTERS_FAILURE, payload: error});
  }
}

export default [
  takeEvery(GET_JOB_LIST_ASYNC, jobListSagaAction),
  takeEvery(GET_JOB_LIST_NEXT_ASYNC, nextJobListSagaAction),
  takeEvery(GET_JOB_FILTERS_ASYNC, jobFiltersSaga),
];
