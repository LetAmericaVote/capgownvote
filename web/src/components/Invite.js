import React from 'react';
import InviteSubmit from './InviteSubmit';
import BaseWrapper from './BaseWrapper';
import StateSelector from './StateSelector';
import {
  InviteLayout, InviteHeader, SpacedInputGroupLayout,
  InputGroupLabel, TextInput,
} from '../blocks';
import {
  selectInviteSchoolState, selectInviteFirstName,
  selectInviteEmail, selectInviteIsCompleted,
} from '../selectors';
import {
  setInviteSchoolState, setInviteFirstName,
  setInviteEmail,
} from '../actions';

const headerCopy = `Can't find your school? Leave your contact info below to request an invite to the competition. You can still register to vote afterwards.`;

const Invite = (props) => {
  const {
    schoolStateEventHandler, firstNameEventHandler,
    emailEventHandler, inviteSchoolState,
    inviteFirstName, inviteEmail, isCompleted,
  } = props;

  const form = isCompleted ? null : [
    <SpacedInputGroupLayout key="state">
      <InputGroupLabel>
        The state your school is in
      </InputGroupLabel>
      <StateSelector
        setStateValue={schoolStateEventHandler}
        value={inviteSchoolState}
      />
    </SpacedInputGroupLayout>,
    <SpacedInputGroupLayout key="first">
      <InputGroupLabel>
        Your first name
      </InputGroupLabel>
      <TextInput
        onChange={firstNameEventHandler}
        value={inviteFirstName}
      />
    </SpacedInputGroupLayout>,
    <SpacedInputGroupLayout key="email">
      <InputGroupLabel>
        Your email address
      </InputGroupLabel>
      <TextInput
        onChange={emailEventHandler}
        value={inviteEmail}
      />
    </SpacedInputGroupLayout>,
  ];

  return (
    <InviteLayout>
      <InviteHeader>{headerCopy}</InviteHeader>
      {form}
      <InviteSubmit />
    </InviteLayout>
  );
};

Invite.mapStateToProps = (state) => ({
  inviteSchoolState: selectInviteSchoolState(state),
  inviteFirstName: selectInviteFirstName(state),
  inviteEmail: selectInviteEmail(state),
  isCompleted: selectInviteIsCompleted(state),
});

Invite.mapDispatchToProps = (dispatch) => ({
  schoolStateEventHandler: event => dispatch(setInviteSchoolState(event.target.value)),
  firstNameEventHandler: event => dispatch(setInviteFirstName(event.target.value)),
  emailEventHandler: event => dispatch(setInviteEmail(event.target.value)),
});

export default BaseWrapper(Invite);
