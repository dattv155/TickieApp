import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './InformationScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {MomoPayment} from 'src/services/momo-payment';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';

/**
 * File: InformationScreen.tsx
 * @created 2021-03-16 16:17:06
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<InformationScreenProps>>}
 */
const InformationScreen: FC<PropsWithChildren<InformationScreenProps>> = (
  props: PropsWithChildren<InformationScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

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

  const handleChangeText = React.useCallback(
    (value) => {
      let newValue = value.replace(/\./g, '').trim();
      let amount = fomatNumberToMoney(newValue, null, '');
      handleChangeAmount(newValue);
      handleChangePayment({
        amount: newValue,
        textAmount: amount,
        description: '',
      });
    },
    [handleChangeAmount, handleChangePayment],
  );

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
          Thông tin
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView
        style={{flex: 1, marginTop: 50, backgroundColor: 'transparent'}}>
        <View style={styles.container}>
          <View
            style={[
              {
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
              },
            ]}>
            <Image
              style={{flex: 1, width: 100, height: 100}}
              source={require('assets/iconReact.png')}
            />
          </View>
          <Text style={[styles.text, {color: 'red', fontSize: 20}]}>
            {'MOMO DEVELOPMENT'}
          </Text>
          <Text style={[styles.text, {color: 'red', fontSize: 18}]}>
            {'React native version'}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
                marginTop: 20,
              },
            ]}>
            {'MerchantCode : ' + merchantCode}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
              },
            ]}>
            {'MerchantName : ' + merchantName}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
              },
            ]}>
            {'Description : ' + billDescription}
          </Text>
          <View style={styles.formInput}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{flex: 1, fontSize: 18, paddingHorizontal: 10}}>
                {'Total amount'}
              </Text>
              <TextInput
                autoFocus={true}
                maxLength={10}
                placeholderTextColor={'#929292'}
                placeholder={'Enter amount'}
                keyboardType={'numeric'}
                returnKeyType="done"
                value={amount === 0 ? '' : payment.textAmount}
                style={[styles.textInput, {flex: 1, paddingRight: 30}]}
                onChangeText={handleChangeText}
                underlineColorAndroid="transparent"
              />
              <Text style={{position: 'absolute', right: 20, fontSize: 30}}>
                {'đ'}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleSendRequest} style={styles.button}>
            {payment.processing ? (
              <Text style={styles.textGrey}>
                Waiting response from MoMo App
              </Text>
            ) : (
              <Text style={styles.text}>Confirm Payment</Text>
            )}
          </TouchableOpacity>
          {payment.processing ? (
            <ActivityIndicator size="small" color="#000" />
          ) : null}
          {payment.description != '' ? (
            <Text style={[styles.text, {color: 'red'}]}>
              {payment.description}
            </Text>
          ) : null}
        </View>
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface InformationScreenProps extends StackScreenProps<any> {
  //
}

InformationScreen.defaultProps = {
  //
};

InformationScreen.propTypes = {
  //
};

InformationScreen.displayName = nameof(InformationScreen);

export default InformationScreen;
