import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChangePasswordScreen.scss';
import {SafeAreaView} from 'react-native';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

/**
 * File: ChangePasswordScreen.tsx
 * @created 2021-03-14 01:34:18
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ChangePasswordScreenProps>>}
 */
const ChangePasswordScreen: FC<
  PropsWithChildren<ChangePasswordScreenProps>
> = (): ReactElement => {
  const [translate] = useTranslation();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <LoginHeader
        title={translate('loginScreen.changePassword')}
        subtitle={translate('loginScreen.changePasswordSubtitle')}
      />

      <LoginInput
        style={{marginTop: 60}}
        title={translate('loginScreen.newPassword')}
        onChange={() => {}}
        placeholder={translate('loginScreen.newPassword')}
        secureTextEntry={true}
        keyboardType="default"
      />

      <LoginInput
        style={{marginBottom: 30, marginTop: 30}}
        title={translate('loginScreen.reNewPassword')}
        onChange={() => {}}
        placeholder={translate('loginScreen.reNewPassword')}
        secureTextEntry={true}
        keyboardType="default"
      />

      <ButtonMain
        label={translate('loginScreen.confirmNewPassword')}
        onPress={() => {}}
      />
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
