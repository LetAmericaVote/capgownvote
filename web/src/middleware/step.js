import { setActiveStep, setIsFading } from '../actions';
import {
  selectActiveStep, selectHasUser, selectIsAuthenticated,
  selectAuthId, selectHasActiveStep, selectUserHasSchool,
  selectHasStepBackLock, selectStepisFading,
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

const step = store => next => action => {
  next(action);

  const getState = () => store.getState();
  const hasActiveStep = selectHasActiveStep(getState());

  const setStepWrapper = (stepName) => {
    const isNotSameStep = () => selectActiveStep(getState()) !== stepName;
    const hasBackLock = selectHasStepBackLock(getState());

    if (! hasActiveStep) {
      return next(setActiveStep(stepName));
    }

    if (isNotSameStep() && hasActiveStep && ! hasBackLock) {
      if (! selectStepisFading(getState())) {
        next(setIsFading(true));
      }

      setTimeout(() => {
        if (selectStepisFading(getState())) {
          next(setIsFading(false));
        }

        if (isNotSameStep()) {
          next(setActiveStep(stepName));
        }
      }, 500);
    }
  };

  const hasUser = selectHasUser(selectAuthId(getState()), getState());
  const isAuthenticated = selectIsAuthenticated(getState());
  const hasSchool = selectUserHasSchool(selectAuthId(getState()), getState());

  if (! hasUser || ! isAuthenticated) {
    setStepWrapper(CREATE_USER_STEP);
  } else if (! hasSchool) {
    setStepWrapper(FIND_SCHOOL_STEP);
  }
};

export default step;
