import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './PaymentScreen.scss';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {useTranslation} from 'react-i18next';
import {pushNotificationFirestoreBookingSuccessful} from 'src/services/push-notification-firestore';
import {LocalNotification} from 'src/services/local-push-notification';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {Position} from 'src/screens/ChooseSeatScreen/ChooseSeatScreen';
import {showWarning} from 'src/helpers/toast';

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

  const [translate] = useTranslation();

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
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    handleChangeAmount,
    handleSendRequest,
    handleChangePayment,
    paymentResponseStatus,
  ] = MomoPayment.getPayment();

  const [paymentMethodKey, setPaymentMethodKey] = React.useState<string>('');

  const [buttonTitle, setButtonTitle] = React.useState<string>(
    translate('bookingScreen.paymentScreen.confirmPayment'),
  );

  const handleGotoSuccessBookingScreen = React.useCallback(() => {
    navigation.navigate(SuccessBookingScreen.displayName, {
      movieName,
      cinemaName,
      movieDate,
      showTime,
      pickingSeats,
      listLabel,
      seatCost,
      listSelectCombo,
      comboCost,
    });
  }, [
    cinemaName,
    comboCost,
    listLabel,
    listSelectCombo,
    movieDate,
    movieName,
    navigation,
    pickingSeats,
    seatCost,
    showTime,
  ]);

  const handleListCombo = React.useCallback((listCombo: SelectedCombo[]) => {
    let text = '';
    listCombo.map((combo) => {
      text = text + combo.count + ' ' + combo.name + ', ';
    });
    return text.substring(0, text.length - 2);
  }, []);

  const handleListPosSeat = React.useCallback((listPosition: number[][]) => {
    let listPos: Position[] = [];
    listPosition.map((pos) => {
      listPos.push({row: pos[0], column: pos[1]});
    }, []);
    return listPos;
  }, []);

  const handleSaveDataBooking = React.useCallback(async () => {
    const data = {
      userId: auth().currentUser.uid,
      date: movieDate,
      filmType: movieFormat,
      movieName: movieName,
      cinemaName: cinemaName,
      time: showTime,
      combos: listSelectCombo,
      position: handleListPosSeat(pickingSeats),
      totalCost: seatCost + comboCost,
    };
    await firestore()
      .collection('bookings')
      .doc(moment().toISOString(true))
      .set(data);
  }, [
    cinemaName,
    comboCost,
    handleListPosSeat,
    listSelectCombo,
    movieDate,
    movieFormat,
    movieName,
    pickingSeats,
    seatCost,
    showTime,
  ]);

  const handlePay = React.useCallback(async () => {
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
      if (paymentResponseStatus === 'Successful') {
        pushNotificationFirestoreBookingSuccessful(movieName);
        LocalNotification(movieName);
        handleGotoSuccessBookingScreen();
      }
    } else if (paymentMethodKey === 'credit') {
      Toast.show('Đang phát triển');
    } else if (paymentMethodKey === 'banking') {
      Toast.show('Đang phát triển');
    } else if (paymentMethodKey === 'offline') {
      await handleSaveDataBooking();
      pushNotificationFirestoreBookingSuccessful(movieName);
      LocalNotification(movieName);
      handleGotoSuccessBookingScreen();
    } else {
      showWarning(
        translate('bookingScreen.paymentScreen.pleaseChoosePaymentMethod'),
      );
    }
  }, [
    handleChangeAmount,
    handleChangePayment,
    handleGotoSuccessBookingScreen,
    handleSaveDataBooking,
    handleSendRequest,
    movieName,
    paymentMethodKey,
    paymentResponseStatus,
    translate,
  ]);

  React.useEffect(() => {
    if (paymentMethodKey === 'momo') {
      setButtonTitle(translate('bookingScreen.paymentScreen.goToMomo'));
      if (paymentResponseStatus === 'Successful') {
        setButtonTitle(translate('bookingScreen.paymentScreen.successPayment'));
      }
    } else if (paymentMethodKey === 'credit') {
      setButtonTitle(translate('bookingScreen.paymentScreen.confirmPayment'));
    } else if (paymentMethodKey === 'banking') {
      setButtonTitle(translate('bookingScreen.paymentScreen.confirmPayment'));
    } else if (paymentMethodKey === 'offline') {
      setButtonTitle(translate('bookingScreen.paymentScreen.bookTicket'));
    }
  }, [paymentMethodKey, paymentResponseStatus, translate]);

  return (
    <>
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        right={<HeaderIconPlaceholder />}
        gradient={false}
        customHeader={false}
        bgWhite={true}
        title={
          <Text style={[atomicStyles.h2, atomicStyles.bold, styles.textStyle]}>
            {translate('bookingScreen.paymentScreen.header')}
          </Text>
        }>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={styles.scrollView}>
          <View style={styles.containerView}>
            <View style={styles.information}>
              <Image
                source={require('assets/images/mulan-poster.png')}
                resizeMode="cover"
                style={styles.infoImage}
              />
              <View style={styles.info}>
                <Text
                  style={[
                    atomicStyles.h4,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {movieName}
                </Text>
                <Text style={[atomicStyles.h6, styles.infoType]}>
                  {movieType}
                </Text>
                <Text style={[atomicStyles.h6, styles.infoType]}>
                  {translate('bookingScreen.paymentScreen.cinema')}:{' '}
                  <Text
                    style={[
                      atomicStyles.bold,
                      atomicStyles.textBlue,
                      styles.textStyle,
                    ]}>
                    {cinemaName}
                  </Text>
                </Text>
                <Text style={[atomicStyles.h6, styles.infoType]}>
                  {translate('bookingScreen.paymentScreen.movieFormat')}:{' '}
                  <Text
                    style={[
                      atomicStyles.bold,
                      atomicStyles.textBlue,
                      styles.textStyle,
                    ]}>
                    {movieFormat}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.detailArea}>
              <View style={styles.detailBlock}>
                <Text style={[atomicStyles.h6, atomicStyles.textGray]}>
                  {translate('bookingScreen.paymentScreen.day')}
                </Text>
                <Text
                  style={[
                    atomicStyles.h4,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {handleGetDay(movieDate.seconds)}
                </Text>
              </View>
              <View style={styles.detailBlock}>
                <Text style={[atomicStyles.h6, atomicStyles.textGray]}>
                  {translate('bookingScreen.paymentScreen.time')}
                </Text>
                <Text
                  style={[
                    atomicStyles.h4,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {showTime}
                </Text>
              </View>
              <View style={styles.detailBlock}>
                <Text style={[atomicStyles.h6, atomicStyles.textGray]}>
                  {translate('bookingScreen.paymentScreen.seats')}
                </Text>
                <Text
                  style={[
                    atomicStyles.h4,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {listLabel}
                </Text>
              </View>
            </View>
            <View style={styles.comboInfo}>
              <Text style={[atomicStyles.h6, atomicStyles.textGray]}>
                {translate('bookingScreen.paymentScreen.comboSet')}
              </Text>
              <Text
                style={[
                  atomicStyles.h4,
                  atomicStyles.bold,
                  styles.comboDetail,
                ]}>
                {handleListCombo(listSelectCombo)}
              </Text>
            </View>
            <View style={styles.paymentArea}>
              <Text
                style={[atomicStyles.h5, atomicStyles.bold, styles.textStyle]}>
                {translate('bookingScreen.paymentScreen.selectPaymentMethod')}
              </Text>
              <View style={styles.paymentGroup}>
                <RadioButton
                  values={PaymentMethod}
                  onSetMethodKey={setPaymentMethodKey}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.summaryArea}>
          <View style={styles.summary}>
            <Text
              style={[
                atomicStyles.h3,
                atomicStyles.bold,
                atomicStyles.textBlue,
                styles.textStyle,
              ]}>
              {translate('bookingScreen.paymentScreen.summary')}
            </Text>
            <Text
              style={[
                atomicStyles.h1,
                atomicStyles.bold,
                atomicStyles.textBlue,
                styles.textStyle,
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
                styles.textStyle,
              ]}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
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
