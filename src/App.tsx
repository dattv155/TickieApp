/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import RootNavigator from '../src/navigators/RootNavigator/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationContainerRef} from 'src/config/navigation';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import nameof from 'ts-nameof.macro';

const RootComponent: FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationContainerRef}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

RootComponent.displayName = nameof(RootComponent);

export default RootComponent;
//
// const AppEntry: FC = () => {
//   return <Suspense fallback={null} />;
// };
//
// AppEntry.displayName = nameof(AppEntry);
//
// AppRegistry.registerComponent(appName, () => AppEntry);
