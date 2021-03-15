import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigator from '../TabNavigator/TabNavigator';
import ProfilePage from 'src/screens/ProfilePage/ProfilePage';
import NotificationScreen from 'src/screens/NotificationScreen/NotificationScreen';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import WelcomeScreen from 'src/screens/WelcomeScreen/WelcomeScreen';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import VerifyCodeScreen from 'src/screens/VerifyCodeScreen/VerifyCodeScreen';
import ChangePasswordScreen from 'src/screens/ChangePasswordScreen/ChangePasswordScreen';
import AccountInfoScreen from 'src/screens/AccountInfoScreen/AccountInfoScreen';
import ChangePasswordProfileScreen from 'src/screens/ChangePasswordProfileScreen/ChangePasswordProfileScreen';
import MyTicketScreen from 'src/screens/MyTicketScreen/MyTicketScreen';
// import {forNoAnimation} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import {StackCardInterpolatedStyle} from '@react-navigation/stack/src/types';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';

const {Navigator, Screen} = createStackNavigator();

function forNoAnimation(): StackCardInterpolatedStyle {
  return {};
}

const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={WelcomeScreen.displayName}
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        animationEnabled: true,
        // gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen
        name={HomeScreen.displayName}
        component={HomeScreen}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={TabNavigator.displayName}
        component={TabNavigator}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={ProfilePage.displayName}
        component={ProfilePage}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={NotificationScreen.displayName}
        component={NotificationScreen}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
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
      <Screen
        name={AccountInfoScreen.displayName}
        component={AccountInfoScreen}
        initialParams={{}}
      />
      <Screen
        name={ChangePasswordProfileScreen.displayName}
        component={ChangePasswordProfileScreen}
        initialParams={{}}
      />
      <Screen
        name={MyTicketScreen.displayName}
        component={MyTicketScreen}
        initialParams={{}}
      />
      <Screen
        name={DetailTicketScreen.displayName}
        component={DetailTicketScreen}
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
