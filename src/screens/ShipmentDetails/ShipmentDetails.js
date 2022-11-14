import React, {Component, useCallback, useEffect, useState} from 'react';
import {LoadingView, ScrollableContainer} from '../../components';
import I18n from 'react-native-i18n';
import ShipmentNumber from '../../components/ShipmentDetails/ShipmentNumber';
import SenderData from '../../components/ShipmentDetails/SenderData';
import ReceiverData from '../../components/ShipmentDetails/receiverData';
import ShipmentDimensions from '../../components/ShipmentDetails/ShipmentDimensions';
import ShipmentContent from '../../components/ShipmentDetails/ShipmentContent';
import ShippingCompany from '../../components/ShipmentDetails/ShippingCompany';
import DeliveryMethod from '../../components/ShipmentDetails/DeliveryMethod';
import CompanyDeliveryDate from '../../components/ShipmentDetails/CompanyDeliveryDate';
import RequiredPayment from '../../components/ShipmentDetails/RequiredPayment';
import PaymentMethod from '../../components/ShipmentDetails/PaymentMethod';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {AppIcon, AppNavigation, AppSpinner} from '../../common';
import colors from '../../common/defaults/colors';
import {share} from '../../utils/Share';
import SharePDFModal from '../../components/ShipmentDetails/SharePDFModal';
import {useRef} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import useFetch from '../../components/useFetch';
import {ShipmentRepo} from '../../repo';
import ShipmentPrice from '../../components/ShipmentDetails/ShipmentPrice';
import ShippingType from '../../components/ShipmentDetails/ShippingType';

const shipmentRepo = new ShipmentRepo();
const ShipmentDetails = ({id}) => {
  const {isLoading, data} = useFetch(shipmentRepo.getShipmentDetails, id);
  const {isLoading: loadingHTML, data: html} = useFetch(
    shipmentRepo.getShipmentDetailsAsHTML,
    id,
  );

  const sharePDFModalRef = useRef();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
        setPermissionGranted(!permissionGranted);
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');

  const generatePDF = useCallback(async () => {
    if (Platform.OS === 'android') {
      if (!permissionGranted) {
        requestStoragePermission();
        return;
      }
    }
    setLoading(true);
    console.log('------HTML----', html);
    if (html) {
      let options = {
        html: html,
        fileName: `Shipment number ${id}`,
        directory: 'Esh7enha App',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      if (pdf) {
        setFile(pdf);
        AppNavigation.push({
          name: 'LadingBillPDF',
          passProps: {file: pdf, id, html},
        });
        // sharePDFModalRef.current.show();
      }
    }

    setLoading(false);
  }, [data, html, permissionGranted]);

  return (
    <ScrollableContainer
      title={I18n.t('shipmentDetails')}
      paddingBottom={5}
      rightItems={
        data &&
        (loading ? (
          <AppSpinner />
        ) : (
          <AppIcon
            name="page-export-pdf"
            type="Foundation"
            color={colors.primary}
            size={12}
            onPress={generatePDF}
          />
        ))
      }>
      {isLoading || !data ? (
        <LoadingView />
      ) : (
        <>
          <ShipmentNumber {...{data}} />

          <SenderData {...{data}} />

          <ReceiverData {...{data}} />

          <ShipmentDimensions {...{data}} />

          <ShipmentContent {...{data}} />

          <ShippingType {...{data}} />

          <ShippingCompany {...{data}} />

          <DeliveryMethod {...{data}} />

          <CompanyDeliveryDate {...{data}} />

          <ShipmentPrice {...{data}} />

          <RequiredPayment {...{data}} />

          <PaymentMethod {...{data}} />

          <SharePDFModal
            ref={sharePDFModalRef}
            {...{file}}
            onClosed={v => {
              sharePDFModalRef.current.hide();
              if (v === 1) {
                share('details', `file://${file.filePath}`);
              }
            }}
          />
        </>
      )}
    </ScrollableContainer>
  );
};

export default ShipmentDetails;
