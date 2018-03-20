import React from 'react';
import BaseWrapper from './BaseWrapper';
import {
  moveCurrentStepForward, moveCurrentStepBackward,
} from '../actions';
import {
  selectHasPreviousStep, selectHasNextStep,
} from '../selectors';
import {
  StepFrameLayout, StepFrameLayoutPart,
  StepTitle, StepBackButton, StepSticky,
} from '../blocks';

const StepFrame = (props) => {
  const {
    title, children, isFading, hasPreviousStep,
    hasNextStep, moveCurrentStepForward,
    moveCurrentStepBackward,
  } = props;

  return (
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
