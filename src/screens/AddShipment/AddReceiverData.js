import React, { useCallback } from 'react';
import I18n from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setReceiverData } from '../../actions/shipment';
import source from '../../assets/imgs/receiverData.png';
import { AppForm, AppImage, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import ReceiverDataForm from '../../components/AddShipment/ReceiverDataForm';
import { receiverDatavalidationSchema } from '../../validation/shipment';

const AddReceiverData = () => {
    const dispatch = useDispatch();
    const receiverData = useSelector(state => state.shipment.receiverData);

    const renderContent = useCallback(
        (props) => {
            return <ReceiverDataForm {...props} />;
        },
        [],
    );

    const onSubmit = useCallback(
        async (values, { setSubmitting }) => {
            console.log("values  setReceiverData ", values)
            await dispatch(setReceiverData(values));
            AppNavigation.push({
                name: 'AddShipmentData',
            })
            setSubmitting(false);
        },
        [],
    );

    return (
        <AppView flex stretch backgroundColor={colors.bg} >
            <AppImage source={source} height={28} width={100} stretch resizeMode='stretch'
                // style={{ position: 'absolute', top: 0 }}
            >
            <Header title={I18n.t('CreateShipment')}
                color={colors.white}
                backgroundColor={'transparent'} />
            <AppText size={8} color={colors.white} margin={5} >{I18n.t('enterReceiverData')}</AppText>
            </AppImage>
            <AppForm
                validationSchema={receiverDatavalidationSchema}
                schema={{
                    receiver_name: receiverData?.receiver_name || '',
                    receiver_phone: receiverData?.receiver_phone || '',
                    country_id: receiverData?.country_id || '',
                    countryName: receiverData?.countryName || '',
                    state_id: receiverData?.state_id || '',
                    stateName: receiverData?.stateName || '',
                    city_id: receiverData?.city_id || '',
                    cityName: receiverData?.cityName || '',
                    receiver_address: receiverData?.receiver_address || '',
                    receiver_address_url: receiverData?.receiver_address_url || '',
                    zip_code: receiverData?.zip_code || '',
                }}
                render={renderContent}
                {...{ onSubmit }}
            />
        </AppView>
    );
};

export default AddReceiverData;
