import React from 'react';
import BaseWrapper from './BaseWrapper';
import SubmitButton from './SubmitButton';
import FormStateSelector from './FormStateSelector';
import Link from '../routing/Link';
import {
  setFormValue, createUser, setIsPublicComputer,
  updateUserProfile, logout, pushGeneralNotification,
  UPDATE_USER_PROFILE,
} from '../actions';
import {
  selectFormValue, selectIsPublicComputer, selectAuthId,
  selectIsAuthenticated,
} from '../selectors';
import {
  FIRST_NAME, LAST_NAME, EMAIL, STATE_CODE,
  HAS_STATE_LICENSE,
} from '../formKeys';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, SignupLayout,
  CheckboxLayout, CheckboxInput, CheckboxTitle,
  CheckboxTitleLayout, InputGroupHelperLabel,
  SignupAuthLayout, SignupAuthCopy, SignupAuthLink,
} from '../blocks';

const Signup = (props) => {
  const {
    createUser, setFormValue, user, isPublicComputer,
    setIsPublicComputer, updateUserProfile, isAuthenticated,
    authId, logout, pushGeneralNotification,
  } = props;

  // TODO: Validations...
  const onSubmit = () => {
    if (isAuthenticated) {
      updateUserProfile(authId, user).then(isUpdated => {
        if (isUpdated) {
          pushGeneralNotification('Updated user profile');
        }
      })
    } else {
      createUser(user, true);
    }
  };

  const submitCopy = isAuthenticated ? 'Update your profile' : 'Join Cap, Gown, Vote!';

  const LoginLink = Link((props) => (
    <SignupAuthLink {...props}>
      Login
    </SignupAuthLink>
  ), '/auth');

  const onLogout = () => {
    logout();
    setFormValue(FIRST_NAME, '');
    setFormValue(LAST_NAME, '');
    setFormValue(EMAIL, '');
    setFormValue(STATE_CODE, '');
    setFormValue(HAS_STATE_LICENSE, false);
  };

  const Auth = () => isAuthenticated ? (
    <SignupAuthLayout>
      <SignupAuthCopy>Not {user.firstName}?</SignupAuthCopy>
      <SignupAuthLink onClick={onLogout}>
        Logout
      </SignupAuthLink>
    </SignupAuthLayout>
  ) : (
    <SignupAuthLayout>
      <SignupAuthCopy>Already make an account?</SignupAuthCopy>
      <LoginLink />
    </SignupAuthLayout>
  );

  return (
    <SignupLayout>
      <Auth />
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            First Name
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(FIRST_NAME, event.target.value)}
          value={user.firstName}
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Last Name
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(LAST_NAME, event.target.value)}
          value={user.lastName}
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Email
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(EMAIL, event.target.value)}
          value={user.email}
          type="email"
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <FormStateSelector formKey={STATE_CODE} isRequired />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <CheckboxLayout>
          <CheckboxInput
            checked={user.hasStateLicense}
            onClick={() => setFormValue(HAS_STATE_LICENSE, ! user.hasStateLicense)}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>Do you have valid state identification? Note: This is not a requirement to register.</CheckboxTitle>
            <InputGroupHelperLabel>
              eg: Drivers license.
            </InputGroupHelperLabel>
          </CheckboxTitleLayout>
        </CheckboxLayout>
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <CheckboxLayout>
          <CheckboxInput
            checked={isPublicComputer}
            onClick={() => setIsPublicComputer(! isPublicComputer)}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>Are you on a public computer?</CheckboxTitle>
            <InputGroupHelperLabel>
              eg: A library or school computer.
            </InputGroupHelperLabel>
          </CheckboxTitleLayout>
        </CheckboxLayout>
      </SpacedInputGroupLayout>
      <SubmitButton
        onClick={onSubmit}
        ctaCopy={submitCopy}
        requestId={`${UPDATE_USER_PROFILE}_${authId}`}
      />
    </SignupLayout>
  );
};

Signup.mapStateToProps = (state) => ({
  user: {
    firstName: selectFormValue(FIRST_NAME, '', state),
    lastName: selectFormValue(LAST_NAME, '', state),
    email: selectFormValue(EMAIL, '', state),
    stateCode: selectFormValue(STATE_CODE, '', state),
    hasStateLicense: selectFormValue(HAS_STATE_LICENSE, false, state),
  },
  isPublicComputer: selectIsPublicComputer(state),
  authId: selectAuthId(state),
  isAuthenticated: selectIsAuthenticated(state),
});

Signup.actionCreators = {
  setFormValue, createUser, setIsPublicComputer,
  updateUserProfile, logout, pushGeneralNotification,
};

export default BaseWrapper(Signup);
