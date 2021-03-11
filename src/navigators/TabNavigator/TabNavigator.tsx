import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {StatusBar} from 'react-native';
import nameof from 'ts-nameof.macro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

// export default () => {
//   return (
//     <NavigationContainer>
//       <Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName;
//
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'settings' : 'settings-outline';
//             } else if (route.name === 'Todo Page') {
//               iconName = focused ? 'today' : 'today-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person-circle' : 'person-circle-outline';
//             }
//
//             // You can return any component that you like here!
//             // @ts-ignore
//             return <Ionicons name={iconName} size={22} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//           labelStyle: {
//             fontSize: 11,
//             marginBottom: 2,
//             padding: 0,
//           },
//         }}>
//         <Screen name="Home" component={HomePage} />
//         <Screen name="Settings" component={SettingPage} />
//         <Screen name="Todo Page"  component={TodoPage} />
//         <Screen name="Profile" component={ProfilePage} />
//       </Navigator>
//     </NavigationContainer>
//   );
// };
