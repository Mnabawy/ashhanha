import React from 'react';
import { AppNavigation, AppText, AppView, TouchableView } from '../../common';
import colors from '../../common/defaults/colors';

const RenderItem = (props) => {
  const { selected, item, onChange } = props;

  return (
    <TouchableView
      stretch flex
      backgroundColor="#EEEEEE"
      row
      borderWidth={selected.label === item? 2:1}
      borderColor={selected.label === item?colors.primary:colors.graytext}
      marginHorizontal={5}
      marginVertical={3}
      borderRadius={10}
      padding={5}
      onPress={() => {
        AppNavigation.pop();
        setTimeout(() => {
          onChange(item);
        }, 200);
      }}
    >
      <AppView
        circleRadius={6}
        center>
        {selected.label === item ? (
          <AppView circle circleRadius={3} backgroundColor="primary" />
        ) : null}
      </AppView>
      <AppView flex stretch>
        <AppText >{item}</AppText>
      </AppView>
    </TouchableView>
  );
}


export default RenderItem;
