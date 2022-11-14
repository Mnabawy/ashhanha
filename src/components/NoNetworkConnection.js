import React, { Component } from 'react';
import { AppImage, AppText, AppView } from '../common';
import I18n from 'react-native-i18n';
import { ImageContainer } from '.';
import colors from '../common/defaults/colors';
const source = require('../assets/imgs/selectLangBg.png');
const logoWhite = require('../assets/imgs/logoWhite.png');
const homeImage = require('../assets/imgs/homeImage.png');

const NoNetworkConnection = () => {
    return (
        <AppImage flex stretch
            center
            paddingHorizontal={5}
            {...{ source }}
            backgroundColor='red'
            >
            <AppImage
                source={logoWhite}
                width={50} height={20}
                resizeMode='contain'
            />
            <AppImage source={homeImage}
                width={60} height={45}
                resizeMode='contain'
            />
            <AppText size={8} center color={colors.white}>{I18n.t('noInternet')}</AppText>

        </AppImage>
    );
};

export default NoNetworkConnection;
