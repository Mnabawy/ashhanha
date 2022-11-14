import { useNetInfo } from '@react-native-community/netinfo';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import I18n from 'react-native-i18n';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import NoNetworkConnection from '../../components/NoNetworkConnection';
import Picker from '../../components/Picker';
import ShippingPricesCard from '../../components/ShippingPrices/ShippingPricesCard';

const ShippingPrices = ({data}) => {
  const [sortType, setSortType] = useState('low');
  const [total, setTotal] = useState(0);
  const shipmentData = useSelector(state => state.shipment.shipmentData);
  const receiverData = useSelector(state => state.shipment.receiverData);
  const [fliterData, setFliterData] = useState({
    city_id: receiverData?.city_id,
    weight: shipmentData?.weight,
    weight_value: shipmentData?.weight_value,
    ship_type: shipmentData?.ship_type,
    height: shipmentData?.height,
    height_value: shipmentData?.height_value,
    width: shipmentData?.width,
    length: shipmentData?.length,
  });
  const sortData = useMemo(() => {
    return [
      // { name: I18n.t('deliverySpeed'), id: 'speed', },
      {name: I18n.t('lowerPrice'), id: 'low'},
      {name: I18n.t('highPrice'), id: 'high'},
    ];
  }, []);
  useEffect(() => {
    setParams();
  }, []);

  const setParams = useCallback(async () => {
    let contentTypes = {};
    if (shipmentData?.content_types?.length > 0) {
      shipmentData?.content_types.map((item, index) => {
        if (item.id === 'other')
          contentTypes[`new_content_type`] = shipmentData?.new_content_type;
        else contentTypes[`content_type_id[${index}]`] = item.id;
      });
      console.log('contentTypes ', contentTypes);
      setFliterData({
        ...fliterData,
        ...contentTypes,
      });
    }
    // console.log('fliterData -------------------------- ', fliterData);
  }, []);
  const netInfo = useNetInfo();
  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={I18n.t('shippingPrices')} color={colors.black} />
      {!netInfo?.isConnected && netInfo.type !== 'unknown' ? (
        <NoNetworkConnection />
      ) : (
        <AppView flex stretch>
          <AppView
            stretch
            row
            spaceBetween
            marginHorizontal={10}
            marginBottom={20}>
            <AppView flex={1.5} stretch center>
              <AppText color={colors.secondary}>{`${I18n.t(
                'result',
              )} ${total}`}</AppText>
            </AppView>
            <AppView flex stretch>
              <AppText size={7}>{`${I18n.t('sortBy')}`}</AppText>

              <Picker
                title={I18n.t('sortBy')}
                onChangeValue={v => setSortType(v)}
                label="name"
                value="id"
                isSearch={false}
                initialValue={{
                  label: I18n.t('lowerPrice'),
                  value: sortType,
                }}
                data={sortData}
                paddingVertical={0}
                // backgroundColor={'transparent'}
                // borderWidth={0}
              />
            </AppView>
          </AppView>

          {fliterData.hasOwnProperty('content_type_id[0]') ||
          fliterData.hasOwnProperty('new_content_type') ? (
            <AppList
              //   refreshControl={}
              flex
              apiRequest={{
                url: `${BASE_URL}get-company`,
                params: {
                  ...fliterData,
                  sort: sortType,
                },
                responseResolver: response => {
                  setTotal(response?.data?.length);
                  return {
                    data: response?.data || [],
                  };
                },
              }}
              stretch
              noResultsLabel={I18n.t('noShippingCompanies')}
              rowRenderer={(data, index) => (
                <ShippingPricesCard {...{index}} {...{data}} />
              )}
            />
          ) : null}
        </AppView>
      )}
    </AppView>
  );
};

export default ShippingPrices;
