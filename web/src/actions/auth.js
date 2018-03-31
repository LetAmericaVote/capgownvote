import { postToApi } from './api';
import { storeUserData } from './user';
import { setRoutingPathName } from './routing';
import { changeCurrentStep } from './step';
import { selectPreviousRoute } from '../selectors';
import { CREATE_USER_STEP } from '../stepNames';

export const SET_AUTH_ID = 'SET_AUTH_ID';
export function setAuthId(id) {
  return { type: SET_AUTH_ID, id };
}

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export function setAuthToken(token) {
  return { type: SET_AUTH_TOKEN, token };
}

export const SET_AUTH_TOKEN_EXPIRATION = 'SET_AUTH_TOKEN_EXPIRATION';
export function setAuthTokenExpiration(expiration) {
  return { type: SET_AUTH_TOKEN_EXPIRATION, expiration };
}

export const SET_IS_PUBLIC_COMPUTER = 'SET_IS_PUBLIC_COMPUTER';
export function setIsPublicComputer(isPublicComputer) {
  return { type: SET_IS_PUBLIC_COMPUTER, isPublicComputer };
}

export const LOGIN = 'LOGIN';
export function login(email, password) {
  return (dispatch, getState) => {
    dispatch(postToApi(LOGIN, '/v1/auth/login', { email, password }))
      .then((res) => {
        if (res && res.data) {
          dispatch(setAuthId(res.data.user.id));
          dispatch(setAuthToken(res.data.token));
          dispatch(setAuthTokenExpiration(res.data.user.tokenExpiration));
          dispatch(storeUserData(res.data.user));

          const previousRoute = selectPreviousRoute(getState());
          if (previousRoute && previousRoute.length) {
            dispatch(setRoutingPathName(previousRoute));
            window.history.replaceState({}, document.title, previousRoute);
          }
        }
      });
  };
}

export const CLEAR_AUTH = 'CLEAR_AUTH';
export function clearAuth() {
  return { type: CLEAR_AUTH };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return (dispatch) => {
    dispatch(postToApi(LOGOUT, '/v1/auth/logout'))
      .then(() => {
        dispatch({ type: LOGOUT });
        dispatch(changeCurrentStep(CREATE_USER_STEP, false));
      });
  }
}
