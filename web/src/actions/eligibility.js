import { getFromApi } from './api';
import { makeStateRequestId, HOME_STATE_RTV_KEY } from '../helpers';
import { selectFormValue } from '../selectors';

export const SET_STATE_ELIGIBILITY_CONFIRMATION = 'SET_STATE_ELIGIBILITY_CONFIRMATION';
export function setStateEligibilityConfirmation(state, isEligible) {
  return { type: SET_STATE_ELIGIBILITY_CONFIRMATION, state, isEligible };
}

export const SET_STATE_ELIGIBILITY_RULES = 'SET_STATE_ELIGIBILITY_RULES';
export function setStateEligibilityRules(state, rules) {
  return { type: SET_STATE_ELIGIBILITY_RULES, state, rules };
}

export const GET_STATE_ELIGIBILITY_REQUIREMENTS = 'GET_STATE_ELIGIBILITY_REQUIREMENTS';
export function getStateEligibilityRequirements() {
  return (dispatch, getState) => {
    const requestedState = selectFormValue(HOME_STATE_RTV_KEY, null, getState());
    const requestId = makeStateRequestId(GET_STATE_ELIGIBILITY_REQUIREMENTS, requestedState);
    const endpoint = `/v1/registration/eligibility/${requestedState}`;

    dispatch(getFromApi(requestId, endpoint))
      .then(res => {
        if (res.data && res.data.rules) {
          dispatch(setStateEligibilityRules(requestedState, res.data.rules));
        }
      });
  };
}
