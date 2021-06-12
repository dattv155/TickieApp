import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './PaymentScreen.scss';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import SuccessBookingScreen from 'src/screens/SuccessBookingScreen/SuccessBookingScreen';
import RadioButton from 'src/components/RadioButton/RadioButton';
import {PaymentMethod} from 'src/sample/paymentMethod';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
import Toast from 'react-native-simple-toast';
import {
  convertListSeatsLabel,
  formatToCurrency,
  handleListCombo,
} from 'src/helpers/string-helper';
import {UseTimestamp} from 'src/hooks/use-timestamp';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {useTranslation} from 'react-i18next';
import {pushNotificationFirestoreBookingSuccessful} from 'src/services/push-notification-firestore';
import {LocalNotification} from 'src/services/local-push-notification';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {showWarning} from 'src/helpers/toast';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import {useBoolean} from 'react3l-common';
import VoucherListComponent from 'src/components/organisms/VoucherListComponent/VoucherListComponent';
import {Voucher} from 'src/models/Voucher';
import {momoService} from 'src/services/momo-service';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {MovieBooking} from 'src/models/MovieBooking';
import {globalState} from 'src/app/global-state';
import 'react-native-get-random-values';
import {customAlphabet} from 'nanoid';

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

  const [bookingData] = globalState.useBookingData();

  const [, handleGetDay] = UseTimestamp();

  const [voucherSelected, setVoucherSelected] = React.useState<Voucher>(null);

  const [totalCost, setTotalCost] = React.useState<number>(
    bookingData.seatCost + bookingData.comboCost,
  );

  const [
    voucherModalVisible,
    ,
    handleOpenModalVoucher,
    handleCloseModalVoucher,
  ] = useBoolean(false);

  const handleSelectVoucher = React.useCallback(
    (voucher: Voucher) => {
      setVoucherSelected(voucher);
      handleCloseModalVoucher();
    },
    [handleCloseModalVoucher],
  );

  const [
    handleChangeAmount,
    handleSendRequest,
    handleChangePayment,
    paymentResponseStatus,
  ] = momoService.usePayment();

  const [paymentMethodKey, setPaymentMethodKey] = React.useState<string>('');

  const [buttonTitle, setButtonTitle] = React.useState<string>(
    translate('bookingScreen.paymentScreen.confirmPayment'),
  );

  const handleGotoSuccessBookingScreen = React.useCallback(async () => {
    navigation.navigate(SuccessBookingScreen.displayName);
  }, [navigation]);

  const handleSaveDataBooking = React.useCallback(async () => {
    const nanoid = customAlphabet('0123456789-', 15);
    const dataSync: MovieBooking = {
      ...bookingData,
      voucher: voucherSelected,
      totalCost: totalCost,
      bookingMoment: moment().toISOString(true),
      paymentMethod: paymentMethodKey,
      bookingId: nanoid(),
    };

    await globalState.setBookingData(dataSync);

    await firestore()
      .collection('bookings')
      .doc(moment().toISOString(true))
      .set(dataSync);
  }, [bookingData, paymentMethodKey, totalCost, voucherSelected]);

  React.useEffect(() => {
    if (voucherSelected) {
      setTotalCost(
        ((bookingData.seatCost + bookingData.comboCost) *
          (100 - voucherSelected.discountPercent)) /
          100,
      );
    } else {
      setTotalCost(bookingData.seatCost + bookingData.comboCost);
    }
  }, [bookingData.comboCost, bookingData.seatCost, voucherSelected]);

  const handlePay = React.useCallback(async () => {
    if (paymentMethodKey === 'momo') {
      let newValue = totalCost;
      let amount = fomatNumberToMoney(totalCost, null, '');
      handleChangeAmount(totalCost);
      handleChangePayment({
        amount: newValue,
        textAmount: amount,
        description: '',
      });
      handleSendRequest();
      if (paymentResponseStatus === 'Successful') {
        await handleSaveDataBooking();
        pushNotificationFirestoreBookingSuccessful(bookingData.movieName);
        LocalNotification(bookingData.movieName);
        await handleGotoSuccessBookingScreen();
      }
    } else if (paymentMethodKey === 'credit') {
      Toast.show('Đang phát triển');
    } else if (paymentMethodKey === 'banking') {
      Toast.show('Đang phát triển');
    } else if (paymentMethodKey === 'offline') {
      await handleSaveDataBooking();
      pushNotificationFirestoreBookingSuccessful(bookingData.movieName);
      LocalNotification(bookingData.movieName);
      await handleGotoSuccessBookingScreen();
    } else {
      showWarning(
        translate('bookingScreen.paymentScreen.pleaseChoosePaymentMethod'),
      );
    }
  }, [
    bookingData.movieName,
    handleChangeAmount,
    handleChangePayment,
    handleGotoSuccessBookingScreen,
    handleSaveDataBooking,
    handleSendRequest,
    paymentMethodKey,
    paymentResponseStatus,
    totalCost,
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

  const confirmRef = React.useRef(null);

  const renderConfirm = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <Text style={[atomicStyles.h3, atomicStyles.bold, styles.textStyle]}>
          {translate('bookingScreen.paymentScreen.confirmPayment')}
        </Text>
        <Text style={[atomicStyles.h5, styles.textStyle]}>
          {translate('bookingScreen.paymentScreen.makeSurePayment')}
        </Text>
      </View>
      <ButtonMain
        label={translate('bookingScreen.paymentScreen.yesPayment')}
        onPress={async () => {
          await handlePay();
          confirmRef.current.snapTo(1);
        }}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => {
          confirmRef.current.snapTo(1);
        }}>
        <Text
          style={[
            atomicStyles.h5,
            atomicStyles.bold,
            styles.textStyle,
            atomicStyles.textError,
          ]}>
          {translate('bookingScreen.paymentScreen.noPayment')}
        </Text>
      </Pressable>
    </SafeAreaView>
  );

  const snapPoint: (string | number)[] = [250, 0];

  const fall = React.useRef(new Animated.Value<number>(1)).current;

  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

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
                source={{uri: bookingData.poster}}
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
                  {bookingData.movieName}
                </Text>
                <Text style={[atomicStyles.h6, styles.infoType]}>
                  {bookingData.movieInfoType}
                </Text>
                <Text style={[atomicStyles.h6, styles.infoType]}>
                  {translate('bookingScreen.paymentScreen.cinema')}:{' '}
                  <Text
                    style={[
                      atomicStyles.bold,
                      atomicStyles.textBlue,
                      styles.textStyle,
                    ]}>
                    {bookingData.cinemaName}
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
                    {bookingData.cinemaFormat}
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
                  {handleGetDay(bookingData?.date.seconds)}
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
                  {bookingData.time}
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
                  {convertListSeatsLabel(bookingData.position)}
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
                {handleListCombo(bookingData.combos)}
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
            <TouchableOpacity style={[styles.paymentGroup]}>
              <LineBlock
                label={'Chọn voucher'}
                onPress={handleOpenModalVoucher}
                right={voucherSelected?.code}
              />
            </TouchableOpacity>
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
              {formatToCurrency(totalCost)} VND
            </Text>
          </View>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => confirmRef.current.snapTo(0)}>
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

        <VoucherListComponent
          navigation={navigation}
          route={route}
          visible={voucherModalVisible}
          handleSelectVoucher={handleSelectVoucher}
          onClose={handleCloseModalVoucher}
        />
      </DefaultLayout>
      <BottomSheet
        ref={confirmRef}
        snapPoints={snapPoint}
        initialSnap={1}
        renderHeader={renderConfirm}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: Colors.Black,
            opacity: animatedShadowOpacity,
          },
        ]}
      />
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
