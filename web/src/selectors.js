import { HOME_STATE_RTV_KEY } from './helpers';

export const selectRequiresInvite = (state) => state.invite.requiresInvite;

export const selectSchoolInputValue = (state) => state.school.inputValue || '';

export const selectSchoolItems = (state) => state.school.items || {};

export const selectSchoolData = (schoolId, state) => selectSchoolItems(state)[schoolId] || {};

export const selectSchoolSuggestions = (state) => state.school.suggestions || [];

export const selectApiRequest = (id, state) => state.api[id] || null;

export const selectApiRequestIsPending = (id, state) => (selectApiRequest(id, state) || {}).isPending;

export const selectHasStandardRegistrationFields = (state) =>
  !!state.registration.standardFields &&
  !!Object.keys(state.registration.standardFields).length;

export const selectStandardRegistrationFields = (state) =>
  state.registration.standardFields || [];

export const selectHasStateRegistrationFields = (state, reduxState) =>
  !!reduxState.registration.stateFields[state] &&
  !!Object.keys(reduxState.registration.stateFields[state]).length;

export const selectStateRegistrationFields = (state, reduxState) =>
  reduxState.registration.stateFields[state] || [];

export const selectAllRegistrationFields = (state) =>
  selectStandardRegistrationFields(state).concat(
    selectStateRegistrationFields(
      selectAuthenticatedUserStateCode(state), state
    )
  );

export const selectRegistrationField = (rtvKey, state) =>
  selectStandardRegistrationFields(state)
    .find(field => field.rtvKey === rtvKey) ||
  selectStateRegistrationFields(selectUserStateCode(state), state)
    .find(field => field.rtvKey === rtvKey) || {};

export const selectRegistrationFieldTitle = (rtvKey, state) =>
  selectRegistrationField(rtvKey, state).title || '';

export const selectRegistrationFieldOptions = (rtvKey, state) =>
  selectRegistrationField(rtvKey, state).options || [];

export const selectForm = (state) => state.form;

export const selectFormValue = (key, defaultValue, state) =>
  (state.form[key] === undefined) ? defaultValue : state.form[key];

export const selectFormHomeState = (state) =>
  selectFormValue(HOME_STATE_RTV_KEY, null, state);

export const selectBirthdayDate = (state) => state.birthday.date;

export const selectBirthdayYear = (state) => state.birthday.year;

export const selectBirthdayMonth = (state) => state.birthday.month;

export const selectBirthdayFormatted = (state) => state.birthday.formatted;

export const selectValidationError = (key, state) => state.validation[key] || null;

export const selectValidationErrors = (state) => state.validation || {};

export const selectIsSubscribed = (state) => state.subscribe.isSubscribed;

export const selectIsGuideEnabled = (state) => state.guide.isEnabled;

export const selectCurrentStepId = (state) => state.step.current;

export const selectStepOrder = (state) => state.step.order;

export const selectStepIndex = (stepId, state) =>
  selectStepOrder(state).findIndex(step => step.id === stepId);

export const selectCurrentStep = (state) =>
  selectStepOrder(state)[
    selectStepIndex(selectCurrentStepId(state), state)
  ];

export const selectNextStep = (state) =>
  selectStepOrder(state)[
    selectStepIndex(selectCurrentStepId(state), state) + 1
  ] || {};

export const selectPreviousStep = (state) =>
  selectStepOrder(state)[
    selectStepIndex(selectCurrentStepId(state), state) - 1
  ] || {};

export const selectStepIsViewed = (id, state) =>
  (selectStepOrder(state)[selectStepIndex(id, state)] || {}).isViewed;

export const selectHasNextStep = (state) =>
  !!selectNextStep(state).id &&
  !!selectCurrentStep(state) &&
  selectCurrentStep(state).isComplete;

export const selectHasPreviousStep = (state) => !!selectPreviousStep(state).id;

export const selectStepFade = (state) => state.step.fade;

export const selectIsStepFadeSet = (state) => !!selectStepFade(state).to;

export const selectUser = (id, state) => state.user[id] || {};

export const selectHasUser = (id, state) => !!state.user[id];

export const selectUserSchoolId = (id, state) => selectUser(id, state).school;

export const selectUserHasSchool = (id, state) => !!selectUserSchoolId(id, state);

export const selectAuthenticatedUser = (state) => selectUser(selectAuthId(state), state);

export const selectUserRegistrationPdf = (id, state) => selectUser(id, state).pdf;

export const selectAuthenticatedUserPdf = (state) =>
  selectUserRegistrationPdf(selectAuthId(state), state);

export const selectAuthenticatedUserHasPdf = (state) =>
  !!selectAuthenticatedUserPdf(state);

export const selectUserHasStateOvr = (id, state) => selectUser(id, state).stateHasOvr;

export const selectAuthenticatedUserHasStateOvr = (state) =>
  selectUserHasStateOvr(selectAuthId(state), state);

export const selectAuthenticatedUserHasSchool = (state) =>
  selectUserHasSchool(selectAuthId(state), state);

export const selectUserSchoolData = (id, state) =>
  selectSchoolData(selectUserSchoolId(id, state), state);

export const selectAuthenticatedUserSchoolData = (state) =>
  selectUserSchoolData(selectAuthId(state), state);

export const selectUserRole = (id, state) => selectUser(id, state).role;

export const selectUserStateCode = (id, state) => selectUser(id, state).stateCode;

export const selectAuthenticatedUserStateCode = (state) =>
  selectUserStateCode(selectAuthId(state), state);

export const selectUserIsEligible = (id, state) => selectUser(id, state).isEligible;

export const selectAuthenticatedUserIsEligible = (state) =>
  selectUserIsEligible(selectAuthId(state), state);

export const selectUserIsRegistered = (id, state) => selectUser(id, state).isRegistered;

export const selectAuthenticatedUserRules = (state) =>
  selectAuthenticatedUser(state).rules;

export const selectAuthenticatedUserIsRegistered = (state) =>
  selectUserIsRegistered(selectAuthId(state), state);

export const selectAuthId = (state) => state.auth.id;

export const selectAuthToken = (state) => state.auth.token;

export const selectIsAuthenticated = (state) =>
  !!selectAuthId(state) && !!selectAuthToken(state);

export const selectIsPublicComputer = (state) => state.auth.isPublicComputer;

export const selectErrorNotification = (state) => state.notification.error;

export const selectHasErrorNotification = (state) => !!selectErrorNotification(state);

export const selectIsNavOpen = (state) => state.nav.isOpen;
