import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../common';

export default StyleSheet.create({
  confirmButton: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    zIndex: 1000,
    left: responsiveWidth(10),
    right: responsiveWidth(10),
  },

  autocompleteContainer: {
    position: 'absolute',
    top: responsiveHeight(10),
    zIndex: 10000,
    left: responsiveWidth(10),
    right: responsiveWidth(10),
  },
});
