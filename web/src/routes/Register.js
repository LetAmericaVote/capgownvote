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
import CustomStepMessage from '../components/CustomStepMessage';
import Thanks from '../components/Thanks';
import { selectCurrentStepId, selectIsStepFadeSet } from '../selectors';
import {
  Main, TitleBar, Title, TitleBarContainer,
  Warning, InlineLink,
} from '../blocks';
import {
  CREATE_USER_STEP,
  FIND_SCHOOL_STEP,
  INVITE_SCHOOL_STEP,
  REGISTRATION_STATUS_STEP,
  RULES_STEP,
  FORM_STEP,
  MAIL_FORM_STEP,
  STILL_IMPACT_STEP,
  OVR_STEP,
  CUSTOM_MESSAGE_STEP,
  THANKS_STEP,
} from '../stepNames'

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
        <StepFrame {...props} showReminder title="Complete your voter registration">
          <OvrRedirect />
        </StepFrame>
      );

      break;
    }

    case FORM_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} showReminder title="Fill out the remainder of the voter registration form.">
          <VoterReg />
        </StepFrame>
      );

      break;
    }

    case STILL_IMPACT_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Awesome - make sure your friends are registered to vote and don't forget to cast your ballot this November.">
          <Thanks />
        </StepFrame>
      );

      break;
      // ActiveStepComponent = (props) => (
      //   <StepFrame {...props} title="You can still make a difference.">
      //     <TextSubscribe />
      //   </StepFrame>
      // );
      //
      // break;
    }

    case MAIL_FORM_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Mail your voter registration form">
          <Mail />
        </StepFrame>
      );

      break;
    }

    case CUSTOM_MESSAGE_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="You can still make a difference.">
          <CustomStepMessage />
          <TextSubscribe />
        </StepFrame>
      );

      break;
    }

    case THANKS_STEP: {
      ActiveStepComponent = (props) => (
        <StepFrame {...props} title="Thanks! You've filled out everything.">
          <Thanks />
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
          <Title center>Register to vote</Title>
        </TitleBar>
        <Warning>Have questions about registering to vote? <InlineLink href="/faq">Checkout our FAQ</InlineLink></Warning>
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
