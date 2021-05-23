/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationContainerRef} from 'src/config/navigation';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import nameof from 'ts-nameof.macro';
import LoginNavigator from 'src/navigators/LoginNavigator/LoginNavigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import RootNavigator from 'src/navigators/RootNavigator/RootNavigator';
import {Colors} from 'src/styles';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';

const RootComponent: FC = () => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  React.useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

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
  }, []);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!user) {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.Light_Gray}
        />
        <NavigationContainer ref={navigationContainerRef}>
          <LoginNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <NavigationContainer ref={navigationContainerRef}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

RootComponent.displayName = nameof(RootComponent);

export default RootComponent;
