import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigator from '../TabNavigator/TabNavigator';

const {Navigator, Screen} = createStackNavigator();

const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={HomeScreen.displayName}
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
