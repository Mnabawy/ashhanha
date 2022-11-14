import axios from 'axios';
import {
  ApiActivationErrorException,
  ApiErrorException,
  ApiErrorTypes,
} from './utils/errors';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';
import {dataToFormData, objectToArray} from '../repo/utils/dataFormation';
export default class Auth {
  signIn = async data => {
    console.log(data, 'Login Data');
    try {
      const res = await axios.post('login', data);
      console.log('------ -', res);
      return res.data;
    } catch (error) {
      console.log('user Signin error', error.response, error);
      if (error.response) {
        if (error.response.data.statusCode === 408) {
          throw new ApiActivationErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.errors,
            false,
          );
        } else {
          throw new ApiErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.errors,
          );
        }
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  logoutPrincipalUser = async data => {
    try {
      const res = await axios.post('logout', data);
      console.log('res log out ============================', res);

      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('error log out ========================= ', error);

        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  register = async data => {
    try {
      const res = await axios.post('check-login', data);
      console.log('res.data check-login', res.data);
      return res.data;
    } catch (error) {
      console.log('error register ', error);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  registerData = async data => {
    try {
      const res = await axios.post('register', data);
      return res.data.data;
    } catch (error) {
      console.log(error.response, 'register-data error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
          // error.response.data.errors.email ? objectToArray(error.response.data.errors)[0][0] : error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  resetPassword = async data => {
    try {
      const res = await axios.post('reset-password', data);
      console.log(res, 'Reset pasword Ress');
      return res.data.data;
    } catch (error) {
      console.log(error.response, 'reset error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  changePassword = async data => {
    try {
      const res = await axios.post('change-password', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error.response, 'change-password error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          // objectToArray(error.response.data.errors)[0][0],
          (error.response.data.errors),
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  updateUser = async data => {
    try {
      const res = await axios.post('update-profile', data);
      console.log(res, 'update user');
      return res.data.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'update user error',
      );

      if (error.response && error.response.status === 401) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          I18n.t('user-invalid'),
        );
      }
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  forgetPassword = async data => {
    try {
      const res = await axios.post('forget-password', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'forgetPassword error',
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  verifyCode = async data => {
    try {
      const res = await axios.post('check-code', data);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'VerifyCode error',
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  verifyCodeUdatePhone = async data => {
    try {
      const res = await axios.post('update-mobile', data);
      console.log('ddddddddd 0 verifyCodeUdatePhone ', res);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'VerifyCode error',
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  resendCode = async data => {
    // console.log("---------------- +++++ ++++ resend-code ", data)
    try {
      const res = await axios.post('resend-code', data);
      console.log(res.data.data, 'resendcode ');
      return res.data.data;
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors.message,
        );
      }
    }
  };

  getPrincipalUserProfileData = async clientId => {
    try {
      console.log('666666666666666');
      const res = await axios.get(`profile`);
      console.log('res.datares.data ', res.data);
      return res.data.data;
    } catch (error) {
      console.log(error, 'auth error');

      console.log(error, 'auth error');
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          'ui-error-happened',
        );
      }
    }
  };
  sendInvitation = async data => {
    console.log(data, 'sendInvitation');
    try {
      const res = await axios.post('invitations', data);
      console.log('------ -', res);
      return true;
    } catch (error) {
      console.log(
        'sendInvitation',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  refreshToken = async () => {
    try {
      const res = await axios.post('refresh');
      console.log('------ -', res);
      return res.data;
    } catch (error) {
      console.log('refresh', error.response, JSON.parse(JSON.stringify(error)));
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
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
