import React from 'react';
import BaseWrapper from './BaseWrapper';
import { updateUserProfile } from '../actions';
import {
  SpacedInputGroupLayout, CheckboxLayout,
  CheckboxInput, CheckboxTitleLayout,
  CheckboxTitle,
} from '../blocks';
import {
  selectAuthId,
  selectAuthenticatedUserIsRegistered,
} from '../selectors';

const options = [
  {
    title: `I'm already registered to vote.`,
    set: true,
  },
  {
    title: `I'm not registered to vote or I'm not sure if I'm registered to vote`,
    set: false,
  },
];

const RegistrationStatus = (props) => {
  const { authId, isRegistered, updateUserProfile } = props;

  return (
    <SpacedInputGroupLayout>
      {options.map((option, index) => (
        <CheckboxLayout spacing={index > 0} key={option.title}>
          <CheckboxInput
            checked={isRegistered === option.set}
            onClick={() => updateUserProfile(authId, { isRegistered: ! isRegistered })}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>{option.title}</CheckboxTitle>
          </CheckboxTitleLayout>
        </CheckboxLayout>
      ))}
    </SpacedInputGroupLayout>
  );
};

RegistrationStatus.mapStateToProps = (state) => ({
  authId: selectAuthId(state),
  isRegistered: selectAuthenticatedUserIsRegistered(state),
});

RegistrationStatus.actionCreators = {
  updateUserProfile,
};

export default BaseWrapper(RegistrationStatus);
