import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MyTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';

/**
 * File: MyTicketScreen.tsx
 * @created 2021-03-15 11:00:46
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<MyTicketScreenProps>>}
 */
const MyTicketScreen: FC<PropsWithChildren<MyTicketScreenProps>> = (
  props: PropsWithChildren<MyTicketScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

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
          Vé của tôi
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.viewContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageView}
            source={require('assets/images/mulan-poster.png')}
          />
          <View style={styles.infoSection}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                atomicStyles.mb8px,
                styles.textStyle,
              ]}>
              Mulan(2020)
            </Text>
            <Text
              style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
              Rạp: Tickie Giải Phóng
            </Text>
            <Text
              style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
              Thời gian: 7:00 13/10
            </Text>
            <Text
              style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
              Chỗ ngồi: D06, D07
            </Text>
            <Pressable style={styles.miniButton}>
              <Text
                style={[
                  styles.textStyle,
                  atomicStyles.h76,
                  atomicStyles.bold,
                  atomicStyles.textWhite,
                ]}>
                Xem vé
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface MyTicketScreenProps extends StackScreenProps<any> {
  //
}

MyTicketScreen.defaultProps = {
  //
};

MyTicketScreen.propTypes = {
  //
};

MyTicketScreen.displayName = nameof(MyTicketScreen);

export default MyTicketScreen;
