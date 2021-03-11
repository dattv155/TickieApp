import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigator from '../TabNavigator/TabNavigator';
import MovieInfoScreen from 'src/screens/MovieInfoScreen/MovieInfoScreen';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';

const {Navigator, Screen} = createStackNavigator();

const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={LoginScreen.displayName}
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        animationEnabled: false,
      }}>
      <Screen
        name={LoginScreen.displayName}
        component={LoginScreen}
        initialParams={{}}
      />
      <Screen
        name={TabNavigator.displayName}
        component={TabNavigator}
        initialParams={{}}
      />
      <Screen
        name={MovieInfoScreen.displayName}
        component={MovieInfoScreen}
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
