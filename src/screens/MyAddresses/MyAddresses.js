import React from 'react';
import { AppList, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import I18n from 'react-native-i18n';
import AddAddressBt from '../../components/MyAddresses/AddAddressBt';
import AddressCard from '../../components/MyAddresses/AddressCard';
import { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from '../../components/NoNetworkConnection';
import { BASE_URL } from '../../api/utils/urls';
import { useSelector } from 'react-redux';

const MyAddresses = () => {
    const netInfo = useNetInfo();
    const addressList = useSelector(state => state.list.addressList);

    return (
        <AppView flex stretch backgroundColor={colors.bg}>
            <Header title={I18n.t('myAddresses')} />
            {!netInfo?.isConnected && netInfo.type !== 'unknown' ?
                <NoNetworkConnection />
                :
                <>
                    <AddAddressBt />
                    <AppList
                        refreshControl={addressList}
                        flex
                        apiRequest={{
                            url: `${BASE_URL}addresses`,
                        }}
                        stretch
                        noResultsComponent={
                            <AppView flex stretch marginVertical={10} >
                                <AppText center >{I18n.t('noAddresses')}</AppText>
                                <AppText center color={colors.secondary}
                                    onPress={() => AppNavigation.push('AddAddress')}
                                    marginVertical={5} >{I18n.t('addAddress')}</AppText>
                            </AppView>
                        }
                        rowRenderer={(data, index) => (
                            <AddressCard {...{ index }} {...{ data }} />
                        )}
                    />
                </>
            }
        </AppView>
    );
};

export default MyAddresses;
