import { getFromApi, postToApi } from './api';
import { storeUserData } from './user';
import { makeStateRequestId } from '../helpers';
import {
  selectForm,
  selectAuthenticatedUserStateCode,
  selectAllRegistrationFields,
} from '../selectors';

export const SET_STANDARD_REGISTRATION_FIELDS = 'SET_STANDARD_REGISTRATION_FIELDS';
export function setStandardRegistrationFields(fields) {
  return { type: SET_STANDARD_REGISTRATION_FIELDS, fields };
}

export const SET_STATE_REGISTRATION_FIELDS = 'SET_STATE_REGISTRATION_FIELDS';
export function setStateRegistrationFields(state, fields) {
  return { type: SET_STATE_REGISTRATION_FIELDS, state, fields };
}

export const GET_STANDARD_REGISTRATION_FIELDS = 'GET_STANDARD_REGISTRATION_FIELDS';
export function getStandardRegistrationFields() {
  return (dispatch) => {
    dispatch(getFromApi(GET_STANDARD_REGISTRATION_FIELDS, '/v1/rtv/fields'))
      .then(res => {
        if (res.data) {
          dispatch(setStandardRegistrationFields(res.data));
        }
      });
  };
}

export const GET_STATE_REGISTRATION_FIELDS = 'GET_STATE_REGISTRATION_FIELDS';
export function getStateRegistrationFields(state) {
  return (dispatch, getState) => {
    const requestedState = state || selectAuthenticatedUserStateCode(getState());
    const requestId = makeStateRequestId(GET_STATE_REGISTRATION_FIELDS, requestedState);
    const endpoint = `/v1/rtv/fields/${requestedState}`;

    dispatch(getFromApi(requestId, endpoint))
      .then(res => {
        if (res && res.data) {
          dispatch(setStateRegistrationFields(requestedState, res.data));
        }
      });
  };
}

export const POST_USER_REGISTRATION_FORM = 'POST_USER_REGISTRATION_FORM';
export function postUserRegistrationForm() {
  return (dispatch, getState) => {
    const form = selectForm(getState());
    const fields = selectAllRegistrationFields(getState());

    const payload = fields.reduce((acc, { rtvKey }) => {
      acc[rtvKey] = form[rtvKey];
      return acc;
    }, {});

    dispatch(postToApi(POST_USER_REGISTRATION_FORM, '/v1/rtv/register', payload))
      .then(res => {
        if (res && res.data) {
          dispatch(storeUserData(res.data));
        }
      });
  };
}
