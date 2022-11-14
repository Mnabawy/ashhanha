import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { responsiveHeight, responsiveWidth } from './utils/responsiveDimensions';
// import { Picker } from '@react-native-picker/picker';
import AppView from './View';

export default (props) => {
  const {
    items,
    onSelect,
    selectedValue,
    height = Platform.OS === 'android' ? 7 : 6,
    placeholder,
    width,
    enabled,
    ...rset
  } = props;
  const memoizedItemStyles = useMemo(() => {
    return {
      itemStyle:
        Platform.OS === 'ios' ? { height: responsiveHeight(height) } : {},
    };
  }, [height]);
  const memoizedDimStyles = useMemo(() => {
    return {
      height: responsiveHeight(height),
      width: width ? responsiveWidth(width) : '100%',
    };
  }, [height, width]);
  return (
    <AppView {...rset}>
      {/* <Picker
        enabled={enabled}
        selectedValue={selectedValue}
        style={memoizedDimStyles}
        onValueChange={(value, index) => onSelect(value, index)}
        itemStyles={memoizedItemStyles}>
        <Picker.Item color="#303030" label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item
            color="#303030"
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker> */}
    </AppView>
  );
};
