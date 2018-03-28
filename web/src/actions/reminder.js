import { postToApi } from './api';
import { storeUserData } from './user';
import { pushGeneralNotification } from './notification';

export const POST_REMINDER = 'POST_REMINDER';
export function postReminder(targetTime, mobile) {
  return (dispatch) => {
    return dispatch(postToApi(POST_REMINDER, '/v1/reminder', { targetTime, mobile }))
      .then(res => {
        if (res && res.data) {
          dispatch(storeUserData(res.data));
          dispatch(pushGeneralNotification('Reminder has been set!'));

          return true;
        }

        return false;
      });
  };
}
