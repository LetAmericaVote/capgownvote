import React from 'react';
import BaseWrapper from './BaseWrapper';
import { getSchoolData, GET_SCHOOL_DATA } from '../actions';
import { selectSchoolData, selectApiRequest } from '../selectors';
import {
  Suggestion, SuggestionPrimaryTitle,
  SuggestionSecondaryTitle,
} from '../blocks';

const SchoolSuggestion = (props) => {
  const {
    schoolId, schoolData, onClick,
    disableHover, getSchoolData,
    schoolRequest, disableIndent,
    uppercase,
  } = props;

  if (! schoolId) {
    return null;
  }

  const hasData = !! schoolData && !! schoolData.id;

  const city = hasData ? schoolData.city : '';
  const stateCode = hasData ? schoolData.stateCode : '';
  const locationCopy = `${city}, ${stateCode.toUpperCase()}`;

  if (! hasData) {
    if (! schoolRequest || (! schoolRequest.isPending && ! schoolRequest.hasSucceeded)) {
      getSchoolData(schoolId);
    }

    return null;
  }

  const suggestionProps = {
    onClick,
    disableHover,
    disableIndent,
  };

  const titleProps = {
    uppercase,
  };

  return (
    <Suggestion {...suggestionProps}>
      <SuggestionPrimaryTitle {...titleProps}>{schoolData.name}</SuggestionPrimaryTitle>
      <SuggestionSecondaryTitle {...titleProps}>{locationCopy}</SuggestionSecondaryTitle>
    </Suggestion>
  );
}

SchoolSuggestion.mapStateToProps = (state, ownProps) => ({
  schoolData: selectSchoolData(ownProps.schoolId, state),
  schoolRequest: selectApiRequest(`${GET_SCHOOL_DATA}_${ownProps.schoolId}`, state),
});

SchoolSuggestion.actionCreators = {
  getSchoolData,
};

export default BaseWrapper(SchoolSuggestion);
