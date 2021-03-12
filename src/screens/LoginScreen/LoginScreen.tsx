import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View, Text, Button, TextInput} from 'react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {atomicStyles} from 'src/styles';

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

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <Text
          style={[
            styles.title,
            atomicStyles.h1,
            {
              fontSize: 30,
            },
          ]}>
          Chào mừng bạn!
        </Text>
        <Text style={[styles.subtitle, atomicStyles.h7]}>
          Đã đến với Tickie. Đăng nhập để tiếp tục
        </Text>
      </View>
      <View>
        <Text>Đăng nhập</Text>
        <Text>Đăng ký</Text>
      </View>
      <View>
        <Text>Email hoặc số điện thoại</Text>
        <TextInput onChange={() => {}} />
      </View>
      <View>
        <Text>Mật khẩu</Text>
        <TextInput onChange={() => {}} />
      </View>
      <Text>Quên mật khẩu</Text>
      <Button onPress={handleGoToHomeScreen} title="Go To Home Screen" />
    </SafeAreaView>
  );
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

export default LoginScreen;
