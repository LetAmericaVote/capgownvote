import React from 'react';
import BaseWrapper from './BaseWrapper';
import {
  selectSchoolSuggestions, selectSchoolItems,
  selectAuthenticatedUserHasSchool,
  selectSchoolInputValue,
} from '../selectors';
import {
  SuggestionColumn, Suggestion, SuggestionPrimaryTitle,
  SuggestionSecondaryTitle, TertiaryButton,
  TertiaryButtonWrapper,
} from '../blocks';
import {
  setSchoolInputValue, getSchoolData,
  updateAuthenticatedUserProfile, setRequiresInvite,
} from '../actions';

const SchoolSelectorSuggestions = (props) => {
  const {
    updateUser, schoolSuggestions, hasSchoolSet,
    getSchoolData, schoolItems, setRequiresInvite,
    hasSchoolInput,
  } = props;

  if (hasSchoolSet) {
    return null;
  }

  const RequireInviteCheckbox = () => {
    return (
      <TertiaryButtonWrapper>
        <TertiaryButton
          onClick={() => setRequiresInvite(true)}
        >Can't find your school?</TertiaryButton>
      </TertiaryButtonWrapper>
    );
  };

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
      {hasSchoolInput ? <RequireInviteCheckbox /> : null}
    </SuggestionColumn>
  );
};

SchoolSelectorSuggestions.mapStateToProps = (state) => ({
  hasSchoolSet: selectAuthenticatedUserHasSchool(state),
  schoolItems: selectSchoolItems(state),
  schoolSuggestions: selectSchoolSuggestions(state),
  hasSchoolInput: !!selectSchoolInputValue(state),
});

SchoolSelectorSuggestions.mapDispatchToProps = (dispatch) => ({
  updateUser: (school) => {
    const { id, name } = school;

    dispatch(updateAuthenticatedUserProfile({ school: id }));
    dispatch(setSchoolInputValue(name));
    dispatch(setRequiresInvite(false));
  },
  getSchoolData: schoolId => dispatch(getSchoolData(schoolId)),
  setRequiresInvite: requiresInvite => dispatch(setRequiresInvite(requiresInvite)),
});

export default BaseWrapper(SchoolSelectorSuggestions);
