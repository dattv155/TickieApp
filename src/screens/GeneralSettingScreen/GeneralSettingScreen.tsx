import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './GeneralSettingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';

import firestore from '@react-native-firebase/firestore';

/**
 * File: GeneralSettingScreen.tsx
 * @created 2021-03-16 16:16:30
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<GeneralSettingScreenProps>>}
 */
const GeneralSettingScreen: FC<PropsWithChildren<GeneralSettingScreenProps>> = (
  props: PropsWithChildren<GeneralSettingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  // const usersCollection = firestore().collection('users');

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      right={<HeaderIconPlaceholder />}
      title={
        <Text
          style={[
            atomicStyles.h3,
            atomicStyles.bold,
            styles.textStyle,
            atomicStyles.mt16px,
          ]}>
          Cài đặt chung
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <View>
        <Text>ABC</Text>
      </View>
    </DefaultLayout>
  );
};

export interface GeneralSettingScreenProps extends StackScreenProps<any> {
  //
}

GeneralSettingScreen.defaultProps = {
  //
};

GeneralSettingScreen.propTypes = {
  //
};

GeneralSettingScreen.displayName = nameof(GeneralSettingScreen);

export default GeneralSettingScreen;
