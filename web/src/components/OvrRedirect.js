import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import {
  selectAuthenticatedUserOvrLink,
  selectAuthenticatedUserOvrRequiresLicense,
 } from '../selectors';
import {
  FlexColumnLayout, ContentParagraph,
} from '../blocks';

const OvrRedirect = (props) => {
  const { ovrLink, ovrRequiresLicense } = props;

  const copy = ovrRequiresLicense ? `Your state has online voter registration and because you have state identification you can complete your registration on the state website.` : `Your state has online voter registration and you can complete your registration on the state website.`;

  return (
    <FlexColumnLayout>
      <ContentParagraph>{copy}</ContentParagraph>
      <ContentParagraph>You can also opt-in to recieve messages from Let America Vote to help protect voting rights in your community.</ContentParagraph>
      <TextSubscribeForm
        staticCtaCopy="Complete Voter Registration Form"
        ctaLink={ovrLink}
      />
    </FlexColumnLayout>
  );
};

OvrRedirect.mapStateToProps = (state) => ({
  ovrLink: selectAuthenticatedUserOvrLink(state),
  ovrRequiresLicense: selectAuthenticatedUserOvrRequiresLicense(state),
});

export default BaseWrapper(OvrRedirect);
