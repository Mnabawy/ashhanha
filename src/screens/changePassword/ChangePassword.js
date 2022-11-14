import React, { } from 'react';
import I18n from 'react-native-i18n';
import { ScrollableContainer } from "../../components";
import ChangePasswordForm from '../../components/changePassword/ChangePasswordForm';
const ChangePassword = () => {

  return (
    <ScrollableContainer
      flex stretch
      title={I18n.t("changePassword")}
      paddingHorizontal={5}
    >
      <ChangePasswordForm />
    </ScrollableContainer>
  );
}

export default ChangePassword;
