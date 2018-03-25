import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import { selectAuthenticatedUserOvrLink } from '../selectors';
import {
  FlexColumnLayout, ContentParagraph,
} from '../blocks';

const OvrRedirect = (props) => {
  const { ovrLink } = props;

  return (
    <FlexColumnLayout>
      <ContentParagraph>Because your state has online voter registration and you have state ID, you can complete your registration on the state website.</ContentParagraph>
      <ContentParagraph>You can also opt-in to recieve messages from Let America Vote to help protect voting rights in your community.</ContentParagraph>
      <TextSubscribeForm
        ctaCopy="Complete Voter Registration Form"
        ctaLink={ovrLink}
      />
    </FlexColumnLayout>
  );
};

OvrRedirect.mapStateToProps = (state) => ({
  ovrLink: selectAuthenticatedUserOvrLink(state),
});

export default BaseWrapper(OvrRedirect);
