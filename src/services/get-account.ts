import React from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AppUser} from 'src/models/AppUser';
import Toast from 'react-native-simple-toast';

export const getAccount = {
  getAccountInfo(): [
    string,
    string,
    string,
    string,
    string,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
  ] {
    const [userData, setUserData] = React.useState<AppUser>({});

    const [province, setProvince] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [gender, setGender] = React.useState<string>('');
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [fullname, setFullname] = React.useState<string>('');

    React.useEffect(() => {
      const subscriber = firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .onSnapshot(
          (documentSnapshot) => {
            setUserData(documentSnapshot.data());
            setFullname(userData.fullname);
            setPhoneNumber(userData.phoneNumber);
            setEmail(userData.email);
            setGender(userData.gender);
            setProvince(userData.province);
          },
          (e) => {
            Toast.show(e);
          },
        );
      return () => subscriber();
    }, [
      userData.email,
      userData.fullname,
      userData.gender,
      userData.phoneNumber,
      userData.province,
    ]);

    const handleChangeFullname = React.useCallback(async (name: string) => {
      await setFullname(name);
    }, []);

    const handleChangePhoneNumber = React.useCallback(
      async (number: string) => {
        await setPhoneNumber(number);
      },
      [],
    );

    const handleChangeEmail = React.useCallback(async (email: string) => {
      await setEmail(email);
    }, []);

    const handleChangeGender = React.useCallback(async (gender: string) => {
      await setGender(gender);
    }, []);

    const handleChangeProvince = React.useCallback(async (province: string) => {
      await setProvince(province);
    }, []);

    return [
      email,
      fullname,
      phoneNumber,
      province,
      gender,
      handleChangeFullname,
      handleChangeEmail,
      handleChangePhoneNumber,
      handleChangeProvince,
      handleChangeGender,
    ];
  },
};