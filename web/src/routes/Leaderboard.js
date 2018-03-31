import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, LeaderboardLayout, LeaderboardBackground,
  BorderedBlock,
} from '../blocks';

const Leaderboard = (props) => {
  return (
    <Main>
      <PageNav />
      <LeaderboardBackground>
        <LeaderboardLayout>
          <BorderedBlock>

          </BorderedBlock>
        </LeaderboardLayout>
      </LeaderboardBackground>
      <PageFooter />
    </Main>
  );
}

export default Leaderboard;
