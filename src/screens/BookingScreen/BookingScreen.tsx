import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './BookingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import type {ListRenderItem, ListRenderItemInfo} from 'react-native';
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Animated,
  RefreshControl,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import CalendarStrip from 'react-native-calendar-strip';
import moment, {Moment} from 'moment';
import {atomicStyles} from 'src/styles';
import ChooseSeatScreen from 'src/screens/ChooseSeatScreen/ChooseSeatScreen';
import ButtonSelectFilmType from 'src/screens/BookingScreen/component/ButtonSelectFilmType/ButtonSelectFilmType';
import CinemaShowtimeComponent from 'src/screens/BookingScreen/component/CinemaShowtimeComponent/CinemaShowtimeComponent';
import {showError} from 'src/helpers/toast';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {useTranslation} from 'react-i18next/';
import {globalState} from 'src/app/global-state';
import auth from '@react-native-firebase/auth';

/**
 * File: BookingScreen.tsx
 * @created 2021-04-04 17:08:54
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<BookingScreenProps>>}
 */
export interface CinemaSchedule {
  cinemaName: string;
  showTime: string[];
}

export interface Schedule {
  id: number;
  byType: string;
  cinema: CinemaSchedule[];
}

export interface Movie {
  Day: FirebaseFirestoreTypes.Timestamp;
  Schedule: Schedule[];
}

