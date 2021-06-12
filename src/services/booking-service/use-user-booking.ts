import {MovieBooking} from 'src/models/MovieBooking';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function useUserBooking(): [MovieBooking[], boolean, () => void] {
  const navigation = useNavigation();
  const [movieBookings, setMovieBookings] = React.useState<MovieBooking[]>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchData = React.useCallback(async () => {
    const data = await firestore()
      .collection('bookings')
      .where('userId', '==', auth().currentUser.uid)
      .orderBy('date', 'desc')
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.docs.map((item) => item.data());
      });

    setMovieBookings(data);

    setLoading(false);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchData();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [fetchData, navigation]);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
    setLoading(false);
  }, [fetchData]);

  return [movieBookings, loading, onRefresh];
}
