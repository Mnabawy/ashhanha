import React, {useCallback} from 'react';
import {AppForm, AppNavigation, AppView} from '../../common';
import I18n from 'react-native-i18n';
import colors from '../../common/defaults/colors';
import {Header} from '../../components';
import ShipmentDataForm from '../../components/AddShipment/ShipmentDataForm';
import {shipmentDatavalidationSchema} from '../../validation/shipment';
import {setShipmentData} from '../../actions/shipment';
import {useDispatch, useSelector} from 'react-redux';

const AddShipmentData = () => {
  const dispatch = useDispatch();
  const shipmentData = useSelector(state => state.shipment.shipmentData);
  console.log('shipmentDatashipmentData ', shipmentData);
  const renderContent = useCallback(props => {
    return <ShipmentDataForm {...props} />;
  }, []);

  const onSubmit = useCallback(async (values, {setSubmitting}) => {
    console.log('values  ===> ', values);
    await dispatch(setShipmentData(values));
    AppNavigation.push({
      name: 'ShippingPrices',
      passProps: {
        data: values,
      },
    });
    setSubmitting(false);
  }, []);

  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={I18n.t('CreateShipment')} />
      <AppForm
        validationSchema={shipmentDatavalidationSchema}
        schema={{
          newShipmentContent: shipmentData?.newShipmentContent || false,
          content_type_id: shipmentData?.content_type_id || '',
          content_types: shipmentData?.content_types || '',
          new_content_type: shipmentData?.new_content_type || '',
          width: shipmentData?.width || '',
          length: shipmentData?.length || '',
          height: shipmentData?.height || '',
          height_value: shipmentData?.height_value || 'cm',
          weight: shipmentData?.weight || '',
          weight_value: shipmentData?.weight_value || 'kg',
          content_price: shipmentData?.content_price || '',
          documentOnly: shipmentData?.documentOnly || false,
          ship_type: shipmentData?.ship_type || 'fast',
        }}
        render={renderContent}
        {...{onSubmit}}
      />
    </AppView>
  );
};

export default AddShipmentData;
