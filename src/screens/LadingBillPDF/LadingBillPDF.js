//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AppView, AppIcon } from '../../common';
import { Header } from '../../components';
import Pdf from 'react-native-pdf';
import I18n from 'react-native-i18n';
import colors from '../../common/defaults/colors';
import { share } from '../../utils/Share';

// create a component
const LadingBillPDF = ({ file, id }) => {
    return (
        <AppView flex stretch>
            <Header title={`${I18n.t('shipmentDetails')} - ${id}`}
                rightItems={
                    <AppIcon
                        name='share'
                        type='Entypo'
                        color={colors.primary}
                        size={12}
                        onPress={() => share('details', `file://${file.filePath}`)}
                    />
                }
            />
            <Pdf
                source={{ uri: `file://${file.filePath}` }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf}
            />
        </AppView>
    );
};

// define your styles
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

//make this component available to the app
export default LadingBillPDF;
