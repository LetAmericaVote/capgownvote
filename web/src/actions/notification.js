export const PUSH_ERROR_NOTIFICATION = 'PUSH_ERROR_NOTIFICATION';
export function pushErrorNotification(message) {
  return { type: PUSH_ERROR_NOTIFICATION, message };
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export function closeNotification() {
  return { type: CLOSE_NOTIFICATION };
}

export const PUSH_GENERAL_NOTIFICATION = 'PUSH_GENERAL_NOTIFICATION';
export function pushGeneralNotification(message) {
  return { type: PUSH_GENERAL_NOTIFICATION, message };
}
