import React from 'react';
import {Payment} from 'src/models/Payment';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
import Toast from 'react-native-simple-toast';
import {MomoData} from 'src/models/MomoData';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
// @ts-ignore
import RNMomosdk from 'react-native-momosdk';
import {globalState} from 'src/app/global-state';

const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

export function usePayment(): [
  (value: number) => void,
  () => void,
  (value: Payment) => void,
  string,
] {
  const [bookingData] = globalState.useBookingData();

  const [amount, setAmount] = React.useState<number>(0);

  const enviroment = '0'; //"1": production

  const [paymentResponse, setPaymentResponse] = React.useState<string>('');

  const [payment, setPayment] = React.useState<Payment>({
    textAmount: fomatNumberToMoney(amount, null, ''),
    amount: amount,
    description: '',
    processing: false,
  });

  const handleChangeAmount = React.useCallback((value: number) => {
    setAmount(value);
  }, []);

  const handleChangePayment = React.useCallback((value: Payment) => {
    setPayment({
      amount: value.amount,
      textAmount: value.textAmount,
      description: value.description,
    });
  }, []);

  EventEmitter.addListener(
    'RCTMoMoNoficationCenterRequestTokenReceived',
    (response) => {
      try {
        if (response && response.status === 0) {
          setPayment({
            description: JSON.stringify(response),
            processing: false,
          });
        } else {
          setPayment({
            description: 'message: Get token fail',
            processing: false,
          });
        }
      } catch (ex) {
        Toast.show(ex.toString());
      }
    },
  );

  const handleSendRequest = React.useCallback(async () => {
    if (!payment.processing) {
      let jsonData = new MomoData();
      jsonData.enviroment = enviroment; //"0": SANBOX , "1": PRODUCTION
      jsonData.action = 'gettoken';
      jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION
      jsonData.merchantname = 'Tickie';
      jsonData.merchantcode = 'TICKIE01';
      jsonData.merchantnamelabel = 'Nhà cung cấp';
      jsonData.description = bookingData.movieName;
      jsonData.amount = amount;
      jsonData.orderId = bookingData.bookingId;
      jsonData.requestId = 'CykaBlyat';
      jsonData.orderLabel = 'Order Code';
      jsonData.appScheme = 'momocgv20170101'; // iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
      if (Platform.OS === 'android') {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        await momoHandleResponse(dataPayment);
      } else {
        RNMomosdk.requestPayment(JSON.stringify(jsonData));
      }
      setPayment({description: '', processing: true});
    } else {
      setPayment({description: '.....', processing: false});
    }
  }, [
    amount,
    bookingData.bookingId,
    bookingData.movieName,
    payment.processing,
  ]);

  const momoHandleResponse = async (response: any) => {
    try {
      if (response && response.status === 0) {
        setPayment({
          description: JSON.stringify(response),
          processing: false,
        });
        setPaymentResponse(response.message);
      } else {
        setPayment({
          description: 'message: Get token fail',
          processing: false,
        });
      }
    } catch (ex) {
      Toast.show(ex.toString());
    }
  };

  return [
    handleChangeAmount,
    handleSendRequest,
    handleChangePayment,
    paymentResponse,
  ];
}
