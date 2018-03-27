import React from 'react';
import BaseWrapper from '../components/BaseWrapper';
import PageFooter from '../components/PageFooter';
import PageNav from '../components/PageNav';
import Notification from '../components/Notification';
import StepFrame from '../components/StepFrame';
import Signup from '../components/Signup';
import SchoolSelector from '../components/SchoolSelector';
import Invite from '../components/Invite';
import RegistrationStatus from '../components/RegistrationStatus';
import Rules from '../components/Rules';
import VoterReg from '../components/VoterReg';
import TextSubscribe from '../components/TextSubscribe';
import Mail from '../components/Mail';
import OvrRedirect from '../components/OvrRedirect';
import { selectCurrentStepId, selectIsStepFadeSet } from '../selectors';
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
  CONTINUE_IMPACT_STEP,
  STILL_IMPACT_STEP,
  OVR_STEP,
} from '../stepNames'

const subCopy = `Sign up for Cap, Gown, Vote! and make your high school the most civically engaged in America.`;

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

    case INVITE_SCHOOL_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Add your school to the competition.">
          <Invite />
        </StepFrame>
      );

      break;
    }

    case REGISTRATION_STATUS_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Are you registered to vote?">
          <RegistrationStatus />
        </StepFrame>
      );

      break;
    }

    case RULES_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Are you eligible to vote?">
          <Rules />
        </StepFrame>
      );

      break;
    }

    case OVR_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Complete your voter registration">
          <OvrRedirect />
        </StepFrame>
      );

      break;
    }

    case FORM_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Fill out the remainder of the voter registration form.">
          <VoterReg />
        </StepFrame>
      );

      break;
    }

    case STILL_IMPACT_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="You can still make a difference.">
          <TextSubscribe />
        </StepFrame>
      );

      break;
    }

    case MAIL_FORM_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Mail your voter registration form">
          <Mail />
        </StepFrame>
      );

      break;
    }

    default: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="How did you end up here?" />
      );

      break;
    }
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
