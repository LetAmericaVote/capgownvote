import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import Notification from '../components/Notification'
import StepFrame from '../components/StepFrame';
import Signup from '../components/Signup';
import SchoolSelector from '../components/SchoolSelector';
import { selectCurrentStepId, selectIsStepFadeSet } from '../selectors';
import {
  Main, TitleBar, Title, TitleBarContainer,
  PaddedArea, Subtitle,
} from '../blocks';
import {
  CREATE_USER_STEP,
  FIND_SCHOOL_STEP,
  REGISTRATION_STATUS_STEP,
  RULES_STEP,
  FORM_STEP,
  MAIL_FORM_STEP,
  POST_SIGNUP_STEP,
} from '../stepNames'

const subCopy = `Every student that signs up for Cap, Gown, Vote! gets points for their school, and if you register to vote, you'll earn double the points. We can't legally offer you a prize, but you get to brag about being the most civically engaged high school in America.`;

const Register = (props) => {
  const { currentStep, isFading } = props;

  let ActiveStepComponent = () => null;

  switch (currentStep) {
    case CREATE_USER_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Enter some quick details to get started.">
          <Signup />
        </StepFrame>
      );

      break;
    }

    case FIND_SCHOOL_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Find your school.">
          <SchoolSelector />
        </StepFrame>
      );

      break;
    }

    default: break;
  }

  return (
    <Main>
      <PageNav />
      <TitleBarContainer>
        <TitleBar>
          <Title>Support your school and join Cap, Gown, Vote!</Title>
        </TitleBar>
        <PaddedArea>
          <Subtitle>{subCopy}</Subtitle>
        </PaddedArea>
      </TitleBarContainer>
      <ActiveStepComponent isFading={isFading} />
      <PageFooter />
      <Notification />
    </Main>
  );
};

Register.mapStateToProps = (state) => ({
  currentStep: selectCurrentStepId(state),
  isFading: selectIsStepFadeSet(state),
});

export default BaseWrapper(Register);
