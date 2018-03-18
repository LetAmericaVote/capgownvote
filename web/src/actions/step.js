export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export function setActiveStep(stepName) {
  return { type: SET_ACTIVE_STEP, stepName };
}

export const GO_BACK_TO_PREVIOUS_STEP = 'GO_BACK_TO_PREVIOUS_STEP';
export function previousStep() {
  return { type: GO_BACK_TO_PREVIOUS_STEP };
}

export const SET_IS_FADING = 'SET_IS_FADING';
export function setIsFading(isFading) {
  return { type: SET_IS_FADING, isFading };
}

export const DISABLE_STEP_BACK_LOCK = 'DISABLE_STEP_BACK_LOCK';
export function disableBackLock() {
  return { type: DISABLE_STEP_BACK_LOCK };
}
