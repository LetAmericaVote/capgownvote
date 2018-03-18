import React from 'react';
import BaseWrapper from './BaseWrapper';
import {
  InputGroupLayout, InputGroupLabel,
  TextInput,
} from '../blocks';
import {
  setSchoolInputValue, setSelectedSchoolId,
  setSchoolSuggestions,
} from '../actions';
import {
  selectSchoolInputValue, selectSelectedSchoolName,
} from '../selectors';

const SchoolSelectorInput = (props) => (
  <InputGroupLayout>
    <InputGroupLabel>
      School Name
    </InputGroupLabel>
    <TextInput
      onChange={props.onChange}
      value={props.value || props.selectedSchoolName || ''}
    />
  </InputGroupLayout>
);

SchoolSelectorInput.mapStateToProps = (state) => ({
  value: selectSchoolInputValue(state),
  selectedSchoolName: selectSelectedSchoolName(state),
});

SchoolSelectorInput.mapDispatchToProps = (dispatch) => ({
  onChange: (event) => {
    const { value } = event.target;
    dispatch(setSchoolInputValue(value));

    if (value === '') {
      dispatch(setSelectedSchoolId(null));
      dispatch(setSchoolSuggestions(null));
    }
  },
});

export default BaseWrapper(SchoolSelectorInput);
