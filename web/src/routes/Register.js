import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import StepFrame from '../components/StepFrame';
import Signup from '../components/Signup';
import SchoolSelector from '../components/SchoolSelector';
import { selectActiveStep, selectStepisFading } from '../selectors';
import {
  Main, TitleBar, Title, TitleBarContainer,
  PaddedArea, Subtitle,
} from '../blocks';
import {
  CREATE_USER_STEP,
  FIND_SCHOOL_STEP,
  INVITE_SCHOOL_STEP,
  REGISTRATION_STATUS_STEP,
  RULES_STEP,
  FORM_STEP,
  MAIL_FORM_STEP,
  POST_SIGNUP_STEP,
} from '../stepNames'

const Register = (props) => {
  const { activeStep, isFading } = props;

  let ActiveStepComponent = () => null;

  switch (activeStep) {
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
          <Subtitle>Every student that signs up gets points for their school, and if you register to vote you'll earn double the points.</Subtitle>
        </PaddedArea>
      </TitleBarContainer>
      <ActiveStepComponent isFading={isFading} />
      <PageFooter />
    </Main>
  );
};

Register.mapStateToProps = (state) => ({
  activeStep: selectActiveStep(state),
  isFading: selectStepisFading(state),
});

export default BaseWrapper(Register);
