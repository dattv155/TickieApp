import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChooseSeatScreen.scss';
import {
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
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

/**
 * File: ChooseSeatScreen.tsx
 * @created 2021-04-09 20:25:43
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ChooseSeatScreenProps>>}
 */
export interface Position {
  row: number;
  column: number;
}
export interface BookingData {
  movieName: string;
  date: FirebaseFirestoreTypes.Timestamp;
  time: string;
  cinemaName: string;
  filmID: number;
  filmType: string;
  position: Position[];
}

const ChooseSeatScreen: FC<PropsWithChildren<ChooseSeatScreenProps>> = (
  props: PropsWithChildren<ChooseSeatScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {
    movieName,
    movieType,
    movieFormat,
    cinemaName,
    movieDate,
    showTime,
  } = route?.params;

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
  ] = bookingService.useBooking(
    movieName,
    movieDate,
    movieFormat,
    cinemaName,
    showTime,
    navigation,
  );

  const handleGotoSelectComboScreen = React.useCallback(() => {
    navigation.navigate(SelectComboScreen.displayName, {
      movieName,
      movieType,
      movieFormat,
      cinemaName,
      movieDate,
      showTime,
      pickingSeats,
      listLabel,
      seatCost,
    });
  }, [
    cinemaName,
    listLabel,
    movieDate,
    movieFormat,
    movieName,
    movieType,
    navigation,
    pickingSeats,
    seatCost,
    showTime,
  ]);

  const [handleTimestamp] = UseTimestamp();

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.containerView}>
        <View style={styles.title}>
          <Text style={[atomicStyles.h1, atomicStyles.bold]}>{movieName}</Text>
          <Text style={[atomicStyles.h4, atomicStyles.bold]}>{cinemaName}</Text>
          <Text style={[atomicStyles.h5, styles.textTime]}>
            {handleTimestamp(movieDate.seconds)}, {showTime}
          </Text>
        </View>
        <View style={styles.screen}>
          <SvgIcon component={require('assets/icons/SmallScreen.svg')} />
        </View>

        <View style={styles.seatsArea}>
          <SmallTheater
            selectedList={selectedList}
            handleShowPickedSeats={handlePickedSeats}
            handleClear={handleClear}
          />
        </View>

        <View style={styles.noteArea}>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/BlankDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>Ghế trống</Text>
          </View>
          <View style={[styles.note, styles.marginlr25px]}>
            <SvgIcon
              component={require('assets/icons/SeatNote/SelectedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>
              Ghế đang chọn
            </Text>
          </View>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/OccupiedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>Ghế đã chọn</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.summaryArea}>
        <Text style={[atomicStyles.h1, atomicStyles.bold, styles.summaryTitle]}>
          Chọn ghế ngồi
        </Text>
        {!!listLabel && (
          <View style={styles.seatSummary}>
            <Text style={[atomicStyles.h4, styles.seatSummaryTitle]}>
              Ghế đang chọn
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
            <Text style={[atomicStyles.h5, styles.costTitle]}>Tạm tính</Text>
            <Text style={[atomicStyles.h1, atomicStyles.bold, styles.cost]}>
              {formatToCurrency(seatCost)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={handleGotoSelectComboScreen}>
            <Text
              style={[atomicStyles.h5, atomicStyles.bold, styles.buttonText]}>
              Đặt chỗ
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
