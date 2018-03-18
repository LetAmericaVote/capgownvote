import React from 'react';
import BaseWrapper from './BaseWrapper';
import { SelectInput, SelectInputCarrot } from '../blocks';
import { states } from '../helpers';

const StateSelector = (props) => {
  const { setStateValue, value } = props;

  return (
    <SelectInputCarrot>
      <SelectInput value={value || ''} onChange={setStateValue}>
        { value ? null : <option>Select state</option>}
        { states.map(state => (
          <option key={state.code} value={state.code.toLowerCase()}>{ state.name }</option>
        )) }
      </SelectInput>
    </SelectInputCarrot>
  );
};

export default BaseWrapper(StateSelector);
