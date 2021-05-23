import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChangePasswordProfileScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import InputProfile from 'src/components/morecules/InputProfile/InputProfile';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import {changePassword} from 'src/services/firebase-service';
import {useTranslation} from 'react-i18next/';

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

  const handleChangePassword = async () => {
    await changePassword(currentPassword, newPassword);
  };

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
          <InputProfile
            label={translate('accountInfo.changePassword.oldPass')}
            defaultValue={currentPassword}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(password: string) => {
              setCurrentPassword(password);
            }}
          />
          <InputProfile
            label={translate('accountInfo.changePassword.newPass')}
            defaultValue={newPassword}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(password: string) => {
              setNewPassword(password);
            }}
          />
          <InputProfile
            label={translate('accountInfo.changePassword.reNewPass')}
            keyboardType="default"
            secureTextEntry={true}
          />
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
