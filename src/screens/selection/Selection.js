import React, { useState } from 'react';
import { AppScrollView, AppButton, AppNavigation, AppView, showInfo } from '../../common';
import CheckBox from '../../components/selection/CheckBox';
import I18n from 'react-native-i18n';
import { Header } from '../../components';
const selection = ({ data, title, onSelect, initialValue }) => {
  const [selected, setSelected] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  return (
    <AppView flex stretch >
      <Header title={title} />
      <AppScrollView flexGrow stretch >
        <CheckBox {...{ initialValue }} {...{ data }} onSelect={(v) => setSelectedValues(v)} {...{ setSelected }} />

      </AppScrollView>
      <AppButton
        stretch
        margin={10}
        onPress={() => {
          console.log("selected Values ", selectedValues)
          if (selectedValues.length > 0) {
            onSelect(selectedValues)
            AppNavigation.pop()
          }
          else
            showInfo(I18n.t('one-chosen'))
        }}
        title={I18n.t('save')}

      />
    </AppView>

  );
};

export default selection;
