import React from 'react';
import BaseWrapper from './BaseWrapper';
import { closeNotification } from '../actions';
import {
  selectNotificationMessage,
  selectNotificationType,
} from '../selectors';
import {
  NotificationLayout, NotificationMessageArea,
  NotificationClose, NotificationMessage,
} from '../blocks';

const Notification = (props) => {
  const { message, type, closeNotification } = props;

  if (! message) {
    return null;
  }

  const isError = type === 'error';

  return (
    <NotificationLayout>
      <NotificationMessageArea error={isError}>
        <NotificationMessage>{message}</NotificationMessage>
      </NotificationMessageArea>
      <NotificationClose error={isError} onClick={closeNotification} />
    </NotificationLayout>
  );
};

Notification.mapStateToProps = (state) => ({
  type: selectNotificationType(state),
  message: selectNotificationMessage(state),
});

Notification.actionCreators = {
  closeNotification,
};

export default BaseWrapper(Notification);
