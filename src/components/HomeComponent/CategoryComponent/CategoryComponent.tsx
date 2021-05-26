import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  scrollInterpolator,
  animatedStyles,
} from '../CategoryComponent/utils/animations';
import styles from './CategoryComponent.scss';
import {atomicStyles} from '../../../styles';
import {useTranslation} from 'react-i18next/';
import nameof from 'ts-nameof.macro';
import MovieInfoScreen from 'src/screens/MovieInfoScreen/MovieInfoScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import CategoryComponentSkeleton from 'src/components/HomeComponent/CategoryComponent/CategoryComponentSkeleton/CategoryComponentSkeleton';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {MovieInfo} from 'src/models/MovieInfo';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const CategoryComponent: FC<PropsWithChildren<CategoryComponentProps>> = (
  props: PropsWithChildren<CategoryComponentProps>,
): ReactElement => {
  const {navigation} = props;

  const {list, displayMode, loading} = props;

  const [translate] = useTranslation();

  const [carousel, setCarousel] = React.useState<Carousel<any>>(null);

  const [index, setIndex] = React.useState<number>(0);

  const handleGotoMovieScreen = React.useCallback(
    (movieInfo: MovieInfo) => {
      navigation.navigate(MovieInfoScreen.displayName, {
        movieInfo,
      });
    },
    [navigation],
  );

  const convertTimestamp = React.useCallback((timestamp: number) => {
    let date = new Date(timestamp * 1000);
    return (
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    );
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <View key={index}>
        {loading ? (
          <CategoryComponentSkeleton />
        ) : (
          <TouchableOpacity onPress={() => handleGotoMovieScreen(item)}>
            <Image
              style={[
                styles.imageContainer,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                },
              ]}
              source={{
                uri: item?.Poster,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{display: displayMode}}>
      <Carousel
        ref={(c) => setCarousel(c)}
        data={list}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        // inactiveSlideShift={1}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
        keyExtractor={(item, index) => item.toString() + index.toString()}
        ListFooterComponent={
          <>
            <View style={styles.info}>
              {loading ? (
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 30,
                      width: 150,
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                  />
                </SkeletonPlaceholder>
              ) : (
                <Text
                  style={[
                    atomicStyles.h5,
                    atomicStyles.bold,
                    styles.textStyle,
                    styles.headerText,
                  ]}>
                  {list[index]?.Name}
                </Text>
              )}

              {loading ? (
                <SkeletonPlaceholder>
                  <View style={{height: 20, width: 200, borderRadius: 5}} />
                </SkeletonPlaceholder>
              ) : (
                <Text
                  style={[atomicStyles.h6, styles.release, styles.textStyle]}>
                  {translate('homeScreen.releaseDay') +
                    ': ' +
                    convertTimestamp(list[index]?.Release.seconds)}
                </Text>
              )}
            </View>
            <View style={styles.line} />
          </>
        }
      />
    </View>
  );
};

export interface CategoryComponentProps extends StackScreenProps<any> {
  //
  list?: FirebaseFirestoreTypes.DocumentData[];

  displayMode?: String;

  loading?: boolean;
}

CategoryComponent.defaultProps = {
  //
};

CategoryComponent.propTypes = {
  //
};

CategoryComponent.displayName = nameof(CategoryComponent);

export default React.memo(CategoryComponent);
