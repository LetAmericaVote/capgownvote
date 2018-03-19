import React from 'react';
import BaseWrapper from './BaseWrapper';
import { setSchoolInputValue } from '../actions';
import {
  InputGroupLayout, InputGroupLabel,
  TextInput,
} from '../blocks';
import {
  selectSchoolInputValue,
  selectAuthenticatedUserSchoolData,
} from '../selectors';

const SchoolSelectorInput = (props) => {
  const { setSchoolInputValue, value, userSchool } = props;

  const schoolName = userSchool ? userSchool.name : '';

  return (
    <InputGroupLayout>
      <InputGroupLabel>
        School Name
      </InputGroupLabel>
      <TextInput
        onChange={event => setSchoolInputValue(event.target.value)}
        value={value || schoolName}
      />
    </InputGroupLayout>
  );
};

SchoolSelectorInput.mapStateToProps = (state) => ({
  value: selectSchoolInputValue(state),
  userSchool: selectAuthenticatedUserSchoolData(state),
});

SchoolSelectorInput.actionCreators = {
  setSchoolInputValue,
};

export default BaseWrapper(SchoolSelectorInput);
