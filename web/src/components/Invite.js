import React from 'react';
import InviteSubmit from './InviteSubmit';
import BaseWrapper from './BaseWrapper';
import FormStateSelector from './FormStateSelector';
import { setFormValue } from '../actions';
import {
  selectFormValue, selectSchoolInputValue,
  selectAuthenticatedUserHasSchool,
  selectAuthenticatedUserStateCode,
} from '../selectors';
import {
  InviteLayout, InviteHeader, SpacedInputGroupLayout,
  InputGroupLabel, TextInput, InputGroupLabelLayout,
} from '../blocks';
import {
  SCHOOL_INVITE_NAME, SCHOOL_INVITE_STATE_CODE,
  SCHOOL_INVITE_CITY, SCHOOL_INVITE_ZIPCODE,
} from '../formKeys';

const headerCopy = `Can't find your school? No worries, just enter a few details to have it added to the competition. You can still register to vote afterwards.`;

const Invite = (props) => {
  const {
    name, city, zipcode, stateCode,
    schoolSearchInput, setFormValue,
    authenticatedUserHasSchool,
    authenticatedUserStateCode,
  } = props;

  if (authenticatedUserHasSchool) {
    return (
      <InviteLayout>
        <InviteHeader>We got the submission for your school - Thanks!</InviteHeader>
      </InviteLayout>
    );
  }

  if (! name && schoolSearchInput) {
    setFormValue(SCHOOL_INVITE_NAME, schoolSearchInput);
  }

  if (! stateCode && authenticatedUserStateCode) {
    setFormValue(SCHOOL_INVITE_STATE_CODE, authenticatedUserStateCode);
  }

  return (
    <InviteLayout>
      <InviteHeader>{headerCopy}</InviteHeader>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            Full School Name
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(SCHOOL_INVITE_NAME, event.target.value)}
          value={name}
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            School City
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(SCHOOL_INVITE_CITY, event.target.value)}
          value={city}
        />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            School State
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <FormStateSelector formKey={SCHOOL_INVITE_STATE_CODE} />
      </SpacedInputGroupLayout>
      <SpacedInputGroupLayout>
        <InputGroupLabelLayout>
          <InputGroupLabel>
            School Zipcode
          </InputGroupLabel>
          <InputGroupLabel error>
            Required
          </InputGroupLabel>
        </InputGroupLabelLayout>
        <TextInput
          onChange={event => setFormValue(SCHOOL_INVITE_ZIPCODE, event.target.value)}
          value={zipcode}
        />
      </SpacedInputGroupLayout>
      <InviteSubmit />
    </InviteLayout>
  );
};

Invite.mapStateToProps = (state) => ({
  name: selectFormValue(SCHOOL_INVITE_NAME, null, state),
  city: selectFormValue(SCHOOL_INVITE_CITY, null, state),
  stateCode: selectFormValue(SCHOOL_INVITE_STATE_CODE, null, state),
  zipcode: selectFormValue(SCHOOL_INVITE_ZIPCODE, null, state),
  schoolSearchInput: selectSchoolInputValue(state),
  authenticatedUserHasSchool: selectAuthenticatedUserHasSchool(state),
  authenticatedUserStateCode: selectAuthenticatedUserStateCode(state),
});

Invite.actionCreators = {
  setFormValue,
};

export default BaseWrapper(Invite);
