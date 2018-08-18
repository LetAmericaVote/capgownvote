import React from 'react';
import styled from 'styled-components';
import BaseWrapper from '../components/BaseWrapper';
import SchoolSuggestion from '../components/SchoolSuggestion';
import { GET_SCHOOL_STATS, getSchoolStats } from '../actions';
import {
  selectSchoolItems, selectApiRequest,
} from '../selectors';
import {
  LeaderboardLayout,
  ContentParagraph,
  FlexColumnLayout, LeaderboardRowLayout, PointTitle,
  DarkTitle,
  MiniHeader, colors, baseValue,
} from '../blocks';

const LeftColumn = styled.div`
  display: flex;
  flex: 0 0 calc(66.6% - ${baseValue}px);
  align-items: center;
  justify-content: flex-start;
`;

const RightColumn = styled.div`
  display: flex;
  flex: 0 0 calc(33.3% - ${baseValue}px);
  align-items: center;
  justify-content: center;
`;

const Placement = styled.div`
  display: block;
  position: relative;

  &:after {
    display: block;
    content: '';
    position: absolute;

    width: ${baseValue / 4}px;
    height: 100%;
    top: 0;
    left: -${baseValue}px;

    background-color: ${props => props.color};
  }
`;

const TitleContainer = styled.div`
  display: block;
  padding: 0 ${baseValue}px;
  margin-bottom: ${baseValue}px;
`;

const Leaderboard = (props) => {
  const {
    getSchoolStats, statRequest, rankings,
  } = props;

  if (! statRequest) {
    getSchoolStats();
  }

  const comeBackLater = ! rankings.length;

  const comeBackLaterContent = (
    <ContentParagraph>Cap, Gown, Vote is just getting off the ground though and we haven't run the numbers yet. Check back soon!</ContentParagraph>
  );

  const LeaderboardRows = () => comeBackLater ? comeBackLaterContent : (
    <FlexColumnLayout>
      <LeaderboardRowLayout>
        <LeftColumn>
          <MiniHeader>School</MiniHeader>
        </LeftColumn>
        <RightColumn>
          <MiniHeader>Voter Registrations</MiniHeader>
        </RightColumn>
      </LeaderboardRowLayout>
      {rankings.map((school, index) => {
        const placementColor = (() => {
          switch (index) {
            case 0: return colors.yellow;
            case 1: return colors.silver;
            case 2: return colors.bronze;
            default: return null;
          }
        })();

        const SchoolSuggestionWrapper = () => (
          <SchoolSuggestion schoolId={school.id} disableHover disableIndent uppercase />
        );

        return (
          <LeaderboardRowLayout key={school.id}>
            <LeftColumn>
              {placementColor ? (
                <Placement color={placementColor}>
                  <SchoolSuggestionWrapper />
                </Placement>
              ) : (
                <SchoolSuggestionWrapper />
              )}
            </LeftColumn>
            <RightColumn>
              <PointTitle highlight>{school.points}</PointTitle>
            </RightColumn>
          </LeaderboardRowLayout>
        );
      })}
    </FlexColumnLayout>
  );

  return (
    <LeaderboardLayout>
      <TitleContainer>
        <DarkTitle center>Cap, Gown, Vote! School Leaderboard</DarkTitle>
      </TitleContainer>
      {statRequest && statRequest.isPending ? null : <LeaderboardRows />}
    </LeaderboardLayout>
  );
}

Leaderboard.mapStateToProps = (state, ownProps) => ({
  rankings: Object.keys(selectSchoolItems(state))
    .map(id => selectSchoolItems(state)[id])
    .sort((a, b) => b.points - a.points)
    .filter(school => school.points > 0)
    .splice(0, ownProps.cap || 100),
  statRequest: selectApiRequest(GET_SCHOOL_STATS, state),
});

Leaderboard.actionCreators = {
  getSchoolStats,
};

export default BaseWrapper(Leaderboard);
