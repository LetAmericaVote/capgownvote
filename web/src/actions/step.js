import ReactGA from 'react-ga';
import {
  selectStepFade, selectNextStep,
  selectPreviousStep,
} from '../selectors';

const FADE_LENGTH = 250;

export const SET_FADE_TO = 'SET_FADE_TO';
export function setFadeTo(to) {
  return { type: SET_FADE_TO, to };
}

export const SET_FADE_TIMEOUT_ID = 'SET_FADE_TIMEOUT_ID';
export function setFadeTimeoutId(timeoutId) {
  return { type: SET_FADE_TIMEOUT_ID, timeoutId };
}

export const SET_FADE_START_TIME = 'SET_FADE_START_TIME';
export function setFadeStartTime(startTime) {
  return { type: SET_FADE_START_TIME, startTime };
}

export const CLEAR_FADE = 'CLEAR_FADE';
export function clearFade() {
  return { type: CLEAR_FADE };
}

export const CHANGE_CURRENT_STEP = 'CHANGE_CURRENT_STEP';
export function changeCurrentStep(stepId, shouldScroll) {
  return (dispatch, getState) => {
    const fade = selectStepFade(getState());
    const isFadeInProgress = !! fade.to;

    if (fade.to === stepId) {
      return;
    }

    ReactGA.event({
      category: 'Step',
      action: 'Changed current step',
      label: stepId,
    });

    const delay = (
      isFadeInProgress ? (
        FADE_LENGTH - (Date.now() - new Date(fade.start))
      ) : FADE_LENGTH
    ) || FADE_LENGTH;

    if (isFadeInProgress) {
      clearTimeout(fade.timeoutId);
    }

    dispatch(setFadeTo(stepId));
    dispatch(setFadeStartTime(Date.now()));

    const postFade = () => {
      dispatch({ type: CHANGE_CURRENT_STEP, stepId });
      dispatch(clearFade());

      if (shouldScroll) {
        setTimeout(() => {
          const element = document.getElementById('step-frame');

          if (element) {
            element.scrollIntoView();
          }
        }, 0);
      }
    };

    const timeoutId = setTimeout(postFade.bind(this), delay);
    dispatch(setFadeTimeoutId(timeoutId));
  };
}

export function moveCurrentStepForward() {
  return (dispatch, getState) => {
    const next = selectNextStep(getState());

    if (next && next.id) {
      ReactGA.event({
        category: 'Step',
        action: 'Used button to go forward to step...',
        label: next.id,
      });

      dispatch(changeCurrentStep(next.id));
    }
  };
}

export function moveCurrentStepBackward() {
  return (dispatch, getState) => {
    const next = selectPreviousStep(getState());

    if (next && next.id) {
      ReactGA.event({
        category: 'Step',
        action: 'Used button to go back to step...',
        label: next.id,
      });

      dispatch(changeCurrentStep(next.id));
    }
  };
}

export const SET_STEP_ORDER = 'SET_STEP_ORDER';
export function setStepOrder(order) {
  return { type: SET_STEP_ORDER, order };
}
