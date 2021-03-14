import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './WelcomeScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import {atomicStyles, Colors} from 'src/styles';

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
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.textBox}>
          <Text
            style={[
              atomicStyles.h1,
              atomicStyles.bold,
              atomicStyles.textCenter,
              atomicStyles.textWhite,
              styles.textStyle,
              styles.bigTitle,

              {
                fontSize: 64,
              },
            ]}>
            Tickie
          </Text>
        </View>

        <Pressable
          style={[
            styles.buttonStyle,
            {
              bottom: 30,
            },
          ]}
          onPress={handleGoToLoginScreen}>
          <Text
            style={[
              atomicStyles.h5,
              atomicStyles.bold,
              styles.textStyle,
              atomicStyles.textBlue,
            ]}>
            Go To Login Screen
          </Text>
        </Pressable>

        <Pressable style={styles.buttonStyle} onPress={handleGoToHomeScreen}>
          <Text
            style={[
              atomicStyles.h5,
              atomicStyles.bold,
              styles.textStyle,
              atomicStyles.textBlue,
            ]}>
            Go To Home Screen
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
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
