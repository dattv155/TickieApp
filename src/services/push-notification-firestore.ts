import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

export const pushNotificationFirestoreBookingSuccessful = (movie: string) => {
  firestore()
    .collection('notification')
    .doc('specific')
    .collection('1')
    .add({
      content: 'Bạn đã đặt thành công vé xem phim ' + movie,
      day: new Date(),
      span: 'Thông tin chi tiết xem tại lịch sử mua vé',
      type: 'bookingsuccess',
      userId: auth().currentUser.uid,
    })
    .catch((e) => {
      Toast.show(e.toString());
    });
};
