import React from 'react';
import BaseWrapper from './BaseWrapper';
import { MOBILE } from '../formKeys';
import { selectAuthId, selectFormValue } from '../selectors';
import { setFormValue, updateUserMobile } from '../actions';
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
  } = props;

  const SubscribeButton = () => {
    const copy = mobile ? 'Update mobile number' : ctaCopy;

    const CtaButton = () => (
      <WhiteButton onClick={() => {
        if (mobile) {
          updateUserMobile(authId, mobile);
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
};

export default BaseWrapper(TextSubscribeForm);
