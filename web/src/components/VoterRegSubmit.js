import React from 'react';
import BaseWrapper from './BaseWrapper';
import { WhiteButton, ErrorMessage } from '../blocks';
import { postUserRegistrationForm } from '../actions';
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
  const errorMessage = `This form ${singularError ? 'has an error' : 'has errors'}. Check ${failedValidationTitles.join(', ')}.`;

  const onSubmit = () => {
    if (hasErrors) {
      return;
    }

    postUserRegistrationForm();
  };

  // TODO:
  //  - Show submission status

  if (hasErrors) {
    return (
      <ErrorMessage>{errorMessage}</ErrorMessage>
    );
  }

  return (
    <WhiteButton onClick={onSubmit}>Register To Vote</WhiteButton>
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
