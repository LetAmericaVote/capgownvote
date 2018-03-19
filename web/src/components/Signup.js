import React from 'react';
import BaseWrapper from './BaseWrapper';
import FormStateSelector from './FormStateSelector';
import {
  setFormValue, createUser, setIsPublicComputer,
  updateUserProfile,
} from '../actions';
import {
  selectFormValue, selectIsPublicComputer, selectAuthId,
  selectIsAuthenticated,
} from '../selectors';
import {
  FIRST_NAME, LAST_NAME, EMAIL, STATE_CODE,
} from '../formKeys';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, WhiteButton, SignupLayout,
  CheckboxLayout, CheckboxInput, CheckboxTitle,
  CheckboxTitleLayout, InputGroupHelperLabel,
} from '../blocks';

const Signup = (props) => {
  const {
    createUser, setFormValue, user, isPublicComputer,
    setIsPublicComputer, updateUserProfile, isAuthenticated,
    authId,
  } = props;

  // TODO: Validations...
  const onSubmit = () => {
    if (isAuthenticated) {
      updateUserProfile(authId, user);
    } else {
      createUser(user, true);
    }
  };

  const submitCopy = isAuthenticated ? 'Update your profile' : 'Join Cap, Gown, Vote!';

  return (
    <SignupLayout>
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
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <FormStateSelector formKey={STATE_CODE} isRequired />
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
      <WhiteButton onClick={onSubmit}>{submitCopy}</WhiteButton>
    </SignupLayout>
  );
};

Signup.mapStateToProps = (state) => ({
  user: {
    firstName: selectFormValue(FIRST_NAME, '', state),
    lastName: selectFormValue(LAST_NAME, '', state),
    email: selectFormValue(EMAIL, '', state),
    stateCode: selectFormValue(STATE_CODE, '', state),
  },
  isPublicComputer: selectIsPublicComputer(state),
  authId: selectAuthId(state),
  isAuthenticated: selectIsAuthenticated(state),
});

Signup.actionCreators = {
  setFormValue, createUser, setIsPublicComputer,
  updateUserProfile,
};

export default BaseWrapper(Signup);
