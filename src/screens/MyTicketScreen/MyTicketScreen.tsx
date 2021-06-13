import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MyTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import TicketItemView from 'src/screens/MyTicketScreen/components/TicketItemView/TicketItemView';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';
import moment from 'moment';
import {useTranslation} from 'react-i18next/';
import {MovieBooking} from 'src/models/MovieBooking';
import {convertListSeatsLabel} from 'src/helpers/string-helper';
import {bookingService} from 'src/services/booking-service';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import firestore from '@react-native-firebase/firestore';

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

  const [ticketDelete, setTicketDelete] = React.useState<MovieBooking>(null);

  const handleGotoDetailTicketScreen = React.useCallback(
    (booking: MovieBooking) => {
      navigation.navigate(nameof(DetailTicketScreen), {
        movieTicket: booking,
      });
    },
    [navigation],
  );

  const handleDeleteTicket = React.useCallback(
    async (booking: MovieBooking) => {
      const bookingDelete = await firestore()
        .collection('bookings')
        .where('bookingId', '==', booking.bookingId)
        .get();

      const batch = firestore().batch();

      bookingDelete.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    },
    [],
  );

  const confirmRef = React.useRef(null);

  const snapPoint: (string | number)[] = [250, 0];

  const fall = React.useRef(new Animated.Value<number>(1)).current;

  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const renderConfirm = React.useCallback(
    () => (
      <SafeAreaView style={styles.bottomBoxContainer}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.swipeDown} />
          <Text style={[atomicStyles.text, atomicStyles.h3, atomicStyles.bold]}>
            {translate('ticket.confirmDelete')}
          </Text>
          <Text style={[atomicStyles.h5]}>
            {translate('ticket.makeSureDelete')}
          </Text>
        </View>
        <ButtonMain
          label={translate('ticket.yesDelete')}
          onPress={async () => {
            await handleDeleteTicket(ticketDelete);
            handleRefresh();
            confirmRef.current.snapTo(1);
          }}
        />
        <Pressable
          style={styles.buttonConfirm}
          onPress={() => {
            confirmRef.current.snapTo(1);
          }}>
          <Text
            style={[
              atomicStyles.h5,
              atomicStyles.bold,
              atomicStyles.textError,
            ]}>
            {translate('ticket.cancelDelete')}
          </Text>
        </Pressable>
      </SafeAreaView>
    ),
    [handleDeleteTicket, handleRefresh, ticketDelete, translate],
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
          onDelete={() => {
            setTicketDelete(item);
            confirmRef.current.snapTo(0);
          }}
        />
      );
    },
    [handleGotoDetailTicketScreen],
  );

  return (
    <>
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

      <BottomSheet
        ref={confirmRef}
        snapPoints={snapPoint}
        initialSnap={1}
        renderHeader={renderConfirm}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: Colors.Black,
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    </>
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
