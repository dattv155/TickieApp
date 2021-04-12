import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HelperScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';

/**
 * File: HelperScreen.tsx
 * @created 2021-03-16 16:16:55
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<HelperScreenProps>>}
 */
const HelperScreen: FC<PropsWithChildren<HelperScreenProps>> = (
  props: PropsWithChildren<HelperScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  return (
    <>
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
            Trợ giúp và phản hồi
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <View>
          <Text>Press</Text>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface HelperScreenProps extends StackScreenProps<any> {
  //
}

HelperScreen.defaultProps = {
  //
};

HelperScreen.propTypes = {
  //
};

HelperScreen.displayName = nameof(HelperScreen);

export default HelperScreen;
