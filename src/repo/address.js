import AddressApi from '../api/address';
import { showError, showSuccess } from '../common';
import { dataToFormData } from './utils/dataFormation';
import { refreshAddressList } from '../utils/List';
export default class Address {
  constructor() {
    this.addressApi = new AddressApi();
  }

  addAddress = async (values) => {
    let success = true;
    try {
      const res = await this.addressApi.addAddress(dataToFormData(values));
      console.log("res ", res)
      success = res.data;
      showSuccess(res.message)
      refreshAddressList();
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };
  deleteAddress = async (id) => {
    let success = true;
    try {
      const res = await this.addressApi.deleteAddress(id);
      showSuccess(res.data)
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateAddress = async (data, id) => {
    let success = true;
    try {
      const res = await this.addressApi.updateAddress(data, id);
      success = res.data;
      showSuccess(res.message);
      refreshAddressList();
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };
}
