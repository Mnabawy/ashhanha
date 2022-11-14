import React, { Component, useEffect } from 'react';
import { ImageContainer, ScrollableContainer } from '../../components';
import I18n from 'react-native-i18n';
import colors from '../../common/defaults/colors';
import { AppButton, AppImage, AppNavigation, AppText, AppView, responsiveHeight } from '../../common';
import store from '../../store/store';
import { Alert, BackHandler } from 'react-native';

const source = require('../../assets/imgs/selectLangBg.png');
const congratulations = require('../../assets/imgs/congratulations.png');

const Congratulations = ({ id }) => {
    useEffect(() => {
        const backAction = () => {
            AppNavigation.navigateToHome(store.getState().lang.rtl);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <ImageContainer
            hideBack
            paddingHorizontal={5}
            centerY
            color={colors.white}
            {...{ source }}>
            <AppView stretch center
                backgroundColor={colors.white}
                borderRadius={15} marginTop={responsiveHeight(5)}
                paddingVertical={15}
            >
                <AppImage source={congratulations}
                    equalSize={60}
                    resizeMode='contain'
                />
                <AppText size={9} center>{I18n.t('shipmentNumber')}</AppText>
                <AppText size={8} center>{id}</AppText>

            </AppView>
            <AppButton
                onPress={() => AppNavigation.navigateToHome(store.getState().lang.rtl)}
                linearGradient
                stretch
                marginVertical={10}
                backgroundColors={[colors.secondary, colors.secondary1]}
                title={I18n.t('Congratulations')}
            />
        </ImageContainer>
    );
};

export default Congratulations;
