import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AccountInfoScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {View, Text, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import InputProfile from 'src/components/morecules/InputProfile/InputProfile';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import ChangePasswordProfileScreen from 'src/screens/ChangePasswordProfileScreen/ChangePasswordProfileScreen';
// @ts-ignore
import DatePicker from 'react-native-datepicker';
// import DatePicker from '@react-native-community/datetimepicker';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {Picker} from '@react-native-picker/picker';
import Dash from 'react-native-dash';
import {Provinces} from 'src/sample/provinces';

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

  const [gender, setGender] = React.useState('Gay');

  const [province, setProvince] = React.useState('Hà Nội');

  const handleGoToChangePasswordProfileScreen = React.useCallback(() => {
    navigation.navigate(ChangePasswordProfileScreen.displayName);
  }, [navigation]);

  const [realDate, setChangeDate] = React.useState(new Date());

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
              <View style={[styles.dateSection]}>
                <DatePicker
                  style={[{width: 200}, styles.dateBox]}
                  date={realDate}
                  mode="date"
                  format="DD-MM-YYYY"
                  androidMode="spinner"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onOpenModal={() => {}}
                  onCloseModel={() => {}}
                  onPressMask={() => {}}
                  allowFontScaling={false}
                  customStyles={{
                    dateInput: [styles.dateInput],
                    dateText: [
                      styles.textStyle,
                      atomicStyles.h5,
                      atomicStyles.textGray,
                      styles.dateText,
                    ],
                    dateTouchBody: [styles.dateTouchBody],
                  }}
                  onDateChange={(time: Date) => {
                    setChangeDate(time);
                  }}
                />

                <SvgIcon component={require('assets/icons/ArrowDown.svg')} />
              </View>
            </View>
            <SvgIcon component={require('assets/icons/LineHorizontal.svg')} />
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
              <View style={[styles.genderPicker]}>
                <Picker
                  selectedValue={gender}
                  style={[atomicStyles.textGray]}
                  onValueChange={(itemValue) => setGender(itemValue)}>
                  <Picker.Item label="Nam" value="man" />
                  <Picker.Item label="Nữ" value="girl" />
                  <Picker.Item label="Khác" value="other" />
                </Picker>
              </View>
            </View>
          </View>

          <Dash
            dashGap={0}
            dashLength={3}
            dashThickness={1}
            style={[styles.dash, atomicStyles.mb16px]}
            dashColor={Colors.Gray}
          />

          <View>
            <Text
              style={[atomicStyles.h5, atomicStyles.bold, styles.textStyle]}>
              Khu vực
            </Text>
            <View style={styles.provincePicker}>
              <Picker
                // prompt="abcxyz"
                selectedValue={province}
                style={[atomicStyles.textGray]}
                itemStyle={[atomicStyles.textBlue]}
                onValueChange={(itemValue) => setProvince(itemValue)}>
                {Provinces?.map((item, index) => (
                  <Picker.Item
                    label={item.name}
                    value={item.slug}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
          </View>
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
