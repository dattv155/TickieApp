import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChangePasswordProfileScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {changePassword} from 'src/services/firebase-service';
import {useTranslation} from 'react-i18next/';
import LoginInputPassword from 'src/components/atoms/LoginInputPassword/LoginInputPassword';
import {showWarning} from 'src/helpers/toast';

/**
 * File: ChangePasswordProfileScreen.tsx
 * @created 2021-03-15 10:41:37
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ChangePasswordProfileScreenProps>>}
 */
const ChangePasswordProfileScreen: FC<
  PropsWithChildren<ChangePasswordProfileScreenProps>
> = (
  props: PropsWithChildren<ChangePasswordProfileScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  const [currentPassword, setCurrentPassword] = React.useState<string>('');

  const [newPassword, setNewPassword] = React.useState<string>('');

  const [reNewPassword, setReNewPassword] = React.useState<string>('');

  const handleChangePassword = React.useCallback(async () => {
    if (currentPassword === '' && newPassword === '') {
      showWarning(translate('accountInfo.changePassword.emptyInput'));
      return;
    }

    if (newPassword === reNewPassword) {
      await changePassword(currentPassword, newPassword);
      await navigation.goBack();
    } else {
      showWarning(
        translate('accountInfo.changePassword.reNewPasswordNotMatch'),
      );
    }
  }, [currentPassword, navigation, newPassword, reNewPassword, translate]);

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
          {translate('accountInfo.changePassword.header')}
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.viewContainer}>
          <View>
            <LoginInputPassword
              title={translate('accountInfo.changePassword.oldPass')}
              placeholder={translate('accountInfo.changePassword.enterOldPass')}
              keyboardType="default"
              onChangeText={(password: string) => {
                setCurrentPassword(password);
              }}
            />
          </View>

          <View style={[atomicStyles.mt16px]}>
            <LoginInputPassword
              title={translate('accountInfo.changePassword.newPass')}
              placeholder={translate('accountInfo.changePassword.enterNewPass')}
              keyboardType="default"
              onChangeText={(password: string) => {
                setNewPassword(password);
              }}
            />
          </View>

          <View style={[atomicStyles.mt16px]}>
            <LoginInputPassword
              title={translate('accountInfo.changePassword.reNewPass')}
              keyboardType="default"
              placeholder={translate(
                'accountInfo.changePassword.reEnterNewPass',
              )}
              onChangeText={(password: string) => {
                setReNewPassword(password);
              }}
            />
          </View>
        </View>
        <ButtonMain
          onPress={handleChangePassword}
          label={translate('accountInfo.changePassword.changePassword')}
        />
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface ChangePasswordProfileScreenProps
  extends StackScreenProps<any> {
  //
}

ChangePasswordProfileScreen.defaultProps = {
  //
};

ChangePasswordProfileScreen.propTypes = {
  //
};

ChangePasswordProfileScreen.displayName = nameof(ChangePasswordProfileScreen);

export default ChangePasswordProfileScreen;
