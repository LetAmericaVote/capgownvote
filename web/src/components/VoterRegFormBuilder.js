import React from 'react';
import BaseWrapper from './BaseWrapper';
import BirthdayInput from './BirthdayInput';
import FormStateSelector from './FormStateSelector';
import { setFormValue } from '../actions';
import { isDefined } from '../helpers';
import { selectForm } from '../selectors';
import {
  SpacedInputGroupLayout, InputGroupLabelLayout,
  InputGroupLabel, TextInput, CheckboxInput,
  CheckboxTitle, CheckboxLayout, CheckboxTitleLayout,
  SelectInput, SelectInputCarrot, InputGroupHelperLabel,
} from '../blocks';

const VoterRegFormBuilder = (props) => {
  const {
    fields, form, setFormValue } = props;

  if (! fields) {
    return null;
  }

  const mappedFields = fields.map(field => {
    const {
      rtvKey, type, isOptional, helpMessage, title,
      options, askIf,
    } = field;

    if (askIf && ! form[askIf]) {
      return null;
    }

    const value = form[rtvKey];

    if (isDefined(field.default) && ! isDefined(value)) {
      setFormValue(rtvKey, field.default);
    }

    switch (type) {
      case 'email':
      case 'number':
      case 'text': return (
        <SpacedInputGroupLayout key={rtvKey}>
          <InputGroupLabelLayout>
            <InputGroupLabel>
              {title}
            </InputGroupLabel>
            {isOptional ? null : (
              <InputGroupLabel error>
                Required
              </InputGroupLabel>
            )}
          </InputGroupLabelLayout>
          <TextInput
            onChange={event => setFormValue(rtvKey, event.target.value)}
            value={value}
          />
          {helpMessage ? (
            <InputGroupHelperLabel>
              {helpMessage}
            </InputGroupHelperLabel>
          ) : null}
        </SpacedInputGroupLayout>
      );

      case 'boolean': return (
        <SpacedInputGroupLayout key={rtvKey}>
          <CheckboxLayout>
            <CheckboxInput
              checked={value}
              onClick={() => setFormValue(rtvKey, ! value)}
            />
            <CheckboxTitleLayout>
              <CheckboxTitle>{title}</CheckboxTitle>
              {helpMessage ? (
                <InputGroupHelperLabel>
                  {helpMessage}
                </InputGroupHelperLabel>
              ) : null}
            </CheckboxTitleLayout>
          </CheckboxLayout>
        </SpacedInputGroupLayout>
      );

      case 'select': return (
        <SpacedInputGroupLayout key={rtvKey}>
          <InputGroupLabelLayout>
            <InputGroupLabel>
              {title}
            </InputGroupLabel>
            {isOptional ? null : (
              <InputGroupLabel error>
                Required
              </InputGroupLabel>
            )}
          </InputGroupLabelLayout>
          <SelectInputCarrot>
            <SelectInput
              value={value || ''}
              onChange={event => setFormValue(rtvKey, event.target.value)}
            >
              {value ? null : <option>Select {title}</option>}
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </SelectInput>
          </SelectInputCarrot>
          {helpMessage ? (
            <InputGroupHelperLabel>
              {helpMessage}
            </InputGroupHelperLabel>
          ) : null}
        </SpacedInputGroupLayout>
      );

      case 'state': return (
        <SpacedInputGroupLayout key={rtvKey}>
          <InputGroupLabelLayout>
            <InputGroupLabel>
              {title}
            </InputGroupLabel>
            {isOptional ? null : (
              <InputGroupLabel error>
                Required
              </InputGroupLabel>
            )}
          </InputGroupLabelLayout>
          <FormStateSelector key={rtvKey} rtvKey={rtvKey} />
          {helpMessage ? (
            <InputGroupHelperLabel>
              {helpMessage}
            </InputGroupHelperLabel>
          ) : null}
        </SpacedInputGroupLayout>
      );

      case 'birthday': return (
        <SpacedInputGroupLayout key={rtvKey}>
          <InputGroupLabelLayout>
            <InputGroupLabel>
              {title}
            </InputGroupLabel>
            {isOptional ? null : (
              <InputGroupLabel error>
                Required
              </InputGroupLabel>
            )}
          </InputGroupLabelLayout>
          <BirthdayInput key={rtvKey} rtvKey={rtvKey} />
          {helpMessage ? (
            <InputGroupHelperLabel>
              {helpMessage}
            </InputGroupHelperLabel>
          ) : null}
        </SpacedInputGroupLayout>
      );

      default: return null;
    }
  });

  return mappedFields;
};

VoterRegFormBuilder.mapStateToProps = (state) => ({
  form: selectForm(state),
});

VoterRegFormBuilder.mapDispatchToProps = (dispatch) => ({
  setFormValue: (rtvKey, value) => dispatch(setFormValue(rtvKey, value)),
});

export default BaseWrapper(VoterRegFormBuilder);
