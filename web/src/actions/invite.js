import { postToApi } from './api';
import { selectSchoolInputValue, selectInviteFields } from '../selectors';

export const SET_INVITE_SCHOOL_STATE = 'SET_INVITE_SCHOOL_STATE';
export function setInviteSchoolState(stateCode) {
  return { type: SET_INVITE_SCHOOL_STATE, stateCode };
}

export const SET_INVITE_FIRST_NAME = 'SET_INVITE_FIRST_NAME';
export function setInviteFirstName(firstName) {
  return { type: SET_INVITE_FIRST_NAME, firstName };
}

export const SET_INVITE_EMAIL = 'SET_INVITE_EMAIL';
export function setInviteEmail(email) {
  return { type: SET_INVITE_EMAIL, email };
}

export const COMPLETED_INVITE = 'COMPLETED_INVITE';
export function completedInvite(status) {
  return { type: COMPLETED_INVITE, status };
}

export const POST_INVITE = 'POST_INVITE';
export function postInvite() {
  return (dispatch, getState) => {
    dispatch(postToApi(
      POST_INVITE,
      '/v1/invites',
      {
        name: selectSchoolInputValue(getState()),
        ...selectInviteFields(getState()),
      }
    )).then(res => {
      if (res && res.data) {
        dispatch(completedInvite(true));
      }
    });
  };
}
