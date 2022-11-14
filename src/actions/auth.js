import { ADD_DEVICE_TOKEN, LOGIN_SUCCESS } from './types';

export const setUserData = (userData) => {
  return { type: LOGIN_SUCCESS, payload: userData };
};

export const setDeviceToken = (token) => {
  console.log("token in action ", token)
  return { type: ADD_DEVICE_TOKEN, payload: token };
};