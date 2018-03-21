import React from 'react';
import BaseWrapper from './BaseWrapper';
import { updateUserProfile } from '../actions';
import {
  RulesLayout, RuleItem, SpacedInputGroupLayout,
  CheckboxLayout, CheckboxInput, CheckboxTitle,
  CheckboxTitleLayout,
} from '../blocks';
import {
  selectAuthenticatedUserIsEligible,
  selectAuthenticatedUserRules,
  selectAuthId,
} from '../selectors';

const eligibleCopy = `I'm eligible to register.`;
const notEligibleCopy= `I'm not eligible to register.`;

const Rules = (props) => {
  const { authId, rules, isEligible, updateUserProfile } = props;

  return (
    <RulesLayout>
      {rules.map(rule => <RuleItem key={rule}>- {rule}</RuleItem>)}
      <SpacedInputGroupLayout>
        <CheckboxLayout spacing>
          <CheckboxInput
            checked={isEligible === true}
            onClick={() => updateUserProfile(authId, { isEligible: true })}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>{eligibleCopy}</CheckboxTitle>
          </CheckboxTitleLayout>
        </CheckboxLayout>
        <CheckboxLayout>
          <CheckboxInput
            checked={isEligible === false}
            onClick={() => updateUserProfile(authId, { isEligible: false })}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>{notEligibleCopy}</CheckboxTitle>
          </CheckboxTitleLayout>
        </CheckboxLayout>
      </SpacedInputGroupLayout>
    </RulesLayout>
  );
};

Rules.mapStateToProps = (state) => ({
  authId: selectAuthId(state),
  rules: selectAuthenticatedUserRules(state),
  isEligible: selectAuthenticatedUserIsEligible(state),
});

Rules.actionCreators = {
  updateUserProfile,
};

export default BaseWrapper(Rules);