const BookingScreen: FC<PropsWithChildren<BookingScreenProps>> = (
  props: PropsWithChildren<BookingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  const {movieInfo} = route?.params;

  const fadeAnimation = React.useRef(new Animated.Value(1)).current;

  const [data, setData] = React.useState<Movie>(null);

  const [schedule, setSchedule] = React.useState<Schedule>(null);

  const [selectedTypeID, setSelectedTypeID] = React.useState<number>(0);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState<Moment>(null);

  const fadeIn = React.useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  const convertTimestamp = React.useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);

    return date.getFullYear() + '-' + month + '-' + day;
  }, []);

  const getInfoByDay = React.useCallback(
    (day) => {
      const dataTemp = movieInfo.Schedules.find(
        (item: any) =>
          convertTimestamp(item.Day.seconds) ===
          day.toISOString(true).split('T')[0],
      );

      dataTemp
        ? (setData(dataTemp), setSchedule(dataTemp.Schedule[0]))
        : setData(null);
    },
    [convertTimestamp, movieInfo.Schedules],
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (selectedDate) {
        getInfoByDay(selectedDate);
      } else {
        getInfoByDay(moment());
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [getInfoByDay, navigation, selectedDate]);

  const [
    currentSelectedCinema,
    setCurrentSelectedCinema,
  ] = React.useState<string>('');

  const [
    currentSelectedShowtime,
    setCurrentSelectedShowtime,
  ] = React.useState<string>('');

  const handleChooseCinema = React.useCallback(
    (cinema: string, showTime: string) => {
      setCurrentSelectedCinema(cinema);
      setCurrentSelectedShowtime(showTime);
    },
    [],
  );

  const getInfoByType = React.useCallback(
    (typeID) => {
      if (data) {
        const dataByType = data?.Schedule.find((item) => item.id === typeID);
        dataByType ? (setSchedule(dataByType), fadeIn()) : setSchedule(null);
      }
    },
    [data, fadeIn],
  );

  const handleSelection = React.useCallback(
    (id) => {
      selectedTypeID !== id && setSelectedTypeID(id);
    },
    [selectedTypeID],
  );

  const [currentFormat, setCurrentFormat] = React.useState<string>('');

  const renderFormat: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      let select = false;

      if (selectedTypeID === index) {
        select = true;
        setCurrentFormat(item);
      }
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleSelection(index);
            getInfoByType(index);
          }}
          style={styles.press}>
          <ButtonSelectFilmType item={item} selected={select} />
        </TouchableOpacity>
      );
    },
    [getInfoByType, handleSelection, selectedTypeID],
  );

  const renderSchedules: ListRenderItem<CinemaSchedule> = React.useCallback(
    ({item, index}: ListRenderItemInfo<CinemaSchedule>) => {
      return (
        <CinemaShowtimeComponent
          key={index}
          data={item}
          handleChooseCinema={handleChooseCinema}
          currentCinema={currentSelectedCinema}
          currentShowTime={currentSelectedShowtime}
        />
      );
    },
    [currentSelectedCinema, currentSelectedShowtime, handleChooseCinema],
  );

  const [bookingData] = globalState.useBookingData();

  const handleGlobalState = React.useCallback(async () => {
    if (data) {
      await globalState.setBookingData({
        ...bookingData,
        userId: auth().currentUser.uid,
        date: data?.Day,
        cinemaFormat: currentFormat,
        cinemaName: currentSelectedCinema,
        time: currentSelectedShowtime,
      });
    }
  }, [
    bookingData,
    currentFormat,
    currentSelectedCinema,
    currentSelectedShowtime,
    data,
  ]);

  const handleGotoChooseSeatScreen = React.useCallback(async () => {
    if (currentSelectedShowtime === '' || currentSelectedCinema === '') {
      showError('H??y ch???n l???ch chi???u');
      return;
    }
    if (data) {
      await handleGlobalState();
      navigation.navigate(ChooseSeatScreen.displayName);
    }
  }, [
    currentSelectedCinema,
    currentSelectedShowtime,
    data,
    handleGlobalState,
    navigation,
  ]);

  const onRefresh = React.useCallback(async () => {
    await setRefreshing(true);
    await getInfoByDay(selectedDate);
    await setRefreshing(false);
  }, [getInfoByDay, selectedDate]);

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.containerView}>
        <View style={styles.calendarContainer}>
          <CalendarStrip
            startingDate={moment()}
            selectedDate={moment()}
            minDate={moment()}
            maxDate={moment().add(13, 'days')}
            calendarAnimation={{type: 'parallel', duration: 10}}
            style={styles.calendar}
            calendarHeaderStyle={{color: 'blue'}}
            calendarColor={'white'}
            scrollable={true}
            dateNameStyle={{color: 'grey', fontSize: 16, fontWeight: '700'}}
            highlightDateNameStyle={{
              color: 'blue',
              fontSize: 16,
              fontWeight: '700',
            }}
            dateNumberStyle={{color: 'grey', fontSize: 20, fontWeight: '700'}}
            highlightDateNumberStyle={{
              color: 'blue',
              fontSize: 20,
              fontWeight: '700',
            }}
            // iconLeft={require('./img/left-arrow.png')}
            // iconRight={require('./img/right-arrow.png')}
            showMonth={false}
            iconContainer={{flex: 0.1}}
            onDateSelected={(date) => {
              getInfoByDay(date);
              setSelectedDate(date);
            }}
          />
        </View>
        <Animated.View style={[styles.content, {opacity: fadeAnimation}]}>
          <View style={styles.scheduleArea}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}>
              {data ? (
                <>
                  <View>
                    <Text
                      style={[
                        atomicStyles.h2,
                        atomicStyles.bold,
                        atomicStyles.textBlue,
                        styles.textStyle,
                      ]}>
                      {translate('bookingScreen.timeNCine.movieFormat')}
                    </Text>
                    <View>
                      <FlatList
                        data={data.Schedule?.map((item) => item.byType)}
                        renderItem={renderFormat}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index.toString()}
                        contentContainerStyle={styles.listType}
                        numColumns={3}
                      />
                    </View>
                  </View>
                  <View>
                    <FlatList
                      data={schedule?.cinema}
                      renderItem={renderSchedules}
                      keyExtractor={(item) => item.cinemaName}
                    />
                  </View>
                </>
              ) : (
                <View
                  style={[
                    atomicStyles.alignItemsCenter,
                    atomicStyles.justifyContentCenter,
                  ]}>
                  <Text
                    style={[
                      atomicStyles.h3,
                      atomicStyles.textBlue,
                      styles.textStyle,
                    ]}>
                    {translate('bookingScreen.timeNCine.noData')}
                  </Text>
                </View>
              )}
            </ScrollView>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={handleGotoChooseSeatScreen}>
                <Text
                  style={[atomicStyles.h4, atomicStyles.bold, styles.textNext]}>
                  {translate('bookingScreen.timeNCine.continue')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </DefaultLayout>
  );
};

export interface BookingScreenProps extends StackScreenProps<any> {
  //
}

BookingScreen.defaultProps = {
  //
};

BookingScreen.propTypes = {
  //
};

BookingScreen.displayName = nameof(BookingScreen);

export default BookingScreen;
