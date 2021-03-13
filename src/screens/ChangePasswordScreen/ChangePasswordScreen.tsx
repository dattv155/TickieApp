import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChangePasswordScreen.scss';
import {SafeAreaView} from 'react-native';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * File: ChangePasswordScreen.tsx
 * @created 2021-03-14 01:34:18
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ChangePasswordScreenProps>>}
 */
const ChangePasswordScreen: FC<
  PropsWithChildren<ChangePasswordScreenProps>
> = (): ReactElement => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <LoginHeader
        title="Thay đổi mật khẩu"
        subtitle="Hãy thay đổi thành mật khẩu mới"
      />

      <LoginInput
        style={{marginTop: 60}}
        title="Mật khẩu mới"
        onChange={() => {}}
        placeholder="Mật khẩu mới"
        secureTextEntry={true}
        keyboardType="default"
      />

      <LoginInput
        style={{marginBottom: 30, marginTop: 30}}
        title="Nhập lại mật khẩu mới"
        onChange={() => {}}
        placeholder="Nhập lại mật khẩu mới"
        secureTextEntry={true}
        keyboardType="default"
      />

      <ButtonMain label="Xác nhận" onPress={() => {}} />
    </SafeAreaView>
  );
};

export interface ChangePasswordScreenProps extends StackScreenProps<any> {
  //
}

ChangePasswordScreen.defaultProps = {
  //
};

ChangePasswordScreen.propTypes = {
  //
};

ChangePasswordScreen.displayName = nameof(ChangePasswordScreen);

export default ChangePasswordScreen;
