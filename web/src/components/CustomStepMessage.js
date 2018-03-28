import React from 'react';
import BaseWrapper from './BaseWrapper';
import { ContentParagraph } from '../blocks';
import {
  selectAuthenticatedUserCustomRegistrationMessage
} from '../selectors';

const CustomStepMessage = (props) => {
  const { customRegistrationMessage } = props;

  return (
    <ContentParagraph>{customRegistrationMessage}</ContentParagraph>
  );
};

CustomStepMessage.mapStateToProps = (state) => ({
  customRegistrationMessage: selectAuthenticatedUserCustomRegistrationMessage(state),
});

export default BaseWrapper(CustomStepMessage);
