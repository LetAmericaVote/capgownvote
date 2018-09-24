import React from 'react';
import ReactGA from 'react-ga';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import {
  selectAuthenticatedUserOvrLink,
  selectAuthenticatedUserOvrRequiresLicense,
  selectAuthenticatedUserStateCode,
 } from '../selectors';
import {
  FlexColumnLayout, ContentParagraph,
  InputGroupHelperLabel,
} from '../blocks';

const OvrRedirect = (props) => {
  const { ovrLink, ovrRequiresLicense, authenticatedUserStateCode } = props;

  const copy = ovrRequiresLicense ? `Your state has online voter registration and because you have state identification you can complete your registration on the state website.` : `Your state has online voter registration and you can complete your registration on the state website.`;

  return (
    <FlexColumnLayout>
      <ContentParagraph>{copy}</ContentParagraph>
      {/* <ContentParagraph>You can also opt-in to recieve messages from Let America Vote to help protect voting rights in your community.</ContentParagraph> */}
      <TextSubscribeForm
        staticCtaCopy="Complete Form"
        ctaLink={ovrLink}
        reducedSpacing
        postSubmit={() => {
          ReactGA.event({
            category: 'OVR',
            action: 'User successfully visited state OVR platform',
            label: authenticatedUserStateCode,
          });
        }}
      />
      <InputGroupHelperLabel>Clicking this button will open a new tab to the state voter registration website.</InputGroupHelperLabel>
    </FlexColumnLayout>
  );
};

OvrRedirect.mapStateToProps = (state) => ({
  authenticatedUserStateCode: selectAuthenticatedUserStateCode(state),
  ovrLink: selectAuthenticatedUserOvrLink(state),
  ovrRequiresLicense: selectAuthenticatedUserOvrRequiresLicense(state),
});

export default BaseWrapper(OvrRedirect);
