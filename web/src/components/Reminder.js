import React from 'react';
import ReactGA from 'react-ga';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import PasswordReset from './PasswordReset';
import { selectFormValue } from '../selectors';
import { setFormValue, postReminder } from '../actions';
import {
  REMINDER_USE_SMS, REMINDER_SHOW_CONFIG,
  REMINDER_TIME, REMINDER_DAY,
} from '../formKeys';
import {
  ReminderLayout, ReminderHeader, ReminderButton,
  ReminderConfigLayout, ReminderConfigPart,
  SpacedInputGroupLayout, CheckboxLayout,
  CheckboxInput, CheckboxTitleLayout,
  CheckboxTitle, InputGroupHelperLabel,
  ReminderTimeColumn, SelectInputCarrot,
  SelectInput, ReminderTimeRow,
} from '../blocks';

const Reminder = (props) => {
  const {
    useSmsReminder, showConfig, setFormValue,
    reminderTime, reminderDay, postReminder,
  } = props;

  const reminderPicker = (
    <ReminderConfigPart>
      <SpacedInputGroupLayout multiplier={2}>
        <CheckboxLayout>
          <CheckboxInput
            checked={useSmsReminder}
            onClick={() => setFormValue(REMINDER_USE_SMS, true)}
          />
          <CheckboxTitleLayout>
            <CheckboxTitle>SMS Reminder</CheckboxTitle>
            <InputGroupHelperLabel>
              We'll text you a link later on to continue where you left off.
            </InputGroupHelperLabel>
          </CheckboxTitleLayout>
        </CheckboxLayout>
      </SpacedInputGroupLayout>
      <CheckboxLayout>
        <CheckboxInput
          checked={! useSmsReminder}
          onClick={() => setFormValue(REMINDER_USE_SMS, false)}
        />
        <CheckboxTitleLayout>
          <CheckboxTitle>Setup a password</CheckboxTitle>
          <InputGroupHelperLabel>
            Set a password and log back in whenever you're ready.
          </InputGroupHelperLabel>
        </CheckboxTitleLayout>
      </CheckboxLayout>
    </ReminderConfigPart>
  );

  const hoursOffset = new Date().getTimezoneOffset() / 60;

  const availableTimes = (dayValue) => [
    { value: 'm', title: 'Morning', cutoff: new Date().setHours(9 + hoursOffset, 0, 0) },
    { value: 'a', title: 'Afternoon', cutoff: new Date().setHours(15 + hoursOffset, 0, 0) },
    { value: 'e', title: 'Evening', cutoff: new Date().setHours(19 + hoursOffset, 0, 0) },
  ].filter((time) => {
    if (dayValue === 'td') {
      const offset = hoursOffset * (1000 * 60 * 60);

      return (time.cutoff - offset) >= Date.now();
    }

    return true;
  });

  const availableTimesByDay = {
    'td': availableTimes('td'),
    'tm': availableTimes('tm'),
  };

  const isTodayAvailable = !!availableTimesByDay['td'].length;
  if (! isTodayAvailable && ! reminderDay) {
    setFormValue(REMINDER_DAY, 'tm');
  }

  const timePicker = (
    <ReminderTimeRow>
      <ReminderTimeColumn>
        {isTodayAvailable ? (
          <SelectInputCarrot>
            <SelectInput
              onChange={event => {
                setFormValue(REMINDER_DAY, event.target.value)
                setFormValue(REMINDER_TIME, null);
              }}
              value={reminderDay || ''}
            >
              {reminderDay ? null : <option>Pick a day</option>}
              <option value="td">Today</option>
              <option value="tm">Tomorow</option>
            </SelectInput>
          </SelectInputCarrot>
        ) : null}
      </ReminderTimeColumn>
      <ReminderTimeColumn>
        {reminderDay ? (
          <SelectInputCarrot>
            <SelectInput
              onChange={event => setFormValue(REMINDER_TIME, event.target.value)}
              value={reminderTime || ''}
            >
              {reminderTime ? null : <option>Pick a time</option>}
              {availableTimesByDay[reminderDay].map((time) => (
                <option key={time.value} value={time.value}>{time.title}</option>
              ))}
            </SelectInput>
          </SelectInputCarrot>
        ) : null}
      </ReminderTimeColumn>
    </ReminderTimeRow>
  );

  const onSmsRemind = (mobile) => {
    if (mobile && reminderDay && reminderTime) {
      const hoursOffset = new Date().getTimezoneOffset() / 60;

      const dateOffset = reminderDay === 'td' ?
        new Date().setHours(0, 0, 0) :
        new Date().setHours(23, 0, 0) + (1000 * 60 * 60);

      const timeOffset =
        (((reminderTime === 'm' ? 9 : false) ||
        (reminderTime === 'a' ? 15 : false) ||
        19) + hoursOffset) * (1000 * 60 * 60);

      const workingTime = dateOffset + timeOffset;
      const targetTime = workingTime - (hoursOffset * (1000 * 60 * 60));

      postReminder(targetTime, mobile)
        .then(isSet => {
          setFormValue(REMINDER_SHOW_CONFIG, ! isSet);

          ReactGA.event({
            category: 'Reminder',
            action: 'Successfully configured SMS reminder',
          });

          ReactGA.event({
            category: 'Reminder',
            action: 'Selected SMS day preference',
            label: reminderDay,
          });

          ReactGA.event({
            category: 'Reminder',
            action: 'Selected SMS time preference',
            label: reminderTime,
          });
        });
    }
  };

  return (
    <ReminderLayout>
      <ReminderHeader>Want to fill this form out later?</ReminderHeader>
      {showConfig ? (
        <ReminderConfigLayout>
          {reminderPicker}
          <ReminderConfigPart>
            {useSmsReminder ? (
              <div>
                {timePicker}
                <TextSubscribeForm
                  staticCtaCopy="Set Reminder"
                  ctaOnClick={onSmsRemind}
                />
              </div>
            ) : (
              <PasswordReset
                buttonCopy="Set password"
                postUpdate={() => {
                  setFormValue(REMINDER_SHOW_CONFIG, false);

                  ReactGA.event({
                    category: 'Reminder',
                    action: 'Successfully configured password',
                  });
                }}
              />
            )}
          </ReminderConfigPart>
        </ReminderConfigLayout>
      ) : (
        <ReminderButton
          onClick={() => setFormValue(REMINDER_SHOW_CONFIG, true)}
        >Setup a reminder</ReminderButton>
      )}
    </ReminderLayout>
  );
};

Reminder.mapStateToProps = (state) => ({
  useSmsReminder: selectFormValue(REMINDER_USE_SMS, true, state),
  showConfig: selectFormValue(REMINDER_SHOW_CONFIG, false, state),
  reminderTime: selectFormValue(REMINDER_TIME, null, state),
  reminderDay: selectFormValue(REMINDER_DAY, null, state),
});

Reminder.actionCreators = {
  setFormValue, postReminder,
};

export default BaseWrapper(Reminder);
