import React, { useCallback, useEffect } from 'react';
import { AppView, AppText, AppForm, AppNavigation, showSuccess } from '../../common';
import I18n from 'react-native-i18n';
import { validateSignUp } from '../../validation/auth';
import Form from '../../components/signUp/Form';

import { AuthRepo, UsersRepo } from '../../repo';
import { ScrollableContainer } from '../../components';
import colors from '../../common/defaults/colors';
import Logo from '../../components/logo';
import store from '../../store/store';
const authRepo = new AuthRepo();
const usersRepo = new UsersRepo();

const SignUp = ({ phone }) => {
  const renderContent = useCallback(
    (props) => {
      return <Form  {...props} />;
    },
    [],
  );

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      console.log("ddd ++++++++++++++++++++", values)
      let newData = values;
      newData['password'] = values.new_password;
      newData['password_confirmation'] = values.new_password_confirmation;
      // delete newData['new_password'];
      // delete newData['new_password_confirmation'];
      console.log("ddd ++++++++++++++++++++ new_password ", newData)

      const res = await authRepo.registerData(newData);
      if (res) {
        console.log("res ", res)
        showSuccess(I18n.t('accountCreated'))
        setTimeout(() => {
          AppNavigation.navigateToHome(store.getState().lang.rtl);          
        }, 500);

      }
      setSubmitting(false);
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
      <AppText size={9} center >{I18n.t('createAccount')}</AppText>
      <AppText center marginTop={3}>{I18n.t('completeAccount')}</AppText>
      <AppForm
        validationSchema={validateSignUp}
        schema={{
          name: '',
          phone: phone,
          email: '',
          new_password: '',
          new_password_confirmation: '',
          terms: 0,
        }}
        render={renderContent}
        {...{ onSubmit }}
      />
    </ScrollableContainer>
  );
};

export default SignUp;
