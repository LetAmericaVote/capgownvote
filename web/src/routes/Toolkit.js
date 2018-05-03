import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, TitleBar, Title, TitleBarContainer,
  ContentTitle, ContentParagraph, ContentLayout,
  SimpleLink, ContentHeader,
} from '../blocks';

const copy = {
  intro: [
    `Thank you for your interest in Cap, Gown Vote! Let America Vote is working with mayors, students, and activists around the country to increase high school voter registration.`,
    `This toolkit is a resource you can use if you are a student who would like to assist your peers to register to vote or if you are an activist who wants to increase the number of young people participating in our democracy. Enclosed is general information about the program, frequently asked questions, and talking points about youth participation in elections.`,
  ],
  participate: [
    `Are you a high school student who would like to participate?`,
    `Become a Cap, Gown, Vote! student ambassador.`,
    `Cap, Gown, Vote! student ambassadors are responsible for spearheading the program and helping high school students get registered using our online tool at capgownvote.org.`,
    `Help your classmates register to vote.`,
    `Speak with your principal, teachers or other school administrators about when the best time would be to encourage your classmates to register to vote using the Cap, Gown, Vote! online tool. This can be done in class, at lunch, at an assembly, or during after school activities.`,
    `Once you organize an event at your school, use the online Cap, Gown, Vote! tool to make sure your classmates know how to register. The tool can be found at capgownvote.org. If you live in a state that has online voter registration, capgownvote.org will redirect you to your state online voter registration system for your application to be completed.  It’s easy!`,
    `If you live in a state that does not have online voter registration, you can still register to vote using capgownvote.org. The online tool will show  you how to complete the Federal Voter Registration form, which students will have to print, sign, and mail to their local election official.`,
    `Post on social media!`,
    `Connect with your friends and other student ambassadors around the country by posting on Twitter, Instagram, and Facebook. Be sure to use #CapGownVote when you post!`,
  ],
  activist: [
    `Are you an activist who wants to help?`,
    `Help identify student ambassadors in your city.`,
    `The success of Cap, Gown, Vote! rests on the involvement of high school student ambassadors around the country. We want excited students to lead this effort in their schools to help register their peers and we need assistance identifying these students.`,
    `Help Cap, Gown, Vote! student ambassadors learn the voter registration rules in your state.`,
    `You can help our student ambassadors by providing state specific information and resources about voter registration requirements and deadlines.`,
    `Advocate for your mayor to sign-on to Cap, Gown Vote! in your city.`,
    `We would like as many mayors as possible across the country to sign-on to Cap, Gown, Vote! and commit to ensuring their young constituents have the tools to get registered. Contact your mayor and ask her/him to sign on to Cap, Gown, Vote! Use the talking points in this toolkit to emphasize the importance of high school voter registration in the meeting.`,
  ],
  faq: [
    `Frequently asked questions about Cap, Gown, Vote!`,
    `Do I need to be 18 to register to vote? How do I know if I am eligible?`,
    `The voter registration age requirement varies by state, but most states allow individuals who will be 18 by the next election to register to vote. Some states do have a minimum age requirement to register to vote (for example you may have to be 17 ½ years of age).`,
    `How do I find the voter registration deadlines for the 2018 primary and general elections?`,
    `I noticed that Cap, Gown, Vote! initially launched in nine cities (Reno, Birmingham, Milwaukee, Chattanooga, Nashua, Manchester, Tampa, St. Louis and Kansas City).  I don’t live in any of these cities, can I still participate?`,
    `Yes! If you don’t live in any of the nine initial cities that have agreed to sign on to Cap, Gown, Vote!, that is OK!  You can still sign up your high school and help your classmates register using the online tool.`,
    `I live in a state that doesn’t have online voter registration, can I still participate?`,
    `Yes! The capgownvote.org website will have you complete the Federal Voter Registration form. The Federal Voter Registration form will need to be printed, signed, and mailed to your local election official.`,
    `I live in a state that requires voter registration groups to register with the state before they can register voters. Can I still participate in the program?`,
    `Yes, you can! By using the tool, people will be submitting their form themselves. The training requirements in many states are triggered by the volunteers reviewing and delivering people's forms for them, so giving people a tablet or computer to use to register at capgownvote.org (for people to register themselves) is permissible.`,
    `I live in a state with restrictive registration laws, can I still participate?`,
    `States like New Hampshire have strict laws around voter registration. In that case, the best thing to do would be to contact your mayor and local election clerk to see if they can register students at your high school at an in-person event.`,
    `Is the program partisan?`,
    `The program is nonpartisan. Any student can use our online tool to register regardless of political affiliation.`,
    `How does someone who registered using Cap, Gown, Vote! know their registration is processed?`,
    `The Cap, Gown, Vote! tool is used to assist individuals with registering to vote. In most instances, the tool will redirect students to the state online voter registration system where they will complete the registration process. To ensure a registration is processed, individuals should follow up with their local election official for confirmation.`,
    `There are other groups at my high school registering students, should I still participate in Cap, Gown, Vote?`,
    `Cap, Gown, Vote! encourages students to lead, take initiative, and help their classmates register to vote. Instead of a stranger from an outside organization registering high school students to vote, student ambassadors who have shared experiences with their peers, will encourage them to register, participate, and have a say in the issues they care about.`,
    `What happens if my mayor doesn’t want to participate in the program?`,
    `You can still participate! If your mayor doesn’t want to participate in the program, that is OK! You can sign up to be a student ambassador and register your classmates in any city using our online tool.`,
    `Who do I contact if I have more questions?`,
    `Send an email to capgownvote@letamericavote.org, we will be in touch as soon as we can.`,
  ],
  fact: [
    `Facts and talking points about youth voter registration and participation`,
    `- Young voters between the ages of 18 and 29 have the potential to significantly impact the 2018 and 2020 elections, and a whopping 22 million teens will turn 18 by 2020.`,
    `- In the wake of increased activism around gun violence, the March for Our Lives and national school walkouts, a new generation of activists are making their voices heard nationally on the issues they care about including the economy, environment, gun control, immigration, healthcare, college affordability, and voting rights -- just to name a few.`,
    `- Historically, young voters haven’t turned out in large numbers in midterm elections. In 2014, for example, 58 percent of all young registered voters failed to vote, leaving up to 12.4 million ballots blank.  This was the lowest recorded rate of youth voter turnout in the past 40 years.  More young voters participated in the 2016 presidential election, with 24 million or 50% of eligible youth casting a ballot.`,
    `- If young voters execute their full power at the ballot box, they have the power to change the outcome of elections. Young people ages 18-29 make up 21% of the eligible voting population in the U.S., and are expected to make up 40% of the eligible U.S. voting population by 2020.`,
    `- Politicians in states like New Hampshire and Arizona recognize the power of the youth vote -- but instead of addressing their concerns they’re trying instead to silence and suppress their votes. Young people are standing up, fighting back, and are uncovering the true motivations behind legislation that attacks the youth vote. In a recent study by Harvard’s Institute of Politics, “37% of Americans under 30 indicat[e] that they will ‘definitely be voting,’ [in the 2018 midterm elections] compared to 23% who said the same in 2014, and 31 percent in 2010.”`,
  ],
};

