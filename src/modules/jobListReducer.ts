/*
 * HyunSeok Kim
 * 2019.05.02
 * Last Modify: 2019.05.02 HyunSeok Kim
 * @copyright © 2019, NHN godo: Corp.
 */

import { createAction, handleActions } from 'redux-actions';
/**
 * Action Types
 */
const APP = 'APPLICATION__';
// 메뉴 접근 시, 미리보기 앱 권한 체크
export const UNAUTH_USER = `${APP}UNAUTH_USER`;
export const AUTH_USER = `${APP}AUTH_USER`;
// 좌측 메뉴
const OPEN_NAVIGATION_MENU = `${APP}OPEN_NAVIGATION_MENU`;
const CLOSE_NAVIGATION_MENU = `${APP}CLOSE_NAVIGATION_MENU`;

/**
 * Actions
 */
export const actions = {
  unAuthUser: createAction(UNAUTH_USER),
};

/**
 * Reducer
 */
const initialState = {
  isForbidden: false
};

export default handleActions({
  [UNAUTH_USER]: (state, action) => {
    return {
      ...state,
      isForbidden: true
    }
  },
}, initialState);
