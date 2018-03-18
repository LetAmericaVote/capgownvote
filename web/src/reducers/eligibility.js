import createReducer from './createReducer';
import {
  SET_STATE_ELIGIBILITY_CONFIRMATION, SET_STATE_ELIGIBILITY_RULES,
} from '../actions';

const eligibilityBlankSlate = () => ({
  isEligible: false,
  rules: [],
});

const eligibility = createReducer('eligibility', {
  [SET_STATE_ELIGIBILITY_RULES]: (reduxState, action) => {
    const { state, rules } = action;
    const eligibilityState = reduxState[state] || eligibilityBlankSlate();

    return {
      ...reduxState,
      [state]: {
        ...eligibilityState,
        rules,
      },
    };
  },
  [SET_STATE_ELIGIBILITY_CONFIRMATION]: (reduxState, action) => {
    const { state, isEligible } = action;
    const eligibilityState = reduxState[state] || eligibilityBlankSlate();

    return {
      ...reduxState,
      [state]: {
        ...eligibilityState,
        isEligible,
      },
    };
  },
});

export default eligibility;
