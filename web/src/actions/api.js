import { pushErrorNotification } from './notification';
import { clearAuth } from './auth';
import { GET_USER_DATA } from './user';
import {
  selectApiRequestIsPending,
  selectAuthId, selectAuthToken,
} from '../selectors';

export const API_CALL_PENDING = 'API_CALL_PENDING';
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS';
export const API_CALL_FAILURE = 'API_CALL_FAILURE';

const BASE_URL = process.env.REACT_APP_API_URI;

export function apiCallFailed(requestId, error, statusCode) {
  return (dispatch) => {
    dispatch({ type: API_CALL_FAILURE, requestId, error });

    const errorMessage = error && typeof error === 'string' ? error : 'Whoops, looks like we had an error. Try again?';
    dispatch(pushErrorNotification(errorMessage));
  };
}

export function callApi(requestId, endpoint, options) {
  return (dispatch, getState) => {
    if (selectApiRequestIsPending(requestId, getState())) {
      return new Promise((resolve, reject) => resolve(null));
    }

    dispatch({ type: API_CALL_PENDING, requestId });

    const authId = selectAuthId(getState());
    const authToken = selectAuthToken(getState());

    const requestOptions = { ...(options || {}) };

    if (authId && authToken) {
      if (! requestOptions.headers) {
        requestOptions.headers = new Headers();
      }

      requestOptions.headers.append('lav_auth_id', authId);
      requestOptions.headers.append('lav_auth_token', authToken);
    }

    const url = `${BASE_URL}${endpoint}`;
    return fetch(url, requestOptions)
      .then((res) => {
        return res.json().then((json) => {
          if (res.status === 401 && requestId === `${GET_USER_DATA}_${authId}`) {
            dispatch(clearAuth());
          } else if (res.status !== 200) {
            dispatch(apiCallFailed(requestId, json.error, res.status));
          } else {
            dispatch({ type: API_CALL_SUCCESS, requestId });
          }

          return json;
        });
      })
      .catch(error => dispatch(apiCallFailed(requestId, error)));
  };
}

export function getFromApi(requestId, endpoint) {
  return (dispatch) => {
    return dispatch(callApi(requestId, endpoint));
  };
}

export function postToApi(requestId, endpoint, body) {
  return (dispatch) => {
    return dispatch(callApi(requestId, endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }));
  };
}

export function putToApi(requestId, endpoint, body) {
  return (dispatch) => {
    return dispatch(callApi(requestId, endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }));
  }
}
