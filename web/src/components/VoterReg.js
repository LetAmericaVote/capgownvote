import React from 'react';
import VoterRegStandardForm from './VoterRegStandardForm';
import VoterRegStateForm from './VoterRegStateForm';
import VoterRegSubmit from './VoterRegSubmit';
import BaseWrapper from './BaseWrapper';
import { makeStateRequestId } from '../helpers';
import {
  getStandardRegistrationFields, getStateRegistrationFields,
  GET_STANDARD_REGISTRATION_FIELDS, GET_STATE_REGISTRATION_FIELDS,
} from '../actions';
import {
  selectApiRequest, selectFormHomeState,
  selectHasStandardRegistrationFields, selectHasStateRegistrationFields,
} from '../selectors';

const VoterReg = (props) => {
  const {
    hasStandardRegistrationFields, hasStateRegistrationFields,
    getStandardRegistrationFields, getStateRegistrationFields,
    standardRegistrationFieldsRequest, stateRegistrationFieldsRequest,
    stateCode,
  } = props;

  if (! hasStandardRegistrationFields && ! standardRegistrationFieldsRequest) {
    getStandardRegistrationFields();
  }

  if (! hasStateRegistrationFields && ! stateRegistrationFieldsRequest) {
    getStateRegistrationFields(stateCode);
  }

  const StandardFields = () => (
    <div>
      { ! standardRegistrationFieldsRequest || standardRegistrationFieldsRequest.isPending ? (
        // TODO
        null
      ) : null }
      { standardRegistrationFieldsRequest && standardRegistrationFieldsRequest.hasSucceeded ? (
        <VoterRegStandardForm />
      ) : null }
      { standardRegistrationFieldsRequest && standardRegistrationFieldsRequest.hasFailed ? (
        // TODO
        null
      ) : null }
    </div>
  );

  const StateFields = () => (
    <div>
      { ! stateRegistrationFieldsRequest || stateRegistrationFieldsRequest.isPending ? (
        // TODO
        null
      ) : null }
      { stateRegistrationFieldsRequest && stateRegistrationFieldsRequest.hasSucceeded ? (
        <VoterRegStateForm />
      ) : null }
      { stateRegistrationFieldsRequest && stateRegistrationFieldsRequest.hasFailed ? (
        // TODO
        null
      ) : null }
    </div>
  );

  const showSubmissionBar =
    (stateRegistrationFieldsRequest && stateRegistrationFieldsRequest.hasSucceeded) &&
    (standardRegistrationFieldsRequest && standardRegistrationFieldsRequest.hasSucceeded);

  return (
    <div>
      <StandardFields />
      <StateFields />
      { showSubmissionBar ? <VoterRegSubmit /> : null }
    </div>
  );
};

VoterReg.mapStateToProps = (state) => ({
  stateCode: selectFormHomeState(state),
  hasStandardRegistrationFields: selectHasStandardRegistrationFields(state),
  hasStateRegistrationFields: selectHasStateRegistrationFields(selectFormHomeState(state), state),
  standardRegistrationFieldsRequest: selectApiRequest(GET_STANDARD_REGISTRATION_FIELDS, state),
  stateRegistrationFieldsRequest: selectApiRequest(
    makeStateRequestId(GET_STATE_REGISTRATION_FIELDS, selectFormHomeState(state)), state
  ),
});

VoterReg.mapDispatchToProps = (dispatch) => ({
  getStandardRegistrationFields: () => dispatch(getStandardRegistrationFields()),
  getStateRegistrationFields: stateCode => dispatch(getStateRegistrationFields(stateCode)),
});

export default BaseWrapper(VoterReg);
