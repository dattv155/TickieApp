import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MovieInfoScreen.scss';
import {
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import TitleComponent from 'src/screens/MovieInfoScreen/component/TitleComponent/TitleComponent';
import ActorComponent from 'src/screens/MovieInfoScreen/component/ActorComponent/ActorComponent';
import RecommendItem from 'src/screens/MovieInfoScreen/component/RecommendItem/RecommendItem';
import ReviewList from 'src/screens/MovieInfoScreen/component/ReviewList/ReviewList';
import {ListReview} from 'src/sample/listReview';
import BookingScreen from 'src/screens/BookingScreen/BookingScreen';
import FilmRate from './component/FilmRate/FilmRate';
import firestore from '@react-native-firebase/firestore';
import RateStar from './component/RateStar/RateStar';
import CommentScreen from '../CommentScreen/CommentScreen';
import ActorDetailScreen from 'src/screens/ActorDetailScreen/ActorDetailScreen';
import {Comment} from 'src/models/Comment';
import {Actor} from 'src/models/Actor';
import LinearGradient from 'react-native-linear-gradient';
import {showInfo} from 'src/helpers/toast';
import {MovieInfo} from 'src/models/MovieInfo';
import {globalState} from 'src/app';
import {ShareDialog} from 'react-native-fbsdk-next';
import {ShareLinkContent} from 'react-native-fbsdk-next/types/models/FBShareLinkContent';
import {useTranslation} from 'react-i18next/';

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

  const [translate] = useTranslation();

  const shareLinkContent: ShareLinkContent = {
    contentType: 'link',
    contentUrl: movieInfo?.Poster,
    quote:
      'Hãy truy cập ngay Tickie để có thể trải nghiệm những bộ phim yêu thích một cách nhanh và tiện lợi nhất!',
    commonParameters: {
      hashtag: '#Trải_nghiệm_cùng_Tickie',
    },
  };

  const handleMarkFilm = React.useCallback(() => {
    ShareDialog.show(shareLinkContent);
  }, [shareLinkContent]);

  const handleGlobalState = React.useCallback(async (movieInfo: MovieInfo) => {
    await globalState.resetNewBookingData();

    await globalState.setBookingData({
      movieName: movieInfo?.Name,
      movieInfoType: movieInfo?.Type,
      movieTotalTime: movieInfo?.Duration,
      poster: movieInfo?.Poster,
    });
  }, []);

  const handleGotoBookingScreen = React.useCallback(async () => {
    await handleGlobalState(movieInfo);
    navigation.navigate(BookingScreen.displayName, {
      movieInfo,
    });
  }, [handleGlobalState, movieInfo, navigation]);

  const handleGotoCommentScreen = React.useCallback(() => {
    navigation.navigate(CommentScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);

  const renderItem: ListRenderItem<Comment> = React.useCallback(
    ({item, index}: ListRenderItemInfo<Comment>) => {
      return <ReviewList item={item} key={index} />;
    },
    [],
  );
  const [initItem, setInitItem] = React.useState<number>(0);

  const [rate, setRate] = React.useState<number>(0);

  const handleMoreComment = React.useCallback(() => {
    let len = ListReview.length;
    if (initItem + 2 < len) {
      setInitItem(initItem + 3);
    } else {
      setInitItem(len);
    }
  }, [initItem]);
  const [list, setList] = React.useState<Comment[]>([]);

  const fetchData = React.useCallback(async () => {
    let exp: Array<Comment> = [];
    let data = await firestore()
      .collection('comment')
      .where('movieId', '==', 'Movie-' + movieInfo.movieID)
      .get();

    data.forEach((item) => {
      exp.push(item.data());
    });

    exp.sort((a, b) =>
      a.time.seconds < b.time.seconds
        ? 1
        : a.time.seconds > b.time.seconds
        ? -1
        : 0,
    );

    if (exp.length === 0) {
      setRate(0);
    } else {
      setRate(
        Number(
          (exp.reduce((sum, item) => sum + item.rate, 0) / exp.length).toFixed(
            1,
          ),
        ),
      );
    }
    setInitItem(exp.length > 3 ? 3 : exp.length);
    setList([...exp]);
  }, [movieInfo.movieID]);

  React.useEffect(() => {
    navigation.addListener('focus', async () => {
      await fetchData();
    });
  }, [fetchData, navigation]);

  const handleGotoActorDetailScreen = React.useCallback(
    (actorID: number) => {
      navigation.navigate(ActorDetailScreen.displayName, {
        actorID: actorID,
      });
    },
    [navigation],
  );

  const renderListActor: ListRenderItem<Actor> = React.useCallback(
    ({item, index}: ListRenderItemInfo<Actor>) => {
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

  const renderListImage: ListRenderItem<string> = React.useCallback(
    ({item, index}: ListRenderItemInfo<string>) => {
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

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(movieInfo.Trailer);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(movieInfo.Trailer);
    } else {
      showInfo(`Don't know how to open this URL: ${movieInfo.Trailer}`);
    }
  }, [movieInfo.Trailer]);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.containerView} nestedScrollEnabled>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <SvgIcon component={require('assets/icons/backIconMovieInfo.svg')} />
        </Pressable>

        <View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#2c2c2c', '#000000']}
            style={styles.darkerLayer}
          />
          <Image
            source={{uri: movieInfo?.Poster}}
            resizeMode="cover"
            style={styles.posterView}
          />

          <View style={[styles.infoArea]}>
            <Pressable style={styles.playButton} onPress={handlePress}>
              <SvgIcon component={require('assets/icons/playButton.svg')} />
            </Pressable>
            <View style={styles.title}>
              <Text
                style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
                {movieInfo?.Name}
              </Text>
              <View style={styles.rate}>
                <Text style={[atomicStyles.text]}>{rate}</Text>
                <SvgIcon component={require('assets/icons/star.svg')} />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={[atomicStyles.text, styles.category]}>
                {movieInfo?.Type}
              </Text>
              <Text style={[atomicStyles.text, styles.time]}>
                {translate('movie.time')} {''}
                {movieInfo?.Duration} {translate('movie.minute')}
              </Text>
            </View>
            <Text
              style={[atomicStyles.h5, atomicStyles.text, styles.description]}>
              {movieInfo?.Description}
            </Text>
            <View style={styles.actorView}>
              <TitleComponent title={translate('movie.actor')} />
              <FlatList
                data={movieInfo?.Actor}
                renderItem={renderListActor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: Actor) => item.ActorImage}
              />
            </View>

            <View style={styles.actorView}>
              <TitleComponent title={translate('movie.image')} />
              <FlatList
                data={movieInfo?.Image}
                renderItem={renderListImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => '+' + item.toString()}
              />
            </View>

            <View style={styles.actorView}>
              <TitleComponent title={translate('movie.suggestion')} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <RecommendItem />
              </ScrollView>
            </View>

            <View style={styles.actorView}>
              <TitleComponent
                title={translate('movie.review')}
                isReviewArea={true}
              />
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
                  {translate('movie.baseOn')} {list?.length}{' '}
                  {translate('movie.reviews')}
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
                      {translate('movie.yourReview')}
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
                  keyExtractor={(item) => item.time?.seconds.toString()}
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
                      {translate('movie.more')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bookingView}>
        <TouchableOpacity onPress={handleMarkFilm} style={styles.markButton}>
          <SvgIcon component={require('assets/icons/ShareIcon.svg')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={handleGotoBookingScreen}>
          <Text
            style={[atomicStyles.h3, atomicStyles.bold, styles.bookingText]}>
            {translate('movie.bookMovie')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
