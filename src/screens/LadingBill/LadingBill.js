import React, {useState} from 'react';
import {ScrollableContainer} from '../../components';
import I18n from 'react-native-i18n';
import SenderData from '../../components/LadingBill/SenderData';
import ReceiverData from '../../components/LadingBill/receiverData';
import ShipmentDimensions from '../../components/LadingBill/ShipmentDimensions';
import ShipmentContent from '../../components/LadingBill/ShipmentContent';
import ShippingCompany from '../../components/LadingBill/ShippingCompany';
import DeliveryMethod from '../../components/LadingBill/DeliveryMethod';
import CompanyDeliveryDate from '../../components/LadingBill/CompanyDeliveryDate';
import RequiredPayment from '../../components/LadingBill/RequiredPayment';
import PaymentMethod from '../../components/LadingBill/PaymentMethod';
import ShipmentPrice from '../../components/LadingBill/ShipmentPrice';
import {AppText} from '../../common';
import ShippingType from '../../components/LadingBill/ShippingType';

const LadingBill = () => {
  return (
    <ScrollableContainer title={I18n.t('ladingBill')} paddingBottom={5}>
      <AppText size={8} margin={5}>
        {I18n.t('approvedData')}
      </AppText>

      <SenderData />

      <ReceiverData />

      <ShipmentDimensions />

      <ShipmentContent />

      <ShippingType />

      <ShippingCompany />

      <DeliveryMethod />

      <CompanyDeliveryDate />

      <ShipmentPrice />

      <RequiredPayment />

      <PaymentMethod />
    </ScrollableContainer>
  );
};

export default LadingBill;
