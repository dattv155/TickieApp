import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/HomePage/HomePage';
import SettingPage from '../../screens/SettingPage/SettingPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoPage from '../../screens/TodoPage/TodoPage';
import ProfilePage from '../../screens/ProfilePage/ProfilePage';

const {Navigator, Screen} = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Todo Page') {
              iconName = focused ? 'today' : 'today-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            // @ts-ignore
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 11,
            marginBottom: 2,
            padding: 0,
          },
        }}>
        <Screen name="Home" component={HomePage} />
        <Screen name="Settings" component={SettingPage} />
        <Screen name="Todo Page" component={TodoPage} />
        <Screen name="Profile" component={ProfilePage} />
      </Navigator>
    </NavigationContainer>
  );
};
