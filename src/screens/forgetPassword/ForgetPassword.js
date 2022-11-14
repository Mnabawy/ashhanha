import React, { } from 'react';
import I18n from 'react-native-i18n';
import {
  AppImage,
  AppText,
} from '../../common';
import ForgetPasswordForm from '../../components/forgetPassword/ForgetPasswordForm';
import { ScrollableContainer } from '../../components';
import colors from '../../common/defaults/colors';
const source = require('../../assets/imgs/phone.png');

const ForgetPassword = () => {
  return (
    <ScrollableContainer
      header
      center
      paddingHorizontal={5}
      backgroundColor={colors.bg}
    >
      <AppImage equalSize={45} marginVertical={20} {...{ source }} />
      <AppText size={9} center >{I18n.t('enterPhoneNumber')}</AppText>
      <AppText marginTop={3} center>{I18n.t('enterPhoneToVerify')}</AppText>
      <ForgetPasswordForm />
    </ScrollableContainer>
  );
};

export default ForgetPassword;
