import React from 'react';
import BaseWrapper from './BaseWrapper';
import { setIsSubscribed } from '../actions';
import { selectIsSubscribed } from '../selectors';
import {
  SpacedInputGroupLayout, CheckboxLayout,
  CheckboxInput, CheckboxTitle,
} from '../blocks';

const copy = `Subscribe to email updates from Let America Vote about the competition and other important information.`;

const EmailSubscriptionInput = (props) => {
  const { isSubscribed, setIsSubscribed } = props;

  return (
    <SpacedInputGroupLayout>
      <CheckboxLayout>
        <CheckboxInput
          checked={isSubscribed}
          onClick={() => setIsSubscribed(! isSubscribed)}
        />
        <CheckboxTitle>{copy}</CheckboxTitle>
      </CheckboxLayout>
    </SpacedInputGroupLayout>
  );
};

EmailSubscriptionInput.mapStateToProps = (state) => ({
  isSubscribed: selectIsSubscribed(state),
});

EmailSubscriptionInput.actionCreators = {
  setIsSubscribed,
};

export default BaseWrapper(EmailSubscriptionInput);