const About = (props) => {
  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title>Cap, Gown, Vote Toolkit</Title>
        </TitleBar>
      </TitleBarContainer>
      <ContentLayout>
        <ContentParagraph>{copy.intro[0]}</ContentParagraph>
        <ContentParagraph>{copy.intro[1]}</ContentParagraph>

        <ContentTitle>{copy.participate[0]}</ContentTitle>
        <ContentHeader>{copy.participate[1]}</ContentHeader>
        <ContentParagraph>{copy.participate[2]}</ContentParagraph>
        <SimpleLink href="https://letamericavote.org/CGVAmbassador">Register to become an ambassador</SimpleLink>
        <ContentHeader>{copy.participate[3]}</ContentHeader>
        <ContentParagraph>{copy.participate[4]}</ContentParagraph>
        <SimpleLink href="https://ballotpedia.org/Online_voter_registration">Check if your state has online voter registration</SimpleLink>
        <ContentParagraph>{copy.participate[5]}</ContentParagraph>
        <ContentParagraph>{copy.participate[6]}</ContentParagraph>
        <ContentHeader>{copy.participate[7]}</ContentHeader>
        <ContentParagraph>{copy.participate[8]}</ContentParagraph>

        <ContentTitle>{copy.activist[0]}</ContentTitle>
        <ContentHeader>{copy.activist[1]}</ContentHeader>
        <ContentParagraph>{copy.activist[2]}</ContentParagraph>
        <SimpleLink href="https://letamericavote.org/CGVAmbassador">To help us identify student ambassadors please go to: letamericavote.org/FindCGVAmbassadors.</SimpleLink>
        <ContentHeader>{copy.activist[3]}</ContentHeader>
        <ContentParagraph>{copy.activist[4]}</ContentParagraph>
        <ContentHeader>{copy.activist[5]}</ContentHeader>
        <ContentParagraph>{copy.activist[6]}</ContentParagraph>
        <SimpleLink href="mailto:capgownvote@letamericavote.org">If you need assistance with mayoral outreach, please contact capgownvote@letamericavote.org</SimpleLink>

        <ContentTitle>{copy.faq[0]}</ContentTitle>
        <ContentHeader>{copy.faq[1]}</ContentHeader>
        <ContentParagraph>{copy.faq[2]}</ContentParagraph>
        <SimpleLink href="https://www.rockthevote.org/voting-information/">Check out Rock the Vote’s Election Center for the voter registration eligibility requirements in your state.</SimpleLink>
        <ContentHeader>{copy.faq[3]}</ContentHeader>
        <SimpleLink href="https://www.rockthevote.org/voting-information/">Rock the Vote’s Election Center has voter registration deadline information for each state.</SimpleLink>
        <ContentHeader>{copy.faq[4]}</ContentHeader>
        <ContentParagraph>{copy.faq[5]}</ContentParagraph>
        <ContentHeader>{copy.faq[6]}</ContentHeader>
        <ContentParagraph>{copy.faq[7]}</ContentParagraph>
        <ContentHeader>{copy.faq[8]}</ContentHeader>
        <ContentParagraph>{copy.faq[9]}</ContentParagraph>
        <ContentHeader>{copy.faq[10]}</ContentHeader>
        <ContentParagraph>{copy.faq[11]}</ContentParagraph>
        <ContentHeader>{copy.faq[12]}</ContentHeader>
        <ContentParagraph>{copy.faq[13]}</ContentParagraph>
        <ContentHeader>{copy.faq[14]}</ContentHeader>
        <ContentParagraph>{copy.faq[15]}</ContentParagraph>
        <ContentHeader>{copy.faq[16]}</ContentHeader>
        <ContentParagraph>{copy.faq[17]}</ContentParagraph>
        <ContentHeader>{copy.faq[18]}</ContentHeader>
        <ContentParagraph>{copy.faq[19]}</ContentParagraph>
        <ContentHeader>{copy.faq[20]}</ContentHeader>
        <ContentParagraph>{copy.faq[21]}</ContentParagraph>

        <ContentTitle>{copy.fact[0]}</ContentTitle>
        <ContentParagraph>{copy.fact[1]}</ContentParagraph>
        <ContentParagraph>{copy.fact[2]}</ContentParagraph>
        <ContentParagraph>{copy.fact[3]}</ContentParagraph>
        <ContentParagraph>{copy.fact[4]}</ContentParagraph>
        <ContentParagraph>{copy.fact[5]}</ContentParagraph>
        <ContentParagraph>{copy.fact[6]}</ContentParagraph>
        {/* download for sources */}

        <ContentHeader>Photo Credits</ContentHeader>
        <ContentParagraph>Photos by Stephanie McCabe & Caleb Woods on Unsplash</ContentParagraph>
      </ContentLayout>
      <PageFooter />
    </Main>
  );
};

export default BaseWrapper(About);
