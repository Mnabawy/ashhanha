import React from 'react';
import {Linking} from 'react-native';
import I18n from 'react-native-i18n';
import {AppButton, AppIcon, AppText, AppView} from '../../common';
import colors from '../../common/defaults/colors';
import {LoadingView, ScrollableContainer} from '../../components';
import Form from '../../components/contactus/Form';
import useFetch from '../../components/useFetch';
import {ContactUsRepo} from '../../repo';

const contactUsRepo = new ContactUsRepo();

const ContactUs = () => {
  const {isLoading, data} = useFetch(contactUsRepo.getSocial);
  console.log('🚀 ~ file: ContactUs.js ~ line 14 ~ ContactUs ~ data', data);

  return (
    <ScrollableContainer paddingHorizontal={5} title={I18n.t('contactUs')}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          <Form />
          {data ? (
            <>
              <AppView flex stretch center>
                <AppText>{I18n.t('contactViaWhatsApp')}</AppText>
              </AppView>
              <AppButton
                title={I18n.t('messageNow')}
                stretch
                marginTop={5}
                marginBottom={10}
                backgroundColor={'#009688'}
                centerIcon={
                  <AppIcon
                    name="whatsapp"
                    type="FontAwesome"
                    size={10}
                    marginHorizontal={5}
                    color={colors.white}
                  />
                }
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=&phone=${data?.value}`,
                  )
                }
                center
              />
            </>
          ) : null}
        </>
      )}
    </ScrollableContainer>
  );
};

export default ContactUs;
