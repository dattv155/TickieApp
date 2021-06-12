import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChooseSeatScreen.scss';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import type {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import SmallTheater from 'src/screens/ChooseSeatScreen/component/SmallTheater/SmallTheater';
import SelectComboScreen from 'src/screens/SelectComboScreen/SelectComboScreen';
import {UseTimestamp} from 'src/hooks/use-timestamp';
import {bookingService} from 'src/services/booking-service';
import {formatToCurrency} from 'src/helpers/string-helper';
import {useTranslation} from 'react-i18next/';
import {showError} from 'src/helpers/toast';
import {globalState} from 'src/app/global-state';

/**
 * File: ChooseSeatScreen.tsx
 * @created 2021-04-09 20:25:43
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ChooseSeatScreenProps>>}
 */

const ChooseSeatScreen: FC<PropsWithChildren<ChooseSeatScreenProps>> = (
  props: PropsWithChildren<ChooseSeatScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  const [bookingData] = globalState.useBookingData();

  const [
    seatCost,
    selectedList,
    setSelectedList,
    listLabel,
    handleGetData,
    handlePickedSeats,
    handleClearPickedSeats,
    pickingSeats,
    isClear,
    handleClear,
    fetchData,
  ] = bookingService.useBooking();

  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    await setRefreshing(true);
    await fetchData();
    await setRefreshing(false);
  }, [fetchData]);

  const handleGlobalState = React.useCallback(async () => {
    await globalState.setBookingData({
      ...bookingData,
      position: pickingSeats,
      seatCost: seatCost,
    });
  }, [bookingData, pickingSeats, seatCost]);

  const handleGotoSelectComboScreen = React.useCallback(async () => {
    if (pickingSeats.length === 0) {
      showError('Hãy chọn vị trí ngồi');
      return;
    }
    await handleGlobalState();
    navigation.navigate(SelectComboScreen.displayName);
  }, [handleGlobalState, navigation, pickingSeats.length]);

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [handleTimestamp] = UseTimestamp();

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left={
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <SvgIcon component={require('assets/icons/backIconRound.svg')} />
        </Pressable>
      }
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.containerView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.title}>
          <Text
            style={[
              atomicStyles.h1,
              atomicStyles.bold,
              atomicStyles.textBlue,
              styles.textStyle,
            ]}>
            {bookingData.movieName}
          </Text>
          <Text style={[atomicStyles.h4, atomicStyles.bold, styles.textStyle]}>
            {bookingData.cinemaName}
          </Text>
          <Text style={[atomicStyles.h5, styles.textStyle]}>
            {handleTimestamp(bookingData.date.seconds)}, {bookingData.time}
          </Text>
        </View>
        <View style={styles.screen}>
          <SvgIcon component={require('assets/icons/SmallScreen.svg')} />
        </View>

        <View style={styles.seatsArea}>
          <SmallTheater
            selectedList={selectedList}
            handleSelectPickedSeats={handlePickedSeats}
            handleClear={handleClear}
          />
        </View>

        <View style={styles.noteArea}>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/BlankDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>
              {translate('bookingScreen.seatChoose.seatNotPicked')}
            </Text>
          </View>
          <View style={[styles.note, styles.marginlr25px]}>
            <SvgIcon
              component={require('assets/icons/SeatNote/SelectedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>
              {translate('bookingScreen.seatChoose.seatPicking')}
            </Text>
          </View>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/OccupiedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>
              {translate('bookingScreen.seatChoose.seatPicked')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.summaryArea}>
        <Text
          style={[
            atomicStyles.h2,
            atomicStyles.bold,
            atomicStyles.textBlue,
            styles.textStyle,
            styles.summaryTitle,
          ]}>
          {translate('bookingScreen.seatChoose.chooseSeat')}
        </Text>
        {!!listLabel && (
          <View style={styles.seatSummary}>
            <Text style={[atomicStyles.h4, styles.seatSummaryTitle]}>
              {translate('bookingScreen.seatChoose.seatsPicked')}
            </Text>

            <View style={styles.totalSeatArea}>
              <View style={styles.seatPickingView}>
                <Text
                  style={[
                    atomicStyles.h5,
                    atomicStyles.bold,
                    styles.seatPickingText,
                  ]}>
                  {listLabel}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.clearSeatsButton}
                onPress={handleClearPickedSeats}>
                <SvgIcon component={require('assets/icons/Clear.svg')} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.summaryTotal}>
          <View style={styles.costSummary}>
            <Text style={[atomicStyles.h5]}>
              {translate('bookingScreen.seatChoose.summary')}
            </Text>
            <Text style={[atomicStyles.h1, atomicStyles.bold, styles.cost]}>
              {formatToCurrency(seatCost)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={handleGotoSelectComboScreen}>
            <Text
              style={[atomicStyles.h5, atomicStyles.bold, styles.buttonText]}>
              {translate('bookingScreen.seatChoose.seatBookingConfirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
};

export interface ChooseSeatScreenProps extends StackScreenProps<any> {
  //
}

ChooseSeatScreen.defaultProps = {
  //
};

ChooseSeatScreen.propTypes = {
  //
};

ChooseSeatScreen.displayName = nameof(ChooseSeatScreen);

export default ChooseSeatScreen;
