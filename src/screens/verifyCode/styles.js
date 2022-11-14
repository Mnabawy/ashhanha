const {StyleSheet} = require('react-native');
const {
  responsiveWidth,
  responsiveHeight,
  moderateScale,
  responsiveFontSize,
} = require('../../common');

const rad = 24;
export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: responsiveWidth(5),
    height: responsiveHeight(20),
  },
  codeInputFieldStyle: {
    width: moderateScale(rad),
    height: moderateScale(rad),
    borderRadius: moderateScale(2),
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#F5F5F5',
    fontSize: responsiveFontSize(8),
  },

  codeInputHighlightStyle: {
    backgroundColor: 'white',
    borderColor: '#5BC4F1',
  },
});
