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
  }, [mark, movieInfo]);

  const handleGotoBookingScreen = React.useCallback(() => {
    navigation.navigate(BookingScreen.displayName, {
      movieInfo,
    });
  }, [movieInfo, navigation]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <ReviewList item={item} key={index} />;
    },
    [],
  );

  const renderListActor: ListRenderItem<any> = React.useCallback(
    ({item}: ListRenderItemInfo<any>) => {
      return <ActorComponent actor={item} />;
    },
    [],
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
          <View style={styles.movieArea}>
            <VideoComponent VideoID={movieInfo?.TrailerID} />
          </View>

          <View style={[styles.infoArea]}>
            <View style={styles.title}>
              <Text
                style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
                {movieInfo?.Name}
              </Text>
              <View style={styles.rate}>
                <Text>{movieInfo.AverageScore}</Text>
                <SvgIcon component={require('assets/icons/star.svg')} />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.category}>{movieInfo?.Type}</Text>
              <Text style={styles.time}>
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
                data={movieInfo?.Actor}
                renderItem={renderListActor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <ActorComponent />
                <ActorComponent />
              </FlatList>
            </View>
            <View style={styles.actorView}>
              <TitleComponent title={'Hình ảnh'} />
              <FlatList
                data={movieInfo?.Image}
                renderItem={renderListImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.toString()}
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
                rate={10.0}
                numOfReview={269}
              />
              <View style={[styles.reviewArea]}>
                <FlatList
                  data={ListReview}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                />
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

MovieInfoScreen.defaultProps = {
  //
};

MovieInfoScreen.propTypes = {
  //
};

MovieInfoScreen.displayName = nameof(MovieInfoScreen);

export default MovieInfoScreen;
