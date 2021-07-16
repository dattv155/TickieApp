import React from 'react';
import {Payment} from 'src/models/Payment';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
import Toast from 'react-native-simple-toast';
import {MomoData} from 'src/models/MomoData';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
// @ts-ignore
import RNMomosdk from 'react-native-momosdk';

const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

export function usePayment(
  amount: number,
): [(amount: number, movie: string) => void, (value: Payment) => void, string] {
  const [paymentResponse, setPaymentResponse] = React.useState<string>('');

  const [payment, setPayment] = React.useState<Payment>({
    textAmount: fomatNumberToMoney(amount, null, ''),
    amount: amount,
    description: '',
    processing: false,
  });

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

  const handleSendRequest = React.useCallback(
    async (amount: number, movie: string) => {
      if (!payment.processing) {
        let jsonData = new MomoData();
        jsonData.enviroment = '0'; //"0": SANBOX , "1": PRODUCTION
        jsonData.action = 'gettoken';
        jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION
        jsonData.merchantname = 'Cinemas';
        jsonData.merchantcode = 'CGV01';
        jsonData.merchantnamelabel = 'Nhà cung cấp';
        jsonData.description = movie;
        jsonData.amount = amount;
        jsonData.orderId = 'bill234284290348';
        jsonData.requestId = 'your_requestId';
        jsonData.orderLabel = 'Ma don hang';
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
    },
    [payment.processing],
  );

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

  return [handleSendRequest, handleChangePayment, paymentResponse];
}
