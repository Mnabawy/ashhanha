import React, { useCallback, useEffect } from 'react';
import { AppForm, AppNavigation } from '../../common';
import { ScrollableContainer } from '../../components';
import Form from '../../components/AddAddress/From';
import I18n from 'react-native-i18n';
import Location from '../../utils/Location';
import { validateAddAddress } from '../../validation/address';
import { useSelector } from 'react-redux';
import { AddressRepo } from '../../repo';

const addressRepo = new AddressRepo();
const AddAddress = ({ showAddToMyAddresses, onDone }) => {
    const user = useSelector((state) => state.auth.userData?.user);

    useEffect(() => {
        locationPermission();
    }, []);
    const locationPermission = useCallback(async () => {
        await Location.configure();
    }, []);

    const renderContent = useCallback(
        (props) => {
            return <Form {...props} {...{ showAddToMyAddresses }} />;
        },
        [],
    );

    const onSubmit = useCallback(
        async (values, { setSubmitting }) => {
            const res = await addressRepo.addAddress(values);
            if (res) {
                console.log("res add address ",res)
                if (onDone) {
                    await onDone(res); 
                }
                AppNavigation.pop();
            }
            setSubmitting(false);
        },
        [],
    );

    return (
        <ScrollableContainer
            title={I18n.t('addAddress')}
            paddingHorizontal={5}
        >
            <AppForm
                validationSchema={validateAddAddress}
                schema={{
                    name: '',
                    phone: user?.phone || '',
                    city_id: '',
                    street: '',
                    building_no: '',
                    floor: '',
                    mark: '',
                    // zip_code: '',
                    default: 0,
                    enablePositioning: false,
                }}
                render={renderContent}
                {...{ onSubmit }}
            />
        </ScrollableContainer>
    );
};

export default AddAddress;
