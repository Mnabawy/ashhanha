import React, { useCallback } from 'react';
import I18n from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setSenderData } from '../../actions/shipment';
import source from '../../assets/imgs/senserData.png';
import { AppForm, AppImage, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import SenderDataForm from '../../components/AddShipment/SenderDataForm';
import { senderDatavalidationSchema } from '../../validation/shipment';

const AddSenderData = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData?.user);
  const senderData = useSelector(state => state.shipment.senderData);

  const renderContent = useCallback(props => {
    return <SenderDataForm {...props} />;
  }, []);

  const onSubmit = useCallback(async (values, {setSubmitting}) => {
    console.log('values sender data ', values);
    await dispatch(setSenderData(values));
    AppNavigation.push({
      name: 'AddReceiverData',
      statusBarColor: colors.primary,
    });
    setSubmitting(false);
  }, []);

  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <AppImage
        source={source}
        height={28}
        width={100}
        stretch
        resizeMode="stretch"
        // style={{ position: 'absolute', top: 0 }}
      >
        <Header
          title={I18n.t('CreateShipment')}
          color={colors.white}
          backgroundColor={'transparent'}
        />
        <AppText size={8} color={colors.white} margin={5}>
          {I18n.t('enterSenderData')}
        </AppText>
      </AppImage>
      <AppForm
        validationSchema={senderDatavalidationSchema}
        schema={{
          sender_name: user?.name || '',
          sender_phone: user?.phone || '',
          sender_id_number: user?.id_number || '',
          // country_id: senderData?.country_id || '',
          // state_id: senderData?.state_id | '',
          // sender_city_id: senderData?.sender_city_id || '',
          sender_address: senderData?.sender_address || '',
          sender_address_id: senderData?.sender_address_id || '',
          sender_address_url: senderData?.sender_address_url || '',
        }}
        render={renderContent}
        {...{onSubmit}}
      />
    </AppView>
  );
};

export default AddSenderData;
