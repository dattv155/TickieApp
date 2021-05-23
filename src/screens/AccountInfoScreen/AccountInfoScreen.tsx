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
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {getAccount} from 'src/services/get-account';
import moment from 'moment';
import AccountInfoSkeleton from 'src/screens/AccountInfoScreen/AccountInfoSkeleton/AccountInfoSkeleton';
import {useTranslation} from 'react-i18next/';
import {showInfo} from 'src/helpers/toast';

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
  ] = getAccount.getAccountInfo();

  const updateProfile = React.useCallback(() => {
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
        showInfo(translate('accountInfo.saveSuccess'));
      })
      .catch((e) => {
        Toast.show(e.toString());
      });
  }, [dateOfBirth, email, fullname, gender, phoneNumber, province, translate]);

  const sheetRef = React.useRef(null);
  const provinceRef = React.useRef(null);
  const genderRef = React.useRef(null);
  const fall = new Animated.Value<number>(1);

  const renderContent = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <DatePicker
          style={[
            {
              height: 150,
              width: 350,
            },
          ]}
          date={dateOfBirth}
          onDateChange={handleChangeDateOfBirth}
          mode={'date'}
        />
      </View>
    </SafeAreaView>
  );

  const provincePick = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <Picker
          style={{backgroundColor: 'white', width: 300, height: 150}}
          selectedValue={province}
          pickerData={Provinces.map((province: any) => province.name)}
          onValueChange={handleChangeProvince}
        />
      </View>
    </SafeAreaView>
  );

  const genderPick = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <Picker
          style={{
            backgroundColor: 'white',
            width: 300,
            height: 150,
          }}
          selectedValue={gender}
          pickerData={['Nam', 'Nữ', 'Khác']}
          onValueChange={handleChangeGender}
        />
      </View>
    </SafeAreaView>
  );

  const handleGoToChangePasswordProfileScreen = React.useCallback(() => {
    navigation.navigate(ChangePasswordProfileScreen.displayName);
  }, [navigation]);

  const handleOpenBottomSheet = React.useCallback(() => {
    sheetRef.current.snapTo(0);
    provinceRef.current.snapTo(1);
    genderRef.current.snapTo(1);
  }, []);

  const handleCloseBottomSheet = React.useCallback(() => {
    sheetRef.current.snapTo(1);
    provinceRef.current.snapTo(1);
    genderRef.current.snapTo(1);
  }, []);

  const handleOpenProvinceChoice = React.useCallback(() => {
    provinceRef.current.snapTo(0);
    sheetRef.current.snapTo(1);
    genderRef.current.snapTo(1);
  }, []);

  const handleOpenGenderChoice = React.useCallback(() => {
    genderRef.current.snapTo(0);
    sheetRef.current.snapTo(1);
    provinceRef.current.snapTo(1);
  }, []);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 0, 0]}
        initialSnap={1}
        renderHeader={renderContent}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />

      <BottomSheet
        ref={provinceRef}
        snapPoints={[200, 0, 0]}
        initialSnap={1}
        renderHeader={provincePick}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />

      <BottomSheet
        ref={genderRef}
        snapPoints={[200, 0, 0]}
        initialSnap={1}
        renderHeader={genderPick}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <Pressable onPress={handleCloseBottomSheet}>
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
                      <Pressable onPress={handleOpenBottomSheet}>
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

                      <Pressable onPress={handleOpenGenderChoice}>
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

                      <Pressable onPress={handleOpenProvinceChoice}>
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
              />
            </SafeAreaView>
          </DefaultLayout>
        </Pressable>
      </Animated.View>
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
