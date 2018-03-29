import { setStepOrder, changeCurrentStep } from '../actions';
import {
  selectStepIsViewed, selectIsAuthenticated,
  selectStepOrder, selectCurrentStepId,
  selectStepIndex, selectRequiresInvite,
  selectAuthenticatedUser,
  selectAuthenticatedUserHasSchool,
  selectAuthenticatedUserIsRegistered,
  selectAuthenticatedUserIsEligible,
  selectAuthenticatedUserHasPdf,
  selectAuthenticatedUserHasStateOvr,
  selectAuthenticatedUserHasStateLicense,
  selectAuthenticatedUserOvrRequiresLicense,
  selectAuthenticatedUserCustomRegistrationMessage,
} from '../selectors';
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
  CUSTOM_MESSAGE_STEP,
} from '../stepNames'

const step = store => next => action => {
  next(action);

  const user = selectAuthenticatedUser(store.getState());
  const isAuthenticated = selectIsAuthenticated(store.getState());
  const hasSchool = selectAuthenticatedUserHasSchool(store.getState());
  const requiresInvite = selectRequiresInvite(store.getState());
  const isRegistered = selectAuthenticatedUserIsRegistered(store.getState());
  const isEligible = selectAuthenticatedUserIsEligible(store.getState());
  const hasPdf = selectAuthenticatedUserHasPdf(store.getState());
  const hasOvr = selectAuthenticatedUserHasStateOvr(store.getState());
  const hasStateLicense = selectAuthenticatedUserHasStateLicense(store.getState());
  const ovrRequiresLicense = selectAuthenticatedUserOvrRequiresLicense(store.getState());
  const customRegistrationMessage = selectAuthenticatedUserCustomRegistrationMessage(store.getState());

  const ovrIsAvailable = isEligible && hasOvr &&
    (ovrRequiresLicense ? hasStateLicense : true);

  const orderData = [
    {
      id: CREATE_USER_STEP,
      isComplete: !!user.id && isAuthenticated,
    },
    {
      id: FIND_SCHOOL_STEP,
      isComplete: hasSchool || requiresInvite,
    },
  ];

  if (customRegistrationMessage) {
    orderData.push({
      id: CUSTOM_MESSAGE_STEP,
      isComplete: false,
    });
  }

  if (requiresInvite) {
    orderData.push({
      id: INVITE_SCHOOL_STEP,
      isComplete: hasSchool,
    });
  }

  if (hasSchool) {
    orderData.push({
      id: REGISTRATION_STATUS_STEP,
      isComplete: typeof isRegistered === 'boolean',
    });
  }

  if (isRegistered && ! hasPdf) {
    orderData.push({
      id: STILL_IMPACT_STEP,
      isComplete: false,
    });
  }

  if (typeof isRegistered === 'boolean' && ! isRegistered) {
    orderData.push({
      id: RULES_STEP,
      isComplete: typeof isEligible === 'boolean',
    });
  }

  if (ovrIsAvailable) {
    orderData.push({
      id: OVR_STEP,
      isComplete: false,
    });
  }

  if (isEligible && ! ovrIsAvailable) {
    orderData.push({
      id: FORM_STEP,
      isComplete: isRegistered,
    });
  }

  if (typeof isEligible === 'boolean' && ! isEligible) {
    orderData.push({
      id: STILL_IMPACT_STEP,
      isComplete: false,
    });
  }

  if (isRegistered && hasPdf) {
    orderData.push({
      id: MAIL_FORM_STEP,
      isComplete: false,
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

  function getActiveStep(startId, respectIsViewed) {
    const currentStepIndex = selectStepIndex(startId, store.getState());
    const currentStep = selectStepOrder(store.getState())[currentStepIndex];

    if (! currentStep) {
      return startId;
    }

    const currentStepIsComplete = currentStep.isComplete;
    const nextStep = selectStepOrder(store.getState())[currentStepIndex + 1];

    if (! currentStepIsComplete) {
      return startId;
    }

    if (nextStep && respectIsViewed && nextStep.isViewed) {
      return startId;
    }

    if (nextStep && respectIsViewed && ! nextStep.isViewed) {
      return getActiveStep(nextStep.id, respectIsViewed);
    }

    if (nextStep) {
      return getActiveStep(nextStep.id, respectIsViewed);
    }

    return startId;
  }

  const startId = hasCurrentStep ? currentStepId : order[0].id;
  const activeStep = getActiveStep(startId, hasCurrentStep);
  if (activeStep !== currentStepId) {
    store.dispatch(changeCurrentStep(activeStep, hasCurrentStep));
  }
};

export default step;
