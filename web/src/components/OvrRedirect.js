import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import {
  selectAuthenticatedUserOvrLink,
  selectAuthenticatedUserOvrRequiresLicense,
 } from '../selectors';
import {
  FlexColumnLayout, ContentParagraph,
  InputGroupHelperLabel,
} from '../blocks';

const OvrRedirect = (props) => {
  const { ovrLink, ovrRequiresLicense } = props;

  const copy = ovrRequiresLicense ? `Your state has online voter registration and because you have state identification you can complete your registration on the state website.` : `Your state has online voter registration and you can complete your registration on the state website.`;

  return (
    <FlexColumnLayout>
      <ContentParagraph>{copy}</ContentParagraph>
      <ContentParagraph>You can also opt-in to recieve messages from Let America Vote to help protect voting rights in your community.</ContentParagraph>
      <TextSubscribeForm
        staticCtaCopy="Complete Form"
        ctaLink={ovrLink}
        reducedSpacing
      />
      <InputGroupHelperLabel>Clicking this button will open a new tab to the state voter registration website.</InputGroupHelperLabel>
    </FlexColumnLayout>
  );
};

OvrRedirect.mapStateToProps = (state) => ({
  ovrLink: selectAuthenticatedUserOvrLink(state),
  ovrRequiresLicense: selectAuthenticatedUserOvrRequiresLicense(state),
});

export default BaseWrapper(OvrRedirect);
