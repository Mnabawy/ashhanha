import React, { useCallback, useEffect } from 'react';
import { ScrollableContainer, ImageContainer } from '../../components';
import {
  AppView,
  AppText,
  AppForm,
  AppNavigation,
  AppInput,
  AppButton,
  AppIcon,
  AppImage,
} from '../../common';
import I18n from 'react-native-i18n';
import { validateResetPassword } from '../../validation/auth';
import { AuthRepo } from '../../repo';
import colors from '../../common/defaults/colors';
const authRepo = new AuthRepo();
const source = require('../../assets/imgs/resetPassword.png');

const ResetPassword = ({ phone, code }) => {
  console.log("  phone, code ", phone, code)
  const renderContent = useCallback(({ injectFormProps, handleSubmit, isSubmitting }) => {
    return (
      <AppView stretch marginTop={20}>
        <AppInput
          autoCompleteType='off'
          marginVertical={3}
          {...injectFormProps('new_password')}
          placeholder={I18n.t('password')}
          secure
          showSecureEye
          leftItems={
            <AppView width={10} stretch center backgroundColor={colors.secondary}
              margin={3} borderRadius={5}
            >
              <AppIcon stretch borderRadius={5} size={8} name="lock" type='SimpleLineIcons' />
            </AppView>
          }
        />
        <AppInput
          autoCompleteType='off'
          marginVertical={3}
          {...injectFormProps('new_password_confirmation')}
          placeholder={I18n.t('repeatPassword')}
          secure
          showSecureEye
          leftItems={
            <AppView width={10} stretch center backgroundColor={colors.secondary1}
              margin={3} borderRadius={5}
            >
              <AppIcon stretch borderRadius={5} size={8} name="lock" type='SimpleLineIcons' />
            </AppView>
          }
        />
        <AppButton
          marginVertical={10}
          disabled={isSubmitting}
          onPress={handleSubmit}
          stretch
          linearGradient
          processing={isSubmitting}
          title={I18n.t('Continue')}
        />
      </AppView>
    );
  }, []);

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      console.log("values ", values)
      const res = await authRepo.resetPassword(values);
      if (res) {
        AppNavigation.navigateToAuth();
      }
      setSubmitting(false);
    },
    [phone, code],
  );

  return (
    <ScrollableContainer
      header
      center
      paddingHorizontal={5}
      backgroundColor={colors.bg}
    >
      <AppImage equalSize={45} marginVertical={20} {...{ source }} />
      <AppText size={9} center >{I18n.t('resetPassword')}</AppText>
      <AppText center marginTop={3}>{I18n.t('enterNewPassword')}</AppText>
      <AppForm
        validationSchema={validateResetPassword}
        schema={{
          phone: phone,
          new_password: '',
          new_password_confirmation: '',
          code: code
        }}
        render={renderContent}
        {...{ onSubmit }}
      />
    </ScrollableContainer>
  );
};

export default ResetPassword;
