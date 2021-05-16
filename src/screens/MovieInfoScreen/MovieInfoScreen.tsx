import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MovieInfoScreen.scss';
import {
  Image,
  ScrollView,
  Text,
  View,
  StatusBar,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles} from 'src/styles';
import PlayButton from 'src/components/atoms/PlayButton/PlayButton';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import TitleComponent from 'src/screens/MovieInfoScreen/component/TitleComponent/TitleComponent';
import ActorComponent from 'src/screens/MovieInfoScreen/component/ActorComponent/ActorComponent';
import RecommendItem from 'src/screens/MovieInfoScreen/component/RecommendItem/RecommendItem';
import ReviewList from 'src/screens/MovieInfoScreen/component/ReviewList/ReviewList';
import {ListReview} from 'src/sample/listReview';
import UnMark from 'src/screens/MovieInfoScreen/component/MarkComponent/UnMark/UnMark';
import Mark from 'src/screens/MovieInfoScreen/component/MarkComponent/Mark/Mark';
import BookingScreen from 'src/screens/BookingScreen/BookingScreen';
import VideoComponent from 'src/components/atoms/VideoComponent/VideoComponent';
import FilmRate from './component/FilmRate/FilmRate';
import firestore from '@react-native-firebase/firestore';
import RateStar from './component/RateStar/RateStar';
import CommentScreen from '../CommentScreen/CommentScreen';
import ActorDetailScreen from 'src/screens/ActorDetailScreen/ActorDetailScreen';

/**
 * File: MovieInfoScreen.tsx
 * @created 2021-03-09 17:22:26
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<MovieInfoScreenProps>>}
 */

