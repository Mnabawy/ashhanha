import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { AppState } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import { setDeviceToken } from "../actions/auth";
import { AppNavigation } from "../common";
import store from "../store/store";
import messaging from '@react-native-firebase/messaging';

PushNotification.createChannel(
  {
    channelId: "Esh7enha_924947907594", // (required)
    channelName: "Esh7enha App", // (required)
    channelDescription: "Esh7enha App channel for notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 5, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
export default class Notifications {

  notificationConfi = () => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        let firebaseToken =  await messaging().getToken();
        console.log("XXX",firebaseToken);
        console.log("TOKEN:", token);
        await store.dispatch(setDeviceToken(firebaseToken))
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION : onNotification ", notification);
        // process the notification
        if (notification.foreground === true && notification.userInteraction === true) {
          // app in foreground mode
          AppNavigation.push('notifications');
        }
        if (notification.foreground === false && notification.userInteraction === true) {
          if (AppState.currentState === 'background') {
            // app in background mode
            AppNavigation.push('notifications')
          }
          else {
            // app in kill mode
            setTimeout(() => { AppNavigation.push('notifications') }, 1000)
          }
        }
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };
}
