import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SuccessBookingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {StatusBar, View, Text} from 'react-native';

/**
 * File: SuccessBookingScreen.tsx
 * @created 2021-04-16 00:33:39
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SuccessBookingScreenProps>>}
 */
const SuccessBookingScreen: FC<PropsWithChildren<SuccessBookingScreenProps>> = (
  props: PropsWithChildren<SuccessBookingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  return (
    <>
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        gradient={false}
        customHeader={false}
        bgWhite={true}
      />
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>ttttt</Text>
      </View>
    </>
  );
};

export interface SuccessBookingScreenProps extends StackScreenProps<any> {
  //
}

SuccessBookingScreen.defaultProps = {
  //
};

SuccessBookingScreen.propTypes = {
  //
};

SuccessBookingScreen.displayName = nameof(SuccessBookingScreen);

export default SuccessBookingScreen;
