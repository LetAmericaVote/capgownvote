import React from 'react';
import BaseWrapper from './BaseWrapper';
import { WhiteButton, SelectInput, SelectInputCarrot } from '../blocks';
import { setFormValue } from '../actions';
import { states } from '../helpers';
import {
  selectFormValue,
  selectAuthenticatedUserStateCode,
} from '../selectors';

const StateSelector = (props) => {
  const {
    setStateValue, formValue, showConfirmationButton,
    userStateCode, isRequired,
  } = props;

  const value = formValue || userStateCode || '';

  return (
    <SelectInputCarrot required={isRequired}>
      <SelectInput value={value} onChange={setStateValue}>
        { value ? null : <option>Select state</option>}
        { states.map(state => (
          <option key={state.code} value={state.code.toLowerCase()}>{ state.name }</option>
        )) }
      </SelectInput>
      { showConfirmationButton && ! formValue ? (
        <WhiteButton topSpacing onClick={setStateValue} value={value || ''}>Confirm</WhiteButton>
      ) : null }
    </SelectInputCarrot>
  );
};

StateSelector.mapStateToProps = (state, ownProps) => ({
  userStateCode: selectAuthenticatedUserStateCode(state),
  formValue: selectFormValue(ownProps.formKey, null, state),
});

StateSelector.mapDispatchToProps = (dispatch, ownProps) => ({
  setStateValue: event => {
    const { value } = event.target;
    const { formKey } = ownProps;
    dispatch(setFormValue(formKey, value));
  },
});

export default BaseWrapper(StateSelector);
