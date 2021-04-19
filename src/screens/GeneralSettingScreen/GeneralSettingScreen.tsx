import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './GeneralSettingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';

// @ts-ignore
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
/**
 * File: GeneralSettingScreen.tsx
 * @created 2021-03-16 16:16:30
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<GeneralSettingScreenProps>>}
 */
const GeneralSettingScreen: FC<PropsWithChildren<GeneralSettingScreenProps>> = (
  props: PropsWithChildren<GeneralSettingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [text, setText] = React.useState(null);

  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);

  const handleSubmit = React.useCallback(() => {
    firestore()
      .collection('posts')
      .add({
        post: text,
        name: null,
        likes: null,
        comments: null,
      })
      .then(() => {
        console.log('Post Added!');
        setText(null);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [text]);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = React.useCallback(async () => {
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
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
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
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [image]);

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
          Cài đặt chung
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <View>
        <TextInput
          value={text}
          placeholder="Enter anything"
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={handleSubmit} title="Submit" />
        <Button
          onPress={choosePhotoFromLibrary}
          title="Choose Photo From Library"
        />
        <Button onPress={takePhotoFromCamera} title="Take Photo From Camera" />
        <Image
          source={{
            uri: image,
          }}
          style={{height: 250, width: 250}}
        />
        <Button onPress={uploadImage} title={'Submit Image'} />
        <View>
          <Text>{transferred} % Completed!</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>

        <Text>ABC</Text>
      </View>
    </DefaultLayout>
  );
};

export interface GeneralSettingScreenProps extends StackScreenProps<any> {
  //
}

GeneralSettingScreen.defaultProps = {
  //
};

GeneralSettingScreen.propTypes = {
  //
};

GeneralSettingScreen.displayName = nameof(GeneralSettingScreen);

export default GeneralSettingScreen;
