import React, { useCallback, useEffect, useState } from 'react';
import { ImageContainer, ScrollableContainer } from '../../components';
import {
  AppImage,
  AppView,
  AppText,
  AppForm,
  TouchableView,
  AppNavigation,
} from '../../common';
import I18n from 'react-native-i18n';
import {
  validateSignIn,
} from '../../validation/auth';
import Form from '../../components/login/Form';
import SplashScreen from 'react-native-splash-screen';
import { AuthRepo } from '../../repo';
import colors from '../../common/defaults/colors';
import store from '../../store/store';

const authRepo = new AuthRepo();

const Login = () => {
  const renderContent = useCallback(
    (props) => {
      return <Form {...props} />;
    },
    [],
  );

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const { phone } = values;
      console.log("values",values)
      const res = await authRepo.signIn(values);
      if (res) {
        if (res.hasOwnProperty('isActive') && !res.isActive) {
          AppNavigation.push({
            name: 'verifyCode',
            passProps: {
              phone,
              testCode: '',
              onFinish: (code) => {
                return onFinish(code, values);
              },
            },
          });
        } else {
          AppNavigation.navigateToHome(store.getState().lang.rtl);
        }
      }
      setSubmitting(false);
    },
    [onFinish],
  );

  const onFinish = useCallback(
    async (code, { phone }) => {
      console.log("code, { phone }", code, { phone })
      let promise = new Promise(async function (resolve, reject) {
        const res = await authRepo.verifyCode({
          code,
          ...({ phone }),
        });
        console.log(res, 'login');
        if (res) {
          // if (res && Object.keys(res).length > 0 && res.constructor === Object && res?.user.name !== '')
          //   AppNavigation.navigateToHome();
          // else
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
      hideBack
      paddingHorizontal={5}
      backgroundColor={colors.bg}
    >

      <AppText bold size={15} center>
        {I18n.t('loginAccount')}
      </AppText>
      <AppText center marginTop={3}>
        {I18n.t('enterPhone')}
      </AppText>

      <AppForm
        validationSchema={validateSignIn}
        schema={{
          phone: '',
          password: '',
        }}
        render={renderContent}
        {...{ onSubmit }}
      />
    </ScrollableContainer>
  );
};

export default Login;
