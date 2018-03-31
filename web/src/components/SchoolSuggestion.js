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
    schoolRequest,
  } = props;

  if (! schoolId) {
    return null;
  }

  const hasData = !! schoolData && !! schoolData.id;

  const city = hasData ? schoolData.city : null;
  const stateCode = hasData ? schoolData.stateCode : null;
  const locationCopy = `${city}, ${stateCode}`;

  if (! hasData) {
    if (! schoolRequest || (! schoolRequest.isPending && ! schoolRequest.hasSucceeded)) {
      getSchoolData(schoolId);
    }

    return null;
  }

  return (
    <Suggestion onClick={onClick} disableHover={disableHover}>
      <SuggestionPrimaryTitle>{schoolData.name}</SuggestionPrimaryTitle>
      <SuggestionSecondaryTitle>{locationCopy}</SuggestionSecondaryTitle>
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
