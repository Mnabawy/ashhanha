import React from 'react';
import { AppList, AppView } from '../../common';
import { Header } from '../../components';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import I18n from 'react-native-i18n';
import colors from '../../common/defaults/colors';
import { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from '../../components/NoNetworkConnection';
import { BASE_URL } from '../../api/utils/urls';

const Notifications = () => {
  const netInfo = useNetInfo();
  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={I18n.t('notifications')} color={colors.black} />
      {!netInfo?.isConnected && netInfo.type !== 'unknown' ?
        <NoNetworkConnection />
        :
        <AppList
          //   refreshControl={}
          flex
          apiRequest={{
            url: `${BASE_URL}notifications`,
            responseResolver: (response) => {
              const { meta, data } = response?.data;
              return {
                data: data || [],
                pageCount: Math.ceil(meta?.total / meta?.per_page),
                page: meta?.current_page,
              };
            }
          }}
          stretch
          noResultsLabel={I18n.t('noNotifications')}
          rowRenderer={(data, index) => (
            <NotificationCard {...{ index }} {...data} />
          )}
        />
      }
    </AppView>
  );
};

export default Notifications;
