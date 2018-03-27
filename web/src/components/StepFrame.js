import React from 'react';
import BaseWrapper from './BaseWrapper';
import Reminder from './Reminder';
import {
  moveCurrentStepForward, moveCurrentStepBackward,
} from '../actions';
import {
  selectHasPreviousStep, selectHasNextStep,
} from '../selectors';
import {
  StepFrameLayout, StepFrameLayoutPart,
  StepTitle, StepBackButton, StepSticky,
  FlexColumnLayout,
} from '../blocks';

const StepFrame = (props) => {
  const {
    title, children, isFading, hasPreviousStep,
    hasNextStep, moveCurrentStepForward,
    moveCurrentStepBackward, showReminder,
  } = props;

  return (
    <FlexColumnLayout id="step-frame">
      {showReminder ? (<Reminder />) : null}
      <StepFrameLayout isFading={isFading}>
        <StepFrameLayoutPart>
          <StepSticky>
            <StepTitle>{title}</StepTitle>
            {hasPreviousStep ? (
              <StepBackButton onClick={moveCurrentStepBackward}>&larr; Go Back</StepBackButton>
            ) : null}
            {hasNextStep ? (
              <StepBackButton onClick={moveCurrentStepForward}>Next &rarr;</StepBackButton>
            ) : null}
          </StepSticky>
        </StepFrameLayoutPart>
        <StepFrameLayoutPart>
          {children}
        </StepFrameLayoutPart>
      </StepFrameLayout>
    </FlexColumnLayout>
  );
};

StepFrame.mapStateToProps = (state) => ({
  hasPreviousStep: selectHasPreviousStep(state),
  hasNextStep: selectHasNextStep(state),
});

StepFrame.actionCreators = {
  moveCurrentStepForward, moveCurrentStepBackward,
};

export default BaseWrapper(StepFrame);
