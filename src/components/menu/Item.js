import React from 'react';
import { TouchableView, AppView, AppIcon, AppText } from '../../common';
import colors from '../../common/defaults/colors';

const Item = ({ title, onPress, color, selected }) => {
  return (
    <TouchableView
      {...{ onPress }}
      stretch
      paddingHorizontal={5}
      paddingVertical={4}
      row
      spaceBetween>
      <AppView row>
        <AppView marginHorizontal={2} >
          {selected && <AppView circleRadius={2} backgroundColor={colors.primary} />}
        </AppView>
        <AppText size={9} color={color} >
          {title}
        </AppText>
      </AppView>
    </TouchableView>
  );
};

export default Item;
