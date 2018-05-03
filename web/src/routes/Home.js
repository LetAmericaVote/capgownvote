import React from 'react';
import Link from '../routing/Link';
import PageFooter from '../components/PageFooter';
import {
  Main, FullPageBackground, CenteredArea,
  PaddedArea, ClearButton, Title,
  HomeNavItem, HomeNavItemWrapper, TitleEmphasize
} from '../blocks';

const Home = (props) => {
  const RegisterLink = Link(ClearButton, '/register');
  const AboutLink = Link(HomeNavItem, '/toolkit');
  const LeaderboardLink = Link(HomeNavItem, '/leaderboard');

  return (
    <Main>
      <FullPageBackground>
        <CenteredArea>
          <PaddedArea>
            <Title>Cap, Gown, <TitleEmphasize>Vote!</TitleEmphasize></Title>
            <PaddedArea />
            <RegisterLink>Register To Vote</RegisterLink>
            <PaddedArea />
            <HomeNavItemWrapper>
              <AboutLink>Toolkit</AboutLink>
            </HomeNavItemWrapper>
            <HomeNavItemWrapper>
              <LeaderboardLink>Leaderboard</LeaderboardLink>
            </HomeNavItemWrapper>
          </PaddedArea>
        </CenteredArea>
      </FullPageBackground>
      <PageFooter />
    </Main>
  );
};

export default Home;
