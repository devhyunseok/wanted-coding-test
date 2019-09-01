import { createAction, handleActions } from 'redux-actions';
import { GET_JOB_FILTERS_SUCCESSFUL, GET_JOB_FILTERS_FAILURE } from 'sagas/jobSagaModules';
import { classifySelectedFilter } from 'modules/jobFilterUtils';

/** 
 * Action Types
 */
const JOB_FILTER = 'JOB_FILTER__';
const SET_FILTER_USED = `${JOB_FILTER}SET_FILTER_USED`;
const SELECT_JOB_SORT = `${JOB_FILTER}SELECT_JOB_SORT`;
const SELECT_COUNTRY = `${JOB_FILTER}SELECT_COUNTRY`;
const SELECT_YEAR = `${JOB_FILTER}SELECT_YEAR`;
const SELECT_LOCATION = `${JOB_FILTER}SELECT_LOCATION`;
const RESET_JOB_FILTER = `${JOB_FILTER}RESET_JOB_FILTER`;

/**
 * Actions
 */
export const setFilterUsed = createAction(SET_FILTER_USED);
export const selectJobSort = createAction(SELECT_JOB_SORT);
export const selectCountry = createAction(SELECT_COUNTRY);
export const selectYear = createAction(SELECT_YEAR);
export const selectLocation = createAction(SELECT_LOCATION);
export const resetJobFilter = createAction(RESET_JOB_FILTER);

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
  jobSort: JobSort[];
  years:  object[];
  selectedCountry: object,
  selectedSortKey: string,
  selectedYearKey: string,
  selectedLocations: object[],
  isUsingFilter: boolean;
}

const initialState: State = {
  countries: [],
  jobSort: [],
  years: [],
  selectedCountry: {},
  selectedSortKey: '',
  selectedYearKey: '',
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
    const key = action.payload;

    console.log(key);

    return {
      ...state,
      selectedSortKey: key
    }
  },
  // 필터 > 국가 값 변경
  [SELECT_COUNTRY]: (state, action) => {
    const selectedCountry = action.payload;

    return {
      ...state,
      selectedCountry,
      selectedLocations : [...selectedCountry.locations.filter((item:any) => item.key === 'all')]
    }
  },
  // 필터 > 경력 선택
  [SELECT_YEAR]: (state, action) => {
    const key = action.payload;

    return {
      ...state,
      selectedYearKey: key
    }
  },
  // 필터 > 지역 선택
  [SELECT_LOCATION]: (state, action) => {
    const selectedLocation = action.payload;

    if(selectedLocation.key === 'all') {
      return {
        ...state,
        selectedLocations : [selectedLocation]
      }
    }

    if(state.selectedLocations.includes(selectedLocation)){
      return {
        ...state,
        selectedLocations : state.selectedLocations.filter((item:any) => {
          return item.key !== selectedLocation.key;
        }
      )}
    }

    return {
      ...state,
      selectedLocations : [...state.selectedLocations, selectedLocation].filter((item: any) => {
        return item.key !== 'all';
      })
    }
  },
  [GET_JOB_FILTERS_SUCCESSFUL]: (state, action) => {
    const {
      countries, job_sort, years, country, jobSort, year, locations
    } = action.payload;

    return {
      ...state,
      countries, 
      jobSort: job_sort, 
      years,
      selectedCountry: country,
      selectedSortKey: jobSort.key,
      selectedYearKey: year.key,
      selectedLocations: locations
    }
  },
  [GET_JOB_FILTERS_FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error);

    return {
      ...state,
      countries: [],
      jobSort: [], 
      years: [],
      selectedCountry: {},
      selectedSortKey: '',
      selectedYearKey: '',
      selectedLocations: []
    }
  },
  // 필터 > 초기화
  [RESET_JOB_FILTER]: (state, action) => {
    const { 
      country, jobSort, year, locations
    } = classifySelectedFilter({ countries: state.countries, job_sort: state.jobSort, years: state.years })

    return {
      ...state,
      selectedCountry: country,
      selectedSortKey: jobSort.key,
      selectedYearKey: year.key,
      selectedLocations: locations
    }
  },
}, initialState);
