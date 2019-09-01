import { handleActions } from 'redux-actions';
import { GET_JOB_LIST_SUCCESSFUL, GET_JOB_LIST_FAILURE, GET_JOB_LIST_NEXT_SUCCESSFUL, GET_JOB_LIST_NEXT_FAILURE } from 'sagas/jobSagaModules';
import { IJob } from 'dataStructure/IJob'

interface State {
  jobList: IJob[];
  next: object,
  prev: object
}

const initialState: State = {
  jobList: [],
  next: {},
  prev: {}
};

export default handleActions<State, any>({
  // Job List
  [GET_JOB_LIST_SUCCESSFUL]: (state, action) => {
    const { data, next, prev } = action.payload;

    return {
      ...state,
      jobList: data,
      next: next,
      prev: prev
    }
  },
  [GET_JOB_LIST_FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error);

    return {
      ...state,
      jobs: [],
      next: {},
      prev: {}
    }
  },
  // 추가 회사 목록 가져오기
  [GET_JOB_LIST_NEXT_SUCCESSFUL]: (state, action) => {
    const { data, next, prev } = action.payload;

    return {
      ...state,
      jobList: [
        ...state.jobList,
        ...data,
      ],
      next: next,
      prev: prev
    }
  },
  [GET_JOB_LIST_NEXT_FAILURE]: (state, action) => {
    const { error } = action.payload;
    console.log(error);

    return {
      ...state,
      jobs: [],
      next: {},
      prev: {}
    }
  }
}, initialState);
