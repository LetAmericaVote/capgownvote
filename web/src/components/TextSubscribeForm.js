import React from 'react';
import BaseWrapper from './BaseWrapper';
import { MOBILE } from '../formKeys';
import { selectAuthId, selectFormValue } from '../selectors';
import {
  setFormValue, updateUserMobile,
  pushGeneralNotification,
} from '../actions';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, WhiteButton,
  InputGroupHelperLabel, InputGroupHelperLabelLink,
  FlexColumnLayout,
} from '../blocks';

const privacyLink = 'https://www.letamericavote.org/privacy-policy/';
const PrivacyPolicyLink = () => (
  <InputGroupHelperLabelLink target="_blank" href={privacyLink}>
    Check out our privacy policy to see how we use your information.
  </InputGroupHelperLabelLink>
);

const PrivacyPolicy = () => (
  <InputGroupHelperLabel>You're submitting your information to Let America Vote. <PrivacyPolicyLink /> Message & data rates may apply. Text STOP to cancel or HELP for help.</InputGroupHelperLabel>
);

const TextSubscribeForm = (props) => {
  const {
    authId, mobile, setFormValue,
    updateUserMobile, ctaCopy, ctaLink,
    ctaOnClick, staticCtaCopy,
  } = props;

  const defaultOnClick = () => {
    if (mobile) {
      updateUserMobile(authId, mobile).then(updated => {
        if (updated) {
          pushGeneralNotification('Mobile number set!');
        }
      });
    }
  };

  const SubscribeButton = () => {
    const copy = staticCtaCopy || (mobile ? 'Update mobile number' : ctaCopy);

    const CtaButton = () => (
      <WhiteButton onClick={() => {
        if (ctaOnClick) {
          ctaOnClick(mobile);
        } else {
          defaultOnClick();
        }
      }}>{copy}</WhiteButton>
    );

    if (ctaLink) {
      return (
        <a href={ctaLink} target="_blank">
          <CtaButton />
        </a>
      );
    }

    return (
      <CtaButton />
    );
  };

  return (
    <FlexColumnLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Mobile Number
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(MOBILE, event.target.value)}
          value={mobile}
          type="tel"
        />
        <PrivacyPolicy />
      </SpacedInputGroupLayout>
      <SubscribeButton />
    </FlexColumnLayout>
  );
};

TextSubscribeForm.mapStateToProps = (state) => ({
  authId: selectAuthId(state),
  mobile: selectFormValue(MOBILE, '', state),
});

TextSubscribeForm.actionCreators = {
  setFormValue, updateUserMobile,
  pushGeneralNotification,
};

export default BaseWrapper(TextSubscribeForm);
