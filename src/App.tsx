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
