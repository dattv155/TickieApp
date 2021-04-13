import React from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const GetAccount = {
  getAccountInfo(): [string, string, string, string] {
    const [email, setEmail] = React.useState<string>('');
    const [fullname, setFullname] = React.useState<string>('');
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [province, setProvince] = React.useState<string>('');

    React.useEffect(() => {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            // console.log(documentSnapshot.data());
            setEmail(documentSnapshot.data().email);
            setFullname(documentSnapshot.data().fullname);
            setPhoneNumber(documentSnapshot.data().phoneNumber);
            setProvince(documentSnapshot.data().province);
          }
        });
    }, []);

    return [email, fullname, phoneNumber, province];
  },
};
