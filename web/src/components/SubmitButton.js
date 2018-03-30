import React from 'react';
import BaseWrapper from './BaseWrapper';
import { WhiteButton } from '../blocks';
import { selectApiRequestIsPending } from '../selectors';

const SubmitButton = (props) => {
  const { onClick, ctaCopy, isPending } = props;

  return (
    <WhiteButton disabled={isPending} onClick={onClick}>{ctaCopy}</WhiteButton>
  );
};

SubmitButton.mapStateToProps = (state, ownProps) => ({
  isPending: selectApiRequestIsPending(ownProps.requestId, state),
});

export default BaseWrapper(SubmitButton);
