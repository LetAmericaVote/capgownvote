import React from 'react';
import BaseWrapper from './BaseWrapper';
import { selectFormValue, selectAuthId } from '../selectors';
import {
  setFormValue, updateUserPassword,
  pushGeneralNotification,
} from '../actions';
import {
  AUTH_RESET_PASSWORD, AUTH_RESET_CONFIRM_PASSWORD,
} from '../formKeys';
import {
  WhiteButton, SpacedInputGroupLayout,
  InputGroupLabelLayout, InputGroupLabel,
  TextInput, ErrorMessage,
} from '../blocks';

const PasswordReset = (props) => {
  const {
    formResetPassword, formResetConfirmPassword,
    authenticatedId, updateUserPassword,
    setFormValue, pushGeneralNotification,
    postUpdate,
  } = props;

  const passwordsMatch = formResetPassword === formResetConfirmPassword;

  const onResetPassword = () => {
    if (! passwordsMatch) {
      return;
    }

    updateUserPassword(authenticatedId, formResetPassword)
      .then(isSet => {
        if (isSet) {
          pushGeneralNotification('Password updated.');
          setFormValue(AUTH_RESET_CONFIRM_PASSWORD, '');
          setFormValue(AUTH_RESET_PASSWORD, '');

          if (postUpdate) {
            postUpdate();
          }
        }
      });
  };

  return (
    <div>
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
    </div>
  );
};

PasswordReset.mapStateToProps = (state) => ({
  authenticatedId: selectAuthId(state),
  formResetPassword: selectFormValue(AUTH_RESET_PASSWORD, '', state),
  formResetConfirmPassword: selectFormValue(AUTH_RESET_CONFIRM_PASSWORD, '', state),
});

PasswordReset.actionCreators = {
  setFormValue, updateUserPassword,
  pushGeneralNotification,
};

export default BaseWrapper(PasswordReset);
