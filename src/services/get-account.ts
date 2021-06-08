import React from 'react';
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
    string,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    (value: string) => Promise<void>,
    Date,
    (value: Date) => Promise<void>,
    boolean,
  ] {
    const [userData, setUserData] = React.useState<AppUser>({});

    const [province, setProvince] = React.useState<string>('Hà Nội');
    const [email, setEmail] = React.useState<string>('');
    const [gender, setGender] = React.useState<string>('');
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [fullname, setFullname] = React.useState<string>('');
    const [profileImg, setProfileImg] = React.useState<string>('');
    const [dateOfBirth, setDateOfBirth] = React.useState<Date>(new Date());

    const [loading, setLoading] = React.useState<boolean>(true);

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
            setProfileImg(userData.userImg);
            try {
              setDateOfBirth(userData.dateOfBirth.toDate());
            } catch (e) {}
          },
          (e) => {
            Toast.show(e.toString());
          },
        );

      return function cleanup() {
        subscriber();
        setLoading(false);
      };
    }, [
      userData.dateOfBirth,
      userData.email,
      userData.fullname,
      userData.gender,
      userData.phoneNumber,
      userData.province,
      userData.userImg,
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

    const handleChangeProfileImg = React.useCallback(async (img: string) => {
      await setProfileImg(img);
    }, []);

    const handleChangeDateOfBirth = React.useCallback(async (date: Date) => {
      await setDateOfBirth(date);
    }, []);

    return [
      email,
      fullname,
      phoneNumber,
      province,
      gender,
      profileImg,
      handleChangeFullname,
      handleChangeEmail,
      handleChangePhoneNumber,
      handleChangeProvince,
      handleChangeGender,
      handleChangeProfileImg,
      dateOfBirth,
      handleChangeDateOfBirth,
      loading,
    ];
  },
};
