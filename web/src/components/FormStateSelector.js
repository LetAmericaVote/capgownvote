import React from 'react';
import BaseWrapper from './BaseWrapper';
import { WhiteButton, SelectInput, SelectInputCarrot } from '../blocks';
import { selectFormValue, selectAssumedStateCode } from '../selectors';
import { setFormValue } from '../actions';
import { states } from '../helpers';

const StateSelector = (props) => {
  const {
    setStateValue, formValue, showConfirmationButton,
    assumedStateCode,
  } = props;

  const value = formValue || assumedStateCode || '';

  return (
    <SelectInputCarrot>
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
  assumedStateCode: selectAssumedStateCode(state),
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
