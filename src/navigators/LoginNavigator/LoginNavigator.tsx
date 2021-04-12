import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import VerifyCodeScreen from 'src/screens/VerifyCodeScreen/VerifyCodeScreen';
import ChangePasswordScreen from 'src/screens/ChangePasswordScreen/ChangePasswordScreen';

const {Navigator, Screen} = createStackNavigator();

const LoginNavigator: FC<
  PropsWithChildren<LoginNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={LoginScreen.displayName}
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        animationEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
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

export interface LoginNavigatorProps {
  //
}

LoginNavigator.defaultProps = {
  //
};

LoginNavigator.propTypes = {
  //
};

LoginNavigator.displayName = nameof(LoginNavigator);

export default React.memo(LoginNavigator);
