import React from 'react';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, TitleBarContainer, Title,
  TitleBar, ContentHeader, ContentParagraph,
  InlineLink, ContentLayout, AltRedButton, baseValue,
} from '../blocks';

const SignupLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${baseValue}px;
`;

const Ambassador = (props) => {
  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title center>Students: Get Your Classmates Registered to Vote with Cap, Gown, Vote!</Title>
        </TitleBar>
      </TitleBarContainer>
      <ContentLayout>
        <ContentParagraph>Thank you for your interest in Cap, Gown Vote!, Let America Vote’s super-simple tool for registering high school students to vote in the 2018 elections. It’s more important than ever for young people to make their voices heard -- and they do that by getting registered and turning out to vote. </ContentParagraph>

        <ContentParagraph>But if you’re reading this, you already know that. You’re here to help. </ContentParagraph>

        <ContentParagraph>You can make a real difference in 2018 by becoming a Cap, Gown, Vote! student ambassador. Below is a step-by-step guide for helping your friends and classmates register to vote. </ContentParagraph>

        <ContentParagraph>If you’re a not a student but still want to help, check out our guide for activists. We also have information about how you can help get young Americans registered to vote <InlineLink href="/activist">here</InlineLink>.</ContentParagraph>

        <ContentParagraph>By partnering with Rock the Vote and tapping available online resources, we’ve made voter registration fast and easy. Just follow the steps below.</ContentParagraph>

        <ContentHeader>1. Sign up</ContentHeader>
        <ContentParagraph>Cap, Gown, Vote! student ambassadors are the most important part of our program. As an ambassador, you’ll help your friends and classmates get registered using our online tool. We’ll keep track of your efforts, so you can see how your school stacks up against high schools all across the country.</ContentParagraph>

        <SignupLayout>
          <InlineLink href="https://www.letamericavote.org/landing/engagement-cgv-ambassadors">
            <AltRedButton>Sign up to become an ambassador</AltRedButton>
          </InlineLink>
        </SignupLayout>

        <ContentHeader>2.Make a plan</ContentHeader>
        <ContentParagraph>Talk to your principal, your favorite teacher or another school official about finding a good time to get your classmates registered to vote using the Cap, Gown, Vote! online tool. </ContentParagraph>

        <ContentParagraph>An event is a great way to get a group of students together to get registered. Work with a teacher or administrator on setting aside a specific time for a meeting, assembly or other voter-registration event. </ContentParagraph>

        <ContentParagraph>But voter registration doesn’t have to be a scheduled thing. You may be able to find time during class or a study period, at lunch, before classes start or after school is out. Registration just a takes a few minutes per voter, so you can do it almost anytime. </ContentParagraph>

        <ContentHeader>3. Help your classmates get registered</ContentHeader>
        <ContentParagraph>Whether you organize an event or just make the rounds at lunch, Cap, Gown, Vote!’s online tool makes registration super easy. </ContentParagraph>

        <ContentParagraph>When you’ve got a classmate who wants to get registered, all you need to do is visit <InlineLink href="/register">Register</InlineLink> -- on a tablet, computer or phone -- and start filling in the blanks. It’s really that easy. </ContentParagraph>

        <ContentParagraph>If you live in a state that has online voter registration, <InlineLink href="/">CapGownVote.org</InlineLink> will redirect you to your state’s online voter registration system to complete the application.</ContentParagraph>

        <ContentParagraph>If you live in a state that does not have online voter registration, you can still register to vote using <InlineLink href="/">CapGownVote.org</InlineLink>. The online tool will show  you how to complete the Federal Voter Registration form, which students will print, sign, and mail to their local election official.</ContentParagraph>

        <ContentParagraph>We’ll keep track of your signups, and registration totals for your school will show up on our Cap, Gown, Vote! Leaderboard.</ContentParagraph>

        <ContentHeader>4. Post on social media</ContentHeader>
        <ContentParagraph>The work you do as a Cap, Gown, Vote! ambassador is a big deal. Connect with your friends and other student ambassadors around the country by posting about your efforts on Twitter, Instagram and Facebook. Be sure to hashtag it #CapGownVote when you post!</ContentParagraph>

        <ContentHeader>Facts and talking points about youth voter registration and participation</ContentHeader>
        <ContentParagraph>*Young people are engaging in politics like never before. In the wake of increased activism around gun violence, the March for Our Lives and National School Walkout movements, a new generation of activists are making their voices heard nationally on the issues they care about, including not just gun violence but also the environment, immigration, health care, college affordability and voting rights, just to name a few.</ContentParagraph>

        <ContentParagraph>*Young voters between the ages of 18 and 29 have the potential to significantly impact the 2018 and 2020 elections, and there are more of them every day: about 22 million Americans will turn 18 by 2020.</ContentParagraph>

        <ContentParagraph>*Historically, though, young voters haven’t turned out in large numbers in midterm elections. In 2014, for example, 58 percent of all young registered voters failed to vote, leaving up to 12.4 million ballots blank. </ContentParagraph>

        <ContentParagraph>*2014 marked the lowest recorded rate of youth voter turnout in the past 40 years. More young voters participated in the 2016 presidential election, with 24 million or 50% of eligible youth casting a ballot.</ContentParagraph>

        <ContentParagraph>*If young voters execute their full power at the ballot box, they have the power to change the outcome of elections. Young people ages 18-29 make up 21% of the eligible voting population in the U.S., and will make up 40% of the eligible U.S. voting population by 2020.</ContentParagraph>

        <ContentParagraph>*Politicians in states like New Hampshire and Arizona recognize the power of the youth vote -- but instead of addressing their concerns they’re trying instead to silence and suppress their votes. Young people are standing up, fighting back, and are uncovering the true motivations behind legislation that attacks the youth vote. </ContentParagraph>

        <ContentParagraph>*There are signs of rising participation. In a recent study by Harvard’s Institute of Politics, 37 percent of Americans under 30 indicated that they will definite vote in the 2018 midterm elections, compared to 23 percent who said the same in 2014, and 31 percent in 2010.</ContentParagraph>

        <ContentParagraph>*Early indications are that youth voter registration is on the rise in 2018, underscoring young people’s political awakening. From February to July, the share of voters nationwide in the 18-to-29 age cohort rose more than 2 percent. Youth registration is increasing all across the country and surging in places as diverse as Pennsylvania, Indiana and Arizona.</ContentParagraph>
      </ContentLayout>
      <PageFooter />
    </Main>
  );
};

export default Ambassador;
