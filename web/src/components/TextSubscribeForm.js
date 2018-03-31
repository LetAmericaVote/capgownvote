import React from 'react';
import BaseWrapper from './BaseWrapper';
import SubmitButton from './SubmitButton';
import { MOBILE } from '../formKeys';
import {
  selectAuthId, selectFormValue,
  selectAuthenticatedUserMobile,
} from '../selectors';
import {
  setFormValue, updateUserMobile,
  pushGeneralNotification,
  UPDATE_USER_MOBILE,
} from '../actions';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, FlexColumnLayout,
  InputGroupHelperLabel, InputGroupHelperLabelLink,
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
    ctaOnClick, staticCtaCopy, userMobile,
    reducedSpacing, ctaRequestId, postSubmit,
  } = props;

  const defaultOnClick = () => {
    if (mobile && mobile !== userMobile) {
      updateUserMobile(authId, mobile).then(updated => {
        if (updated) {
          pushGeneralNotification('Thanks for signing up!');
        }
      });
    }
  };

  const SubscribeButton = () => {
    const copy = staticCtaCopy || (mobile ? 'Update mobile number' : ctaCopy);

    const CtaButton = () => (
      <SubmitButton
        ctaCopy={copy}
        onClick={() => {
          if (ctaOnClick) {
            ctaOnClick(mobile);
          } else {
            defaultOnClick();
          }

          if (postSubmit) {
            postSubmit();
          }
        }}
        requestId={ctaRequestId || `${UPDATE_USER_MOBILE}_${authId}`}
      />
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

  const inputGroupProps = {};
  if (reducedSpacing) {
    inputGroupProps.multiplier = 2;
  }

  return (
    <FlexColumnLayout>
      <SpacedInputGroupLayout {...inputGroupProps}>
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
  userMobile: selectAuthenticatedUserMobile(state),
});

TextSubscribeForm.actionCreators = {
  setFormValue, updateUserMobile,
  pushGeneralNotification,
};

export default BaseWrapper(TextSubscribeForm);
