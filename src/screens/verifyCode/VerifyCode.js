import React, {useEffect, useState, useCallback} from 'react';
import {ScrollableContainer} from '../../components';
import {
  AppText,
  AppView,
  AppButton,
  showInfo,
  AppImage,
  showSuccess,
} from '../../common';
import I18n from 'react-native-i18n';
import styles from './styles';
import OTPInputView from '../../components/@twotalltotems/react-native-otp-input';
import useCountDownTime from './useCountDownTime';
import {AuthRepo} from '../../repo';
import colors from '../../common/defaults/colors';
import Logo from '../../components/logo';
import moment from 'moment';
// import useCountDownTimeToBlockResend from './useCountDownTimeToBlockResend';

const source = require('../../assets/imgs/verifyPhone.png');
const authRepo = new AuthRepo();

const VerifyCode = ({phone, onFinish, testCode, forgetPassword}) => {
  const [loading, setLoading] = useState(false);
  const [loadingResendCode, setLoadingResendCode] = useState(false);
  const [resendAgain, setResendAgain] = useState(false);
  const resendTime = useCountDownTime(resendAgain);
  const [resendAgainCount, setResendAgainCount] = useState(0);
  const [blockResendAgain, setBlockResendAgain] = useState(false);
  // const blockTime = useCountDownTimeToBlockResend(blockResendAgain);

  console.log('resendAgainCount ', resendAgainCount);
  const onCodeChanged = useCallback(confirmationCode => {
    setCode(confirmationCode);
  }, []);

  const [code, setCode] = useState('');
  const [codeForTest, setCodeForTest] = useState(testCode);

  const handleOtp = useCallback(async () => {
    if (code.length < 4) {
      showInfo(I18n.t('invalid'));
      return;
    }
    setLoading(true);
    try {
      console.log('code -------------------- ', code);
      await onFinish(code, codeForTest).then(() => {
        console.log('object ttttttttxxxxxxxxxxxxxxxxxxxxxxxx');
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setCode('');
      setLoading(false);
    }
  }, [code, onFinish]);

  useEffect(() => {
    if (resendTime === 0) {
      // setResendAgain(false)
    }
  }, [resendTime]);

  const getTime = useCallback(async () => {
    const time = await authRepo.getTimeToActiveResendCode();
  }, []);
  useEffect(() => {
    // if (blockTime === 0) {
    //   setResendAgainCount(0);
    getTime();
    // }
  }, []);

  useEffect(() => {
    if (resendAgainCount === 3) {
      authRepo.setTimeToActiveResendCode(new moment());
      setBlockResendAgain(true);
    }
  }, [resendAgainCount]);

  const resendCode = useCallback(async () => {
    setLoadingResendCode(true);
    try {
      const res = await authRepo.resendCode(phone);
      // console.log('res', res);
      setResendAgainCount(resendAgainCount + 1);
      setCodeForTest(res.code);
      setCode('');
      showSuccess(res.message);
      // if (res)
      setResendAgain(!resendAgain);
    } catch (error) {
    } finally {
      setLoadingResendCode(false);
    }
  }, [resendTime, resendAgainCount]);
  return (
    <ScrollableContainer
      header
      center
      paddingHorizontal={5}
      backgroundColor={colors.bg}>
      {forgetPassword ? (
        <AppImage equalSize={45} marginVertical={15} {...{source}} />
      ) : (
        <Logo />
      )}
      <AppText size={9} center>
        {I18n.t('verifyPhone')}
      </AppText>
      <AppText center marginVertical={3}>
        {I18n.t('messageToVerify')}
      </AppText>
      <AppText size={8} center color={colors.primary}>
        {phone}
      </AppText>
      {/* <AppText size={6} center>
        {codeForTest}
      </AppText> */}
      <OTPInputView
        style={styles.container}
        pinCount={4}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={onCodeChanged}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.codeInputFieldStyle}
        codeInputHighlightStyle={styles.codeInputHighlightStyle}
        onCodeFilled={async confirmationCode => {
          // setLoading(false);
        }}
      />

      <AppButton
        onPress={handleOtp}
        linearGradient
        stretch
        disabled={code.length < 4}
        processing={loading}
        title={I18n.t('Continue')}
      />
      <AppView marginTop={20} stretch row center>
        <AppText size={6}>
          {I18n.t('noReceivedCode')} {I18n.t('resendWithin')}
        </AppText>
        <AppText marginHorizontal={2} size={6}>
          {resendTime}
        </AppText>
        <AppText size={6}>{I18n.t('second')}</AppText>
      </AppView>
      {/* <AppText marginHorizontal={2} size={6} >
        {blockTime}
      </AppText> */}
      {resendTime === 0 && (
        // resendAgainCount < 3 &&
        <AppButton
          marginVertical={5}
          onPress={resendCode}
          stretch
          processing={loadingResendCode}
          title={I18n.t('sendCodeAgain')}
          linearGradient
        />
      )}
    </ScrollableContainer>
  );
};

export default VerifyCode;
