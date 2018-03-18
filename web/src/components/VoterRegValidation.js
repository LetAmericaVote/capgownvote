import React from 'react';
import BaseWrapper from './BaseWrapper';
import { ErrorText } from '../legacyBlocks';
import { selectValidationError } from '../selectors';

const VoterRegValidation = (props) => {
  const { validationError } = props;

  if (! validationError) {
    return null;
  }

  return (
    <ErrorText>{ validationError }</ErrorText>
  );
};

VoterRegValidation.mapStateToProps = (state, ownProps) => ({
  validationError: selectValidationError(ownProps.rtvKey, state),
});

export default BaseWrapper(VoterRegValidation);
