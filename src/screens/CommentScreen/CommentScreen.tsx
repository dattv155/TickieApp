import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './CommentScreen.scss';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';

import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {StackScreenProps} from '@react-navigation/stack';
import MovieInfoScreen from '../MovieInfoScreen/MovieInfoScreen';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';

/**
 * File: CommentScreen.tsx
 * @created 2021-05-11 23:47:47
 * @type {FC<PropsWithChildren<CommentScreenProps>>}
 */
const CommentScreen: FC<PropsWithChildren<CommentScreenProps>> = (
  props: PropsWithChildren<CommentScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  const {movieInfo} = route?.params;
  const yellowstar = require('assets/icons/star.svg');
  const graystar = require('assets/icons/stargray.svg');
  const [svg, setSvg] = React.useState([
    yellowstar,
    graystar,
    graystar,
    graystar,
    graystar,
  ]);
  const [comment, setComment] = React.useState<string>('');
  const [curStar, setCurStar] = React.useState<number>(1);

  const handleGoBack = React.useCallback(() => {
    navigation.navigate(MovieInfoScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);

  React.useEffect(() => {
    if (curStar === 2) {
      setSvg([yellowstar, yellowstar, graystar, graystar, graystar]);
    } else if (curStar === 3) {
      setSvg([yellowstar, yellowstar, yellowstar, graystar, graystar]);
    } else if (curStar === 4) {
      setSvg([yellowstar, yellowstar, yellowstar, yellowstar, graystar]);
    } else if (curStar === 5) {
      setSvg([yellowstar, yellowstar, yellowstar, yellowstar, yellowstar]);
    } else {
      setSvg([yellowstar, graystar, graystar, graystar, graystar]);
    }
  }, [curStar, yellowstar, graystar]);

  //send your comment and rating about film
  const sendComment = async () => {
    let user: Obj = await (
      await firestore()
        .collection('users')
        .where('uid', '==', auth().currentUser.uid)
        .get()
    ).docs[0];
    const data = {
      avatar: user.data().userImg,
      movieId: `Movie-${movieInfo.movieID}`,
      name: user.data().fullname,
      rate: curStar,
      text: comment,
      time: new Date(Date.now()),
      userId: auth().currentUser.uid,
    };
    await firestore().collection('comment').add(data);
  };

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
              atomicStyles.mt16px,
              {
                fontWeight: '100',
              },
            ]}>
            Đánh giá của bạn
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.header}>
            <View style={[atomicStyles.flexRow]}>
              <Image
                source={{uri: movieInfo.Poster}}
                resizeMode="cover"
                style={styles.imageheaderinfo}
              />
              <View style={styles.headerinfo}>
                <Text
                  style={[
                    atomicStyles.h3,
                    atomicStyles.bold,
                    atomicStyles.textDark,
                    {fontWeight: '100'},
                  ]}>
                  {movieInfo.Name}
                </Text>
                <Text style={[atomicStyles.h6]}>
                  {new Date(
                    movieInfo.Release.seconds * 1000 + 43200000,
                  ).getFullYear()}
                </Text>
                <Text style={[atomicStyles.h7, atomicStyles.textDark]}>
                  {movieInfo.Type}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ratemovie}>
            <Text style={[atomicStyles.h4]}>Xếp hạng phim</Text>
            <View style={styles.pressstar}>
              <TouchableOpacity
                style={styles.star}
                onPress={() => setCurStar(1)}>
                <SvgIcon component={svg[0]} scaleY={1.4} scaleX={1.4} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.star}
                onPress={() => setCurStar(2)}>
                <SvgIcon component={svg[1]} scaleY={1.4} scaleX={1.4} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.star}
                onPress={() => setCurStar(3)}>
                <SvgIcon component={svg[2]} scaleY={1.4} scaleX={1.4} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.star}
                onPress={() => setCurStar(4)}>
                <SvgIcon component={svg[3]} scaleY={1.4} scaleX={1.4} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.star}
                onPress={() => setCurStar(5)}>
                <SvgIcon component={svg[4]} scaleY={1.4} scaleX={1.4} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, atomicStyles.h6]}
              placeholder="Để lại đánh giá của bạn tại đây..."
              multiline={true}
              textAlignVertical={'top'}
              onChangeText={setComment}
              value={comment}
            />
            <TouchableOpacity
              style={[styles.buttondanhgia]}
              onPress={() => {
                sendComment();
                handleGoBack();
              }}>
              <View>
                <Text style={[atomicStyles.h5, atomicStyles.textWhite]}>
                  Gửi đánh giá
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </DefaultLayout>
    </>
  );
};

export interface CommentScreenProps extends StackScreenProps<any> {
  //
  auth?: any;
}
export interface Obj {
  id?: String;
  data?: Function;
}
CommentScreen.defaultProps = {
  //
};

CommentScreen.propTypes = {
  //
};

CommentScreen.displayName = nameof(CommentScreen);

export default CommentScreen;
