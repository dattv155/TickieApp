import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigator from '../TabNavigator/TabNavigator';
import ProfilePage from 'src/screens/ProfilePage/ProfilePage';
import NotificationScreen from 'src/screens/NotificationScreen/NotificationScreen';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import WelcomeScreen from 'src/screens/WelcomeScreen/WelcomeScreen';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import VerifyCodeScreen from 'src/screens/VerifyCodeScreen/VerifyCodeScreen';
import ChangePasswordScreen from 'src/screens/ChangePasswordScreen/ChangePasswordScreen';

const {Navigator, Screen} = createStackNavigator();

const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={WelcomeScreen.displayName}
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        animationEnabled: false,
      }}>
      <Screen
        name={HomeScreen.displayName}
        component={HomeScreen}
        initialParams={{}}
      />
      <Screen
        name={TabNavigator.displayName}
        component={TabNavigator}
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
      <Screen
        name={WelcomeScreen.displayName}
        component={WelcomeScreen}
        initialParams={{}}
      />
      <Screen
        name={LoginScreen.displayName}
        component={LoginScreen}
        initialParams={{}}
      />
      <Screen
        name={ForgotPasswordScreen.displayName}
        component={ForgotPasswordScreen}
        initialParams={{}}
      />
      <Screen
        name={VerifyCodeScreen.displayName}
        component={VerifyCodeScreen}
        initialParams={{}}
      />
      <Screen
        name={ChangePasswordScreen.displayName}
        component={ChangePasswordScreen}
        initialParams={{}}
      />
    </Navigator>
  );
};

export interface RootNavigatorProps {
  //
}

RootNavigator.defaultProps = {
  //
};

RootNavigator.propTypes = {
  //
};

RootNavigator.displayName = nameof(RootNavigator);

export default React.memo(RootNavigator);
