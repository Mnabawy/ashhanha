import React, { useEffect } from 'react';
import I18n from 'react-native-i18n';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { AppButton, AppImage, AppNavigation } from '../../common';
import colors from '../../common/defaults/colors';
import { ImageContainer } from '../../components';
import ShippingCompanies from '../../components/home/ShippingCompanies';
import useFetch from '../../components/useFetch';
import { AuthRepo, NotificationsRepo } from '../../repo';
const source = require('../../assets/imgs/selectLangBg.png');
const logoWhite = require('../../assets/imgs/logoWhite.png');
const homeImage = require('../../assets/imgs/homeImage.png');

const authRepo = new AuthRepo();

const notificationsRepo = new NotificationsRepo();
const Home = () => {
  const { isLoading, data } = useFetch(authRepo.getPrincipalUserProfileData);
  const user = useSelector((state) => state.auth.userData?.user);
  console.log("user in home ", user)
  useEffect(() => {
    SplashScreen.hide();
    notificationsRepo.getUnReadCounter();
  }, []);

  return (
    <ImageContainer
      hideBack
      center
      showMenu={true}
      headers={true}
      showNotif={true}
      color={colors.white}
      title={`${I18n.t('Welcome')} ${user?.name}`}
      paddingHorizontal={5}
      {...{ source }}>
      <AppImage
        source={logoWhite}
        width={50} height={20}
        resizeMode='contain'
      />
      <AppImage source={homeImage}
        width={60} height={40}
        resizeMode='contain'
      />
      <AppButton
        onPress={() => AppNavigation.push({
          name: 'AddSenderData',
          statusBarColor: colors.primary
        })}
        linearGradient
        stretch
        backgroundColors={[colors.secondary, colors.secondary1]}
        title={I18n.t('CreateShipment')}
      />
      <ShippingCompanies />
    </ImageContainer>
  );
};

export default Home;
