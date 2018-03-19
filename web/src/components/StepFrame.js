import React from 'react';
import BaseWrapper from './BaseWrapper';
import { previousStep, disableBackLock } from '../actions';
import {
  selectHasPreviousSteps, selectHasStepBackLock,
} from '../selectors';
import {
  StepFrameLayout, StepFrameLayoutPart,
  StepTitle, StepBackButton,
} from '../blocks';

const StepFrame = (props) => {
  const {
    title, children, isFading, hasPreviousStep,
    previousStep, disableBackLock, hasBackLock,
  } = props;

  const onNext = () => {
    disableBackLock();
    previousStep(); // this is enabling the back lock.
  };

  return (
    <StepFrameLayout isFading={isFading}>
      <StepFrameLayoutPart>
        <StepTitle>{title}</StepTitle>
        {hasPreviousStep ? (
          <StepBackButton onClick={previousStep}>&larr; Go Back</StepBackButton>
        ) : null}
        {hasBackLock ? (
          <StepBackButton onClick={onNext}>Next &rarr;</StepBackButton>
        ) : null}
      </StepFrameLayoutPart>
      <StepFrameLayoutPart>
        {children}
      </StepFrameLayoutPart>
    </StepFrameLayout>
  );
};

StepFrame.mapStateToProps = (state) => ({
  hasPreviousStep: selectHasPreviousSteps(state),
  hasBackLock: selectHasStepBackLock(state),
});

StepFrame.actionCreators = {
  previousStep, disableBackLock,
};

export default BaseWrapper(StepFrame);
