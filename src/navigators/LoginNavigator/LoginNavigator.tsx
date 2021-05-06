import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import SentEmailScreen from 'src/screens/SentEmailScreen/SentEmailScreen';

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
        name={SentEmailScreen.displayName}
        component={SentEmailScreen}
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
