import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './WelcomeScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text} from 'react-native';

/**
 * File: WelcomeScreen.tsx
 * @created 2021-03-11 23:21:22
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<WelcomeScreenProps>>}
 */
const WelcomeScreen: FC<PropsWithChildren<WelcomeScreenProps>> = (
  props: PropsWithChildren<WelcomeScreenProps>,
): ReactElement => {
  return (
    <View>
      <Text>Tickie</Text>
    </View>
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
