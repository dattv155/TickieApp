import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AccountInfoScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {View, Text, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import InputProfile from 'src/components/morecules/InputProfile/InputProfile';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import ChangePasswordProfileScreen from 'src/screens/ChangePasswordProfileScreen/ChangePasswordProfileScreen';

/**
 * File: AccountInfoScreen.tsx
 * @created 2021-03-14 21:11:22
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<AccountInfoScreenProps>>}
 */
const AccountInfoScreen: FC<PropsWithChildren<AccountInfoScreenProps>> = (
  props: PropsWithChildren<AccountInfoScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const handleGoToChangePasswordProfileScreen = React.useCallback(() => {
    navigation.navigate(ChangePasswordProfileScreen.displayName);
  }, [navigation]);

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
          Thông tin tài khoản
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.viewContainer}>
          <InputProfile
            label="Họ và tên"
            keyboardType="default"
            placeholder="Vu Trong Dat"
          />
          <InputProfile
            label="Số điện thoại"
            keyboardType="number-pad"
            placeholder="012343543534"
          />
          <InputProfile
            label="Email"
            keyboardType="email-address"
            placeholder="account@gmail.com"
          />

          <Text>Ngày sinh</Text>

          <Text>Giới tính</Text>
          <Text>Khu vực</Text>
        </View>
        <View style={[styles.viewContainer, styles.box]}>
          <LineBlock
            label="Thay đổi mật khẩu"
            onPress={handleGoToChangePasswordProfileScreen}
            icon={require('assets/icons/LockIcon.svg')}
          />
        </View>

        <ButtonMain onPress={() => {}} label="Lưu thông tin" />
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface AccountInfoScreenProps extends StackScreenProps<any> {
  //
}

AccountInfoScreen.defaultProps = {
  //
};

AccountInfoScreen.propTypes = {
  //
};

AccountInfoScreen.displayName = nameof(AccountInfoScreen);

export default AccountInfoScreen;
