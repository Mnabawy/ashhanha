import React from 'react';
import { AppList, AppView } from '../../common';
import { Header } from '../../components';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import I18n from 'react-native-i18n';
import colors from '../../common/defaults/colors';
import CompanyBrancheCard from '../../components/CompanyBrancheCard/CompanyBrancheCard';
import { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from '../../components/NoNetworkConnection';

const CompanyBranches = () => {
    const netInfo = useNetInfo();
    const data = [{ title: 'تنبيه جديد' }, { title: 'تنبيه جديد' }, { title: 'تنبيه جديد' }, { title: 'تنبيه جديد' }, { title: 'تنبيه جديد' }]

    return (
        <AppView flex stretch backgroundColor={colors.bg}>
            <Header title={'إسم الشركة'} color={colors.black} />
            {!netInfo?.isConnected && netInfo.type !== 'unknown' ?
                <NoNetworkConnection />
                :
                <AppList
                    //   refreshControl={}
                    flex
                    //   apiRequest={{
                    //     url: `${BASE_URL}notifications`,
                    //   }}
                    data={data}
                    stretch
                    rowRenderer={(data, index) => (
                        <CompanyBrancheCard {...{ index }} {...data} />
                    )}
                />
            }
        </AppView>
    );
};

export default CompanyBranches;
