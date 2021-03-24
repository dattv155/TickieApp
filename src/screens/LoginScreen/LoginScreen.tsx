import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View, Text, Pressable} from 'react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {atomicStyles} from 'src/styles';
import ButtonLink from 'src/components/atoms/ButtonLink/ButtonLink';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import {useTranslation} from 'react-i18next';

/**
 * File: LoginScreen.tsx
 * @created 2021-03-11 23:31:34
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginScreenProps>>}
 */
const LoginScreen: FC<PropsWithChildren<LoginScreenProps>> = (
  props: PropsWithChildren<LoginScreenProps>,
): ReactElement => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToHomeScreen = React.useCallback(() => {
    navigation.navigate(HomeScreen.displayName);
  }, [navigation]);

  const handleGoToForgotPasswordScreen = React.useCallback(() => {
    navigation.navigate(ForgotPasswordScreen.displayName);
  }, [navigation]);

  const [isChoosed, setChoosed] = React.useState(true);

  const handleLogin = React.useCallback(() => {
    setChoosed(true);
  }, []);

  const handleSignup = React.useCallback(() => {
    setChoosed(false);
  }, []);

  const [text, setText] = React.useState('');

  const handleSetText = React.useCallback(() => {
    setText('alo');
    console.log('set text');
  }, [setText]);

  const signInSection = () => {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <LoginHeader
          title={translate('loginScreen.headerTitle')}
          subtitle={translate('loginScreen.signupHeaderSubtitle')}
        />
        <View style={styles.chooseArea}>
          <Pressable onPress={handleLogin}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                isChoosed ? atomicStyles.textBlue : atomicStyles.textDark,
                atomicStyles.textCenter,
                atomicStyles.mb8px,
                styles.textStyle,
              ]}>
              {translate('loginScreen.login')}
            </Text>
            {isChoosed ? (
              <View style={styles.lineArea} />
            ) : (
              <View style={{width: 159}} />
            )}
          </Pressable>
          <Pressable onPress={handleSignup}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                isChoosed ? atomicStyles.textDark : atomicStyles.textBlue,
                atomicStyles.textCenter,
                atomicStyles.mb8px,
                styles.textStyle,
              ]}>
              {translate('loginScreen.signup')}
            </Text>
            {isChoosed ? (
              <View style={{width: 159}} />
            ) : (
              <View style={styles.lineArea} />
            )}
          </Pressable>
        </View>
        <View style={{marginTop: 20}}>
          <LoginInput
            style={{marginBottom: 20}}
            title={translate('loginScreen.inputEmail')}
            onChange={() => {}}
            placeholder={translate('loginScreen.inputEmail')}
            keyboardType="email-address"
          />
          <LoginInput
            style={{marginBottom: 20}}
            title={translate('loginScreen.inputPassword')}
            onChange={() => {}}
            placeholder={translate('loginScreen.inputPassword')}
            secureTextEntry={true}
            keyboardType="default"
          />

          <LoginInput
            style={{marginBottom: 10}}
            title={translate('loginScreen.reInputPassword')}
            onChange={() => {}}
            placeholder={translate('loginScreen.reInputPassword')}
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>

        <ButtonMain
          label={translate('loginScreen.signup')}
          onPress={handleGoToHomeScreen}
        />
        <ButtonLink
          label={translate('loginScreen.signupFB')}
          icon={require('assets/icons/FBIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
        <ButtonLink
          label={translate('loginScreen.signupGoogle')}
          icon={require('assets/icons/GoogleIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
      </SafeAreaView>
    );
  };

  const logInSection = () => {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <LoginHeader
          title={translate('loginScreen.headerTitle')}
          subtitle={translate('loginScreen.headerSubtitle')}
        />

        <View style={styles.chooseArea}>
          <Pressable onPress={handleLogin}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                isChoosed ? atomicStyles.textBlue : atomicStyles.textDark,
                atomicStyles.textCenter,
                atomicStyles.mb8px,
                styles.textStyle,
              ]}>
              {translate('loginScreen.login')}
            </Text>
            {isChoosed ? (
              <View style={styles.lineArea} />
            ) : (
              <View style={{width: 159}} />
            )}
          </Pressable>
          <Pressable onPress={handleSignup}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                isChoosed ? atomicStyles.textDark : atomicStyles.textBlue,
                atomicStyles.textCenter,
                atomicStyles.mb8px,
                styles.textStyle,
              ]}>
              {translate('loginScreen.signup')}
            </Text>
            {isChoosed ? (
              <View style={{width: 159}} />
            ) : (
              <View style={styles.lineArea} />
            )}
          </Pressable>
        </View>

        <View style={{marginTop: 50}}>
          <LoginInput
            style={{marginBottom: 40}}
            title={translate('loginScreen.inputEmail')}
            onChange={() => {}}
            placeholder={translate('loginScreen.inputEmail')}
            keyboardType="email-address"
          />
          <LoginInput
            title={translate('loginScreen.inputPassword')}
            onChange={() => {}}
            placeholder={translate('loginScreen.inputPassword')}
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
        <Pressable onPress={handleGoToForgotPasswordScreen}>
          <Text
            style={[
              atomicStyles.h5,
              atomicStyles.bold,
              atomicStyles.mb8px,
              atomicStyles.textBlue,
              styles.textStyle,
              styles.forgotPass,
            ]}>
            {translate('loginScreen.forgotPassword')}
          </Text>
        </Pressable>
        <ButtonMain
          label={translate('loginScreen.login')}
          onPress={() => {
            handleSetText();
            handleGoToHomeScreen;
          }}
        />
        <ButtonLink
          label={translate('loginScreen.loginFB')}
          icon={require('assets/icons/FBIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
        <ButtonLink
          label={translate('loginScreen.loginGoogle')}
          icon={require('assets/icons/GoogleIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
      </SafeAreaView>
    );
  };

  return isChoosed ? logInSection() : signInSection();
};

export interface LoginScreenProps extends StackScreenProps<any> {
  //
}

LoginScreen.defaultProps = {
  //
};

LoginScreen.propTypes = {
  //
};

LoginScreen.displayName = nameof(LoginScreen);

// @ts-ignore
export default LoginScreen;
