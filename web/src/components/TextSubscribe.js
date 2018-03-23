import React from 'react';
import BaseWrapper from './BaseWrapper';
import { MOBILE } from '../formKeys';
import { selectAuthId, selectFormValue } from '../selectors';
import { setFormValue, updateUserProfile } from '../actions';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, WhiteButton,
  InputGroupHelperLabel, InputGroupHelperLabelLink,
  ContentHeader, TextSubscribeLayout,
  TextSubscribePart,
} from '../blocks';

const cta = `Signup for alerts from Let America Vote to help protect voting rights.`;

const privacyLink = 'https://www.letamericavote.org/privacy-policy/';
const PrivacyPolicyLink = () => (
  <InputGroupHelperLabelLink target="_blank" href={privacyLink}>
    Check out our privacy policy to see how we use your information.
  </InputGroupHelperLabelLink>
);

const PrivacyPolicy = () => (
  <InputGroupHelperLabel>You're submitting your information to Let America Vote. <PrivacyPolicyLink /> Message & data rates may apply. Text STOP to cancel or HELP for help.</InputGroupHelperLabel>
);

const TextSubscribe = (props) => {
  const {
    authId, mobile, setFormValue,
    updateUserProfile,
  } = props;

  const onSubmit = () => updateUserProfile(authId, { mobile });

  return (
    <TextSubscribeLayout>
      <TextSubscribePart>
        <ContentHeader>{cta}</ContentHeader>
      </TextSubscribePart>
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
      <WhiteButton onClick={onSubmit}>Signup</WhiteButton>
    </TextSubscribeLayout>
  );
};

TextSubscribe.mapStateToProps = (state) => ({
  authId: selectAuthId(state),
  mobile: selectFormValue(MOBILE, '', state),
});

TextSubscribe.actionCreators = {
  setFormValue, updateUserProfile,
};

export default BaseWrapper(TextSubscribe);
