import React from 'react';
import { useSelector } from 'react-redux';

import { AppView, AppText, AppNavigation, AppButton, AppIcon, AppImage } from '../common';
import colors from '../common/defaults/colors';
import { APPBAR_HEIGHT } from '../common/utils/responsiveDimensions';
const menu = require('../assets/imgs/menu.png');
const notif = require('../assets/imgs/notif.png');

const goToNotifications = () => AppNavigation.push('notifications');
const Header = (props) => {
  const {
    backHandler,
    hideBack,
    title,
    rightItems,
    backgroundColor,
    showMenu,
    bold,
    showNotif,
    color,
    center,
    size,
  } = props;
  const notificationsCount = useSelector((state => state.bottomTabs.notificationCounter));

  const goBack = () => {
    if (backHandler) {
      backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  const renderRight = () => {
    if (showNotif) {
      return (
        <AppButton onPress={goToNotifications} flex transparent marginHorizontal={5}>
          {/* <AppIcon name="notifications" type="material" size={10} /> */}
          <AppView backgroundColor={colors.white} borderRadius={15}
            style={{ opacity: 0.4, position: 'absolute', top: 3, right: 0, bottom: 3, left: 0 }} />
          <AppImage source={notif} equalSize={8} resizeMode='contain' >
            {notificationsCount > 0 &&
              <AppView circleRadius={4} backgroundColor={colors.secondary} elevation={5} />
            }
          </AppImage>
        </AppButton>
      );
    }
    if (rightItems) {
      return (
        <AppView flex={2.5} stretch center>
          {rightItems}
        </AppView>
      );
    }
    return <AppView flex />;
  };

  const renderLeft = () => {

    if (showMenu) {
      return (
        <AppButton flex stretch onPress={AppNavigation.openMenu} transparent marginRight={5}>
          {/* <AppIcon name="menu" type="feather" size={12} /> */}
          <AppImage source={menu} equalSize={8} resizeMode='contain' />
        </AppButton>
      );
    }
    if (hideBack) {
      return <AppView stretch flex />;
    }
    return (
      <AppButton transparent flex onPress={goBack}>
        <AppIcon color={color} flip name="md-arrow-back" size={12} />
      </AppButton>
    );
  };

  const renderCenter = () => {

    return (
      <AppView flex={6} center={center}>
        <AppText
          size={10}
          bold={bold}
          numberOfLines={1}
          color={color}>
          {title}
        </AppText>
      </AppView>
    );
  };
  return (
    <AppView
      center
      backgroundColor={backgroundColor}
      stretch
      style={{
        height: APPBAR_HEIGHT,
      }}
      row
      spaceBetween>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </AppView>
  );
};

Header.defaultProps = {
  hideBack: false,
  showNotif: false,
  color: colors.black,
  paddingHorizontal: 10,
  backgroundColor: 'transparent',
};

export default Header;
