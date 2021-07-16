import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AccountInfoScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import InputProfile from 'src/components/morecules/InputProfile/InputProfile';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import ChangePasswordProfileScreen from 'src/screens/ChangePasswordProfileScreen/ChangePasswordProfileScreen';
// @ts-ignore
import {Picker} from 'react-native-wheel-pick';
import DatePicker from 'react-native-date-picker';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import Dash from 'react-native-dash';
import {Provinces} from 'src/sample/provinces';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {getAccount} from 'src/services/get-account';
import moment from 'moment';
import AccountInfoSkeleton from 'src/screens/AccountInfoScreen/AccountInfoSkeleton/AccountInfoSkeleton';
import {useTranslation} from 'react-i18next/';
import {showInfo} from 'src/helpers/toast';
import ModalComponent from 'src/screens/AccountInfoScreen/components/ModalComponent/ModalComponent';

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

  const [translate] = useTranslation();

  const [
    email,
    fullname,
    phoneNumber,
    province,
    gender,
    ,
    handleChangeFullname,
    handleChangeEmail,
    handleChangePhoneNumber,
    handleChangeProvince,
    handleChangeGender,
    ,
    dateOfBirth,
    handleChangeDateOfBirth,
    loading,
  ] = getAccount.getAccountInfo(navigation);

  const [saveLoading, setSaveLoading] = React.useState<boolean>(false);

  const updateProfile = React.useCallback(() => {
    setSaveLoading(true);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        gender: gender,
        province: province,
        dateOfBirth: firestore.Timestamp.fromDate(dateOfBirth),
      })
      .then(() => {
        setSaveLoading(false);
        showInfo(translate('accountInfo.saveSuccess'));
      })
      .catch((e) => {
        Toast.show(e.toString());
      });
  }, [dateOfBirth, email, fullname, gender, phoneNumber, province, translate]);

  const [isDatePickVisible, setDatePickVisible] = React.useState<boolean>(
    false,
  );

  const [isGenderPickVisible, setGenderPickVisible] = React.useState<boolean>(
    false,
  );

  const [
    isProvincePickVisible,
    setProvincePickVisible,
  ] = React.useState<boolean>(false);

  const handleOpenDatePick = React.useCallback(() => {
    setDatePickVisible(true);
  }, []);

  const handleCloseDatePick = React.useCallback(() => {
    setDatePickVisible(false);
  }, []);

  const handleOpenGenderPick = React.useCallback(() => {
    setGenderPickVisible(true);
  }, []);

  const handleCloseGenderPick = React.useCallback(() => {
    setGenderPickVisible(false);
  }, []);

  const handleOpenProvincePick = React.useCallback(() => {
    setProvincePickVisible(true);
  }, []);

  const handleCloseProvincePick = React.useCallback(() => {
    setProvincePickVisible(false);
  }, []);

  const datePick = () => (
    <DatePicker
      style={styles.pickerStyle}
      date={dateOfBirth}
      onDateChange={handleChangeDateOfBirth}
      mode={'date'}
    />
  );

  const provincePick = () => (
    <Picker
      style={styles.pickerStyle}
      selectedValue={province}
      pickerData={Provinces.map((province: any) => province.name)}
      onValueChange={handleChangeProvince}
    />
  );

  const genderPick = () => (
    <Picker
      style={styles.pickerStyle}
      selectedValue={gender}
      pickerData={['Nam', 'Nữ', 'Khác']}
      onValueChange={handleChangeGender}
    />
  );

  const handleGoToChangePasswordProfileScreen = React.useCallback(() => {
    navigation.navigate(ChangePasswordProfileScreen.displayName);
  }, [navigation]);

  return (
    <>
      <ModalComponent
        onBackdropPress={handleCloseDatePick}
        isVisible={isDatePickVisible}>
        {datePick()}
      </ModalComponent>

      <ModalComponent
        onBackdropPress={handleCloseGenderPick}
        isVisible={isGenderPickVisible}>
        {genderPick()}
      </ModalComponent>

      <ModalComponent
        onBackdropPress={handleCloseProvincePick}
        isVisible={isProvincePickVisible}>
        {provincePick()}
      </ModalComponent>

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
            {translate('accountInfo.header')}
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.viewContainer}>
            {loading ? (
              <AccountInfoSkeleton />
            ) : (
              <InputProfile
                label={translate('accountInfo.name')}
                keyboardType="default"
                placeholder={fullname}
                onChangeText={handleChangeFullname}
              />
            )}

            {loading ? (
              <AccountInfoSkeleton />
            ) : (
              <InputProfile
                label={translate('accountInfo.phoneNumber')}
                keyboardType="number-pad"
                placeholder={phoneNumber}
                onChangeText={handleChangePhoneNumber}
              />
            )}

            {loading ? (
              <AccountInfoSkeleton />
            ) : (
              <InputProfile
                label={translate('accountInfo.email')}
                keyboardType="email-address"
                placeholder={email}
                onChangeText={handleChangeEmail}
              />
            )}

            {loading ? (
              <AccountInfoSkeleton />
            ) : (
              <View style={styles.dateSexSection}>
                <View style={[atomicStyles.w50]}>
                  <Text
                    style={[
                      atomicStyles.h5,
                      atomicStyles.bold,
                      styles.textStyle,
                      atomicStyles.mb8px,
                    ]}>
                    {translate('accountInfo.dateOfBirth')}
                  </Text>
                  <Pressable onPress={handleOpenDatePick}>
                    <Text
                      style={[
                        atomicStyles.h5,
                        atomicStyles.bold,
                        styles.textStyle,
                        atomicStyles.textGray,
                        atomicStyles.mb16px,
                        atomicStyles.mt8px,
                      ]}>
                      {moment(dateOfBirth).format('DD/MM/YYYY')}
                    </Text>
                  </Pressable>
                </View>
                <SvgIcon
                  component={require('assets/icons/LineHorizontal.svg')}
                />
                <View style={[atomicStyles.w100]}>
                  <Text
                    style={[
                      atomicStyles.w50,
                      atomicStyles.textRight,
                      atomicStyles.h5,
                      atomicStyles.bold,
                      styles.textStyle,
                      atomicStyles.mb4px,
                    ]}>
                    {translate('accountInfo.gender')}
                  </Text>

                  <Pressable onPress={handleOpenGenderPick}>
                    <Text
                      style={[
                        atomicStyles.h5,
                        atomicStyles.bold,
                        atomicStyles.textRight,
                        styles.textStyle,
                        atomicStyles.textGray,
                        atomicStyles.mb16px,
                        atomicStyles.mt8px,
                        atomicStyles.w50,
                      ]}>
                      {gender}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            {loading ? (
              <AccountInfoSkeleton />
            ) : (
              <>
                <Dash
                  dashGap={0}
                  dashLength={3}
                  dashThickness={1}
                  style={[styles.dash, atomicStyles.mb16px]}
                  dashColor={Colors.Gray}
                />

                <View
                  style={[
                    atomicStyles.flexRow,
                    atomicStyles.justifyContentBetween,
                    atomicStyles.mt8px,
                  ]}>
                  <Text
                    style={[
                      atomicStyles.h5,
                      atomicStyles.bold,
                      styles.textStyle,
                      atomicStyles.mb8px,
                    ]}>
                    {translate('accountInfo.province')}
                  </Text>

                  <Pressable onPress={handleOpenProvincePick}>
                    <Text
                      style={[
                        atomicStyles.h5,
                        atomicStyles.bold,
                        styles.textStyle,
                        atomicStyles.textGray,
                      ]}>
                      {province}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
          <View style={[styles.viewContainer, styles.box]}>
            <LineBlock
              label={translate('accountInfo.changePassword.changePassword')}
              onPress={handleGoToChangePasswordProfileScreen}
              icon={require('assets/icons/LockIcon.svg')}
            />
          </View>

          <ButtonMain
            onPress={updateProfile}
            label={translate('accountInfo.saveInfo')}
            loading={saveLoading}
          />
        </SafeAreaView>
      </DefaultLayout>
    </>
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
