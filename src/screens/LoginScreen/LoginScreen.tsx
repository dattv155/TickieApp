import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import ButtonLink from 'src/components/atoms/ButtonLink/ButtonLink';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import LoginInput from 'src/components/atoms/LoginInput/LoginInput';
import LoginHeader from 'src/components/atoms/LoginHeader/LoginHeader';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import {useTranslation} from 'react-i18next';
import {loginUser, signInUser} from 'src/services/firebase-service';
import {emailValidator, passwordValidator} from 'src/core/utils';
import Toast from 'react-native-simple-toast';

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

  const handleGoToHomeScreen = React.useCallback(() => {}, []);

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

  const [email, setEmail] = React.useState({value: '', error: ''});
  const [password, setPassword] = React.useState({value: '', error: ''});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const _onLoginPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    setLoading(true);

    const response = await loginUser({
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      setError(response.error);
    }

    Toast.show(error);

    setLoading(false);
  };

  const _onSignUpPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    setLoading(true);

    const response = await signInUser({
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      setError(response.error);
    }

    Toast.show(error);
    setLoading(false);
  };

  // ------------SIGN UP SECTION----------------------

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
            placeholder={translate('loginScreen.inputEmail')}
            keyboardType="email-address"
            onChangeText={(email: string) => {
              setEmail({value: email, error: ''});
            }}
          />
          <LoginInput
            style={{marginBottom: 20}}
            title={translate('loginScreen.inputPassword')}
            placeholder={translate('loginScreen.inputPassword')}
            secureTextEntry={true}
            keyboardType="default"
            onChangeText={(password: string) => {
              setPassword({value: password, error: ''});
            }}
          />

          <LoginInput
            style={{marginBottom: 10}}
            title={translate('loginScreen.reInputPassword')}
            placeholder={translate('loginScreen.reInputPassword')}
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>

        <ButtonMain
          label={translate('loginScreen.signup')}
          onPress={_onSignUpPressed}
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

  // ------------LOG IN SECTION----------------------

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
            placeholder={translate('loginScreen.inputEmail')}
            keyboardType="email-address"
            onChangeText={(email: string) => {
              setEmail({value: email, error: ''});
            }}
          />
          <LoginInput
            title={translate('loginScreen.inputPassword')}
            placeholder={translate('loginScreen.inputPassword')}
            secureTextEntry={true}
            keyboardType="default"
            onChangeText={(password: string) => {
              setPassword({value: password, error: ''});
            }}
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
          onPress={_onLoginPressed}
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
