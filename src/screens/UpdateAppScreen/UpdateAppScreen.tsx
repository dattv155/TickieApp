import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './UpdateAppScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * File: UpdateAppScreen.tsx
 * @created 2021-03-16 16:16:44
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<UpdateAppScreenProps>>}
 */
const UpdateAppScreen: FC<PropsWithChildren<UpdateAppScreenProps>> = (
  props: PropsWithChildren<UpdateAppScreenProps>,
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
          Cập nhật
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

export interface UpdateAppScreenProps extends StackScreenProps<any> {
  //
}

UpdateAppScreen.defaultProps = {
  //
};

UpdateAppScreen.propTypes = {
  //
};

UpdateAppScreen.displayName = nameof(UpdateAppScreen);

export default UpdateAppScreen;
