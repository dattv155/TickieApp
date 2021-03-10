import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {Text, View} from 'react-native';
import styles from './SettingPage.scss';

/**
 * File: SettingScreen.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SettingScreenProps>>}
 */
const SettingScreen: FC<PropsWithChildren<SettingScreenProps>> = (
  props: PropsWithChildren<SettingScreenProps>,
): ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
};

export interface SettingScreenProps {
  //
}

SettingScreen.defaultProps = {
  //
};

SettingScreen.propTypes = {
  //
};

SettingScreen.displayName = nameof(SettingScreen);

export default SettingScreen;
