import { getFromApi, postToApi, putToApi } from './api';
import { setFormValue } from './form';
import { selectAuthId, selectFormValue } from '../selectors';
import { userMap } from '../formKeys';
import {
  setAuthId, setAuthToken,
  setAuthTokenExpiration,
} from './auth';

export const STORE_USER_DATA = 'STORE_USER_DATA';
export function storeUserData(user) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_USER_DATA, user });

    if (user.id === selectAuthId(getState())) {
      Object.keys(userMap).forEach(key => {
        if (selectFormValue(userMap[key], null, getState()) !== user[key]) {
          dispatch(setFormValue(userMap[key], user[key]));
        }
      });
    }
  };
}

export const GET_USER_DATA = 'GET_USER_DATA';
export function getUserData(id) {
  return (dispatch, getState) => {
    const requestId = `${GET_USER_DATA}_${id}`;

    dispatch(getFromApi(requestId, `/v1/user/${id}`))
      .then((res) => {
        if (res && res.data) {
          dispatch(storeUserData(res.data));
        }
      });
  };
}

export const GET_USER_DATA_BY_EMAIL = 'GET_USER_DATA_BY_EMAIL';
export function getUserDataByEmail(email) {
  // TODO...
}

export const CREATE_USER = 'CREATE_USER';
export function createUser(user, setAuthUser = false) {
  return (dispatch, getState) => {
    const requestId = `${CREATE_USER}_${JSON.stringify(user)}`;

    dispatch(postToApi(requestId, `/v1/user`, user))
      .then(res => {
        if (res && res.data) {
          if (setAuthUser) {
            dispatch(setAuthId(res.data.user.id));
            dispatch(setAuthToken(res.data.token));
            dispatch(setAuthTokenExpiration(res.data.user.tokenExpiration));
          }

          dispatch(storeUserData(res.data.user));
        }
      });
  };
}

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export function updateUserProfile(id, profile) {
  return (dispatch, getState) => {
    const requestId = `${UPDATE_USER_PROFILE}_${id}`;

    dispatch(putToApi(requestId, `/v1/user/${id}/profile`, profile))
      .then(res => {
        if (res && res.data) {
          dispatch(storeUserData(res.data));
        }
      });
  };
}

export function updateAuthenticatedUserProfile(profile) {
  return (dispatch, getState) => {
    const id = selectAuthId(getState());
    return dispatch(updateUserProfile(id, profile));
  }
}

export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
export function updateUserEmail(id, email) {
  return (dispatch, getState) => {
    const requestId = `${UPDATE_USER_EMAIL}_${id}`;

    dispatch(putToApi(requestId, `/v1/user/${id}/email`, { email }))
      .then(res => {
        if (res && res.data) {
          dispatch(storeUserData(res.data));
        }
      });
  };
}

export const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE';
export function updateUserRole(id, role) {
  // TODO...
}

export const DELETE_USER = 'DELETE_USER';
export function deleteUser(id) {
  // TODO...
}
