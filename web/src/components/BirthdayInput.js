import React from 'react';
import BaseWrapper from './BaseWrapper';
import { months } from '../helpers';
import {
  SelectInput, SelectInputCarrot, BirthdayLayout,
  BirthdayColumn,
} from '../blocks';
import {
  setBirthdayDate, setBirthdayMonth, setBirthdayYear, setFormValue,
} from '../actions';
import {
  selectBirthdayDate, selectBirthdayMonth, selectBirthdayYear,
  selectBirthdayFormatted, selectFormValue, selectRegistrationFieldTitle,
  selectValidationError,
} from '../selectors';

const days = [...Array(30).keys()].map((num, index) => index + 1);
const years = [...Array(117).keys()].map((num, index) => index + 1901).reverse();

const BirthdayInput = (props) => {
  const {
    birthdayDate, birthdayMonth, birthdayYear,
    birthdayFormatted, birthdayFormValue, setFormValue,
    setBirthdayDate, setBirthdayMonth, setBirthdayYear,
  } = props;

  if (birthdayFormatted !== birthdayFormValue) {
    setFormValue(birthdayFormatted);
  }

  return (
    <BirthdayLayout>
      <BirthdayColumn>
        <SelectInputCarrot>
          <SelectInput
            onChange={setBirthdayMonth}
            value={birthdayMonth || ''}
          >
            {birthdayMonth ? null : <option>Month</option>}
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </SelectInput>
        </SelectInputCarrot>
      </BirthdayColumn>
      <BirthdayColumn>
        <SelectInputCarrot>
          <SelectInput
            onChange={setBirthdayDate}
            value={birthdayDate || ''}
          >
            {birthdayDate ? null : <option>Date</option>}
            {days.map(day =>
              <option key={day} value={day}>{day}</option>
            )}
          </SelectInput>
        </SelectInputCarrot>
      </BirthdayColumn>
      <BirthdayColumn>
        <SelectInputCarrot>
          <SelectInput
            onChange={setBirthdayYear}
            value={birthdayYear || ''}
          >
            {birthdayYear ? null : <option>Year</option>}
            {years.map(year =>
              <option key={year} value={year}>{year}</option>
            )}
          </SelectInput>
        </SelectInputCarrot>
      </BirthdayColumn>
    </BirthdayLayout>
  );
};

BirthdayInput.mapStateToProps = (state, ownProps) => ({
  birthdayDate: selectBirthdayDate(state),
  birthdayMonth: selectBirthdayMonth(state),
  birthdayYear: selectBirthdayYear(state),
  birthdayFormatted: selectBirthdayFormatted(state),
  fieldTitle: selectRegistrationFieldTitle(ownProps.rtvKey, state),
  birthdayFormValue: selectFormValue(ownProps.rtvKey, null, state),
  validationError: selectValidationError(ownProps.rtvKey, state),
});

BirthdayInput.mapDispatchToProps = (dispatch, ownProps) => ({
  setBirthdayDate: event => dispatch(setBirthdayDate(event.target.value)),
  setBirthdayMonth: event => dispatch(setBirthdayMonth(event.target.value)),
  setBirthdayYear: event => dispatch(setBirthdayYear(event.target.value)),
  setFormValue: birthday => dispatch(setFormValue(ownProps.rtvKey, birthday)),
});

export default BaseWrapper(BirthdayInput);
