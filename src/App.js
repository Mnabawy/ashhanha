import { Navigation } from 'react-native-navigation';
import regterScreens from './screens';
import { AppNavigation } from './common';
import appLaunchConfig from './utils/AppLaunchConfig';
import store from './store/store';
import * as Sentry from "@sentry/react-native";

import Location from './utils/Location';
import { AuthRepo } from './repo';
import { setUserData } from './actions/auth';
import { getLangFromStorage, initLang, setLang } from './actions';
const authRepo = new AuthRepo();
export default () => {
  //appLaunch
  Navigation.events().registerAppLaunchedListener(async () => {
    //default app config
    // await Location.configure();
    //navigation config
    AppNavigation.setNavigationDefaultOptions();

    //screens
    regterScreens();
    await appLaunchConfig();
    const userData = await authRepo.checkPrincipalUser();
    console.log(userData, 'userdata');
    const lang = await getLangFromStorage()();
    console.log("lllllllll ", lang)
    if (!lang) {
      AppNavigation.init('language');
    }
    else {
      await initLang(lang.lang, lang.rtl)(store.dispatch);
      if (userData) {
        Sentry.setTag("user name", userData?.user?.name);
        await store.dispatch(setUserData(userData));
        AppNavigation.navigateToHome(lang.rtl);
      } else {
        AppNavigation.navigateToAuth();
      }
    }
  });
};
