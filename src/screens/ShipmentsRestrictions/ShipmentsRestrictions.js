import React from 'react';
import { AppButton, AppList, AppNavigation, AppView } from '../../common';
import I18n from 'react-native-i18n';
import { Header, } from '../../components';
import colors from '../../common/defaults/colors';
import { useNetInfo } from '@react-native-community/netinfo';
import NoNetworkConnection from '../../components/NoNetworkConnection';
import { BASE_URL } from '../../api/utils/urls';
import ShipmentCardRestrictions from '../../components/MyShipments/ShipmentCardRestrictions';

const ShipmentsRestrictions = () => {
  const netInfo = useNetInfo();

  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={I18n.t('shipmentsRestrictions')} />
      {!netInfo?.isConnected && netInfo.type !== 'unknown' ?
        <NoNetworkConnection />
        :
        <AppList
          flex
          apiRequest={{
            url: `${BASE_URL}restriction`,
            responseResolver: (response) => {
              const { data } = response?.data;
              return {
                data: data || [],
              };
            }
          }}
          stretch
          rowRenderer={(data, index) => (
            <ShipmentCardRestrictions  {...{ data }} />
          )}
        />
      }
      <AppButton
        onPress={() => AppNavigation.pop()}
        stretch
        margin={10}
        linearGradient
        title={I18n.t('ok')}
      />
    </AppView>
    // <ScrollableContainer
    //   padding={5}
    //   backgroundColor={colors.bg}
    //   flex
    //   stretch
    //   title={I18n.t('shipmentsRestrictions')}>
    //   {content.isLoading ? (
    //     <AppView flex height={90} stretch center>
    //       <AppSpinner />
    //     </AppView>
    //   ) : (
    //     <>
    //       <SectionContent content={`${content?.data?.content || ''}`} />
    //       <AppButton
    //         onPress={() => AppNavigation.pop()}
    //         stretch
    //         marginVertical={10}
    //         linearGradient
    //         title={I18n.t('ok')}
    //       />
    //     </>
    //   )}
    // </ScrollableContainer>
  );
};

export default ShipmentsRestrictions;
