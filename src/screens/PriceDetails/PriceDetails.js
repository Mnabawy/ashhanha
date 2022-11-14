import React, { useCallback } from 'react';
import I18n from 'react-native-i18n';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { ScrollableContainer } from '../../components';

const PriceDetails = ({data, isEnabled, collectionPlace}) => {
  console.log('data +++++ ', data);
  const {policy, tax, insure, price, price_from_home} = data;

  const renderRow = useCallback((name, value, color) => {
    return (
      <AppView flex row stretch spaceBetween paddingVertical={3}>
        <AppText color={color ? color : colors.graytext}>
          {I18n.t(name)}
        </AppText>
        {value ? (
          <AppText color={color}>{`${value} ${I18n.t('sar')}`}</AppText>
        ) : null}
      </AppView>
    );
  }, []);
  return (
    <ScrollableContainer header padding={5} title={I18n.t('priceDetails')}>
      <AppView
        flex
        stretch
        borderRadius={15}
        padding={5}
        backgroundColor={colors.white}>
        {renderRow('policyPrice', policy)}
        {renderRow('taxPrice', tax)}
        {collectionPlace === 'home'
          ? renderRow(
              'HomeDeliveryPrice',
              (price_from_home - tax - policy).toFixed(2),
            )
          : null}
        {isEnabled && insure ? renderRow('insurancePrice', insure) : null}
        {/* {collectionPlace === 'home' && renderRow('homeDelivery', (price_from_home - tax).toFixed(2))} */}
      </AppView>
      <AppView
        flex
        stretch
        borderRadius={15}
        marginVertical={5}
        paddingHorizontal={5}
        paddingVertical={2}
        backgroundColor={colors.graytext}>
        {renderRow(
          'total',
          collectionPlace === 'home'
            ? isEnabled
              ? (price_from_home + insure).toFixed(2)
              : price_from_home
            : isEnabled
            ? (price + insure).toFixed(2)
            : price,
          colors.secondary1,
        )}
      </AppView>
    </ScrollableContainer>
  );
};

export default PriceDetails;
