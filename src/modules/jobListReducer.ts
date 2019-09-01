import { createAction, handleActions } from 'redux-actions';
import { GET_JOB_LIST_SUCCESSFUL, GET_JOB_LIST_FAILURE } from 'sagas/jobSagaModules';
import { IJob } from 'modules/IJob'
/**
 * Action Types
 */
const APP = 'JOB_LIST__';
// 필터 사용 여부

/**
 * Actions
 */

/**
 * Reducer
 */

interface State {
  jobList: IJob[];
  links: object;
}

const initialState: State = {
  jobList: [],
  links: {}
};

const arrayToObject = (array: any) => {
  const newObj: any = {};

  array.forEach((item: { key: string | number; }) => {
    newObj[item.key] = {
      ...item
    }
  });

  return newObj
}

export default handleActions<State, any>({
  // Job List
  [GET_JOB_LIST_SUCCESSFUL]: (state, action) => {
    const { data, links } = action.payload;

    return {
      ...state,
      jobList: data,
      links: links
    }
  },
  [GET_JOB_LIST_FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error);

    return {
      ...state,
      jobs: [],
      links: {}
    }
  }
}, initialState);
