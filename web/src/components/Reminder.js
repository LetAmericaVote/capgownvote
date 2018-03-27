import React from 'react';
import BaseWrapper from './BaseWrapper';
import { selectFormValue } from '../selectors';
import { setFormValue } from '../actions';
import {
  REMINDER_USE_SMS, REMINDER_SHOW_CONFIG,
} from '../formKeys';
import {
  ReminderLayout, ReminderHeader, ReminderButton,
  ReminderConfigLayout, ReminderConfigPart,
  SpacedInputGroupLayout, CheckboxLayout,
  CheckboxInput, CheckboxTitleLayout,
  CheckboxTitle, InputGroupHelperLabel,
} from '../blocks';

const Reminder = (props) => {
  const { useSmsReminder, showConfig, setFormValue } = props;

  const picker = (
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

  return (
    <ReminderLayout>
      <ReminderHeader>Want to fill this form out later?</ReminderHeader>
      {showConfig ? (
        <ReminderConfigLayout>
          {picker}
          <ReminderConfigPart>
            <p>test</p>
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
});

Reminder.actionCreators = {
  setFormValue,
};

export default BaseWrapper(Reminder);
