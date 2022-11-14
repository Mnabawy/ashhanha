import { BackHandler, Platform, SafeAreaView } from 'react-native';
import { Navigation as NativeNavigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import store from '../store/store';
import { Provider } from 'react-redux';
import colors from './defaults/colors';
import AppView from './View';
import React, { Component } from 'react';
import { SELECT_TAB } from '../actions/types';
class Navigation {
  static MAIN_STACK = 'MAIN_STACK';
  static ORDER_STACK = 'ORDER_STACK';
  static menuComponentId = 0;

  static INITED = false;

  static lastCommand = '';

  static modalIsOn = false;
  static TABS_ICONS = [];
  static currentScreen = '';

  static prevScreen = '';

  static backHandler;

  static didAppearListener;

  static commandCompletedListener;

  static didDisappearListener;
  static bottomTabsEN = [
    {
      screen: 'myTravels',
      label: '',
    },
    {
      screen: 'myAccount',
      label: '',
    },

    {
      screen: 'notifications',
      label: '',
    },

    {
      screen: 'home',
      label: '',
    },
  ];
  static bottomTabsAR = [
    {
      screen: 'home',
      label: '',
    },

    {
      screen: 'notifications',
      label: '',
    },
    {
      screen: 'myAccount',
      label: '',
    },
    {
      screen: 'myTravels',
      label: '',
    },
  ];

  constructor() {
    throw new Error('Cannot construct singleton');
  }

  static setNavigationDefaultOptions = () => {
    NativeNavigation.setDefaultOptions({
      statusBar: {
        visible: true,
        // style: Platform.Version < 23 ? 'light' : 'dark',
        style: 'light',
        backgroundColor: colors.primary1,
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: 'white',
        orientation: ['portrait'],
      },

      bottomTabs: {
        titleDisplayMode: 'alwaysShow',
        drawBehind: true,
        animate: true,
        visible: false,
        // currentTabIndex: 3,
      },
    });
  };

  // register screen with  gesturHandler
  static createScene = (InternalComponent) => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <SafeAreaView
                style={{
                  alignSelf: 'stretch',
                  flex: 1,
                  backgroundColor: Platform.OS==='ios'?'#28BAEA':'#1D0925',
                }}>
                <AppView flex stretch backgroundColor="white">
                  <InternalComponent {...this.props} />
                </AppView>
              </SafeAreaView>
            </Provider>
          );
        }
      },
    );
  static registerScreen(name, Screen) {
    NativeNavigation.registerComponent(name, this.createScene(Screen));
  }

  static registerBackHandlerListener = () => {
    Navigation.backHandler = BackHandler;
    Navigation.backHandler.addEventListener('hardwareBackPress', async () => {
      try {
        await Navigation.pop();
      } catch (error) {
        BackHandler.exitApp();
        return false;
      }

      return true;
    });
  };

  static clearBackHandlerListener = () => {
    if (Navigation.backHandler) {
      this.backHandler.removeEventListener();
    }
  };

  static registerDidAppearListener = () => {
    Navigation.didAppearListener = NativeNavigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        Navigation.currentScreen = componentName;
        this.currentComponentId = componentId;
      },
    );
  };

  static clearDidAppearListener = () => {
    if (Navigation.didAppearListener) {
      Navigation.didAppearListener.remove();
    }
  };

  static registerDidDisappearListener = () => {
    Navigation.didDisappearListener = NativeNavigation.events().registerComponentDidDisappearListener(
      ({ componentName }) => {
        Navigation.prevScreen = componentName;
      },
    );
  };

  static clearDidDisappearListener = () => {
    if (Navigation.didDisappearListener) {
      Navigation.didDisappearListener.remove();
    }
  };

  static registerCommandCompletedListener = () => {
    Navigation.commandCompletedListener = NativeNavigation.events().registerCommandCompletedListener(
      ({ commandId }) => {
        Navigation.lastCommand = commandId.replace(/[0-9]/g, '');

        if (Navigation.lastCommand === 'showModal') {
          Navigation.modalIsOn = true;
        } else if (
          Navigation.lastCommand === 'dismissModal' ||
          Navigation.lastCommand === 'dismissAllModals'
        ) {
          Navigation.modalIsOn = false;
        }
      },
    );
  };

  static clearCommandCompletedListener = () => {
    if (Navigation.commandCompletedListener) {
      Navigation.commandCompletedListener.remove();
    }
  };

  static getScreenLayout = (layout) => {
    // cosnt screenName = '';

    if (typeof layout === 'string') {
      return {
        component: {
          name: layout,
        },
      };
    }
    if (typeof layout === 'object') {
      return {
        component: {
          name: layout.name,
          passProps: layout.passProps,
          options: layout.options,
        },
      };
    }
  };

  static getBottomTabsLayout = (layout) => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.bottomTabs) {
      return null;
    }

    const children = layout.bottomTabs.map((tab, indx) => ({
      component: {
        name: tab.screen,
        passProps: tab.passProps,
        options: {
          bottomTab: {
            text: tab.label,
            icon: this.TABS_ICONS[indx],
            selectedIconColor: colors.primary,
            selectedTextColor: colors.primary,
          },
        },
      },
    }));

    return {
      bottomTabs: {
        id: 'bottomTabs',
        children,
      },
    };
  };

  static getSideMenuLayout = (layout) => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.sideMenu) {
      return null;
    }

    const menu = {};

    if (typeof layout.rtl === 'boolean') {
      if (layout.rtl) {
        menu.right = {
          component: { name: layout.sideMenu },
        };
        Navigation.menuDirection = 'right';
      } else {
        menu.left = {
          component: { name: layout.sideMenu },
        };
        Navigation.menuDirection = 'left';
      }
    } else if (Navigation.menuDirection) {
      if (Navigation.menuDirection === 'right') {
        menu.right = {
          component: { name: layout.sideMenu },
        };
      } else if (Navigation.menuDirection === 'left') {
        menu.left = {
          component: { name: layout.sideMenu },
        };
      }
    }

    Navigation.menuComponentId += 1;

    const MainLayout = layout.bottomTabs
      ? Navigation.getBottomTabsLayout(layout)
      : Navigation.getScreenLayout(layout);

    return {
      sideMenu: {
        id: `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        center: {
          stack: {
            children: [{ ...MainLayout }],
          },
        },
        ...menu,
      },
    };
  };

  static init = (layout, initialStack = Navigation.MAIN_STACK) => {
    if (this.INITED) {
      this.clearBackHandlerListener();
      this.clearCommandCompletedListener();
      this.clearDidAppearListener();
      this.clearDidDisappearListener();
    }
    Navigation.modalIsOn = false;
    this.initialStack = initialStack;
    this.currentStack = initialStack;
    this.mainLayout = null;
    this.mainStack = initialStack;

    // /listener
    this.registerBackHandlerListener();
    this.registerCommandCompletedListener();
    this.registerDidAppearListener();
    this.registerDidDisappearListener();

    this.mainLayoutRaw = layout;
    this.mainLayout = Navigation.getLayout(layout);
    Navigation.currentScreen = '';
    NativeNavigation.setRoot({
      root: {
        stack: {
          id: initialStack,
          children: [this.mainLayout],
        },
      },
    });

    this.INITED = true;
  };

  // if setMainLayout = true, layout must be defined
  static setStackRoot = (layout, stack, setMainLayout) => {
    try {
      if (setMainLayout && !layout) {
        throw new Error('Navigation.setStackRoott() ERROR');
      }
    } catch (error) {
      console.log(error);
      return;
    }

    // const newLayout = layout
    //   ? Navigation.getLayout(layout)
    //   : Navigation.getLayout(this.mainLayoutRaw);

    const newLayout = layout
      ? Navigation.getLayout(layout)
      : Navigation.getLayout(this.mainLayoutRaw);

    if (setMainLayout) {
      this.mainLayoutRaw = layout;
      this.mainLayout = newLayout;
    }

    NativeNavigation.setStackRoot(stack || this.mainStack, newLayout);
  };

  static getLayout = (layout) =>
    Navigation.getSideMenuLayout(layout) ||
    Navigation.getBottomTabsLayout(layout) ||
    Navigation.getScreenLayout(layout);

  static push = async (layout) => {
    if (layout.bottomTabs) {
      await NativeNavigation.push('MAIN_STACK', Navigation.getLayout(layout));
      return;
    }
    const screenName = typeof layout === 'string' ? layout : layout.name;
    const passProps = typeof layout === 'string' ? {} : layout.passProps;
    const stackName = typeof layout === 'object' ? layout.stackName : null;

    if (screenName === Navigation.currentScreen) {
      return;
    }
    Navigation.currentScreen = screenName;

    if (stackName) {
      await NativeNavigation.showModal({
        stack: {
          id: stackName,
          children: [
            {
              component: {
                name: screenName,
                passProps,
              },
            },
          ],
        },
      });
      this.currentStack = stackName;
      Navigation.modalIsOn = true;
    } else {
      const componentId =
        Platform.OS === 'ios'
          ? this.currentComponentId || this.currentStack
          : this.currentStack;

      await NativeNavigation.push(componentId, {
        component: {
          id: screenName,
          name: screenName,
          passProps,
          options: Platform.OS==="ios"?null: {
            statusBar: layout.statusBarColor ? layout.statusBarColor : { backgroundColor: colors.bg, style: 'dark' },
          }
        },
      });
    }
  };

  static pop = async () => {
    const componentId =
      Platform.OS === 'ios'
        ? this.currentComponentId || this.currentStack
        : this.currentStack;

    if (Navigation.modalIsOn && this.currentStack === this.initialStack) {
      NativeNavigation.dismissAllModals();
      return;
    }

    try {
      await NativeNavigation.pop(componentId);
    } catch (error) {
      // console.log(error);

      if (Navigation.modalIsOn) {
        this.currentStack = this.initialStack;
        NativeNavigation.dismissAllModals();
      } else {
        throw error;
      }
    }
  };

  static showModal = (layout) => {
    const resolvedLayout = Navigation.getLayout(layout);

    NativeNavigation.showModal({
      stack: {
        children: [resolvedLayout],
      },
    });
  };

  static dismissBranchStack = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static dismissAllModal = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static openMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        },
      );
    }
  };

  static closeMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        },
      );
    }
  };

  static enableMenu = async () => {
    if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              enabled: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              enabled: true,
            },
          },
        },
      );
    }
  };

  static disableMenu = async () => {
    if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    }
  };

  static navigateToAuth = () => {
    Navigation.init({
      name: 'login',
      options: Platform.OS==="android"? {
        statusBar: { backgroundColor: colors.bg, style: 'dark' },
      }:null
    });
  };

  static navigateToHome = async (rtl) => {
    store.dispatch({ type: SELECT_TAB, payload: 0 });
    Navigation.init({
      name: 'home',
      rtl: rtl,
      sideMenu: 'menu',
    });
  };

  static navigateToOtp = () => {
    Navigation.init('verifyCode');
  };

  static navigateToRoot = () => {
    const componentId =
      Platform.OS === "ios"
        ? this.currentComponentId || this.currentStack
        : this.currentStack;
    NativeNavigation.popToRoot(componentId);
    NativeNavigation.mergeOptions(componentId, {

    });
    return;
  }

  static navigateToScreen = async (screenName) => {
    try {
      await NativeNavigation.popTo(screenName);
    } catch (error) {
    }
    return;
  }

}

export default Navigation;
