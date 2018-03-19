import React from 'react';
import BaseWrapper from './BaseWrapper';
import Invite from './Invite';
import {
  selectSchoolSuggestions, selectSchoolItems,
  selectSchoolInputValue, selectAuthenticatedUserHasSchool,
} from '../selectors';
import {
  SuggestionColumn, Suggestion, SuggestionPrimaryTitle,
  SuggestionSecondaryTitle,
} from '../blocks';
import {
  setSchoolInputValue, getSchoolData,
  updateAuthenticatedUserProfile,
} from '../actions';

const SchoolSelectorSuggestions = (props) => {
  const {
    updateUser, schoolSuggestions, hasSchoolSet,
    getSchoolData, schoolItems, schoolInputValue,
  } = props;

  if (hasSchoolSet) {
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
          updateUser(school);
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
  hasSchoolSet: selectAuthenticatedUserHasSchool(state),
  schoolItems: selectSchoolItems(state),
  schoolSuggestions: selectSchoolSuggestions(state),
  schoolInputValue: selectSchoolInputValue(state),
});

SchoolSelectorSuggestions.mapDispatchToProps = (dispatch) => ({
  updateUser: (school) => {
    const { id, name } = school;

    dispatch(updateAuthenticatedUserProfile({ school: id }));
    dispatch(setSchoolInputValue(name));
  },
  getSchoolData: schoolId => dispatch(getSchoolData(schoolId)),
});

export default BaseWrapper(SchoolSelectorSuggestions);
