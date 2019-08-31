import { createAction, handleActions } from 'redux-actions';

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

const initialState = {

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

export default handleActions({

}, initialState);
