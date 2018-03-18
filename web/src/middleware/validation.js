import {
  SET_FORM_VALUE, setValidationError,
  resolveValidationError,
} from '../actions';
import {
  selectAllRegistrationFields, selectFormValue,
  selectValidationError,
} from '../selectors';

const ADDRESS_TEST = (/^\s*\S+(?:\s+\S+){2}/);
const EMAIL_TEST = (/[^\s@]+@[^\s@]+\.[^\s@]+/);
const ZIPCODE_TEST = (/^\d{5}(-\d{4})?$/);

const validation = store => next => action => {
  const result = next(action);
  if (action.type !== SET_FORM_VALUE) {
    return result;
  }

  const fields = selectAllRegistrationFields(store.getState());

  fields.forEach(field => {
    const { rtvKey, askIf, isOptional, type, validation } = field;

    const mustAnswer = (askIf ?
      selectFormValue(askIf, false, store.getState()) : true) &&
      (! isOptional);

    const activeValidationError = selectValidationError(rtvKey, store.getState());

    const setValidationErrorWrapper = message => {
      if (activeValidationError === message) {
        return;
      }

      store.dispatch(setValidationError(rtvKey, message));
    };

    const resolveValidationErrorWrapper = () => {
      if (activeValidationError === null || activeValidationError === undefined) {
        return;
      }

      store.dispatch(resolveValidationError(rtvKey));
    }

    const formValue = selectFormValue(rtvKey, null, store.getState());

    if (mustAnswer && (formValue === null || formValue === undefined)) {
      setValidationErrorWrapper('Required');
      return;
    }

    if (mustAnswer && formValue === '') {
      setValidationErrorWrapper('Required');
      return;
    }

    if (mustAnswer && type === 'text' &&
      validation &&
      validation.format === 'address' &&
      ! ADDRESS_TEST.test(formValue)) {

      setValidationErrorWrapper('Invalid address');
      return;
    }

    if (mustAnswer && type === 'email' && ! EMAIL_TEST.test(formValue)) {
      setValidationErrorWrapper('Invalid email');
      return;
    }

    if (mustAnswer && type === 'number' && isNaN(formValue)) {
      setValidationErrorWrapper('Invalid number');
      return;
    }

    if (mustAnswer && type === 'number' &&
      validation &&
      validation.format === 'zipcode' &&
      ! ZIPCODE_TEST.test(formValue)) {

      setValidationErrorWrapper('Invalid zipcode');
      return;
    }

    resolveValidationErrorWrapper(rtvKey);
  });

  return result;
};

export default validation;
