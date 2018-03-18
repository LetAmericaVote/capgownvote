// TODO: defaults file as well. some of these should be required.

import {
  shape, string, oneOf, arrayOf, bool, func,
  object, oneOfType,
} from 'prop-types';
import { months, states } from './helpers';

export const actionCreatorType = func.isRequired;

export const hasSchoolSetType = bool.isRequired;
export const schoolInputValueType = string.isRequired;
export const selectedSchoolIdType = string;

export const schoolType = shape({
  id: string.isRequired,
  name: string.isRequired,
  city: string.isRequired,
  stateCode: string.isRequired,
  zipcode: string.isRequired,
});

export const participatingSchoolsType = arrayOf(schoolType);

export const apiRequestType = shape({
  isPending: bool.isRequired,
  hasFailed: bool.isRequired,
  hasSucceeded: bool.isRequired,
});

export const assumedStateType = string;
export const assumedZipcodeType = string;
export const assumedCityType = string;

export const hasStateEligibilityRequirementsType = bool.isRequired;
export const stateEligibilityRulesType = arrayOf(string);
export const stateIsEligibleType = bool;

export const rtvKeyType = string.isRequired;
export const registrationFieldTitleType = string.isRequired;
export const registrationFieldType = shape({
  default: bool,
  helpMessage: string,
  rtvKey: rtvKeyType,
  title: registrationFieldTitleType,
  type: oneOf([
    'boolean', 'text', 'birthday', 'select', 'state',
    'email', 'number',
  ]).isRequired,
  askIf: string,
  isOptional: bool,
  autocomplete: string,
  validation: shape({
    format: string,
  }),
}).isRequired

export const registrationFieldsType = arrayOf(registrationFieldType).isRequired;

export const inputStateType = oneOf(states.map(state => state.code));
export const inputStringType = string;
export const inputCheckboxType = bool;
export const inputOptionsType = arrayOf(string).isRequired;
export const anyInputType = oneOfType([inputStringType, inputCheckboxType]);

export const formType = object.isRequired;

export const birthdayDateType = string;
export const birthdayMonthType = oneOf(months);
export const birthdayYearType = string;
export const birthdayFormattedType = string;

export const validationErrorType = string;
export const validationErrorsType = object.isRequired;

export const isSubscribedType = bool.isRequired;

export const inviteFieldType = string;
