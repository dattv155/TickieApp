import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './SentEmailScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import styles from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen.scss';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {useTranslation} from 'react-i18next';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';

/**
 * File: SentEmailScreen.tsx
 * @created 2021-04-26 11:03:42
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SentEmailScreenProps>>}
 */
const SentEmailScreen: FC<PropsWithChildren<SentEmailScreenProps>> = (
  props: PropsWithChildren<SentEmailScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToLoginScreen = React.useCallback(() => {
    navigation.navigate(LoginScreen.displayName);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <LoginHeader
        title={translate('Gửi Email thành công')}
        subtitle={translate('Kiểm tra lại hộp thư để thay đổi mật khẩu')}
      />

      <ButtonMain
        label={translate('Quay lại đăng nhập')}
        onPress={handleGoToLoginScreen}
      />
    </SafeAreaView>
  );
};

export interface SentEmailScreenProps extends StackScreenProps<any> {
  //
}

SentEmailScreen.defaultProps = {
  //
};

SentEmailScreen.propTypes = {
  //
};

SentEmailScreen.displayName = nameof(SentEmailScreen);

export default SentEmailScreen;
