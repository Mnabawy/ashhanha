import ApiAuth from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {showError, AppNavigation, showSuccess, showInfo} from '../common';
import store from '../store/store';
import {setUserData} from '../actions/auth';
import {dataToFormData, AppendImgValue} from './utils/dataFormation';

import {SET_UNSEEN_COUNT} from '../actions/types';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import I18n from 'react-native-i18n';
import * as Sentry from '@sentry/react-native';

export default class Auth {
  constructor() {
    this.apiAuth = new ApiAuth();
  }

  signIn = async values => {
    let success = true;
    try {
      const userData = await this.apiAuth.signIn(
        dataToFormData({
          ...values,
          device_token: store.getState().auth.deviceToken,
        }),
      );
      if (userData?.statusCode === 205) {
        showError(userData?.data?.message);
        AppNavigation.push({
          name: 'signUp',
          passProps: {phone: userData?.data?.mobile},
        });
        success = false;
      } else {
        await this.setPrincipalUser(userData?.data);
      }
      console.log(userData?.data, 'userData?.data');
    } catch (error) {
      if (error.hasOwnProperty('isActive')) {
        success = {
          status: false,
          isActive: error.isActive,
        };
      } else {
        success = false;
      }
      showError(error.msg);
    } finally {
      return success;
    }
  };
  register = async values => {
    let success = true;
    try {
      const res = await this.apiAuth.register(dataToFormData(values));
      showSuccess(res.data.message);
      console.log('resresres  register //// register ', res.data);
      success = res.data.code;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  registerData = async values => {
    let success = true;
    try {
      const userData = await this.apiAuth.registerData(
        dataToFormData({
          ...values,
          device_token: store.getState().auth.deviceToken,
        }),
      );
      console.log(userData, 'userData');
      success = userData;
      await this.setPrincipalUser(userData);
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resetPassword = async values => {
    console.log('values resetPassword ', values);
    let success = true;
    try {
      const res = await this.apiAuth.resetPassword(dataToFormData(values));
      // console.log("res reset pass word ", res)
      showSuccess(I18n.t('passwordChangedSuccessfully'));
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  changePassword = async values => {
    let success = true;
    try {
      const res = await this.apiAuth.changePassword(dataToFormData(values));
      console.log(res, 'RESS');
      showSuccess(res.data);
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateUser = async ({image, phone, ...rest}) => {
    console.log('image +++++++++++++++', image);
    const data = dataToFormData({phone, ...rest});
    console.log('data data ', data);
    if (image) AppendImgValue(data, {name: 'image', value: image});

    let success = true;
    try {
      const userData = await this.apiAuth.updateUser(data);
      console.log(store.getState().auth.userData.user.phone, 'userData');
      console.log(userData.user.verification_code, 'verification_code');
      if (
        userData.user.verification_code &&
        phone !== store.getState().auth.userData.user.phone
      ) {
        console.log('++++++++++++++++++++++++++');
        success = userData;
      } else {
        console.log('------------------');
        success = userData;
        await this.setPrincipalUser(userData);
        showSuccess(I18n.t('modifiedSuccessfully'));
      }
    } catch (error) {
      console.log('error ', error);
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  forgetPassword = async values => {
    let res = null;
    try {
      res = await this.apiAuth.forgetPassword(dataToFormData(values));
      console.log(res, '---------forgot password');
      if (res?.statusCode === 205) {
        showError(res?.data?.message);
        AppNavigation.push({
          name: 'signUp',
          passProps: {phone: res?.data?.mobile},
        });
        res = false;
      }
    } catch (error) {
      console.log(error, '************************');
      if (error.msg.statusCode === 408) {
        AppNavigation.push({
          name: 'verifyCode',
          passProps: {
            phone: values.phone,
            testCode: '',
            onFinish: code => {
              return onFinish(code, values);
            },
          },
        });
      }
      showError(
        error.msg.errors.message ? error.msg.errors.message : error.msg.errors,
      );
    } finally {
      return res;
    }
  };

  verifyCode = async (data, login, url) => {
    let success = true;
    try {
      const res = await this.apiAuth.verifyCode(dataToFormData(data));
      showSuccess(res.data);
      console.log(res, 'verifyCode');
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  verifyCodeUdatePhone = async (data, login) => {
    let success = true;
    try {
      const res = await this.apiAuth.verifyCodeUdatePhone(
        dataToFormData({
          ...data,
        }),
      );
      console.log(res, 'verifyCodeUudatePhone');
      success = res;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resendCode = async phone => {
    console.log('data resend code ', phone);
    let res = null;
    try {
      res = await this.apiAuth.resendCode(dataToFormData({phone: phone}));
    } catch (error) {
      showError(error.msg);
    }
    return res;
  };

  setTimeToActiveResendCode = async time => {
    try {
      console.log('========================', {time: time});
      if (time === null) {
        console.log('null **************** time time null');
        await AsyncStorage.removeItem('@TimeToActiveResendCode');
      } else
        await AsyncStorage.setItem(
          '@TimeToActiveResendCode',
          JSON.stringify({time: time}),
        );
    } catch (error) {
      console.log(error);
    }
  };

  getTimeToActiveResendCode = async () => {
    try {
      const time = await AsyncStorage.getItem('@TimeToActiveResendCode');
      if (time !== null) {
        console.log('wwwwwwwwwwwwww ', time);
        return time;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  setPrincipalUser = async userData => {
    console.log('ssssssssssssssssss userData', userData);
    try {
      // console.log(userData);
      await store.dispatch(setUserData(userData));
      if (userData === null) {
        console.log('null **************** user data null');
        await AsyncStorage.removeItem('@UserData');
        if (Platform.OS === 'android' && systemVersion === '8.1') {
          Sentry.captureMessage('Storage 2 set user data to null ');
          AsyncStorage.clear();
        }
      } else await AsyncStorage.setItem('@UserData', JSON.stringify(userData));
      // const newToken = await AsyncStorage.getItem('@fcmToken');
      // if (!newToken && userData) {
      //   await this.notificationRepo.subscribe();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  checkPrincipalUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@UserData');
      const systemVersion = DeviceInfo.getSystemVersion();
      console.log('buildNumber ', systemVersion);
      if (Platform.OS === 'android' && systemVersion === '8.1') {
        Sentry.captureMessage('Storage 1 ');
        console.log('userData ', userData);
        AsyncStorage.clear();
      }
      if (userData !== null) {
        const convertedUserData = JSON.parse(userData);
        // this.notificationRepo.updateToken();
        return convertedUserData;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getPrincipalUserProfileData = async () => {
    console.log('/////////////////');
    const userData = await this.apiAuth.getPrincipalUserProfileData();
    await this.setPrincipalUser(userData);
    console.log('userDatauserData ', userData);
    return userData;
  };

  logoutPrincipalUser = async () => {
    let success = true;
    try {
      const res = await this.apiAuth.logoutPrincipalUser(
        dataToFormData({device_token: store.getState().auth.deviceToken}),
      );
      if (res.statusCode === 200 || res.statusCode === 411) {
        AppNavigation.navigateToAuth();
        PushNotification.cancelAllLocalNotifications();
        PushNotification.removeAllDeliveredNotifications();
        await this.setPrincipalUser(null);
        store.dispatch({type: SET_UNSEEN_COUNT, payload: 0});
        return success;
      }
    } catch (error) {
      showError(error.msg);
      console.log(
        '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        error,
      );
      return false;
    } finally {
      return success;
    }
  };

  sendInvitation = async values => {
    let success = true;
    try {
      const send = await this.apiAuth.sendInvitation(dataToFormData(values));
      console.log('------', send);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  refreshToken = async () => {
    let success = true;
    try {
      const userData = await this.apiAuth.refreshToken();
      await this.setPrincipalUser(userData);
    } catch (error) {
      // showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
