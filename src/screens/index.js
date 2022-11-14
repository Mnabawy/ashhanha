import { AppNavigation } from '../common';
import AboutUs from './aboutUs/AboutUs';
import AddAddress from './AddAddress/AddAddress';
import AddReceiverData from './AddShipment/AddReceiverData';
import AddSenderData from './AddShipment/AddSenderData';
import AddShipmentData from './AddShipment/AddShipmentData';
import ChangeLanguage from './changeLanguage/ChangeLanguage';
import ChangePassword from './changePassword/ChangePassword';
import CompanyBranches from './CompanyBranches/CompanyBranches';
import Congratulations from './Congratulations/Congratulations';
import ContactUs from './contactus/Contactus';
import EditAddress from './EditAddress/EditAddress';
import EditProfile from './EditProfile/EditProfile';
import ForgetPassword from './forgetPassword/ForgetPassword';
import Home from './home/Home';
import LadingBill from './LadingBill/LadingBill';
import LadingBillPDF from './LadingBillPDF/LadingBillPDF';
import Language from './language/Language';
import Login from './login/Login';
import MapScreen from './mapScreen/MapScreen';
import Menu from './menu/Menu';
import MyAddresses from './MyAddresses/MyAddresses';
import MyShipments from './MyShipments/MyShipments';
import Notifications from './notifications/Notifications';
import OnlinePayment from './onlinePayment/OnlinePayment';
import PickerModal from './pickerModal/PickerModal';
import PriceDetails from './PriceDetails/PriceDetails';
import Profile from './profile/Profile';
import Register from './register/Register';
import ResetPassword from './resetPassword/ResetPassword';
import Selection from './selection/Selection';
import ShipmentDetails from './ShipmentDetails/ShipmentDetails';
import ShipmentMeasurements from './ShipmentMeasurements/ShipmentMeasurements';
import ShipmentsRestrictions from './ShipmentsRestrictions/ShipmentsRestrictions';
import ShippingPrices from './ShippingPrices/ShippingPrices';
import SignUp from './signUp/SignUp';
import TermsAndConditions from './termsAndConditions/TermsAndConditions';
import UsagePolicy from './UsagePolicy/UsagePolicy';
import VerifyCode from './verifyCode/VerifyCode';

export default () => {
  AppNavigation.registerScreen('login', Login);
  AppNavigation.registerScreen('register', Register);
  AppNavigation.registerScreen('ForgotPassword', ForgetPassword);
  AppNavigation.registerScreen('verifyCode', VerifyCode);
  AppNavigation.registerScreen('signUp', SignUp);
  AppNavigation.registerScreen('home', Home);
  AppNavigation.registerScreen('AddSenderData', AddSenderData);
  AppNavigation.registerScreen('AddReceiverData', AddReceiverData);
  AppNavigation.registerScreen('AddShipmentData', AddShipmentData);
  AppNavigation.registerScreen('ResetPassword', ResetPassword);
  AppNavigation.registerScreen('notifications', Notifications);
  AppNavigation.registerScreen('language', Language);
  AppNavigation.registerScreen('changeLanguage', ChangeLanguage);
  AppNavigation.registerScreen('termsAndConditions', TermsAndConditions);
  AppNavigation.registerScreen('ShipmentsRestrictions', ShipmentsRestrictions);
  AppNavigation.registerScreen('ShippingPrices', ShippingPrices);
  AppNavigation.registerScreen('Congratulations', Congratulations);
  AppNavigation.registerScreen('CompanyBranches', CompanyBranches);
  AppNavigation.registerScreen('UsagePolicy', UsagePolicy);
  AppNavigation.registerScreen('menu', Menu);
  AppNavigation.registerScreen('Profile', Profile);
  AppNavigation.registerScreen('EditProfile', EditProfile);
  AppNavigation.registerScreen('ChangePassword', ChangePassword);
  AppNavigation.registerScreen('MyShipments', MyShipments);
  AppNavigation.registerScreen('ShipmentDetails', ShipmentDetails);
  AppNavigation.registerScreen('LadingBill', LadingBill);
  AppNavigation.registerScreen('MyAddresses', MyAddresses);
  AppNavigation.registerScreen('AddAddress', AddAddress);
  AppNavigation.registerScreen('EditAddress', EditAddress);
  AppNavigation.registerScreen('selection', Selection);
  AppNavigation.registerScreen('mapScreen', MapScreen);
  AppNavigation.registerScreen('contactUs', ContactUs);
  AppNavigation.registerScreen('AboutUs', AboutUs);
  AppNavigation.registerScreen('onlinePayment', OnlinePayment);
  AppNavigation.registerScreen('pickerModal', PickerModal);
  AppNavigation.registerScreen('PriceDetails', PriceDetails);
  AppNavigation.registerScreen('LadingBillPDF', LadingBillPDF);
  AppNavigation.registerScreen('ShipmentMeasurements', ShipmentMeasurements);

};
