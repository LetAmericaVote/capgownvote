import React from 'react';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, TitleBarContainer, Title,
  TitleBar, ContentHeader, ContentParagraph,
  InlineLink, ContentLayout, ContentTitle,
} from '../blocks';

const Activist = (props) => {
  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title center>How You Can Help Get Young Americans Registered with Cap, Gown, Vote!</Title>
        </TitleBar>
      </TitleBarContainer>
      <ContentLayout>
        <ContentParagraph>Cap, Gown, Vote! is Let America Vote’s initiative partnering with mayors, students and activists across the country to register more eligible high school students ahead of the 2018 election.</ContentParagraph>

        <ContentParagraph>It’s more important than ever for young people to make their voices heard, and we all must do everything we can to help them get registered and out to vote. If you’re an activist who wants to help out, follow the simple steps below to join our effort to get more young people participating in our democracy.</ContentParagraph>

        <ContentParagraph>If you’re a student, see how you can help register people at your school. We have handy information about Cap, Gown, Vote! for students <InlineLink href="https://www.letamericavote.org/landing/engagement-cgv-ambassadors/">here</InlineLink>.</ContentParagraph>

        <ContentHeader>1. Host a voter registration event in your city!</ContentHeader>
        <ContentParagraph>If you want to see more young Americans voting in the midterm elections, grab a clipboard (or an iPad) and go out and register voters.  You can show people how to register online using capgownvote.org.  Going to community colleges, local convenience stores and malls -- places where young folks hang out -- are all good places to start. But, you know your city better than anyone, so find a place where you think young potential voters will be and get them registered! Voter registration laws in each state are different, so please confirm the rules for your state on the secretary of state’s website (Google your state and “secretary of state” and “voter registration”). Once you learn the protocol for your state, head out and register voters! If you have questions, email us at capgownvote@letamericavote.org.</ContentParagraph>

        <ContentHeader>2. Ask your mayor to join Cap, Gown Vote!</ContentHeader>
        <ContentParagraph>We want as many mayors as possible across the country to sign on to Cap, Gown, Vote! and commit to registering their young constituents. Contact your mayor and use our young voter talking points below to recruit them to join our team. If you need assistance with mayoral outreach, please contact capgownvote@letamericavote.org. </ContentParagraph>

        <ContentHeader>3. Help identify student ambassadors in your city.</ContentHeader>
        <ContentParagraph>The success of Cap, Gown, Vote! depends on the involvement of high school student ambassadors around the country. We want excited students leading this effort, and you can help us identify them. Sign up at and we’ll follow up with you on how to recruit student ambassadors in your community. </ContentParagraph>

        <ContentHeader>4. Use your platform.</ContentHeader>
        <ContentParagraph>The more people who know about Cap, Gown, Vote! and understand the importance of youth voter registration, the more successful we’ll be. Use the platform you have on social media and among your friends to talk about youth voter registration and the easy online tools available at capgownvote.org. And don’t forget to use the hashtag #CapGownVote when you post! </ContentParagraph>

        <ContentTitle>Cap, Gown, Vote! Youth Voting Talking Points </ContentTitle>
        <ContentParagraph>Thank you for your interest in Cap, Gown Vote! Let America Vote is working with mayors, students, and activists around the country to increase high school voter registration.</ContentParagraph>

        <ContentParagraph>Below are key facts and talking points about youth voter registration and participation, which may be helpful when encouraging school and community leaders to assist with Cap, Gown, Vote! or when convincing students to get registered.</ContentParagraph>

        <ContentParagraph>If you’re a student, be sure to check out our ambassador how-to, and if you’re an activist looking to help out, please see our activist how-to. We also have a handy Cap, Gown, Vote! <InlineLink href="/faq">FAQ</InlineLink></ContentParagraph>

        <ContentHeader>Facts and talking points about youth voter registration and participation</ContentHeader>
        <ContentParagraph>* Young people are engaging in politics like never before. In the wake of increased activism around gun violence, the March for Our Lives and National School Walkout movements, a new generation of activists are making their voices heard nationally on the issues they care about, including not just gun violence but also the environment, immigration, health care, college affordability and voting rights, just to name a few.</ContentParagraph>

        <ContentParagraph>* Young voters between the ages of 18 and 29 have the potential to significantly impact the 2018 and 2020 elections, and there are more of them every day: about 22 million Americans will turn 18 by 2020.</ContentParagraph>

        <ContentParagraph>* Historically, though, young voters haven’t turned out in large numbers in midterm elections. In 2014, for example, 58 percent of all young registered voters failed to vote, leaving up to 12.4 million ballots blank. </ContentParagraph>

        <ContentParagraph>* 2014 marked the lowest recorded rate of youth voter turnout in the past 40 years. More young voters participated in the 2016 presidential election, with 24 million or 50% of eligible youth casting a ballot.</ContentParagraph>

        <ContentParagraph>* If young voters execute their full power at the ballot box, they have the power to change the outcome of elections. Young people ages 18-29 make up 21% of the eligible voting population in the U.S., and will make up 40% of the eligible U.S. voting population by 2020.</ContentParagraph>

        <ContentParagraph>* Politicians in states like New Hampshire and Arizona recognize the power of the youth vote -- but instead of addressing their concerns they’re trying instead to silence and suppress their votes. Young people are standing up, fighting back, and are uncovering the true motivations behind legislation that attacks the youth vote. </ContentParagraph>

        <ContentParagraph>* There are signs of rising participation. In a recent study by Harvard’s Institute of Politics, 37 percent of Americans under 30 indicated that they will definite vote in the 2018 midterm elections, compared to 23 percent who said the same in 2014, and 31 percent in 2010.</ContentParagraph>

        <ContentParagraph>* Early indications are that youth voter registration is on the rise in 2018, underscoring young people’s political awakening. From February to July, the share of voters nationwide in the 18-to-29 age cohort rose more than 2 percent. Youth registration is increasing all across the country and surging in places as diverse as Pennsylvania, Indiana and Arizona.</ContentParagraph>

        <ContentHeader>Sources and supporting information: </ContentHeader>
        <ContentParagraph>* Youth voters are defined as voters ages 18-29.</ContentParagraph>
        <ContentParagraph>*  The Center for Information & Research on Civic Learning and Engagement (CIRCLE), March 23, 2018, <InlineLink href="https://civicyouth.org/from-parkland-to-the-polls-teen-activism-and-youth-voting-in-2018/">CIRCLE</InlineLink>.</ContentParagraph>
        <ContentParagraph>*  2014 Youth Turnout and Youth Registration Rates Lowest Ever Recorded; Changes Essential in 2016, CIRCLE, <InlineLink href="https://civicyouth.org/2014-youth-turnout-and-youth-registration-rates-lowest-ever-recorded-changes-essential-in-2016/">CIRCLE</InlineLink></ContentParagraph>
        <ContentParagraph>*  Youth Voting, CIRCLE, <InlineLink href="https://civicyouth.org/quick-facts/youth-voting/">Youth Vote</InlineLink></ContentParagraph>
        <ContentParagraph>*  Harvard Institute of Politics Spring 2018 Youth Poll,<InlineLink href="http://iop.harvard.edu/spring-2018-poll">Youth Poll</InlineLink></ContentParagraph>
        <ContentParagraph>*  Analysis: After Parkland Shooting, Youth Voter Registration Surges, <InlineLink href="https://targetsmart.com/news-item/analysis-after-parkland-shooting-youth-voter-registration-surges">Youth Voter Registration Surges</InlineLink></ContentParagraph>
      </ContentLayout>
      <PageFooter />
    </Main>
  );
};

export default Activist;
