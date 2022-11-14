import React, { useState } from 'react';
import { ScrollableContainer } from '../../components/';
import I18n from 'react-native-i18n';
import Item from '../../components/menu/Item';
import { AppImage, AppNavigation, AppSpinner, AppView } from '../../common';
import { AuthRepo } from '../../repo';
import colors from '../../common/defaults/colors';
const logo = require('../../assets/imgs/logo.png');
const authRepo = new AuthRepo();

const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(1)

  return (
    <AppView flex stretch paddingBottom={10}>
      {loading &&
        <AppView center
          style={{
            position: 'absolute', opacity: 0.9,
            zIndex: 10000, top: 0, bottom: 0, left: 0, right: 0
          }}
          backgroundColor={colors.white}
        >
          <AppSpinner size={15} />
        </AppView>
      }
      <ScrollableContainer header={false} center backgroundColor={colors.white}>

        <AppImage equalSize={60} source={logo} />
        <Item
          onPress={() => {
            setSelected(1)
            AppNavigation.closeMenu();
          }}
          title={I18n.t('home')}
          selected={selected === 1}
        />
        <Item
          onPress={() => {
            setSelected(2)
            AppNavigation.push('MyShipments')
          }}
          title={I18n.t('myShipments')}
          selected={selected === 2}
        />

        <Item
          onPress={() => {
            setSelected(3)
            AppNavigation.push('Profile')
          }}
          title={I18n.t('myData')}
          selected={selected === 3}
        />

        <Item
          onPress={() => {
            setSelected(4)
            AppNavigation.push('contactUs')
          }}
          title={I18n.t('contactUs')}
          selected={selected === 4}
        />

        <Item
          onPress={() => {
            setSelected(5);
            AppNavigation.push('termsAndConditions');
          }}
          title={I18n.t('termsAndConditions')}
          selected={selected === 5}
        />

        <Item
          onPress={() => {
            setSelected(8);
            AppNavigation.push('UsagePolicy');
          }}
          title={I18n.t('usagePolicy')}
          selected={selected === 8}
        />

        <Item
          onPress={() => {
            setSelected(6);
            AppNavigation.push('AboutUs');
          }}
          title={I18n.t('aboutUs')}
          selected={selected === 6}
        />

        <Item
          onPress={() => {
            setSelected(7)
            AppNavigation.push({
              name: 'changeLanguage',
            })
          }
          }
          title={I18n.t('changeLanguage')}
          selected={selected === 7}
        />

      </ScrollableContainer>
      <Item
        onPress={async () => {
          setLoading(true);
          const res = await authRepo.logoutPrincipalUser();
          setLoading(false);
        }}
        title={I18n.t('logout')}
        color={colors.secondary}
      />
    </AppView>
  );
};

export default Menu;
