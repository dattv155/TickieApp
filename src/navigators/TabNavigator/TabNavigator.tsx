import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {StatusBar} from 'react-native';
import nameof from 'ts-nameof.macro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../../screens/ProfilePage/ProfilePage';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import NotificationScreen from '../../screens/NotificationScreen/NotificationScreen';

const {Navigator, Screen} = createBottomTabNavigator();

// @ts-ignore
const TabBar = () => null;

const TabNavigator: FC<
  PropsWithChildren<TabNavigatorProps>
> = (): ReactElement => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} />
      <Navigator
        screenOptions={{}}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          allowFontScaling: true,
        }}
        tabBar={TabBar}
        initialRouteName={HomeScreen.displayName}>
        <Screen
          name={HomeScreen.displayName}
          component={HomeScreen}
          initialParams={{}}
        />
        <Screen
          name={ProfilePage.displayName}
          component={ProfilePage}
          initialParams={{}}
        />
        <Screen
          name={NotificationScreen.displayName}
          component={NotificationScreen}
          initialParams={{}}
        />
      </Navigator>
    </>
  );
};

export interface TabNavigatorProps {
  //
}

TabNavigator.defaultProps = {
  //
};

TabNavigator.propTypes = {
  //
};

TabNavigator.displayName = nameof(TabNavigator);

export default TabNavigator;
