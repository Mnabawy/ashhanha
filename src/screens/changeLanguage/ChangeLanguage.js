import React, { useCallback, useMemo, useState } from 'react';
import I18n from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../actions/lang';
import {
  AppButton,
  AppNavigation, AppText
} from '../../common';
import colors from '../../common/defaults/colors';
import { ScrollableContainer } from '../../components';
import Picker from '../../components/Picker';

const ChangeLanguage = ({ onPress }) => {
  const languageData = useMemo(() => {
    return [
      { name: 'العربية', id: 'ar', image: 'ar' },
      { name: 'English', id: 'en', image: 'en' },
      // { name: 'الأردية', id: 'ur', image: 'ur' },
    ];
  }, []);

  const [isSubmittingLang, setIsSubmittingLan] = useState(false);
  const user = useSelector((state) => state.auth.userData?.user);
  const currentLang = useSelector((state) => state.lang);

  const [selectedLang, setSelectedLang] = useState({
    lang: currentLang.lang,
    rtl: currentLang.rtl,
    image: currentLang.lang,
  });
  console.log("selectedLang", selectedLang)
  const dispatch = useDispatch();
  const changeLang = useCallback(async () => {

    // setIsSubmittingLan(true);
    // const res = user
    //   ? await usersRepo.changeLang({
    //     locale: selectedLang.lang,
    //   })
    //   : true;
    // if (res) {
    //   await setLang(selectedLang.lang, selectedLang.rtl)(dispatch);

    //   if (onPress) {
    //     onPress();
    //   }
    // }
    // setIsSubmittingLan(false);
    await setLang(selectedLang.lang, selectedLang.rtl)(dispatch);
    AppNavigation.navigateToHome(selectedLang.rtl);
  }, [dispatch, selectedLang, onPress, user]);


  const setLanguage = useCallback(async (lang) => {
    setSelectedLang({
      lang: lang,
      rtl: lang === 'en' ? false : true,
    });
  }, []);

  return (
    <ScrollableContainer
      flex
      stretch
      backgroundColor={colors.bg}
      padding={5}
      title={I18n.t('changeLanguage')}>
      <AppText stretch>{I18n.t('chooseLanguage')}</AppText>
      <Picker
        marginTop={10}
        showImage
        isSearch={false}
        initialValue={currentLang ? {
          label: I18n.t(currentLang.lang),
          value: currentLang.lang,
          image: currentLang.lang
        } : null}
        title={I18n.t('chooseLang')}
        onChangeValue={setLanguage}
        label="name"
        value="id"
        data={languageData}
      />
      <AppButton
        processing={isSubmittingLang}
        onPress={changeLang}
        marginVertical={10}
        stretch
        linearGradient
        title={I18n.t('Continue')}
      />
    </ScrollableContainer>
  );
};
ChangeLanguage.defaultProps = {
  onPress: () => {
    AppNavigation.navigateToAuth();
  },
};
export default ChangeLanguage;
