import React from 'react';
import BaseWrapper from './BaseWrapper';
import { closeErrorNotification } from '../actions';
import { selectErrorNotification } from '../selectors';
import {
  ErrorNotificationLayout, ErrorNotificationMessageArea,
  ErrorNotificationClose, ErrorNotificationMessage,
} from '../blocks';

const Notification = (props) => {
  const { message, closeErrorNotification } = props;

  if (! message) {
    return null;
  }

  return (
    <ErrorNotificationLayout>
      <ErrorNotificationMessageArea>
        <ErrorNotificationMessage>{message}</ErrorNotificationMessage>
      </ErrorNotificationMessageArea>
      <ErrorNotificationClose onClick={closeErrorNotification} />
    </ErrorNotificationLayout>
  );
};

Notification.mapStateToProps = (state) => ({
  message: selectErrorNotification(state),
});

Notification.actionCreators = {
  closeErrorNotification
};

export default BaseWrapper(Notification);
