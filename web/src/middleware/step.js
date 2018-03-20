import { setStepOrder, changeCurrentStep } from '../actions';
import {
  selectStepIsViewed, selectIsAuthenticated,
  selectStepOrder, selectCurrentStepId,
  selectStepIndex, selectRequiresInvite,
  selectAuthenticatedUserHasSchool,
} from '../selectors';
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

const stepNames = [
  CREATE_USER_STEP,
  FIND_SCHOOL_STEP,
  INVITE_SCHOOL_STEP,
  REGISTRATION_STATUS_STEP,
  RULES_STEP,
  FORM_STEP,
  MAIL_FORM_STEP,
  POST_SIGNUP_STEP,
];

const step = store => next => action => {
  next(action);

  const isAuthenticated = selectIsAuthenticated(store.getState());
  const hasSchool = selectAuthenticatedUserHasSchool(store.getState());
  const requiresInvite = selectRequiresInvite(store.getState());

  const orderData = [
    {
      id: CREATE_USER_STEP,
      isComplete: isAuthenticated,
    },
    {
      id: FIND_SCHOOL_STEP,
      isComplete: hasSchool || requiresInvite,
    },
  ];

  if (selectRequiresInvite(store.getState())) {
    orderData.push({
      id: INVITE_SCHOOL_STEP,
      isComplete: hasSchool,
    });
  }

  const order = orderData.map((step) => ({
    ...step,
    isViewed: selectStepIsViewed(step.id, store.getState()),
  }));

  const originalOrder = selectStepOrder(store.getState());

  const isChanged = (order.length !== originalOrder.length) ||
    !!order.find((step, index) => {
      const compare = originalOrder[index] || {};

      return (step.id !== compare.id) ||
        (step.isComplete !== compare.isComplete);
    });

  if (isChanged) {
    next(setStepOrder(order));
  }

  const currentStepId = selectCurrentStepId(store.getState());
  const hasCurrentStep = !!currentStepId;

  if (! hasCurrentStep) {
    store.dispatch(changeCurrentStep(order[0].id));
  } else {
    const currentStepIndex = selectStepIndex(currentStepId, store.getState());
    const currentStepIsComplete = order[currentStepIndex].isComplete;
    const nextStep = order[currentStepIndex + 1];

    if (currentStepIsComplete && nextStep && ! nextStep.isViewed) {
      store.dispatch(changeCurrentStep(nextStep.id));
    }
  }

  /*

  * In Middleware, on every action,
  *  - recalculate step order based on state
  *  - recalculate the step COMPLETE values.
  *  - automatically advance the user if the current step is complete and the next step has not been viewed. (use action)

  * In StepFrame Component, display the NEXT button if the current step is complete.
  *  - In Step Reducer, advance index by 1 (find the numerical index of the current, add one, get that ID)
  * In StepFrame Component, display the PREVIOUS button if there is a previous step.
  *  - In Step Reducer, subtract index by 1 (find the numerical index of the current, sub one, get that ID)

  * In Step Reducer, set the VIEWED value to true on the step everytime the index advances.

  * In Change Step Index Action,
  *  - if fadee.to != newIndex, cancel old timeout.
  *  - set fade.to = newIndex
  *  - setTimeout() for 500ms (or 500 - start). set fade.timeout = this. set fade.start = Date.now().
  *    - set step index = fade.to
  *    - clear fade settings.

  */
};

export default step;
