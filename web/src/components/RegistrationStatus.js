import React from 'react';
import BaseWrapper from './BaseWrapper';
import {
  setIsRegistered, setIsRegisteredConfirmation,
} from '../actions';
import {
  SelectInput, SelectInputCarrot,
  WhiteButton,
} from '../blocks';
import {
  selectRegistrationIsRegistered,
  selectRegistrationIsRegisteredConfirmation,
} from '../selectors';

const RegistrationStatus = (props) => {
  const { isRegistered, isConfirmed } = props;

  return (
    <div>
      <SelectInputCarrot>
        <SelectInput>I'm already registered to vote.</SelectInput>
      </SelectInputCarrot>
      <SelectInputCarrot>
        <SelectInput>I'm not registered to vote.</SelectInput>
      </SelectInputCarrot>
      <SelectInputCarrot>
        <SelectInput>I'm not sure if I'm already registered to vote.</SelectInput>
      </SelectInputCarrot>
      <WhiteButton>Confirm</WhiteButton>
    </div>
  );
};

RegistrationStatus.mapStateToProps = (state) => ({
  isRegistered: selectRegistrationIsRegistered(state),
  isConfirmed: selectRegistrationIsRegisteredConfirmation(state),
});

RegistrationStatus.actionCreators = {

};

export default BaseWrapper(RegistrationStatus);
