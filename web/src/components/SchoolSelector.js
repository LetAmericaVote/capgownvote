import React from 'react';
import SchoolSelectorInput from './SchoolSelectorInput';
import SchoolResetButton from './SchoolResetButton';
import SchoolSelectorSuggestions from './SchoolSelectorSuggestions';
import BaseWrapper from './BaseWrapper';
import { selectSelectedSchoolId } from '../selectors';

const SchoolSelector = (props) => {
  const { hasSchoolSet } = props;

  return (
    <div>
      <SchoolSelectorInput />
      <SchoolSelectorSuggestions />
      { hasSchoolSet ? (
        <SchoolResetButton />
      ) : null }
    </div>
  );
};

SchoolSelector.mapStateToProps = (state) => ({
  hasSchoolSet: !! selectSelectedSchoolId(state),
});

export default BaseWrapper(SchoolSelector);
