import { HOME_STATE_RTV_KEY } from './helpers';

export const selectInviteFields = (state) => state.invite;

export const selectInviteSchoolName = (state) => selectInviteFields(state).schoolName;

export const selectInviteSchoolState = (state) => selectInviteFields(state).stateCode;

export const selectInviteFirstName = (state) => selectInviteFields(state).firstName;

export const selectInviteEmail = (state) => selectInviteFields(state).email;

export const selectInviteIsCompleted = (state) => selectInviteFields(state).isComplete;

export const selectSelectedSchoolId = (state) => state.school.selectedSchoolId;

export const selectSchoolInputValue = (state) => state.school.inputValue || '';

export const selectSchoolItems = (state) => state.school.items || {};

export const selectSchoolData = (schoolId, state) => selectSchoolItems(state)[schoolId] || null;

export const selectSelectedSchoolName = (state) => (
  selectSchoolData(selectSelectedSchoolId(state), state) || {}
).name || '';

export const selectSchoolSuggestions = (state) => state.school.suggestions || [];

export const selectApiRequest = (id, state) => state.api[id] || null;

export const selectApiRequestIsPending = (id, state) => (selectApiRequest(id, state) || {}).isPending;

export const selectAssumedValues = (state) => selectSchoolData(selectSelectedSchoolId(state), state) || {};

export const selectAssumedStateCode = (state) =>
  selectAssumedValues(state).stateCode ||
  selectInviteSchoolState(state) || '';

export const selectHasStateEligibilityRequirements = (state, reduxState) =>
  !! reduxState.eligibility[state];

export const selectStateEligibilityRules = (state, reduxState) =>
  (reduxState.eligibility[state] || {}).rules || [];

export const selectStateEligibilityRulesFromAnySource = (state) =>
  selectSchoolData(selectSelectedSchoolId(state), state).rules ||
  selectStateEligibilityRules(selectFormHomeState(state), state);

export const selectStateIsEligible = (state, reduxState) =>
  (reduxState.eligibility[state] || {}).isEligible || false;

export const selectHasStandardRegistrationFields = (state) =>
  state.registration.standardFields &&
  Object.keys(state.registration.standardFields).length;

export const selectStandardRegistrationFields = (state) =>
  state.registration.standardFields || [];

export const selectHasStateRegistrationFields = (state, reduxState) =>
  reduxState.registration.stateFields[state] &&
  Object.keys(reduxState.registration.stateFields[state]).length;

export const selectStateRegistrationFields = (state, reduxState) =>
  reduxState.registration.stateFields[state] || [];

export const selectAllRegistrationFields = (state) =>
  selectStandardRegistrationFields(state).concat(
    selectStateRegistrationFields(selectAssumedStateCode(state), state)
  );

export const selectRegistrationField = (rtvKey, state) =>
  selectStandardRegistrationFields(state)
    .find(field => field.rtvKey === rtvKey) ||
  selectStateRegistrationFields(selectAssumedStateCode(state), state)
    .find(field => field.rtvKey === rtvKey) || {};

export const selectRegistrationFieldTitle = (rtvKey, state) =>
  selectRegistrationField(rtvKey, state).title || '';

export const selectRegistrationFieldOptions = (rtvKey, state) =>
  selectRegistrationField(rtvKey, state).options || [];

export const selectRegistrationIsRegistered = (state) =>
  state.registration.isRegistered.value;

export const selectRegistrationIsRegisteredConfirmation = (state) =>
  state.registration.isRegistered.isConfirmed;

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

export const selectStepisFading = (state) => state.step.isFading;

export const selectActiveStep = (state) => state.step.active;

export const selectHasActiveStep = (state) => !!selectActiveStep(state);

export const selectHasPreviousSteps = (state) =>
  !!state.step.stepHistory.filter(step => !!step).length;

export const selectHasStepBackLock = (state) => state.step.backLock;

export const selectUser = (id, state) => state.user[id] || {};

export const selectHasUser = (id, state) => !!state.user[id];

export const selectUserSchool = (id, state) => selectUser(id, state).school;

export const selectUserHasSchool = (id, state) => !!selectUserSchool(id, state);

export const selectUserRole = (id, state) => selectUser(id, state).role;

export const selectAuthId = (state) => state.auth.id;

export const selectAuthToken = (state) => state.auth.token;

export const selectIsAuthenticated = (state) =>
  selectAuthId(state) && selectAuthToken(state);

export const selectIsPublicComputer = (state) => state.auth.isPublicComputer;

export const selectErrorNotification = (state) => state.notification.error;

export const selectHasErrorNotification = (state) => !!selectErrorNotification(state);

export const selectIsNavOpen = (state) => state.nav.isOpen;
