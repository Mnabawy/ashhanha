import React, { Component } from 'react';
import { AppList, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import I18n from 'react-native-i18n';
import ShipmentCard from '../../components/MyShipments/ShipmentCard';
import { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from '../../components/NoNetworkConnection';
import { BASE_URL } from '../../api/utils/urls';
import { Platform } from 'react-native';

const MyShipments = () => {
    const netInfo = useNetInfo();

    return (
        <AppView flex stretch backgroundColor={colors.bg}>
            <Header title={I18n.t('myShipments')} />
            {!netInfo?.isConnected && netInfo.type !== 'unknown' ?
                <NoNetworkConnection />
                :
                <AppList
                    //   refreshControl={}
                    flex
                    apiRequest={{
                        url: `${BASE_URL}user-shipment`,
                    }}
                    stretch
                    rowRenderer={(data, index) => (
                        <ShipmentCard {...{ index }} {...{ data }} />
                    )}
                    noResultsComponent={
                        <AppView flex stretch marginVertical={10} >
                            <AppText center >{I18n.t('noShipments')}</AppText>
                            <AppText center color={colors.secondary}
                                onPress={() => {
                                    AppNavigation.pop();
                                    AppNavigation.closeMenu();
                                    setTimeout(() => {
                                        AppNavigation.push('AddSenderData')
                                    }, 1000);

                                }}
                                marginVertical={5} >{I18n.t('CreateShipment')}</AppText>
                        </AppView>
                    }
                />
            }
        </AppView>
    );
};

export default MyShipments;
