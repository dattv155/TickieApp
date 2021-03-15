import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChangePasswordProfileScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, SafeAreaView} from 'react-native';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import InputProfile from 'src/components/morecules/InputProfile/InputProfile';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';

/**
 * File: ChangePasswordProfileScreen.tsx
 * @created 2021-03-15 10:41:37
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ChangePasswordProfileScreenProps>>}
 */
const ChangePasswordProfileScreen: FC<
  PropsWithChildren<ChangePasswordProfileScreenProps>
> = (
  props: PropsWithChildren<ChangePasswordProfileScreenProps>,
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
          Thay đổi mật khẩu
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.viewContainer}>
          <InputProfile
            label="Mật khẩu cũ"
            keyboardType="default"
            secureTextEntry={true}
          />
          <InputProfile
            label="Mật khẩu mới"
            keyboardType="default"
            secureTextEntry={true}
          />
          <InputProfile
            label="Nhập lại mật khẩu mới"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>
        <ButtonMain onPress={() => {}} label="Thay đổi mật khẩu" />
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface ChangePasswordProfileScreenProps
  extends StackScreenProps<any> {
  //
}

ChangePasswordProfileScreen.defaultProps = {
  //
};

ChangePasswordProfileScreen.propTypes = {
  //
};

ChangePasswordProfileScreen.displayName = nameof(ChangePasswordProfileScreen);

export default ChangePasswordProfileScreen;
