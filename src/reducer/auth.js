import * as types from '../actions/types';

const initialState = {
  userData: null,
  error: null,
  deviceToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, userData: action.payload };

    case types.ADD_DEVICE_TOKEN:
      return { ...state, deviceToken: action.payload };

    case types.LOGOUT:
      return { ...state, userData: null };

    default:
      return state;
  }
};
