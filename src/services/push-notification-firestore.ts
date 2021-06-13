import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {nanoid} from 'nanoid';
import moment from 'moment';
import {Notification} from 'src/models/Notification';

export const pushNotificationFirestoreBookingSuccessful = (movie: string) => {
  const notiData: Notification = {
    content: 'Bạn đã đặt thành công vé xem phim ' + movie,
    day: firestore.Timestamp.fromDate(new Date()),
    span: 'Thông tin chi tiết xem tại lịch sử mua vé',
    type: 'bookingsuccess',
    userId: auth().currentUser.uid,
    notificationId: nanoid(),
  };
  firestore()
    .collection('notification')
    .doc('specific')
    .collection('1')
    .doc(moment().toISOString(true))
    .set(notiData)
    .catch((e) => {
      Toast.show(e.toString());
    });
};
