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

  const [mark, setMark] = React.useState(false);

  const handleMarkFilm = React.useCallback(() => {
    setMark(!mark);
  }, [mark]);
  const handleGotoBookingScreen = React.useCallback(() => {
    navigation.navigate(BookingScreen.displayName);
  }, [navigation]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <ReviewList item={item} key={index} />;
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
      customHeader={false}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.containerView}>
        <View>
          <Image
            source={require('assets/images/mulan-poster.png')}
            resizeMode="cover"
            style={styles.imageView}
          />

          <View style={[styles.infoArea]}>
            <View style={styles.title}>
              <Text
                style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
                Mulan
              </Text>
              <View style={styles.rate}>
                <Text>10.0 </Text>
                <SvgIcon component={require('assets/icons/star.svg')} />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.category}>Hành động, lịch sử, hài hước</Text>
              <Text style={styles.time}>Thời lượng: 2 giờ 30 phút</Text>
            </View>
            <Text
              style={[atomicStyles.h5, atomicStyles.text, styles.description]}>
              Một câu chuyện hài hước về người con gái tên Lan họ Mu sống trong
              thời kỳ không rõ ràng của lịch sử Trung Quốc.
            </Text>
            <View style={styles.actorView}>
              <TitleComponent title={'Diễn viên'} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <ActorComponent />
                <ActorComponent />
              </ScrollView>
            </View>
            <View style={styles.actorView}>
              <TitleComponent title={'Hình ảnh'} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Image
                  source={require('assets/images/mulan_1.jpeg')}
                  resizeMode="cover"
                  style={styles.imageFilmItem}
                />
                <Image
                  source={require('assets/images/mulan_1.jpeg')}
                  resizeMode="cover"
                  style={styles.imageFilmItem}
                />
                <Image
                  source={require('assets/images/mulan_1.jpeg')}
                  resizeMode="cover"
                  style={styles.imageFilmItem}
                />
              </ScrollView>
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
              {/*<ScrollView showsHorizontalScrollIndicator={false}>*/}
              {/*  <RecommendItem />*/}
              {/*</ScrollView>*/}
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
