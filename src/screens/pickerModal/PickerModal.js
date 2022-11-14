import React, { useState } from 'react';
import { FlatList, Keyboard, Platform } from 'react-native';
import I18n from 'react-native-i18n';
import { AppIcon, AppInput, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import RenderItem from './RenderItem';

const PickerModal = props => {
  const {
    title,
    isSearch,
    searchTitle,
    headerRightItems,
    data,
    onChange,
    selected,
    noResultsLabelPickerModal: noResultsLabel,
    iconName,
    iconType,
  } = props;
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState(data);

  const renderPickerData = () => {
    if (data.length > 0) {
      return (
        <FlatList
          style={{
            alignSelf: 'stretch',
          }}
          data={searchData}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => {
            return (
              <RenderItem item={item} onChange={onChange} selected={selected} />
            );
          }}
        />
      );
    } else {
      return (
        <AppView stretch centerX padding={15}>
          <AppText center>
            {noResultsLabel || I18n.t('ui-noResultsFound')}
          </AppText>
        </AppView>
      );
    }
  };

  const renderSearchInput = () => {
    return (
      <AppView
        stretch
        paddingHorizontal={5}
        paddingVertical={6}
        borderBottomWidth={0.1}
        elevation={2}
        height={10}>
        <AppInput
          picker
          // flex
          // stretch
          noValidation
          initialValue={searchText}
          onChange={text => {
            const filterData = data.filter(item =>
              item
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(text.toString().toLowerCase().replace(/\s/g, '')),
            );
            setSearchText(text);
            setSearchData(filterData);
          }}
          placeholder={searchTitle}
          leftItems={[
            <AppIcon
              color="#8A8A8A"
              name={iconName}
              type={iconType}
              size={8}
              marginHorizontal={5}
              flip
            />,
          ]}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          borderRadius={10}
          height={Platform.OS === 'android' ? 7 : 6}
          paddingHorizontal={5}
          backgroundColor="#EEEEEE"
        />
      </AppView>
    );
  };

  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={title} rightItems={headerRightItems} />
      {isSearch && renderSearchInput()}
      {renderPickerData()}
    </AppView>
  );
};

export default PickerModal;
