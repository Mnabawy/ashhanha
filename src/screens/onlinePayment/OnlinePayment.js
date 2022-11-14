import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {View, StyleSheet, Platform} from 'react-native';
import {AppView, AppSpinner, AppNavigation, showSuccess} from '../../common';
import I18n from 'react-native-i18n';
import Header from '../../components/Header';
import {
  setCompanytData,
  setDeliveryDate,
  setReceiverData,
  setSenderData,
  setShipmentData,
} from '../../actions/shipment';
import store from '../../store/store';
import moment from 'moment';
import colors from '../../common/defaults/colors';

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: 'red', alignSelf: 'stretch'},
});
const OnlinePayment = ({payment_url}) => {
  const [isLoading, setLoad] = useState(true);
  // console.log(payment_url);
  const counter = useRef(0);

  const _handleWebViewNavigationStateChange = async newNavState => {
    const {url} = newNavState;
    console.log('res **** ', url);
    if (url.includes('/payment-success') && counter.current === 0) {
      console.log(
        '🚀 ~ file: OnlinePayment.js ~ line 30 ~ OnlinePayment ~ counter',
        counter,
      );

      counter.current += 1;
      setTimeout(async () => {
        showSuccess(I18n.t('createdSuccessfully'));
        await store.dispatch(setSenderData(null));
        await store.dispatch(setReceiverData(null));
        await store.dispatch(setShipmentData(null));
        await store.dispatch(setCompanytData(null));
        await store.dispatch(
          setDeliveryDate(moment().locale('en').format('YYYY-MM-DD')),
        );

        AppNavigation.push({
          name: 'Congratulations',
          passProps: {
            id: url.includes('payment-success?shipment_id')
              ? url.split('=')[1]
              : '',
          },
          statusBarColor: colors.primary1,
        });
        return;
      }, 1000);
    }
    if (url.includes('/payment-error')) {
      AppNavigation.pop();
      // setTimeout(() => { AppNavigation.navigateToHome() }, 3000)
    }
    console.log('counter.current ', counter.current);
    if (counter.current === 2) {
      console.log('--------------------');
    }
    // if (canGoBack) {
    //   // AppNavigation.navigateToHome();
    //   counter.current += 1;
    //   if (counter.current >= 2) {
    //     AppNavigation.navigateToHome();
    //   }
    // }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        setLoad(false);
      }, 4000);
    }
  }, []);
  return (
    <>
      <Header title={I18n.t('payment')} />

      <View style={styles.flex}>
        <WebView
          onLoadStart={event => {
            if (!isLoading) {
              setLoad(true);
            }
          }}
          onLoad={event => {
            if (isLoading) {
              setLoad(false);
            }
          }}
          source={{
            uri: payment_url || 'https://www.google.com',
          }}
          onNavigationStateChange={_handleWebViewNavigationStateChange}
          javaScriptEnabled={true}
        />
        {isLoading && (
          <AppView stretch center flex style={StyleSheet.absoluteFill}>
            <AppSpinner size={12} />
          </AppView>
        )}
      </View>
    </>
  );
};

export default OnlinePayment;
