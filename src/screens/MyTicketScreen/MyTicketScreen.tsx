import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MyTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import TicketItemView from 'src/screens/MyTicketScreen/components/TicketItemView/TicketItemView';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';

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

  const handleGoToDetailTicketScreen = React.useCallback(() => {
    navigation.navigate(DetailTicketScreen.displayName);
  }, [navigation]);

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
      <ScrollView>
        <SafeAreaView style={styles.screenContainer}>
          <TicketItemView
            film="Mulan(2020)"
            theater="Tickie Giải Phóng"
            time="7:00 13/10"
            seat="D06, D07"
            image={require('assets/images/mulan-poster.png')}
            onPress={handleGoToDetailTicketScreen}
          />
          <TicketItemView
            film="Blade Runner 2049"
            theater="Tickie Giải Phóng"
            time="7:00 13/10"
            seat="D03, D04"
            image={require('assets/images/bladeRunner-poster.png')}
          />
          <TicketItemView
            film="Mulan(2020)"
            theater="Tickie Giải Phóng"
            time="7:00 13/10"
            seat="D06, D07"
            image={require('assets/images/mulan-poster.png')}
            onPress={handleGoToDetailTicketScreen}
          />
          <TicketItemView
            film="Blade Runner 2049"
            theater="Tickie Giải Phóng"
            time="7:00 13/10"
            seat="D03, D04"
            image={require('assets/images/bladeRunner-poster.png')}
          />
        </SafeAreaView>
      </ScrollView>
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
