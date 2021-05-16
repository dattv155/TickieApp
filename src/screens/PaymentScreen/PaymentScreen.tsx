import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './PaymentScreen.scss';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import SuccessBookingScreen from 'src/screens/SuccessBookingScreen/SuccessBookingScreen';
import RadioButton from 'src/components/RadioButton/RadioButton';
import {PaymentMethod} from 'src/sample/paymentMethod';
import {MomoPayment} from 'src/services/momo-payment';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
import Toast from 'react-native-simple-toast';
import {SelectedCombo} from 'src/services/booking-service/use-combo';
import {formatToCurrency} from 'src/helpers/string-helper';
import {UseTimestamp} from 'src/hooks/use-timestamp';

/**
 * File: PaymentScreen.tsx
 * @created 2021-04-12 12:57:54
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<PaymentScreenProps>>}
 */
const PaymentScreen: FC<PropsWithChildren<PaymentScreenProps>> = (
  props: PropsWithChildren<PaymentScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {
    movieName,
    movieType,
    movieFormat,
    cinemaName,
    movieDate,
    showTime,
    pickingSeats,
    listLabel,
    seatCost,
    listSelectCombo,
    comboCost,
  } = route?.params;

  const [, handleGetDay] = UseTimestamp();

  const [
    merchantName,
    merchantCode,
    merchantNameLabel,
    billDescription,
    amount,
    payment,
    handleChangeMerchantName,
    handleChangeMerchantCode,
    handleChangeMerchantNameLabel,
    handleChangeBillDescription,
    handleChangeAmount,
    handleSendRequest,
    handleChangePayment,
  ] = MomoPayment.getPayment();

  const [paymentMethodKey, setPaymentMethodKey] = React.useState<string>('');

  const handleGotoSuccessBookingScreen = React.useCallback(() => {
    navigation.navigate(SuccessBookingScreen.displayName);
  }, [navigation]);

  const handleListCombo = React.useCallback((listCombo: SelectedCombo[]) => {
    let text = '';
    listCombo.map((combo) => {
      text = text + combo.count + ' ' + combo.name + ', ';
    });
    return text.substring(0, text.length - 2);
  }, []);

  const handlePay = React.useCallback(() => {
    if (paymentMethodKey === 'momo') {
      let newValue = 1000;
      let amount = fomatNumberToMoney(newValue, null, '');
      handleChangeAmount(newValue);
      handleChangePayment({
        amount: newValue,
        textAmount: amount,
        description: '',
      });
      handleSendRequest();
    } else if (paymentMethodKey === 'credit') {
      Toast.show('Đang phát triển');
    } else if (paymentMethodKey === 'banking') {
      Toast.show('Đang phát triển');
    } else {
      Toast.show('Hãy chọn phương thức thanh toán!');
    }
  }, [
    handleChangeAmount,
    handleChangePayment,
    handleSendRequest,
    paymentMethodKey,
  ]);

  return (
    <>
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        // right={<HeaderIconPlaceholder />}
        gradient={false}
        customHeader={false}
        bgWhite={true}
        title={
          <View style={styles.titleHeader}>
            <Text style={[atomicStyles.h2, atomicStyles.bold]}>
              Thông tin thanh toán
            </Text>
          </View>
        }>
        <StatusBar barStyle="dark-content" />
        <View style={styles.containerView}>
          <View style={styles.information}>
            <Image
              source={require('assets/images/mulan-poster.png')}
              resizeMode="cover"
              style={styles.infoImage}
            />
            <View style={styles.info}>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.filmName]}>
                {movieName}
              </Text>
              <Text style={[atomicStyles.h6, styles.infoType]}>
                {movieType}
              </Text>
              <Text style={[atomicStyles.h6, styles.infoType]}>
                Rạp:{' '}
                <Text style={[atomicStyles.bold, styles.textBold]}>
                  {cinemaName}
                </Text>
              </Text>
              <Text style={[atomicStyles.h6, styles.infoType]}>
                Định dạng:{' '}
                <Text style={[atomicStyles.bold, styles.textBold]}>
                  {movieFormat}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.detailArea}>
            <View style={styles.detailBlock}>
              <Text style={[atomicStyles.h6, styles.detailTitle]}>Ngày</Text>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.detailInfo]}>
                {handleGetDay(movieDate.seconds)}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={[atomicStyles.h6, styles.detailTitle]}>
                Thời gian
              </Text>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.detailInfo]}>
                {showTime}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={[atomicStyles.h6, styles.detailTitle]}>
                Chỗ ngồi
              </Text>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.detailInfo]}>
                {listLabel}
              </Text>
            </View>
          </View>
          <View style={styles.comboInfo}>
            <Text style={[atomicStyles.h6, styles.comboTitle]}>Combo Set</Text>
            <Text
              style={[atomicStyles.h4, atomicStyles.bold, styles.comboDetail]}>
              {handleListCombo(listSelectCombo)}
            </Text>
          </View>
          <View style={styles.paymentArea}>
            <Text
              style={[atomicStyles.h5, atomicStyles.bold, styles.paymentTitle]}>
              Chọn cách thức thanh toán
            </Text>
            <View style={styles.paymentGroup}>
              {/*<PaymentMethodItem type={'credit'} />*/}
              {/*<PaymentMethodItem type={'banking'} />*/}
              {/*<PaymentMethodItem />*/}
              <RadioButton
                values={PaymentMethod}
                onSetMethodKey={setPaymentMethodKey}
              />
            </View>
          </View>
          <View style={styles.summaryArea}>
            <View style={styles.summary}>
              <Text
                style={[
                  atomicStyles.h3,
                  atomicStyles.bold,
                  atomicStyles.textBlue,
                ]}>
                Tổng cộng
              </Text>
              <Text
                style={[
                  atomicStyles.h1,
                  atomicStyles.bold,
                  atomicStyles.textBlue,
                ]}>
                {formatToCurrency(seatCost + comboCost)} VND
              </Text>
            </View>
            <TouchableOpacity style={styles.paymentButton} onPress={handlePay}>
              <Text
                style={[
                  atomicStyles.h5,
                  atomicStyles.bold,
                  atomicStyles.textWhite,
                ]}>
                Thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface PaymentScreenProps extends StackScreenProps<any> {
  //
}

PaymentScreen.defaultProps = {
  //
};

PaymentScreen.propTypes = {
  //
};

PaymentScreen.displayName = nameof(PaymentScreen);

export default PaymentScreen;
