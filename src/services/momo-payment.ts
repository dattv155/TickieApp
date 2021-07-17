import React from 'react';
import {Payment} from 'src/models/Payment';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
// @ts-ignore
import RNMomosdk from 'react-native-momosdk';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';
import {MomoData} from 'src/models/MomoData';

const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

export const MomoPayment = {
  useGetPayment(): [
    string,
    string,
    string,
    string,
    number,
    Payment,
    (value: string) => void,
    (value: string) => void,
    (value: string) => void,
    (value: string) => void,
    (value: number) => void,
    () => void,
    (value: Payment) => void,
    string,
  ] {
    const [merchantName, setMerchantName] = React.useState<string>('Tickie');
    const [merchantCode, setMerchantCode] = React.useState<string>('CGV01');
    const [merchantNameLabel, setMerchantNameLabel] = React.useState<string>(
      'Nhà cung cấp',
    );
    const [billDescription, setBillDescription] = React.useState<string>(
      'Fast and Furious 8',
    );
    const [amount, setAmount] = React.useState<number>(1000);

    const enviroment = '0'; //"1": production

    const [paymentResponse, setPaymentResponse] = React.useState<string>('');

    const [payment, setPayment] = React.useState<Payment>({
      textAmount: fomatNumberToMoney(amount, null, ''),
      amount: amount,
      description: '',
      processing: false,
    });

    const handleChangeMerchantName = React.useCallback((value: string) => {
      setMerchantName(value);
    }, []);

    const handleChangeMerchantCode = React.useCallback((value: string) => {
      setMerchantCode(value);
    }, []);

    const handleChangeMerchantNameLabel = React.useCallback((value: string) => {
      setMerchantNameLabel(value);
    }, []);

    const handleChangeBillDescription = React.useCallback((value: string) => {
      setBillDescription(value);
    }, []);

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
        console.log('<MoMoPay>Listen.Event::' + JSON.stringify(response));
        try {
          if (response && response.status === 0) {
            let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
            setPayment({
              description: JSON.stringify(response),
              processing: false,
            });
            let momoToken = response.data;
            let phonenumber = response.phonenumber;
            let message = response.message;
            let orderId = response.refOrderId; //your orderId
            let requestId = response.refRequestId; //your requestId
            //continue to submit momoToken,phonenumber to server
            console.log('Momo Token ', momoToken);
            console.log('phonenumber ', phonenumber);
            console.log('message ', message);
            console.log('order id ', orderId);
            console.log('request id ', requestId);
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
        jsonData.merchantname = merchantName;
        jsonData.merchantcode = merchantCode;
        jsonData.merchantnamelabel = merchantNameLabel;
        jsonData.description = billDescription;
        jsonData.amount = amount;
        jsonData.orderId = 'tannt123456789';
        jsonData.requestId = 'CykaBlyat';
        jsonData.orderLabel = 'Order Code';
        jsonData.appScheme = 'momocgv20170101'; // iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
        console.log('data_request_payment ' + JSON.stringify(jsonData));
        if (Platform.OS === 'android') {
          let dataPayment = await RNMomosdk.requestPayment(jsonData);
          momoHandleResponse(dataPayment);
          console.log('data_request_payment ' + dataPayment.status);
        } else {
          RNMomosdk.requestPayment(JSON.stringify(jsonData));
        }
        setPayment({description: '', processing: true});
      } else {
        setPayment({description: '.....', processing: false});
      }
    }, [
      amount,
      billDescription,
      merchantCode,
      merchantName,
      merchantNameLabel,
      payment.processing,
    ]);

    const momoHandleResponse = async (response: any) => {
      try {
        if (response && response.status === 0) {
          let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
          setPayment({
            description: JSON.stringify(response),
            processing: false,
          });
          let momoToken = response.data;
          let phonenumber = response.phonenumber;
          let message = response.message;
          setPaymentResponse(response.message);
          //continue to submit momoToken,phonenumber to server
          console.log('Momo Token: ', momoToken);
          console.log('phonenumber: ', phonenumber);
          console.log('message: ', message);
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
      paymentResponse,
    ];
  },
};
