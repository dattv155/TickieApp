import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ForgotPasswordScreen.scss';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import {SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {useTranslation} from 'react-i18next';
import {sendEmailWithPassword} from 'src/services/firebase-service';
import SentEmailScreen from 'src/screens/SentEmailScreen/SentEmailScreen';

/**
 * File: ForgotPasswordScreen.tsx
 * @created 2021-03-14 01:02:27
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ForgotPasswordScreenProps>>}
 */
const ForgotPasswordScreen: FC<PropsWithChildren<ForgotPasswordScreenProps>> = (
  props: PropsWithChildren<ForgotPasswordScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [emailInput, setEmailInput] = React.useState<string>('ab');

  const handleGoToSentLinkScreen = React.useCallback(() => {
    navigation.navigate(SentEmailScreen.displayName);
  }, [navigation]);

  const handleSendEmail = React.useCallback(async () => {
    setEmailInput(emailInput);
    const response = await sendEmailWithPassword(emailInput);
    handleGoToSentLinkScreen();
  }, [emailInput, handleGoToSentLinkScreen]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <LoginHeader
        title={translate('loginScreen.forgotPassword')}
        subtitle={translate('loginScreen.forgotPasswordSubtitle')}
      />

      <LoginInput
        style={{
          marginBottom: 30,
          marginTop: 60,
        }}
        title={translate('loginScreen.inputEmail')}
        onChangeText={(email: string) => {
          setEmailInput(email);
        }}
        placeholder={translate('loginScreen.inputEmail')}
        keyboardType="email-address"
      />

      <ButtonMain
        label={translate('loginScreen.receiveVerifyCode')}
        onPress={handleSendEmail}
      />
    </SafeAreaView>
  );
};

export interface ForgotPasswordScreenProps extends StackScreenProps<any> {
  //
}

ForgotPasswordScreen.defaultProps = {
  //
};

ForgotPasswordScreen.propTypes = {
  //
};

ForgotPasswordScreen.displayName = nameof(ForgotPasswordScreen);

export default ForgotPasswordScreen;
