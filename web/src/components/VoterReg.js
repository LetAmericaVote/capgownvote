import React from 'react';
import VoterRegStandardForm from './VoterRegStandardForm';
import VoterRegStateForm from './VoterRegStateForm';
import VoterRegSubmit from './VoterRegSubmit';
import BaseWrapper from './BaseWrapper';
import { makeStateRequestId } from '../helpers';
import { ContentParagraph } from '../blocks';
import {
  getStandardRegistrationFields, getStateRegistrationFields,
  GET_STANDARD_REGISTRATION_FIELDS, GET_STATE_REGISTRATION_FIELDS,
  POST_USER_REGISTRATION_FORM,
} from '../actions';
import {
  selectApiRequest,
  selectHasStandardRegistrationFields,
  selectHasStateRegistrationFields,
  selectAuthenticatedUserStateCode,
} from '../selectors';

const VoterReg = (props) => {
  const {
    hasStandardRegistrationFields, hasStateRegistrationFields,
    getStandardRegistrationFields, getStateRegistrationFields,
    standardRegistrationFieldsRequest, stateRegistrationFieldsRequest,
    postRegistrationRequest, stateCode,
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
      { postRegistrationRequest && postRegistrationRequest.isPending ? (
        <ContentParagraph>Processing your request will take a moment.</ContentParagraph>
      ) : null}
    </div>
  );
};

VoterReg.mapStateToProps = (state) => ({
  stateCode: selectAuthenticatedUserStateCode(state),
  hasStandardRegistrationFields: selectHasStandardRegistrationFields(state),
  hasStateRegistrationFields: selectHasStateRegistrationFields(
    selectAuthenticatedUserStateCode(state), state
  ),
  standardRegistrationFieldsRequest: selectApiRequest(GET_STANDARD_REGISTRATION_FIELDS, state),
  stateRegistrationFieldsRequest: selectApiRequest(
    makeStateRequestId(
      GET_STATE_REGISTRATION_FIELDS, selectAuthenticatedUserStateCode(state)
    ), state
  ),
  postRegistrationRequest: selectApiRequest(POST_USER_REGISTRATION_FORM, state),
});

VoterReg.mapDispatchToProps = (dispatch) => ({
  getStandardRegistrationFields: () => dispatch(getStandardRegistrationFields()),
  getStateRegistrationFields: stateCode => dispatch(getStateRegistrationFields(stateCode)),
});

export default BaseWrapper(VoterReg);
