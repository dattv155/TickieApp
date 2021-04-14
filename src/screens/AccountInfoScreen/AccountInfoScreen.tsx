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

  const [newDate, setNewDate] = React.useState(new Date());

  const [
    email,
    fullname,
    phoneNumber,
    province,
    gender,
    handleChangeFullname,
    handleChangeEmail,
    handleChangePhoneNumber,
    handleChangeProvince,
    handleChangeGender,
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
      })
      .then(() => {
        Toast.show('Lưu thông tin thành công');
      })
      .catch((e) => {
        Toast.show(e.toString());
      });
  }, [email, fullname, gender, phoneNumber, province]);

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
          date={newDate}
          onDateChange={(date: Date) => {
            setNewDate(date);
          }}
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
                  placeholder={fullname}
                  onChangeText={handleChangeFullname}
                />
                <InputProfile
                  label="Số điện thoại"
                  keyboardType="number-pad"
                  placeholder={phoneNumber}
                  onChangeText={handleChangePhoneNumber}
                />
                <InputProfile
                  label="Email"
                  keyboardType="email-address"
                  placeholder={email}
                  onChangeText={handleChangeEmail}
                />

                <View style={styles.dateSexSection}>
                  <View style={[atomicStyles.w50]}>
                    <Text
                      style={[
                        atomicStyles.h5,
                        atomicStyles.bold,
                        styles.textStyle,
                        atomicStyles.mb8px,
                      ]}>
                      Ngày sinh
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
                        {newDate.toLocaleDateString()}
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
                      Giới tính
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
                    Khu vực
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
              </View>
              <View style={[styles.viewContainer, styles.box]}>
                <LineBlock
                  label="Thay đổi mật khẩu"
                  onPress={handleGoToChangePasswordProfileScreen}
                  icon={require('assets/icons/LockIcon.svg')}
                />
              </View>

              <ButtonMain onPress={updateProfile} label="Lưu thông tin" />
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
