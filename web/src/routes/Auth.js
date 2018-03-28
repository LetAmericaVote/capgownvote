import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import Notification from '../components/Notification';
import PasswordReset from '../components/PasswordReset';
import { AUTH_EMAIL, AUTH_PASSWORD } from '../formKeys';
import {
  login, logout, setFormValue,
} from '../actions';
import {
  selectIsAuthenticated, selectAuthenticatedUserEmail,
  selectFormValue,
} from '../selectors';
import {
  Main, BorderedBlock, AuthLayout, WhiteButton,
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, AuthHeader,
  AuthSubheader, DividingLine,
} from '../blocks';

const Auth = (props) => {
  const {
    isAuthenticated, authenticatedEmail, logout, login,
    setFormValue, formEmail, formPassword,
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

  const logoutForm = (
    <BorderedBlock>
      <AuthSubheader>You are logged in as</AuthSubheader>
      <AuthHeader>{authenticatedEmail}</AuthHeader>
      <WhiteButton onClick={logout}>Logout</WhiteButton>
      <DividingLine />
      <AuthSubheader>Reset password</AuthSubheader>
      <PasswordReset />
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
  authenticatedEmail: selectAuthenticatedUserEmail(state),
  formEmail: selectFormValue(AUTH_EMAIL, '', state),
  formPassword: selectFormValue(AUTH_PASSWORD, '', state),
});

Auth.actionCreators = {
  login, logout, setFormValue,
};

export default BaseWrapper(Auth);
