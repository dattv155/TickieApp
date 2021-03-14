import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './VerifyCodeScreen.scss';
import styles from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen.scss';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import ChangePasswordScreen from 'src/screens/ChangePasswordScreen/ChangePasswordScreen';
import ButtonLink from 'src/components/atoms/ButtonLink/ButtonLink';
import {useTranslation} from 'react-i18next';

/**
 * File: VerifyCodeScreen.tsx
 * @created 2021-03-14 01:12:47
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<VerifyCodeScreenProps>>}
 */
const VerifyCodeScreen: FC<PropsWithChildren<VerifyCodeScreenProps>> = (
  props: PropsWithChildren<VerifyCodeScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToChangePasswordScreen = React.useCallback(() => {
    navigation.navigate(ChangePasswordScreen.displayName);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <LoginHeader
        title={translate('loginScreen.forgotPassword')}
        subtitle={translate('loginScreen.forgotPasswordSubtitle2')}
      />

      <LoginInput
        style={{marginBottom: 30, marginTop: 60}}
        title={translate('loginScreen.verifyCode')}
        onChange={() => {}}
        placeholder={translate('loginScreen.verifyCode')}
        keyboardType="number-pad"
      />

      <ButtonMain
        label={translate('loginScreen.changePassword')}
        onPress={handleGoToChangePasswordScreen}
      />
      <ButtonLink label="Gửi lại mã xác nhận" onPress={() => {}} />
    </SafeAreaView>
  );
};

export interface VerifyCodeScreenProps extends StackScreenProps<any> {
  //
}

VerifyCodeScreen.defaultProps = {
  //
};

VerifyCodeScreen.propTypes = {
  //
};

VerifyCodeScreen.displayName = nameof(VerifyCodeScreen);

export default VerifyCodeScreen;
