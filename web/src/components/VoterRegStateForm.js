import React from 'react';
import BaseWrapper from './BaseWrapper';
import VoterRegFormBuilder from './VoterRegFormBuilder';
import EmailSubscriptionInput from './EmailSubscriptionInput';
import {
  selectStateRegistrationFields,
  selectAuthenticatedUserStateCode,
} from '../selectors';

const VoterRegStateForm = (props) => (
  <div>
    <VoterRegFormBuilder fields={props.stateFields} />
    <EmailSubscriptionInput />
  </div>
);

VoterRegStateForm.mapStateToProps = (state) => ({
  stateFields: selectStateRegistrationFields(
    selectAuthenticatedUserStateCode(state), state
  ),
});

export default BaseWrapper(VoterRegStateForm);
