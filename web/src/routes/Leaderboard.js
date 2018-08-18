import React from 'react';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import { default as LeaderboardComponent  } from '../components/Leaderboard';
import { Main } from '../blocks';

const Leaderboard = (props) => {
  return (
    <Main>
      <PageNav />
      <LeaderboardComponent />
      <PageFooter />
    </Main>
  );
}

export default Leaderboard;
