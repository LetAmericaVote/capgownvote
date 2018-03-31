import React from 'react';
import BaseWrapper from './BaseWrapper';
import SchoolSuggestion from './SchoolSuggestion';
import {
  selectSchoolSuggestions, selectSchoolInputValue,
  selectAuthenticatedUserHasSchool,
} from '../selectors';
import {
  SuggestionColumn, TertiaryButton,
  TertiaryButtonWrapper,
} from '../blocks';
import {
  setSchoolInputValue, setRequiresInvite,
  updateAuthenticatedUserProfile,
} from '../actions';

const SchoolSelectorSuggestions = (props) => {
  const {
    updateUser, schoolSuggestions, hasSchoolSet,
    setRequiresInvite, hasSchoolInput,
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
        const { id } = school;

        return (
          <SchoolSuggestion
            key={id}
            schoolId={id}
            onClick={() => updateUser(school)}
          />
        );
      })}
      {hasSchoolInput ? <RequireInviteCheckbox /> : null}
    </SuggestionColumn>
  );
};

SchoolSelectorSuggestions.mapStateToProps = (state) => ({
  hasSchoolSet: selectAuthenticatedUserHasSchool(state),
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
  setRequiresInvite: requiresInvite => dispatch(setRequiresInvite(requiresInvite)),
});

export default BaseWrapper(SchoolSelectorSuggestions);
