import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SuccessBookingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {useTranslation} from 'react-i18next';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {globalState} from 'src/app/global-state';
import TicketDetail from 'src/components/morecules/TicketDetail/TicketDetail';

/**
 * File: SuccessBookingScreen.tsx
 * @created 2021-04-16 00:33:39
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SuccessBookingScreenProps>>}
 */
const SuccessBookingScreen: FC<PropsWithChildren<SuccessBookingScreenProps>> = (
  props: PropsWithChildren<SuccessBookingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  const [bookingData] = globalState.useBookingData();

  const handleGoToHomeScreen = React.useCallback(async () => {
    navigation.navigate(nameof(HomeScreen));
    // await globalState.resetNewBookingData();
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <DefaultLayout
        navigation={navigation}
        route={route}
        left={
          <Pressable onPress={handleGoToHomeScreen} style={styles.backButton}>
            <SvgIcon component={require('assets/icons/BackToHome.svg')} />
          </Pressable>
        }
        right={<HeaderIconPlaceholder />}
        title={
          <Text
            style={[
              atomicStyles.h1,
              atomicStyles.bold,
              styles.textStyle,
              atomicStyles.textBlue,
            ]}>
            {translate('success.congrat')}
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <SafeAreaView style={[styles.screenContainer]}>
          <View style={[atomicStyles.alignItemsCenter, atomicStyles.mb16px]}>
            <Text
              style={[
                atomicStyles.h5,
                atomicStyles.textBlue,
                atomicStyles.bold,
                styles.textStyle,
              ]}>
              {translate('success.bookingSuccess')}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TicketDetail movieBooking={bookingData} />
            <View style={{height: '60%'}}>
              <ButtonMain
                onPress={handleGoToHomeScreen}
                label={translate('success.backToMainScreen')}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </DefaultLayout>
    </>
  );
};

export interface SuccessBookingScreenProps extends StackScreenProps<any> {
  //
}

SuccessBookingScreen.defaultProps = {
  //
};

SuccessBookingScreen.propTypes = {
  //
};

SuccessBookingScreen.displayName = nameof(SuccessBookingScreen);

export default SuccessBookingScreen;
