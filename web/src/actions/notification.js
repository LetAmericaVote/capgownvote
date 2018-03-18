export const PUSH_ERROR_NOTIFICATION = 'PUSH_ERROR_NOTIFICATION';
export function pushErrorNotification(message) {
  return { type: PUSH_ERROR_NOTIFICATION, message };
}

export const CLOSE_ERROR_NOTIFICATION = 'CLOSE_ERROR_NOTIFICATION';
export function closeErrorNotification() {
  return { type: CLOSE_ERROR_NOTIFICATION };
}
