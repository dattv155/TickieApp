import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SuccessBookingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import LinearGradient from 'react-native-linear-gradient';
import TextItemView from 'src/screens/DetailTicketScreen/components/TextItemView/TextItemView';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {useTranslation} from 'react-i18next';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {SelectedCombo} from 'src/services/booking-service/use-combo';
import {UseTimestamp} from 'src/hooks/use-timestamp';

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

  const {
    movieName,
    cinemaName,
    movieDate,
    showTime,
    pickingSeats,
    listLabel,
    seatCost,
    listSelectCombo,
    comboCost,
    totalCost,
    moviePoster,
  } = route?.params;

  const handleGoToHomeScreen = React.useCallback(() => {
    navigation.navigate(nameof(HomeScreen));
  }, [navigation]);

  const handleListCombo = React.useCallback((listCombo: SelectedCombo[]) => {
    let text = '';
    listCombo.map((combo) => {
      text = text + combo.count + ' ' + combo.name + ', ';
    });
    return text.substring(0, text.length - 2);
  }, []);

  const [, handleGetDay] = UseTimestamp();

  const dateAndShowTime = `${showTime} ${handleGetDay(movieDate)}`;

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
            {translate('Chúc mừng')}
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
              {translate('Bạn đã đặt vé thành công!')}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: '250%'}}>
            <View style={styles.ticketViewContainer}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#2c2c2c', '#000000']}
                style={styles.darkerLayer}
              />
              <Image
                source={{uri: moviePoster}}
                resizeMode="cover"
                style={styles.imageView}
              />
              <View style={styles.infoContainer}>
                <View style={styles.titleTicket}>
                  <Text
                    style={[
                      atomicStyles.textWhite,
                      atomicStyles.h3,
                      atomicStyles.bold,
                      styles.textStyle,
                    ]}>
                    {movieName}
                  </Text>
                  <Text
                    style={[
                      atomicStyles.textWhite,
                      atomicStyles.h5,
                      // atomicStyles.bold,
                      styles.textStyle,
                    ]}>
                    180 phút - IMAX
                  </Text>
                </View>

                <TextItemView label="Mã vé" value="18022123214" />
                <TextItemView label="Thời gian" value={dateAndShowTime} />
                <TextItemView label="Rạp" value={cinemaName} />
                <TextItemView label="Phòng chiếu" value="2B" />
                <TextItemView label="Chỗ ngồi" value={listLabel} />
                <TextItemView
                  label="Set Combo"
                  value={handleListCombo(listSelectCombo)}
                />
                <TextItemView label="Giá" value={totalCost} />
              </View>

              <SvgIcon
                component={require('assets/TicketFrame/TicketFrame.svg')}
                style={styles.ticketFrame}
              />

              <SvgIcon
                component={require('assets/TicketFrame/BarCode.svg')}
                style={styles.barCode}
              />
            </View>
            <View style={{height: '60%'}}>
              <ButtonMain
                onPress={handleGoToHomeScreen}
                label={translate('Trở về Trang chủ')}
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
