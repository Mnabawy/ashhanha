import axios from 'axios';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
export default class Address {

  addAddress = async (data) => {
    try {
      const res = await axios.post(`address/store`, data);
      return res.data.data;
    } catch (error) {
      console.log("error.response  add address", error.response)
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };

  deleteAddress = async (id) => {
    try {
      const res = await axios.post(`address/delete`, { address_id: id });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };
  updateAddress = async (data, id) => {
    try {
      const res = await axios.post(`address/update/${id}`, data);
      return res.data.data;
    } catch (error) {
      console.log("error.response ", error.response)
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };

}
