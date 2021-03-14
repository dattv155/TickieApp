import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './ProfilePage.scss';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {useTranslation} from 'react-i18next';
import {atomicStyles} from 'src/styles';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import AccountInfoScreen from 'src/screens/AccountInfoScreen/AccountInfoScreen';

/**
 * File: ProfilePage.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ProfilePageProps>>}
 */
const ProfilePage: FC<PropsWithChildren<ProfilePageProps>> = (
  props: PropsWithChildren<ProfilePageProps>,
): ReactElement => {
  const {navigation, route} = props;

  // const [translate] = useTranslation();

  const handleGoToAccountInfoScreen = React.useCallback(() => {
    navigation.navigate(AccountInfoScreen.displayName);
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={[styles.container, styles.screenContainer]}>
        <View style={styles.infoSection}>
          <View style={styles.avatarFrame}>
            <SvgIcon
              component={require('assets/icons/ProfileAvatarIcon.svg')}
            />
          </View>
          <View style={styles.profile}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                atomicStyles.textDark,
                {
                  fontSize: 22,
                  fontWeight: '100',
                },
              ]}>
              Vu Trong Dat
            </Text>
            <Text
              style={[
                atomicStyles.h6,
                atomicStyles.bold,
                atomicStyles.textBlue,
                {
                  fontSize: 16,
                  fontWeight: '100',
                  marginTop: 5,
                },
              ]}>
              Member
            </Text>
          </View>
        </View>
        <View style={styles.optionSection}>
          <View style={styles.viewContainer}>
            <LineBlock
              label="Thông tin tài khoản"
              onPress={handleGoToAccountInfoScreen}
              icon={require('assets/icons/Profile/PersonW.svg')}
              hasDash={true}
            />
            <LineBlock
              label="Vé của tôi"
              onPress={() => {}}
              icon={require('assets/icons/Profile/TicketW.svg')}
            />
          </View>
          <View style={styles.viewContainer}>
            <LineBlock
              label="Cài đặt chung"
              onPress={() => {}}
              icon={require('assets/icons/Profile/SettingW.svg')}
              hasDash={true}
            />
            <LineBlock
              label="Cập nhật"
              onPress={() => {}}
              icon={require('assets/icons/Profile/UpdateW.svg')}
            />
          </View>
          <View style={styles.viewContainer}>
            <LineBlock
              label="Trợ giúp và phản hồi"
              onPress={() => {}}
              icon={require('assets/icons/Profile/HelpW.svg')}
              hasDash={true}
            />
            <LineBlock
              label="Thông tin"
              onPress={() => {}}
              icon={require('assets/icons/Profile/InfoW.svg')}
            />
          </View>
        </View>
      </SafeAreaView>
      <MainTabBar navigation={navigation} route={route} />
    </>
  );
};

export interface ProfilePageProps extends StackScreenProps<any> {
  //
}

ProfilePage.defaultProps = {
  //
};

ProfilePage.propTypes = {
  //
};

ProfilePage.displayName = nameof(ProfilePage);

export default ProfilePage;
