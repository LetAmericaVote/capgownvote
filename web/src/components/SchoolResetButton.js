import React from 'react';
import BaseWrapper from './BaseWrapper';
import { TertiaryButtonWrapper, TertiaryButton } from '../blocks';
import {
  setSchoolInputValue,
  updateAuthenticatedUserProfile,
} from '../actions';

const SchoolResetButton = (props) => {
  const {
    setSchoolInputValue, updateAuthenticatedUserProfile
  } = props;

  const onReset = () => {
    setSchoolInputValue(null);
    updateAuthenticatedUserProfile({ school: null });
  };

  return (
    <TertiaryButtonWrapper>
      <TertiaryButton topSpacing onClick={onReset}>Reset school</TertiaryButton>
    </TertiaryButtonWrapper>
  );
};

SchoolResetButton.actionCreators = {
  setSchoolInputValue, updateAuthenticatedUserProfile,
};

export default BaseWrapper(SchoolResetButton);
