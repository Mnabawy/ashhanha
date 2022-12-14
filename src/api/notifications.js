import axios from 'axios';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
export default class Notifications {
  readNotif = async (notificationId) => {
    try {
      const res = await axios.get(`read-notification/${notificationId}`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log('readNotif  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getUnReadCounter = async () => {
    try {
      const res = await axios.get('notifications');
      return res.data;
    } catch (error) {
      console.log('getUnReadCounter  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
}
