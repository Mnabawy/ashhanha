import React, { useCallback, useEffect, useMemo, useState } from 'react';
import I18n from 'react-native-i18n';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../actions/lang';
import {
  AppButton,
  AppNavigation, AppText
} from '../../common';
import colors from '../../common/defaults/colors';
import { ImageContainer } from '../../components';
import Logo from '../../components/logo';
import Picker from '../../components/Picker';
import { UsersRepo } from '../../repo';
const source = require('../../assets/imgs/selectLangBg.png');

const usersRepo = new UsersRepo();

const Language = ({ onPress }) => {

  const [isSubmittingLang, setIsSubmittingLan] = useState(false);
  const user = useSelector((state) => state.auth.userData?.user);
  const currentLang = useSelector((state) => state.lang);
  const [selectedLang, setSelectedLang] = useState({
    lang: currentLang.lang,
    rtl: currentLang.rtl,
    image: currentLang.lang,
  });
  const languageData = useMemo(() => {
    return [
      { name: 'العربية', id: 'ar', image: 'ar' },
      { name: 'English', id: 'en', image: 'en' },
      // { name: 'الأردية', id: 'ur', image: 'ur' },
    ];
  }, [selectedLang, currentLang]);
  const dispatch = useDispatch();
  const changeLang = useCallback(async () => {
    AppNavigation.push('login');
  }, [dispatch, selectedLang, onPress, user]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const setLanguage = useCallback(async (lang) => {
    setSelectedLang({
      lang: lang,
      rtl: lang === 'en' ? false : true,
    });
    await setLang(lang, lang === 'en' ? false : true)(dispatch);
  }, [dispatch]);

  return (
    <ImageContainer
      hideBack
      center
      paddingHorizontal={5}
      {...{ source }}>
      <Logo />
      <AppText color={colors.white} size={9} center >{I18n.t('helloAgain')}</AppText>
      <AppText color={colors.white} marginTop={3} center>{I18n.t('chooseLanguage')}</AppText>
      <Picker
        marginTop={10}
        showImage
        isSearch={false}
        initialValue={{
          label: I18n.t(currentLang.lang),
          value: currentLang.lang,
          image: currentLang.lang
        }}
        title={I18n.t('chooseLang')}
        onChangeValue={setLanguage}
        label="name"
        value="id"
        data={languageData}
      />

      <AppButton
        processing={isSubmittingLang}
        onPress={changeLang}
        marginVertical={20}
        stretch
        linearGradient
        backgroundColors={[colors.secondary, colors.secondary1]}
        title={I18n.t('Continue')}
      />
      <AppText center >{I18n.t('noAccount')}
        <AppText color={colors.secondary}
          onPress={() => AppNavigation.push('register')}
        > {I18n.t('createNow')}</AppText>
      </AppText>
    </ImageContainer>
  );
};
Language.defaultProps = {
  onPress: () => {
    AppNavigation.push('login');
  },
};
export default Language;
