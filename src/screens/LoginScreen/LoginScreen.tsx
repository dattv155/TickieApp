import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginScreen.scss';
import {TouchableOpacity, View, Text} from 'react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {StackScreenProps} from '@react-navigation/stack';
import TabNavigator from 'src/navigators/TabNavigator/TabNavigator';

/**
 * File: LoginScreen.tsx
 * @created 2021-03-11 23:12:50
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<LoginScreenProps>>}
 */
const LoginScreen: FC<PropsWithChildren<LoginScreenProps>> = (
  props: PropsWithChildren<LoginScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  const handleGotoScreen = React.useCallback(() => {
    navigation.navigate(TabNavigator.displayName);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGotoScreen} style={styles.button}>
        <Text>Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export interface LoginScreenProps extends StackScreenProps<any> {
  //
}

LoginScreen.defaultProps = {
  //
};

LoginScreen.propTypes = {
  //
};

LoginScreen.displayName = nameof(LoginScreen);

export default LoginScreen;
