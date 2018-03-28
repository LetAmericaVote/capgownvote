import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
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

  const availableTimes = [
    { value: 'm', title: 'Morning', cutoff: new Date().setHours(9, 0, 0) },
    { value: 'a', title: 'Afternoon', cutoff: new Date().setHours(15, 0, 0) },
    { value: 'e', title: 'Evening', cutoff: new Date().setHours(19, 0, 0) },
  ].filter((time) => {
    if (reminderDay === 'td') {
      return time.cutoff >= Date.now();
    }

    return true;
  });

  const timePicker = (
    <ReminderTimeRow>
      <ReminderTimeColumn>
        <SelectInputCarrot>
          <SelectInput
            onChange={event => setFormValue(REMINDER_DAY, event.target.value)}
            value={reminderDay || ''}
          >
            {reminderDay ? null : <option>Pick a day</option>}
            <option value="td">Today</option>
            <option value="tm">Tomorow</option>
          </SelectInput>
        </SelectInputCarrot>
      </ReminderTimeColumn>
      <ReminderTimeColumn>
        <SelectInputCarrot>
          <SelectInput
            onChange={event => setFormValue(REMINDER_TIME, event.target.value)}
            value={reminderTime || ''}
          >
            {reminderTime ? null : <option>Pick a time</option>}
            {availableTimes.map((time) => (
              <option key={time.value} value={time.value}>{time.title}</option>
            ))}
          </SelectInput>
        </SelectInputCarrot>
      </ReminderTimeColumn>
    </ReminderTimeRow>
  );

  const onSmsRemind = (mobile) => {
    if (mobile && reminderDay && reminderTime) {
      const dateOffset = reminderDay === 'td' ? Date.now() : new Date().setHours(23, 0, 0);
      const timeOffset =
        ((reminderTime === 'm' ? 9 : false) ||
        (reminderTime === 'a' ? 15 : false) ||
        19) * (1000 * 60 * 60);

      const targetTime = dateOffset + timeOffset;

      postReminder(targetTime, mobile)
        .then(isSet => setFormValue(REMINDER_SHOW_CONFIG, ! isSet));
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
              null
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
