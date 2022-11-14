import React, { useEffect, useState, useCallback, useReducer, useRef } from 'react';
import { ScrollableContainer } from '../../components';
import {
  AppText,
  AppView,
  AppForm,
  AppInput,
  AppButton,
  AppNavigation,
  AppIcon,
} from '../../common';
import I18n from 'react-native-i18n';
import { validatePhone } from '../../validation/auth';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import { AuthRepo } from '../../repo';
import { useSelector } from 'react-redux';
import colors from '../../common/defaults/colors';
import Logo from '../../components/logo';

const authRepo = new AuthRepo();
const Register = () => {
  const lang = useSelector((state) => state.lang.lang);
  const confrimRegisterModal = useRef();
  const renderContent = useCallback(
    ({ injectFormProps, isSubmitting, handleSubmit }) => {
      return (
        <AppView stretch>
          <AppInput
            phone
            marginTop={10}
            marginVertical={3}
            {...injectFormProps('phone')}
            maxLength={MOBILE_LENGTH}
            placeholder={I18n.t('phone')}
            leftItems={
              <AppView width={10} stretch center backgroundColor={colors.secondary}
                margin={3} borderRadius={5}
              >
                <AppIcon borderRadius={5} size={9} padding={3} name="phone" type="Feather" flip />
              </AppView>
            }
          />

          <AppButton
            onPress={handleSubmit}
            marginVertical={15}
            linearGradient
            title={I18n.t('Continue')}
            processing={isSubmitting}
            disabled={isSubmitting}
            stretch
          />

        </AppView>
      );
    },
    [],
  );

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const { phone } = values;
      const res = await authRepo.register(values);
      console.log("res in register",res)
      if (res) {
        AppNavigation.push({
          name: 'verifyCode',
          passProps: {
            phone,
            testCode: res,
            onFinish: (code) => {
              return onFinish(code, values);
            },
          },
        });
      }
      setSubmitting(false);
    },
    [onFinish],
  );

  const onFinish = useCallback(
    async (code, { phone }) => {
      let promise = new Promise(async (resolve, reject) => {
        const res = await authRepo.verifyCode({
          code,
          ...({ phone }),
        });
        console.log(res, 'Register');
        if (res) {
          AppNavigation.push({
            name: 'signUp',
            passProps: { ...({ phone }) },
          });
          resolve(true);
        } else {
          reject(new Error('Whoops!'));
        }
      });
      return promise;
    },
    [],
  );

  return (
    <ScrollableContainer
      header
      center
      paddingHorizontal={5}
      backgroundColor={colors.bg}
    >
      <Logo />
      <AppText size={9} center >{I18n.t('enterPhoneNumber')}</AppText>
      <AppText marginTop={3} center>{I18n.t('enterPhoneToCreate')}</AppText>
      <AppForm
        validationSchema={validatePhone}
        schema={{
          phone: '',
        }}
        render={renderContent}
        {...{ onSubmit }}
      />
    </ScrollableContainer>
  );
};

export default Register;
