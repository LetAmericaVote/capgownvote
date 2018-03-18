import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, TitleBar, Title, TitleBarContainer,
  ContentParagraph, ContentLayout, ContentHeader,
} from '../blocks';

const About = (props) => {
  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title>About Cap, Gown, Vote!</Title>
        </TitleBar>
      </TitleBarContainer>
      <ContentLayout>
        <ContentHeader>What is the Cap, Gown, Vote! initiative?</ContentHeader>
        <ContentParagraph>In Spring 2018, Let America Vote is launching Cap, Gown, Vote! in cities across the country in partnership with Mayors. Cap, Gown, Vote! is an initiative aimed at increasing voter registration among high school students.</ContentParagraph>
        <ContentHeader>What is the purpose?</ContentHeader>
        <ContentParagraph>Being civically engaged is crucial to having a vibrant democracy. Research shows that when young people learn the voting process and vote, they are more likely to do so when they are older.</ContentParagraph>
        <ContentHeader>How does it work?</ContentHeader>
        <ContentParagraph>Let America Vote will contact high schools in your city to identify and recruit student ambassadors. If you know of any particular schools that would be interested in participating, please let us know. After we sign up schools and identify student ambassadors, we will work with them to organize voter registration drives using our online tool to register eligible students.</ContentParagraph>
        <ContentHeader>Who do I contact if I have additional questions and if I would like my city to participate?</ContentHeader>
        <ContentParagraph>Please contact info@letamericavote.org.</ContentParagraph>
        <ContentHeader>Photo Credits</ContentHeader>
        <ContentParagraph>Photos by Stephanie McCabe & Caleb Woods on Unsplash</ContentParagraph>
      </ContentLayout>
      <PageFooter />
    </Main>
  );
};

export default BaseWrapper(About);
