import React from 'react';
import BaseWrapper from './BaseWrapper';
import Invite from './Invite';
import {
  selectSelectedSchoolId, selectSchoolSuggestions,
  selectSchoolItems, selectSchoolInputValue,
} from '../selectors';
import {
  SuggestionColumn, Suggestion, SuggestionPrimaryTitle,
  SuggestionSecondaryTitle,
} from '../blocks';
import {
  setSelectedSchoolId, setSchoolInputValue,
  getSchoolData,
} from '../actions';

const SchoolSelectorSuggestions = (props) => {
  const {
    schoolSuggestions, setSelectedSchoolId, selectedSchoolId,
    getSchoolData, schoolItems, schoolInputValue,
  } = props;

  if (selectedSchoolId) {
    return null;
  }

  if (schoolInputValue && (! schoolSuggestions || ! schoolSuggestions.length)) {
    return (
      <Invite />
    );
  }

  return (
    <SuggestionColumn>
      {schoolSuggestions.map(school => {
        const { id, name } = school;

        const data = schoolItems[id];
        const hasData = !! data;

        const city = hasData ? data.city : null;
        const stateCode = hasData ? data.stateCode : null;
        const locationCopy = `${city}, ${stateCode}`;

        if (! hasData) {
          getSchoolData(id);
        }

        const onClick = () => {
          setSelectedSchoolId(school);
        };

        return (
          <Suggestion key={id} onClick={onClick}>
            <SuggestionPrimaryTitle>{name}</SuggestionPrimaryTitle>
            { hasData ? <SuggestionSecondaryTitle>{locationCopy}</SuggestionSecondaryTitle> : null}
          </Suggestion>
        );
      })}
    </SuggestionColumn>
  );
};

SchoolSelectorSuggestions.mapStateToProps = (state) => ({
  selectedSchoolId: selectSelectedSchoolId(state),
  schoolItems: selectSchoolItems(state),
  schoolSuggestions: selectSchoolSuggestions(state),
  schoolInputValue: selectSchoolInputValue(state),
});

SchoolSelectorSuggestions.mapDispatchToProps = (dispatch) => ({
  setSelectedSchoolId: (school) => {
    const { id, name } = school;

    dispatch(setSelectedSchoolId(id));
    dispatch(setSchoolInputValue(name));
  },
  getSchoolData: schoolId => dispatch(getSchoolData(schoolId)),
});

export default BaseWrapper(SchoolSelectorSuggestions);
