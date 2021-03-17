import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './InformationScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * File: InformationScreen.tsx
 * @created 2021-03-16 16:17:06
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<InformationScreenProps>>}
 */
const InformationScreen: FC<PropsWithChildren<InformationScreenProps>> = (
  props: PropsWithChildren<InformationScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
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
          Thông tin
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

export interface InformationScreenProps extends StackScreenProps<any> {
  //
}

InformationScreen.defaultProps = {
  //
};

InformationScreen.propTypes = {
  //
};

InformationScreen.displayName = nameof(InformationScreen);

export default InformationScreen;
