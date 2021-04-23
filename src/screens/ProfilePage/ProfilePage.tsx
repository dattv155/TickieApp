import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import styles from './ProfilePage.scss';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
// import {useTranslation} from 'react-i18next';
import {atomicStyles} from 'src/styles';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';
import AccountInfoScreen from 'src/screens/AccountInfoScreen/AccountInfoScreen';
import MyTicketScreen from 'src/screens/MyTicketScreen/MyTicketScreen';
import GeneralSettingScreen from 'src/screens/GeneralSettingScreen/GeneralSettingScreen';
import UpdateAppScreen from 'src/screens/UpdateAppScreen/UpdateAppScreen';
import HelperScreen from 'src/screens/HelperScreen/HelperScreen';
import InformationScreen from 'src/screens/InformationScreen/InformationScreen';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ButtonMain from 'src/components/atoms/ButtonMain/ButtonMain';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {logoutUser} from 'src/services/firebase-service';
import Toast from 'react-native-simple-toast';

/**
 * File: ProfilePage.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ProfilePageProps>>}
 */
const ProfilePage: FC<PropsWithChildren<ProfilePageProps>> = (
  props: PropsWithChildren<ProfilePageProps>,
): ReactElement => {
  const {navigation, route} = props;

  // const [translate] = useTranslation();

  const handleGoToAccountInfoScreen = React.useCallback(() => {
    navigation.navigate(AccountInfoScreen.displayName);
  }, [navigation]);

  const handleGoToMyTicketScreen = React.useCallback(() => {
    navigation.navigate(MyTicketScreen.displayName);
  }, [navigation]);

  const handleGoToGeneralSettingScreen = React.useCallback(() => {
    navigation.navigate(GeneralSettingScreen.displayName);
  }, [navigation]);

  const handleGoToUpdateAppScreen = React.useCallback(() => {
    navigation.navigate(UpdateAppScreen.displayName);
  }, [navigation]);

  const handleGoToHelperScreen = React.useCallback(() => {
    navigation.navigate(HelperScreen.displayName);
  }, [navigation]);

  const handleGoToInformationScreen = React.useCallback(() => {
    navigation.navigate(InformationScreen.displayName);
  }, [navigation]);

  const sheetRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const fall = new Animated.Value<number>(1);

  const [image, setImage] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 1,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      sheetRef.current.snapTo(1);
      confirmRef.current.snapTo(0);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 1,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      sheetRef.current.snapTo(1);
      confirmRef.current.snapTo(0);
    });
  };

  const renderContent = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <Text style={[atomicStyles.h3, atomicStyles.bold, styles.textStyle]}>
          Tải ảnh lên
        </Text>
        <Text style={[atomicStyles.h5, styles.textStyle]}>
          Chọn ảnh Profile
        </Text>
      </View>
      <ButtonMain label="Chọn từ Thư viện" onPress={choosePhotoFromLibrary} />
      <ButtonMain label="Chụp Ảnh" onPress={takePhotoFromCamera} />
    </SafeAreaView>
  );

  const renderConfirm = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.swipeDown} />
        <Text style={[atomicStyles.h3, atomicStyles.bold, styles.textStyle]}>
          Xác nhận
        </Text>
        <Text style={[atomicStyles.h5, styles.textStyle]}>Thay đổi Avatar</Text>
      </View>
      <ButtonMain
        label="Đồng ý"
        onPress={() => {
          uploadImage();
          confirmRef.current.snapTo(1);
        }}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => {
          confirmRef.current.snapTo(1);
        }}>
        <Text
          style={[
            atomicStyles.h5,
            atomicStyles.bold,
            styles.textStyle,
            atomicStyles.textError,
          ]}>
          Hủy bỏ
        </Text>
      </Pressable>
    </SafeAreaView>
  );

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}.`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(url);
      setAvatar(url);
      return url;
    } catch (e) {
      Toast.show(e.toString());
      return null;
    }
  };

  return (
    <>
      <BottomSheet
        ref={confirmRef}
        snapPoints={[250, 0, 0]}
        initialSnap={1}
        renderHeader={renderConfirm}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 0, 0]}
        initialSnap={1}
        renderHeader={renderContent}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />

      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <Pressable onPress={() => sheetRef.current.snapTo(1)}>
          <SafeAreaView style={[styles.container, styles.screenContainer]}>
            <View style={styles.infoSection}>
              <Pressable
                onPress={() => sheetRef.current.snapTo(0)}
                style={styles.avatarFrame}>
                <Image
                  source={{
                    uri: avatar,
                  }}
                  style={styles.avatarImage}
                />
              </Pressable>
              <View style={styles.profile}>
                <Text
                  style={[
                    atomicStyles.h4,
                    atomicStyles.bold,
                    atomicStyles.textDark,
                    {
                      fontSize: 22,
                      fontWeight: '100',
                    },
                  ]}>
                  Vu Trong Dat
                </Text>
                <Text
                  style={[
                    atomicStyles.h6,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    {
                      fontSize: 16,
                      fontWeight: '100',
                      marginTop: 5,
                    },
                  ]}>
                  Member
                </Text>
              </View>
            </View>
            <View style={styles.optionSection}>
              <View style={styles.viewContainer}>
                <LineBlock
                  label="Thông tin tài khoản"
                  onPress={handleGoToAccountInfoScreen}
                  icon={require('assets/icons/Profile/PersonW.svg')}
                  hasDash={true}
                />
                <LineBlock
                  label="Vé của tôi"
                  onPress={handleGoToMyTicketScreen}
                  icon={require('assets/icons/Profile/TicketW.svg')}
                />
              </View>
              <View style={styles.viewContainer}>
                <LineBlock
                  label="Cài đặt chung"
                  onPress={handleGoToGeneralSettingScreen}
                  icon={require('assets/icons/Profile/SettingW.svg')}
                  hasDash={true}
                />
                <LineBlock
                  label="Cập nhật"
                  onPress={handleGoToUpdateAppScreen}
                  icon={require('assets/icons/Profile/UpdateW.svg')}
                />
              </View>
              <View style={styles.viewContainer}>
                <LineBlock
                  label="Trợ giúp và phản hồi"
                  onPress={handleGoToHelperScreen}
                  icon={require('assets/icons/Profile/HelpW.svg')}
                  hasDash={true}
                />
                <LineBlock
                  label="Thông tin"
                  onPress={handleGoToInformationScreen}
                  icon={require('assets/icons/Profile/InfoW.svg')}
                />
              </View>

              <ButtonMain
                style={styles.logoutButton}
                label={'Đăng xuất'}
                onPress={logoutUser}
              />
            </View>
          </SafeAreaView>
          <MainTabBar navigation={navigation} route={route} />
        </Pressable>
      </Animated.View>
    </>
  );
};

export interface ProfilePageProps extends StackScreenProps<any> {
  //
}

ProfilePage.defaultProps = {
  //
};

ProfilePage.propTypes = {
  //
};

ProfilePage.displayName = nameof(ProfilePage);

export default ProfilePage;
