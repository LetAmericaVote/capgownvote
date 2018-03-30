import React from 'react';
import BaseWrapper from './BaseWrapper';
import SubmitButton from './SubmitButton';
import { ErrorMessage } from '../blocks';
import {
  postUserRegistrationForm,
  POST_USER_REGISTRATION_FORM,
} from '../actions';
import {
  selectValidationErrors, selectAllRegistrationFields,
} from '../selectors';

const VoterRegSubmit = (props) => {
  const {
    registrationFields, validationErrors,
    postUserRegistrationForm,
  } = props;

  const failedValidationKeys = Object
    .keys(validationErrors)
    .filter(key => typeof validationErrors[key] === 'string');

  const failedValidationTitles = failedValidationKeys
    .map(rtvKey => {
      const { title } = registrationFields.find(field => field.rtvKey === rtvKey);

      return `"${title}"`;
    });

  const hasErrors = !! failedValidationKeys.length;
  const singularError = failedValidationKeys.length === 1;
  const errorMessage = `This form ${singularError ? 'has an error' : 'has errors'}, check the following fields, ${failedValidationTitles.join(', ')}.`;

  const onSubmit = () => {
    if (hasErrors) {
      return;
    }

    postUserRegistrationForm();
  };

  if (hasErrors) {
    return (
      <ErrorMessage>{errorMessage}</ErrorMessage>
    );
  }

  return (
    <SubmitButton
      onClick={onSubmit}
      ctaCopy="Register To Vote"
      requestId={POST_USER_REGISTRATION_FORM}
    />
  );
};

VoterRegSubmit.mapStateToProps = (state) => ({
  validationErrors: selectValidationErrors(state),
  registrationFields: selectAllRegistrationFields(state),
});

VoterRegSubmit.actionCreators = {
  postUserRegistrationForm,
};

export default BaseWrapper(VoterRegSubmit);
