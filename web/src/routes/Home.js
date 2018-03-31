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
  const AboutLink = Link(HomeNavItem, '/about');
  const LeaderboardLink = Link(HomeNavItem, '/stats');

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
              <LeaderboardLink>Stats</LeaderboardLink>
            </HomeNavItemWrapper>
            <HomeNavItemWrapper>
              <AboutLink>About</AboutLink>
            </HomeNavItemWrapper>
          </PaddedArea>
        </CenteredArea>
      </FullPageBackground>
      <PageFooter />
    </Main>
  );
};

export default Home;
