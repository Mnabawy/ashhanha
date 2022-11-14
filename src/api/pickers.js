import axios from 'axios';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
import I18n from 'react-native-i18n';
export default class Pickers {
  getCountries = async () => {
    try {
      const res = await axios.get('countries');
      console.log("res countries", res.data.data.length);
      return res.data.data;
    } catch (error) {
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

  getCountryById = async () => {
    try {
      const res = await axios.get('country/27');
      return res.data.data;
    } catch (error) {
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

  getStates = async (selectedCountry) => {
    try {
      console.log("states-by-country/${selectedCountry} => ",selectedCountry)
      const res = await axios.get(`states-by-country/${selectedCountry}`);
      console.log("res.data.data getStates *************************** ",res.data.data.length)
      return res.data.data;
    } catch (error) {
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
  getCitites = async (selectedState) => {
    try {
      const res = await axios.get(`cities-by-state/${selectedState}`);
      console.log("res.data.data getCitites *************************** ",res.data.data.length)
      return res.data.data;
    } catch (error) {
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

  getMyAddresses = async () => {
    try {
      const res = await axios.get('addresses?list=1');
      return res.data.data;
    } catch (error) {
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

  getShipmentContentType = async () => {
    try {
      const res = await axios.get('content-type');
      return [
        ...res.data.data,
        {
          "id": "other",
          "name": I18n.t("other")
        }
      ];
    } catch (error) {
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
