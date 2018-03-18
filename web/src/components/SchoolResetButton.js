import React from 'react';
import BaseWrapper from './BaseWrapper';
import { setSchoolInputValue, setSelectedSchoolId } from '../actions';
import { TertiaryButtonWrapper, TertiaryButton } from '../blocks';

const SchoolResetButton = (props) => {
  const { setSchoolInputValue, setSelectedSchoolId } = props;

  const onReset = () => {
    setSchoolInputValue(null);
    setSelectedSchoolId(null);
  };

  return (
    <TertiaryButtonWrapper>
      <TertiaryButton topSpacing onClick={onReset}>Reset school</TertiaryButton>
    </TertiaryButtonWrapper>
  );
};

SchoolResetButton.actionCreators = {
  setSchoolInputValue, setSelectedSchoolId,
};

export default BaseWrapper(SchoolResetButton);
