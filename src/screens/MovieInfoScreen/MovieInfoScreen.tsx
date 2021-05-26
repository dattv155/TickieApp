import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MovieInfoScreen.scss';
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
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
import FilmRate from './component/FilmRate/FilmRate';
import firestore from '@react-native-firebase/firestore';
import RateStar from './component/RateStar/RateStar';
import CommentScreen from '../CommentScreen/CommentScreen';
import ActorDetailScreen from 'src/screens/ActorDetailScreen/ActorDetailScreen';
import {globalState} from 'src/app/global-state';
import {MovieBooking} from 'src/models/MovieBooking';

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
  const [initItem, setInitItem] = React.useState<number>(0);

  const [rate, setRate] = React.useState<number>(0);

  const handleMoreComment = () => {
    let len = ListReview.length;
    if (initItem + 2 < len) {
      setInitItem(initItem + 3);
    } else {
      setInitItem(len);
    }
  };
  const [list, setList] = React.useState<Obj[]>([]);

  const fetchData = React.useCallback(async () => {
    let exp: Array<Obj> = [];
    let data = await firestore()
      .collection('comment')
      .where('movieId', '==', 'Movie-' + movieInfo.movieID)
      .get();

    data.forEach((item) => {
      exp.push(item);
    });

    exp.sort((a, b) =>
      a.data().time.seconds < b.data().time.seconds
        ? 1
        : a.data().time.seconds > b.data().time.seconds
        ? -1
        : 0,
    );

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
  }, [movieInfo.movieID]);

  React.useEffect(() => {
    navigation.addListener('focus', async () => {
      await fetchData();
      const bookingData: MovieBooking = await globalState.useBookingData();
      await globalState.setBookingData({
        ...bookingData,
        movieName: movieInfo?.Name,
        movieInfoType: movieInfo?.Type,
      });
    });
  }, [fetchData, movieInfo.Name, movieInfo.Type, navigation]);

  const handleGotoActorDetailScreen = React.useCallback(
    (actorID: number) => {
      navigation.navigate(ActorDetailScreen.displayName, {
        actorID: actorID,
      });
    },
    [navigation],
  );

  const renderListActor: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleGotoActorDetailScreen(item?.actorID)}>
          <ActorComponent actor={item} />
        </TouchableOpacity>
      );
    },
    [handleGotoActorDetailScreen],
  );

  const renderListImage: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <Image
          key={index}
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
          {/*{movieInfo && <VideoComponent videoLink={movieInfo?.Trailer} />}*/}

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
              <TitleComponent title={'Đánh giá'} isReviewArea={true} />
              <View style={[styles.danhgia]}>
                <Text
                  style={[
                    atomicStyles.textBlue,
                    atomicStyles.bold,
                    styles.bignum,
                  ]}>
                  {rate}
                </Text>
                <RateStar rate={Math.floor(rate)} />
                <Text
                  style={[
                    styles.numberofdanhgia,
                    atomicStyles.h6,
                    atomicStyles.textGray,
                    atomicStyles.mt8px,
                  ]}>
                  Dựa trên {list?.length} đánh giá
                </Text>
                <FilmRate data={list} />
                <TouchableOpacity
                  style={styles.buttondanhgia}
                  onPress={handleGotoCommentScreen}>
                  <View>
                    <Text
                      style={[
                        atomicStyles.h4,
                        atomicStyles.bold,
                        atomicStyles.textBlue,
                        {
                          fontWeight: '100',
                        },
                      ]}>
                      Đánh giá của bạn
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.reviewArea]}>
                <View style={{height: 12}} />
                <FlatList
                  key={'='}
                  data={list?.slice(0, initItem)}
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
                    <Text
                      style={[
                        atomicStyles.h5,
                        atomicStyles.textBlue,
                        atomicStyles.bold,
                        {fontWeight: '100'},
                      ]}>
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
