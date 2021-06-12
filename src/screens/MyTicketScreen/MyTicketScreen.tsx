import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MyTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import TicketItemView from 'src/screens/MyTicketScreen/components/TicketItemView/TicketItemView';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';
import moment from 'moment';
import {useTranslation} from 'react-i18next/';
import {MovieBooking} from 'src/models/MovieBooking';
import {convertListSeatsLabel} from 'src/helpers/string-helper';
import {bookingService} from 'src/services/booking-service';

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
  ] = bookingService.useUserBooking();

  const handleGotoDetailTicketScreen = React.useCallback(
    (booking: MovieBooking) => {
      navigation.navigate(nameof(DetailTicketScreen), {
        movieTicket: booking,
      });
    },
    [navigation],
  );

  const renderMovieTicket: ListRenderItem<MovieBooking> = React.useCallback(
    ({item, index}: ListRenderItemInfo<MovieBooking>) => {
      const timeDate = `${item.time} ${moment(item.date.toDate()).format(
        'DD/MM',
      )}`;

      return (
        <TicketItemView
          key={index}
          film={item.movieName}
          theater={item.cinemaName}
          time={timeDate}
          seat={convertListSeatsLabel(item.position)}
          image={{uri: item.poster}}
          onPress={() => handleGotoDetailTicketScreen(item)}
        />
      );
    },
    [handleGotoDetailTicketScreen],
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
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }>
          <FlatList
            data={movieBookings}
            renderItem={renderMovieTicket}
            keyExtractor={(item) => item.bookingId}
          />
        </ScrollView>
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
