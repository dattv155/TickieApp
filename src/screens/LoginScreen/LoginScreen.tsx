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

  const signInSection = () => {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <LoginHeader
          title="Chào mừng bạn"
          subtitle="Đã đến với Tickie. Đăng nhập để tiếp tục"
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
              Đăng nhập
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
              Đăng ký
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
            title="Email hoặc số điện thoại"
            onChange={() => {}}
            placeholder="Email hoặc số điện thoại"
            keyboardType="email-address"
          />
          <LoginInput
            style={{marginBottom: 20}}
            title="Mật khẩu"
            onChange={() => {}}
            placeholder="Mật khẩu"
            secureTextEntry={true}
          />

          <LoginInput
            style={{marginBottom: 10}}
            title="Nhập lại mật khẩu"
            onChange={() => {}}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={true}
          />
        </View>

        <ButtonMain label="Đăng ký" onPress={handleGoToHomeScreen} />
        <ButtonLink
          label="Đăng ký với Facebook"
          icon={require('assets/icons/FBIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
        <ButtonLink
          label="Đăng ký với Google"
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
          title="Chào mừng bạn"
          subtitle="Đã đến với Tickie. Đăng nhập để tiếp tục"
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
              Đăng nhập
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
              Đăng ký
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
            title="Email hoặc số điện thoại"
            onChange={() => {}}
            placeholder="Email hoặc số điện thoại"
            keyboardType="email-address"
          />
          <LoginInput
            title="Mật khẩu"
            onChange={() => {}}
            placeholder="Mật khẩu"
            secureTextEntry={true}
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
            Quên mật khẩu
          </Text>
        </Pressable>
        <ButtonMain label="Đăng nhập" onPress={handleGoToHomeScreen} />
        <ButtonLink
          label="Đăng nhập với Facebook"
          icon={require('assets/icons/FBIcon.svg')}
          onPress={handleGoToHomeScreen}
        />
        <ButtonLink
          label="Đăng nhập với Google"
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
