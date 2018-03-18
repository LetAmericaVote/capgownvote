import React from 'react';
import BaseWrapper from './BaseWrapper';
import { states } from '../helpers';
import {
  setStateEligibilityConfirmation,
  getStateEligibilityRequirements,
} from '../actions';
import {
  RulesLayout, RuleItem, WhiteButton,
} from '../blocks';
import {
  selectStateEligibilityRulesFromAnySource,
  selectStateIsEligible, selectFormHomeState,
} from '../selectors';

const Rules = (props) => {
  const {
    setStateEligibilityConfirmation, rules,
    stateCode, isEligible, 
  } = props;

  const stateConfig = states.find(state => state.code === stateCode);
  const hasOvr = stateConfig.hasOvr;
  if (! hasOvr) {
    // TODO: Tell the user we don't support that state :/
    return (
      <p>Ruh roh</p>
    );
  }

  if (! rules) {
    // TODO: Handle API request / error
    getStateEligibilityRequirements(stateCode);
  }

  const onClick = () => {
    setStateEligibilityConfirmation(stateCode, true);
  };

  // TODO: Should we have a not-eligible button? What's the CTA?

  return (
    <RulesLayout>
      {rules.map(rule => <RuleItem key={rule}>- {rule}</RuleItem>)}
      {isEligible ? null : (
        <WhiteButton
          topSpacing
          onClick={onClick}
        >I'm eligible to register</WhiteButton>
      )}
    </RulesLayout>
  );
};

Rules.mapStateToProps = (state) => ({
  rules: selectStateEligibilityRulesFromAnySource(state),
  stateCode: selectFormHomeState(state),
  isEligible: selectStateIsEligible(selectFormHomeState(state), state),
});

Rules.actionCreators = {
  setStateEligibilityConfirmation
};

export default BaseWrapper(Rules);
