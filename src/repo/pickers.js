import { PickersApi } from '../api';
import { showError } from '../common';
export default class Pickers {
  constructor() {
    this.pickersApi = new PickersApi();
  }

  getCountries = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getCountries();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getCountryById = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getCountryById();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return [data];
    }
  };

  getStates = async (selectedCountry) => {
    let data = true;
    try {
      data = await this.pickersApi.getStates(selectedCountry);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getCitites = async (selectedState) => {
    let data = true;
    try {
      data = await this.pickersApi.getCitites(selectedState);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getMyAddresses = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getMyAddresses();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getShipmentContentType = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getShipmentContentType();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

}
