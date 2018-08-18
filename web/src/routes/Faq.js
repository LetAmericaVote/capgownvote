import React from 'react';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import {
  Main, TitleBarContainer, Title,
  TitleBar, ContentHeader, ContentParagraph,
  InlineLink, ContentLayout,
} from '../blocks';

const Faq = (props) => {
  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title center>Cap, Gown, Vote! FAQ</Title>
        </TitleBar>
      </TitleBarContainer>
      <ContentLayout>
        <ContentParagraph>Cap, Gown, Vote! is Let America Vote’s initiative partnering with mayors, students and activists across the country to get high-school seniors registered to vote ahead of the 2018 election.</ContentParagraph>

        <ContentParagraph>Below are several frequently asked questions about the program and how to get involved. </ContentParagraph>

        <ContentParagraph>If you’re a student, make sure to check out our ambassador how-to, and if you’re an activist who wants to help out, here’s our activist how-to. We also have talking points on youth voter participation: <InlineLink href="https://www.letamericavote.org/CGVAmbassador"> CGV Ambassador</InlineLink></ContentParagraph>

        <ContentHeader>1. Do I need to be 18 to register to vote? How do I know if I am eligible?</ContentHeader>
        <ContentParagraph>The voter-registration age requirement varies by state, but most states allow individuals who will be 18 by the next election to register to vote. Some states do have a minimum age requirement to register to vote (for example, you may have to be 17 ½ years of age). Check out Rock the Vote’s Election Center for the voter registration eligibility requirements in your state.</ContentParagraph>

        <ContentHeader>2. How do I find the voter-registration deadlines for the 2018 primary and general elections?</ContentHeader>
        <ContentParagraph>Rock the Vote’s Election Center has voter registration deadline information for each state.</ContentParagraph>

        <ContentHeader>3. I noticed that Cap, Gown, Vote! has partnered with mayors in several cities. Can I still participate even if I don’t live in any of these cities?</ContentHeader>
        <ContentParagraph>Absolutely! If you don’t live in any of the cities that have signed on to Cap, Gown, Vote!, that is OK!  You can still become an ambassador and help your classmates register using the online tool.</ContentParagraph>

        <ContentHeader>4. I live in a state that doesn’t have online voter registration. Can I still participate?</ContentHeader>
        <ContentParagraph>Yes! The registration form at capgownvote.org will direct you to complete the Federal Voter Registration form. The Federal Voter Registration form will need to be printed, signed, and mailed to your local election official.</ContentParagraph>

        <ContentHeader>5. I live in a state that requires voter-registration groups to register with the state before they can register voters. Can I still participate in the program?</ContentHeader>
        <ContentParagraph>Yes,  you can! By using the tool, people will be submitting the form themselves. The training requirements in many states are triggered by volunteers reviewing and delivering people's forms for them, so giving someone a tablet or computer to use to register themselves via capgownvote.org is permissible.</ContentParagraph>

        <ContentHeader>6. I live in a state with restrictive registration laws, can I still participate?</ContentHeader>
        <ContentParagraph>States like New Hampshire have strict laws around voter registration.  In that case, the best thing to do is to ask your mayor or local election clerk to hold an in-person registration drive at your high school.</ContentParagraph>

        <ContentHeader>7. Is Cap, Gown, Vote! partisan?</ContentHeader>
        <ContentParagraph>No, Cap, Gown, Vote! is nonpartisan. Any student can use our online tool to register their classmates regardless of political affiliation. We believe all eligible voters should be able to cast a ballot and participate in our democracy.</ContentParagraph>

        <ContentHeader>8. How does someone who registered using Cap, Gown, Vote! know their registration has been processed?</ContentHeader>
        <ContentParagraph>The Cap, Gown, Vote! tool is used to assist individuals with registering to vote. In most instances, the tool will redirect students to their state’s online voter registration system to complete the registration process. To ensure a registration is processed, individuals should follow up with their local election official for confirmation.</ContentParagraph>

        <ContentHeader>9. There are other groups at my high school registering students. Should I still participate in Cap, Gown, Vote?</ContentHeader>
        <ContentParagraph>Cap, Gown, Vote! encourages students to take the lead in helping their classmates register to vote. We believe student ambassadors who have existing relationships and shared experiences with their peers are much more effective than outside organizations at encouraging students to register to vote and turnout on Election Day.</ContentParagraph>

        <ContentHeader>10. Who do I contact if I have more questions?</ContentHeader>
        <ContentParagraph>Send an email to capgownvote@letamericavote.org, we will be in touch as soon as we can.</ContentParagraph>
      </ContentLayout>
      <PageFooter />
    </Main>
  );
};

export default Faq;
