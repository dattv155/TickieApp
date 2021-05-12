import React, {FC, PropsWithChildren, ReactElement, useEffect} from 'react';
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
  TextInput
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
import FilmRate from './component/FilmRate/FilmRate'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RateStar from './component/RateStar/RateStar'
import { number } from 'prop-types';
import CommentScreen from '../CommentScreen/CommentScreen';

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

  const handleGotoCommentScreen = React.useCallback(() => {
    navigation.navigate(CommentScreen.displayName);
  }, [navigation]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <ReviewList item={item.data()} key={index} />;
    },
    [],
  ); 
  const [intitItem, setInitItem]=React.useState(0);
  const [rate, setRate]=React.useState(0);
  const [display, setDisplay]=React.useState('none');
  const handleDisplay = () => {
      if(display === 'flex')
        setDisplay('none');
      else  
        setDisplay('flex');
  }
  const handleMoreComment = () => {
    var len=ListReview.length;
    if (intitItem + 3 < len)
      setInitItem(intitItem + 3);
    else setInitItem(len);
  }
  const db= firestore();
  const [list, setList]= React.useState([]);
  useEffect(() => {
  async function fetchData(){
      var exp:Array<Obj>= [];
      var data= await db.collection("comment").where("movieId", "==", "Movie-1").get();
      data.forEach(item => exp.push(item));
      setRate((exp.reduce((sum, item)=>sum + item.data().rate, 0)/exp.length).toFixed(1));
      setInitItem(exp.length>3?3:exp.length);
      setList(exp);
    }
    fetchData();
  },[])
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
                rate={rate}
                numOfReview={list.length}
                handleDisplay={handleDisplay}
              />
              <View style={[styles.danhgia, {display: display}]}>
                <Text style={[styles.bignum,atomicStyles.regular]}>
                  {rate}
                </Text>
                <RateStar rate={Math.floor(rate)}/>
                <Text style={styles.numberofdanhgia}>Dựa trên {list.length} đánh giá</Text>
                <FilmRate data={list}/>
                <TouchableOpacity style={styles.buttondanhgia} onPress={handleGotoCommentScreen}>
                  <View >
                    <Text style={[styles.textbuttondanhgia,atomicStyles.bold]}>Đánh giá của bạn</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.reviewArea]}>
                <View style={{height: 12}}/>
                <FlatList
                  data={list.slice(0, intitItem)}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                />
                <TouchableOpacity style={[styles.buttondanhgia]} onPress={handleMoreComment}>
                  <View >
                    <Text style={[styles.textbuttondanhgia,atomicStyles.bold]}>Xem thêm</Text>
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
  avatar?: string;
  movieId?: string;
  name?: string;
  rate?: string;
  text?: string;
  time?: any;
  userId?: string;
}
MovieInfoScreen.defaultProps = {
  //

};

MovieInfoScreen.propTypes = {
  //
};

MovieInfoScreen.displayName = nameof(MovieInfoScreen);

export default MovieInfoScreen;
