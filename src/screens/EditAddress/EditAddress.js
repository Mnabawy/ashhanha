import React, { Component, useCallback, useEffect } from 'react';
import { AppForm, AppNavigation } from '../../common';
import { ScrollableContainer } from '../../components';
import I18n from 'react-native-i18n';
import Location from '../../utils/Location';
import Form from '../../components/EditAddress/From';
import { AddressRepo } from '../../repo';
import { validateAddAddress } from '../../validation/address';

const addressRepo = new AddressRepo();

const EditAddress = ({ data }) => {

    useEffect(() => {
        locationPermission();
    }, []);
    const locationPermission = useCallback(async () => {
        await Location.configure();
    }, []);

    const renderContent = useCallback(
        (props) => {
            return <Form {...props} {...{ data }} />;
        },
        [],
    );

    const onSubmit = useCallback(
        async (values, { setSubmitting }) => {
            console.log("values ++++ =======================", values.enablePositioning)
            if (!values.enablePositioning) {
                values.lat = '';
                values.lng = '';
                values.address = '';
            }
            console.log("values ++++ =======================", values)

            const res = await addressRepo.updateAddress(values, data.id);
            if (res) {
                AppNavigation.pop();
            }
            setSubmitting(false);
        },
        [],
    );

    return (
        <ScrollableContainer
            title={I18n.t('editAddress')}
            paddingHorizontal={5}
        >
            <AppForm
                validationSchema={validateAddAddress}
                schema={{
                    name: data?.name || '',
                    phone: data?.phone || '',
                    country_id: data?.city?.state?.country.id || '',
                    state_id: data?.city?.state.id || '',
                    city_id: data?.city?.id || '',
                    street: data?.street || '',
                    building_no: data?.building_no || '',
                    floor: data?.floor || '',
                    mark: data?.mark || '',
                    // zip_code: data?.zip_code || '',
                    default: data?.default ? 1 : 0,
                    enablePositioning: data?.lat ? true : false,
                    lat: data?.lat || '',
                    lng: data?.lng || '',
                }}
                render={renderContent}
                {...{ onSubmit }}
            />
        </ScrollableContainer>
    );
};

export default EditAddress;