const MovieInfoScreen: FC<PropsWithChildren<MovieInfoScreenProps>> = (
  props: PropsWithChildren<MovieInfoScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {movieInfo} = route?.params;

  const [mark, setMark] = React.useState(false);

  const handleMarkFilm = React.useCallback(() => {
    setMark(!mark);
  }, [mark]);

  const handleGotoBookingScreen = React.useCallback(() => {
    navigation.navigate(BookingScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);

  const handleGotoCommentScreen = React.useCallback(() => {
    navigation.navigate(CommentScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <ReviewList item={item.data()} key={index} />;
    },
    [],
  );
  const [intitItem, setInitItem] = React.useState<number>(0);
  const [rate, setRate] = React.useState<number>(0);
  const [display, setDisplay] = React.useState('none');
  const handleDisplay = () => {
    if (display === 'flex') {
      setDisplay('none');
    } else {
      setDisplay('flex');
    }
  };
  const handleMoreComment = () => {
    let len = ListReview.length;
    if (intitItem + 3 < len) {
      setInitItem(intitItem + 3);
    } else {
      setInitItem(len);
    }
  };
  const [list, setList] = React.useState<Obj[]>([]);

  // const fetchData = React.useCallback(async () => {
  //   return await firestore()
  //     .collection('comment')
  //     .where('movieId', '==', 'Movie-1')
  //     .get()
  //     .then((data) => {
  //       return data.docs.map((item) => item.data());
  //     });
  // }, []);

  React.useEffect(() => {
    async function fetchData() {
      let exp: Array<Obj> = [];
      let data = await firestore()
        .collection('comment')
        .where('movieId', '==', 'Movie-' + movieInfo.movieID)
        .get();
      data.forEach((item) => exp.push(item));
      if (exp.length === 0) {
        setRate(0);
      } else {
        setRate(
          Number(
            (
              exp.reduce((sum, item) => sum + item.data().rate, 0) / exp.length
            ).toFixed(1),
          ),
        );
      }
      setInitItem(exp.length > 3 ? 3 : exp.length);
      setList(exp);
    }
    fetchData();
  }, [movieInfo.movieID]);
  // Error

  // React.useEffect(() => {
  //   return navigation.addListener('focus', async () => {
  //     const data = (await fetchData()) as Obj[];
  //     setList(data);

  //     data.length > 3 ? setInitItem(3) : setInitItem(data.length);

  //     const rateTemp = Number(
  //       (data.reduce((sum, item) => sum + item.rate, 0) / data.length).toFixed(
  //         1,
  //       ),
  //     );
  //     setRate(rateTemp);
  //   });
  // }, [fetchData, navigation]);

  const handleGotoActorDetailScreen = React.useCallback(
    (actorID: number) => {
      navigation.navigate(ActorDetailScreen.displayName, {
        actorID: actorID,
      });
    },
    [navigation],
  );

  const renderListActor: ListRenderItem<any> = React.useCallback(
    ({item}: ListRenderItemInfo<any>) => {
      return (
        <TouchableOpacity
          onPress={() => handleGotoActorDetailScreen(item?.actorID)}>
          <ActorComponent actor={item} />
        </TouchableOpacity>
      );
    },
    [handleGotoActorDetailScreen],
  );

  const renderListImage: ListRenderItem<any> = React.useCallback(
    ({item}: ListRenderItemInfo<any>) => {
      return (
        <Image
          source={{uri: item}}
          resizeMode="cover"
          style={styles.imageFilmItem}
        />
      );
    },
    [],
  );

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.containerView}>
        <View>
          {/*<Image*/}
          {/*  source={require('assets/images/mulan-poster.png')}*/}
          {/*  resizeMode="cover"*/}
          {/*  style={styles.posterView}*/}
          {/*/>*/}

          <View style={[styles.infoArea]}>
            <View style={styles.title}>
              <Text
                style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
                {movieInfo?.Name}
              </Text>
              <View style={styles.rate}>
                <Text style={[atomicStyles.text]}>
                  {movieInfo.AverageScore}
                </Text>
                <SvgIcon component={require('assets/icons/star.svg')} />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={[atomicStyles.text, styles.category]}>
                {movieInfo?.Type}
              </Text>
              <Text style={[atomicStyles.text, styles.time]}>
                Thời lượng: {movieInfo?.Duration} phút
              </Text>
            </View>
            <Text
              style={[atomicStyles.h5, atomicStyles.text, styles.description]}>
              {movieInfo?.Description}
            </Text>
            <View style={styles.actorView}>
              <TitleComponent title={'Diễn viên'} />
              <FlatList
                key={'-'}
                data={movieInfo?.Actor}
                renderItem={renderListActor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => '-' + item.toString()}
              />
            </View>
            <View style={styles.actorView}>
              <TitleComponent title={'Hình ảnh'} />
              <FlatList
                key={'+'}
                data={movieInfo?.Image}
                renderItem={renderListImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => '+' + item.toString()}
              />
            </View>
            <View style={styles.actorView}>
              <TitleComponent title={'Gợi ý'} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
              </ScrollView>
            </View>

            <View style={styles.actorView}>
              <TitleComponent
                title={'Đánh giá'}
                isReviewArea={true}
                rate={rate}
                numOfReview={list?.length}
                handleDisplay={handleDisplay}
              />
              <View style={[styles.danhgia, {display: display}]}>
                <Text style={[styles.bignum, atomicStyles.regular]}>
                  {rate}
                </Text>
                <RateStar rate={Math.floor(rate)} />
                <Text style={styles.numberofdanhgia}>
                  Dựa trên {list?.length} đánh giá
                </Text>
                <FilmRate data={list} />
                <TouchableOpacity
                  style={styles.buttondanhgia}
                  onPress={handleGotoCommentScreen}>
                  <View>
                    <Text style={[styles.textbuttondanhgia, atomicStyles.bold]}>
                      Đánh giá của bạn
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.reviewArea]}>
                <View style={{height: 12}} />
                <FlatList
                  key={'='}
                  data={list?.slice(0, intitItem)}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                />
                <TouchableOpacity
                  style={[
                    styles.buttondanhgia,
                    {display: rate === 0 ? 'none' : 'flex'},
                  ]}
                  onPress={handleMoreComment}>
                  <View>
                    <Text style={[styles.textbuttondanhgia, atomicStyles.bold]}>
                      Xem thêm
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.playButton}>
            <PlayButton />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bookingView}>
        <TouchableOpacity onPress={handleMarkFilm} style={styles.markButton}>
          {!mark ? <UnMark /> : <Mark />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={handleGotoBookingScreen}>
          <Text
            style={[atomicStyles.h3, atomicStyles.bold, styles.bookingText]}>
            Đặt phim
          </Text>
        </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
};

export interface MovieInfoScreenProps extends StackScreenProps<any> {
  //
}

export interface Obj {
  id?: String;
  data?: Function;
}
MovieInfoScreen.defaultProps = {
  //
};

MovieInfoScreen.propTypes = {
  //
};

MovieInfoScreen.displayName = nameof(MovieInfoScreen);

export default MovieInfoScreen;
