import { postToApi } from './api';
import { storeUserData } from './user';
import { pushSchoolData } from './school';
import {
  selectFormValue, selectAuthenticatedUser,
} from '../selectors';
import {
  SCHOOL_INVITE_NAME, SCHOOL_INVITE_STATE_CODE,
  SCHOOL_INVITE_CITY, SCHOOL_INVITE_ZIPCODE,
} from '../formKeys';

export const SET_REQUIRES_INVITE = 'SET_REQUIRES_INVITE';
export function setRequiresInvite(requiresInvite) {
  return { type: SET_REQUIRES_INVITE, requiresInvite };
}

export const POST_INVITE = 'POST_INVITE';
export function postInvite() {
  return (dispatch, getState) => {
    const payload = {
      name: selectFormValue(SCHOOL_INVITE_NAME, null, getState()),
      city: selectFormValue(SCHOOL_INVITE_CITY, null, getState()),
      stateCode: selectFormValue(SCHOOL_INVITE_STATE_CODE, null, getState()),
      zipcode: selectFormValue(SCHOOL_INVITE_ZIPCODE, null, getState()),
    };

    const user = selectAuthenticatedUser(getState());

    dispatch(postToApi(POST_INVITE, '/v1/invites', payload))
      .then(res => {
        if (res && res.data) {
          dispatch(storeUserData({ ...user, school: res.data.id }));
          dispatch(pushSchoolData(res.data));
        }
      });
  };
}
