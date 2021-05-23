import React from 'react';
import {MovieBooking} from 'src/models/MovieBooking';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

export const getMovieBooking = {
  getBookingInfo(): [MovieBooking[], boolean, () => void] {
    const [movieBookings, setMovieBookings] = React.useState<Array<any>>([]);

    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchData = React.useCallback(() => {
      firestore()
        .collection('bookings')
        .where('userId', '==', auth().currentUser.uid)
        .orderBy('date', 'desc')
        .onSnapshot(
          (documentSnapshot) => {
            setMovieBookings(documentSnapshot.docs);
          },
          (e) => {
            Toast.show(e.toString());
          },
        );

      setLoading(false);
    }, []);

    React.useEffect(() => {
      fetchData();
    }, [fetchData]);

    const onRefresh = React.useCallback(() => {
      fetchData();
      setLoading(false);
    }, [fetchData]);

    return [movieBookings, loading, onRefresh];
  },

  changeSeat(column: number, row: number): [string] {
    const [seat, setSeat] = React.useState<string>('');
    switch (row) {
      case 1:
        setSeat('A' + column);
        break;
      case 2:
        setSeat('B' + column);
        break;
      case 3:
        setSeat('C' + column);
        break;
      case 4:
        setSeat('D' + column);
        break;
      case 5:
        setSeat('E' + column);
        break;
      case 6:
        setSeat('F' + column);
        break;
      case 7:
        setSeat('G' + column);
        break;
      case 8:
        setSeat('H' + column);
        break;
      case 9:
        setSeat('I' + column);
        break;
    }
    return [seat];
  },
};
