import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './WelcomeScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, SafeAreaView, Button, StatusBar} from 'react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import {Colors} from 'src/styles';

/**
 * File: WelcomeScreen.tsx
 * @created 2021-03-11 23:21:22
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<WelcomeScreenProps>>}
 */
const WelcomeScreen: FC<PropsWithChildren<WelcomeScreenProps>> = (
  props: PropsWithChildren<WelcomeScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const handleGoToHomeScreen = React.useCallback(() => {
    navigation.navigate(HomeScreen.displayName);
  }, [navigation]);

  const handleGoToLoginScreen = React.useCallback(() => {
    navigation.navigate(LoginScreen.displayName);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor={Colors.Blue} />
        <Text>Tickie</Text>
        <Button onPress={handleGoToLoginScreen} title="Go To Login Screen" />
        <Button onPress={handleGoToHomeScreen} title="Go To Home Screen" />
      </View>
    </SafeAreaView>
  );
};

export interface WelcomeScreenProps extends StackScreenProps<any> {
  //
}

WelcomeScreen.defaultProps = {
  //
};

WelcomeScreen.propTypes = {
  //
};

WelcomeScreen.displayName = nameof(WelcomeScreen);

export default WelcomeScreen;
