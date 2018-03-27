import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import Notification from '../components/Notification';
import {
  AUTH_EMAIL, AUTH_PASSWORD, AUTH_RESET_PASSWORD,
  AUTH_RESET_CONFIRM_PASSWORD,
} from '../formKeys';
import {
  login, logout, setFormValue,
  updateUserPassword,
} from '../actions';
import {
  selectIsAuthenticated, selectAuthenticatedUserEmail,
  selectFormValue, selectAuthId,
} from '../selectors';
import {
  Main, BorderedBlock, AuthLayout, WhiteButton,
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, AuthHeader,
  AuthSubheader, DividingLine, ErrorMessage,
} from '../blocks';

const Auth = (props) => {
  const {
    isAuthenticated, authenticatedEmail, logout, login, setFormValue,
    formEmail, formPassword, formResetConfirmPassword, authenticatedId,
    updateUserPassword, formResetPassword,
  } = props;

  const onLogin = () => login(formEmail, formPassword);

  const loginForm = (
    <BorderedBlock>
      <AuthHeader>Login to Cap, Gown, Vote!</AuthHeader>
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
          onChange={event => setFormValue(AUTH_EMAIL, event.target.value)}
          value={formEmail}
          type="email"
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Password
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(AUTH_PASSWORD, event.target.value)}
          value={formPassword}
          type="password"
        />
      </SpacedInputGroupLayout>
      <WhiteButton onClick={onLogin}>Login</WhiteButton>
    </BorderedBlock>
  );

  const passwordsMatch = formResetPassword === formResetConfirmPassword;

  const onResetPassword = () => {
    if (! passwordsMatch) {
      return;
    }

    updateUserPassword(authenticatedId, formPassword);
    setFormValue(AUTH_RESET_CONFIRM_PASSWORD, '');
    setFormValue(AUTH_RESET_PASSWORD, '');
  };

  const logoutForm = (
    <BorderedBlock>
      <AuthSubheader>You are logged in as</AuthSubheader>
      <AuthHeader>{authenticatedEmail}</AuthHeader>
      <WhiteButton onClick={logout}>Logout</WhiteButton>
      <DividingLine />
      <AuthSubheader>Reset password</AuthSubheader>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            New Password
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(AUTH_RESET_PASSWORD, event.target.value)}
          value={formResetPassword}
          type="password"
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Confirm New Password
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(AUTH_RESET_CONFIRM_PASSWORD, event.target.value)}
          value={formResetConfirmPassword}
          type="password"
        />
      </SpacedInputGroupLayout>
      {passwordsMatch ? (
        <WhiteButton onClick={onResetPassword}>Reset password</WhiteButton>
      ) : (
        <ErrorMessage>Passwords do not match</ErrorMessage>
      )}
    </BorderedBlock>
  );

  return (
    <Main>
      <PageNav />
      <AuthLayout>
        {isAuthenticated ? logoutForm : loginForm}
      </AuthLayout>
      <PageFooter />
      <Notification />
    </Main>
  );
};

Auth.mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  authenticatedId: selectAuthId(state),
  authenticatedEmail: selectAuthenticatedUserEmail(state),
  formEmail: selectFormValue(AUTH_EMAIL, '', state),
  formPassword: selectFormValue(AUTH_PASSWORD, '', state),
  formResetPassword: selectFormValue(AUTH_RESET_PASSWORD, '', state),
  formResetConfirmPassword: selectFormValue(AUTH_RESET_CONFIRM_PASSWORD, '', state),
});

Auth.actionCreators = {
  login, logout, setFormValue, updateUserPassword,
};

export default BaseWrapper(Auth);
