import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MyTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {RefreshControl, SafeAreaView, ScrollView, Text} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import TicketItemView from 'src/screens/MyTicketScreen/components/TicketItemView/TicketItemView';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';
import {getMovieBooking} from 'src/services/get-movie-booking';
import moment from 'moment';
import {SeatPosition} from 'src/models/SeatPosition';
import firestore from '@react-native-firebase/firestore';
import {useTranslation} from 'react-i18next/';

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

  const [translate] = useTranslation();

  const [
    movieBookings,
    loading,
    handleRefresh,
  ] = getMovieBooking.getBookingInfo();

  const changeSeat = React.useCallback((column: number, row: number) => {
    switch (row) {
      case 1:
        return 'A' + column;

      case 2:
        return 'B' + column;

      case 3:
        return 'C' + column;

      case 4:
        return 'D' + column;

      case 5:
        return 'E' + column;

      case 6:
        return 'F' + column;

      case 7:
        return 'G' + column;

      case 8:
        return 'H' + column;

      case 9:
        return 'I' + column;
    }
  }, []);

  const [imageLink, setImageLink] = React.useState<string>(
    'https://www.google.com/url?sa=i&url=http%3A%2F%2Fguicaniemtin.vn%2FDefault.aspx%3FPage%3Dket-noi-chuyen-mon-list%26cid%3D36&psig=AOvVaw27Ea1H7cMf6RlTRSXS6sdT&ust=1623263472710000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCfqujViPECFQAAAAAdAAAAABAD',
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
          {translate('myTicket.header')}
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        <SafeAreaView style={styles.screenContainer}>
          {movieBookings.map((item: any, index: number) => {
            const timeDate = `${item._data.time} ${moment(
              item._data.date.toDate(),
            ).format('DD/MM')}`;

            firestore()
              .collection('movie')
              .where('Name', '==', item._data.movieName)
              .get()
              .then((documentData) => {
                setImageLink(documentData.docs[0].data().Poster);
              });

            return (
              <TicketItemView
                key={index}
                film={item._data.movieName}
                theater={item._data.cinemaName}
                time={timeDate}
                seat={item._data.position.map(
                  (pos: SeatPosition, index: number) => {
                    return index === item._data.position.length - 1
                      ? changeSeat(pos.column, pos.row)
                      : changeSeat(pos.column, pos.row) + ', ';
                  },
                )}
                image={{uri: imageLink}}
                onPress={() => {
                  navigation.navigate(nameof(DetailTicketScreen), {
                    data: item._data,
                  });
                }}
              />
            );
          })}
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
