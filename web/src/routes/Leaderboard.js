import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import SchoolSuggestion from '../components/SchoolSuggestion';
import { GET_SCHOOL_STATS, getSchoolStats } from '../actions';
import {
  selectSchoolItems, selectApiRequest,
  selectAuthenticatedUserSchoolData,
  selectIsAuthenticated,
} from '../selectors';
import {
  Main, LeaderboardLayout, LeaderboardBackground,
  BorderedBlock, ContentHeader, ContentParagraph,
  FlexColumnLayout, LeaderboardRowLayout, PointTitle,
  PointSubtitle, DividingLine,
} from '../blocks';

const Leaderboard = (props) => {
  const {
    getSchoolStats, statRequest, rankings,
    authenticatedUserSchool, isAuthenticated,
  } = props;

  if (! statRequest || statRequest.hasFailed) {
    getSchoolStats();
  }

  const authSchoolId = isAuthenticated ? authenticatedUserSchool.id : false;
  const isAuthSchoolRanked = isAuthenticated ? rankings.find(school => school.id === authSchoolId) : false;

  // logic to check if first seed is under X points
  const LeaderboardRows = () => (
    <FlexColumnLayout>
      {rankings.map((school, index) => (
        <LeaderboardRowLayout key={school.id}>
          <FlexColumnLayout>
            <PointTitle highlight={school.id === authSchoolId}>#{index + 1}</PointTitle>
            <PointSubtitle highlight={school.id === authSchoolId}>{school.points} pts.</PointSubtitle>
          </FlexColumnLayout>
          <SchoolSuggestion schoolId={school.id} disableHover />
        </LeaderboardRowLayout>
      ))}
      {! isAuthSchoolRanked && isAuthenticated  && !! authSchoolId ? (
        <div>
          <DividingLine reducedSpacing />
          <LeaderboardRowLayout>
            <FlexColumnLayout>
              <PointTitle highlight>{authenticatedUserSchool.points}</PointTitle>
              <PointSubtitle highlight>points</PointSubtitle>
            </FlexColumnLayout>
            <SchoolSuggestion schoolId={authSchoolId} disableHover />
          </LeaderboardRowLayout>
        </div>
      ) : null}
    </FlexColumnLayout>
  );

  return (
    <Main>
      <PageNav />
      <LeaderboardBackground>
        <LeaderboardLayout>
          <BorderedBlock>
            <ContentHeader centered>The Cap, Gown, Vote Leaderboard</ContentHeader>
            <ContentParagraph>You know what's better than your school winning a sports trophy? Every student voting in November.</ContentParagraph>
            <ContentParagraph>Schools are awarded points based on the number of students who register to vote or signup for SMS messages from Let America Vote to help protect voting rights. Scores are updated every hour.</ContentParagraph>
            {statRequest && statRequest.isPending ? null : <LeaderboardRows />}
          </BorderedBlock>
        </LeaderboardLayout>
      </LeaderboardBackground>
      <PageFooter />
    </Main>
  );
}

Leaderboard.mapStateToProps = (state) => ({
  rankings: Object.keys(selectSchoolItems(state))
    .map(id => selectSchoolItems(state)[id])
    .sort((a, b) => b.points - a.points)
    .filter(school => school.points > 0)
    .splice(0, 100),
  statRequest: selectApiRequest(GET_SCHOOL_STATS, state),
  authenticatedUserSchool: selectAuthenticatedUserSchoolData(state),
  isAuthenticated: selectIsAuthenticated(state),
});

Leaderboard.actionCreators = {
  getSchoolStats,
};

export default BaseWrapper(Leaderboard);
