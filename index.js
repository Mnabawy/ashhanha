import { I18nManager, Platform } from 'react-native';
import initApp from './src/App';
import * as Sentry from "@sentry/react-native";
import messaging from '@react-native-firebase/messaging';

I18nManager.allowRTL(false);
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
if (Platform.OS === "ios") {
    messaging()
        .getIsHeadless()
        .then(isHeadless => {
            // console.log("===isHeadless====", isHeadless);
            // do sth with isHeadless
        })
        .catch(error => {
            // console.log("err getIsHeadless", error);
        })
        ;
}
Sentry.init({
    dsn: 'https://bccb3b823f7842ae814b7668366a22e2@o471227.ingest.sentry.io/5830543',
    enableAutoSessionTracking: true,
    // Sessions close after app is 10 seconds in the background.
    sessionTrackingIntervalMillis: 10000,

    integrations: [
        new Sentry.ReactNativeTracing({
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
            // ... other options
        }),
    ],

    // To set a uniform sample rate
    tracesSampleRate: 0.2
});

Sentry.setTag("myTag", "tag-value");
Sentry.setExtra("myExtra", "extra-value");
Sentry.addBreadcrumb({ message: "test" });

Sentry.captureMessage("Hello Sentry!");
// throw new Error("My first Sentry error!");
// Sentry.nativeCrash();

initApp();
