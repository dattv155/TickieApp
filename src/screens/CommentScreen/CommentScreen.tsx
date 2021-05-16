import React, {FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './CommentScreen.scss';
import {Image, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {atomicStyles} from 'src/styles';

import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {StackScreenProps} from '@react-navigation/stack';
import MovieInfoScreen from '../MovieInfoScreen/MovieInfoScreen';

/**
 * File: CommentScreen.tsx
 * @created 2021-05-11 23:47:47
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<CommentScreenProps>>}
 */
const CommentScreen: FC<PropsWithChildren<CommentScreenProps>> = (
  props: PropsWithChildren<CommentScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  const {movieInfo} = route?.params;
  const user = auth().currentUser;
  const yellowstar = require('assets/icons/star.svg');
  const graystar = require('assets/icons/stargray.svg');
  const [svg, setSvg] = React.useState([
    yellowstar,
    graystar,
    graystar,
    graystar,
    graystar,
  ]);
  const [comment, setComment] = React.useState('');
  const [curStar, setCurStar] = React.useState(1);

  const handleGoBack = React.useCallback(() => {
    navigation.navigate(MovieInfoScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);
  useEffect(() => {
    let exp = [...svg];
    for (let i = 0; i < curStar; i++) {
      exp[i] = yellowstar;
    }
    for (let i = curStar; i < 5; i++) {
      exp[i] = graystar;
    }
    setSvg(exp);
  }, [curStar]);

  //send your comment and rating about film
  const sendComment = async () => {
    let user:Obj = await (await firestore().collection('users').where('uid', '==', auth().currentUser.uid).get()).docs[0];
    const data = {
      avatar: user.data().UserImg,
      movieId: `Movie-${movieInfo.movieID}`,
      name: user.data().fullname,
      rate: curStar,
      text: comment,
      time: new Date(Date.now()),
      userId: auth().currentUser.uid
    };
    console.log(data);
    await firestore().collection('comment').add(data);
    console.log(data);
  }

  return (
    <View style={styles.yourcomment}>
      <TouchableOpacity style={styles.goback} onPress={handleGoBack}>
        <SvgIcon component={require('assets/icons/backIconRound.svg')} />
      </TouchableOpacity>

      <Text style={[styles.textyourcomment, atomicStyles.bold]}>
        Đánh giá của bạn
      </Text>
      <View style={styles.header}>
        <Image
          source={{uri: movieInfo.Poster}}
          resizeMode="cover"
          style={styles.imageheaderinfo}
        />
        <View style={styles.headerinfo}>
          <Text style={[styles.headerinfo_name, atomicStyles.bold]}>
            {movieInfo.Name}
          </Text>
          <Text style={[styles.headerinfo_release, atomicStyles.regular]}>
            {new Date(
              movieInfo.Release.seconds * 1000 + 43200000,
            ).getFullYear()}
          </Text>
          <Text style={[styles.headerinfo_kind, atomicStyles.regular]}>
            {movieInfo.Type}
          </Text>
        </View>
      </View>
      <View style={styles.ratemovie}>
        <Text style={[styles.rateheader, atomicStyles.bold]}>
          Xếp hạng phim
        </Text>
        <View style={styles.pressstar}>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(1)}>
            <SvgIcon component={svg[0]} scaleY={1.4} scaleX={1.4} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(2)}>
            <SvgIcon component={svg[1]} scaleY={1.4} scaleX={1.4} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(3)}>
            <SvgIcon component={svg[2]} scaleY={1.4} scaleX={1.4} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(4)}>
            <SvgIcon component={svg[3]} scaleY={1.4} scaleX={1.4} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(5)}>
            <SvgIcon component={svg[4]} scaleY={1.4} scaleX={1.4} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.input, atomicStyles.regular]}
          placeholder="Để lại đánh giá của bạn tại đây..."
          multiline={true}
          textAlignVertical={'top'}
          onChangeText={setComment}
          value={comment}
        />
        <TouchableOpacity style={[styles.buttondanhgia]} onPress={sendComment}>
          <View>
            <Text style={[styles.textbuttondanhgia, atomicStyles.regular]}>
              Gửi đánh giá
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
