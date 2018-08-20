import React from 'react';
import styled from 'styled-components';
import Link from '../routing/Link';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import Leaderboard from '../components/Leaderboard';
import {
  Main, FullPageBackground, CenteredArea,
  PaddedArea, DoublePaddedArea, RedButton,
  LargeTitle, Thesis, Quote, QuoteAuthor,
  QuoteContainer, DarkLargeTitle, Card,
  CardContent, CardLayout, CardImage,
  CardHeader, CardCopy, AltRedButton,
  HomeContentContainer,
} from '../blocks';
import activistPhoto from '../assets/activist.jpg';
import drivePhoto from '../assets/drive.jpg';
import votingPhoto from '../assets/voting.jpg';

const RegisterContainer = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const Home = (props) => {
  const RegisterLink = Link(RedButton, '/register');
  const LeaderboardRegisterLink = Link(AltRedButton, '/register');
  const RegisterCard = Link(Card, '/register');
  const AmbassadorCard = Link(Card, '/ambassador');
  const ActivistCard = Link(Card, '/activist');

  return (
    <Main>
      <PageNav isFloated isInverted />
      <FullPageBackground>
        <CenteredArea>
          <DoublePaddedArea>
            <PaddedArea>
              <Thesis center>Young Americans have the opportunity to get registered and have their voices heard at the ballot box.</Thesis>
            </PaddedArea>
            <LargeTitle center>Register To Vote</LargeTitle>
            <PaddedArea />
            <RegisterContainer>
              <RegisterLink>Register Now</RegisterLink>
            </RegisterContainer>
          </DoublePaddedArea>
        </CenteredArea>
      </FullPageBackground>
      <QuoteContainer>
        <Quote>"What I try to tell young people is that if you come together with a mission, and its grounded with love and a sense of community, you can make the impossible possible."</Quote>
        <QuoteAuthor>-Rep. John Lewis</QuoteAuthor>
      </QuoteContainer>
      <HomeContentContainer>
        <PaddedArea />
        <DarkLargeTitle>Take Action.</DarkLargeTitle>
        <DoublePaddedArea />
        <CardLayout>
          <RegisterCard>
            <CardImage src={votingPhoto} />
            <CardContent>
              <CardHeader>Register to vote</CardHeader>
              <CardCopy>Do you want to create political change? Then get registered and cast your ballot in the 2018 November election.</CardCopy>
            </CardContent>
          </RegisterCard>
          <AmbassadorCard>
            <CardImage src={drivePhoto} />
            <CardContent>
              <CardHeader>Run a school voter registration drive</CardHeader>
              <CardCopy>Cap, Gown, Vote! student ambassadors are the most important part of our program. As an ambassador, you’ll help your friends and classmates get registered using our online tool. We’ll keep track of your efforts, so you can see how your school stacks up against high schools all across the country.</CardCopy>
            </CardContent>
          </AmbassadorCard>
          <ActivistCard>
            <CardImage src={activistPhoto} />
            <CardContent>
              <CardHeader>Help protect voting rights</CardHeader>
              <CardCopy>It’s more important than ever for young people to make their voices heard, and we all must do everything we can to help them get registered and out to vote. If you’re an activist who wants to help out, follow the simple steps here to join our effort to get more young people participating in our democracy.</CardCopy>
            </CardContent>
          </ActivistCard>
        </CardLayout>
        <DoublePaddedArea />
        <Leaderboard cap="5" />
        <RegisterContainer>
          <CardCopy>What are you waiting for? Get your school on the leaderboard.</CardCopy>
          <PaddedArea />
          <LeaderboardRegisterLink>Register Now</LeaderboardRegisterLink>
        </RegisterContainer>
        <DoublePaddedArea />
      </HomeContentContainer>
      <PageFooter />
    </Main>
  );
};

export default Home;
