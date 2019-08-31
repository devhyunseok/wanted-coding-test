import { createAction, handleActions } from 'redux-actions';
import { GET_JOB_FILTERS_SUCCESSFUL, GET_JOB_FILTERS_FAILURE } from 'sagas/jobSagaModules';

/**
 * Action Types
 */
const JOB_FILTER = 'JOB_FILTER__';
const SET_FILTER_USED = `${JOB_FILTER}SET_FILTER_USED`;
const SELECT_JOB_SORT = `${JOB_FILTER}SELECT_JOB_SORT`;
const SELECT_COUNTRY = `${JOB_FILTER}SELECT_COUNTRY`;
/**
 * Actions
 */
export const setFilterUsed = createAction(SET_FILTER_USED);
export const selectJobSort = createAction(SELECT_JOB_SORT);
export const selectCountry = createAction(SELECT_COUNTRY);

/**
 * Reducer
 */
interface JobSort {
  key: string;
  selected: boolean;
  display: string;
}

interface State {
  countries : any;
  employeeCount: object[];
  jobSort: JobSort[];
  years:  object[];
  selectedCountry: object,
  selectedJobSort: object,
  selectedYear: object,
  selectedLocations: object[],
  isUsingFilter: boolean;
}

const initialState: State = {
  countries: [],
  employeeCount: [],
  jobSort: [],
  years: [],
  selectedCountry: {},
  selectedJobSort: {},
  selectedYear: {},
  selectedLocations: [],
  isUsingFilter: false,
};

export default handleActions<State, any>({
  // 필터 사용 여부
  [SET_FILTER_USED]: (state, action) => {
    const isFilterUsed = action.payload;

    return {
      ...state,
      isUsingFilter: isFilterUsed
    }
  },
  // 필터 > 정렬 값 변경
  [SELECT_JOB_SORT]: (state, action) => {
    const selectedJobSort = action.payload;

    return {
      ...state,
      selectedJobSort: selectedJobSort
    }
  },
  // 필터 > 국가 값 변경
  [SELECT_COUNTRY]: (state, action) => {
    const selectedCountry = action.payload;

    return {
      ...state,
      selectedCountry: selectedCountry
    }
  },
  [GET_JOB_FILTERS_SUCCESSFUL]: (state, action) => {
    const {
      countries, employee_count, job_sort, years, country, jobSort, year, locations
    } = action.payload;

    return {
      ...state,
      countries, 
      employeeCount: employee_count, 
      jobSort: job_sort, 
      years,
      selectedCountry: country,
      selectedJobSort: jobSort,
      selectedYear: year,
      selectedLocations: locations
    }
  },
  [GET_JOB_FILTERS_FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error.message);

    return {
      ...state,
      countries: [], 
      employeeCount: [], 
      jobSort: [], 
      years: [],
      selectedCountry: {},
      selectedJobSort: {},
      selectedYear: {},
      selectedLocations: []
    }
  }
}, initialState);
