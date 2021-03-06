import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  animatedStyles,
  scrollInterpolator,
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
import {convertTimestamp} from 'src/helpers/timestamp-helper';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
// const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);
const ITEM_WIDTH = 252;
const ITEM_HEIGHT = 336;

const CategoryComponent: FC<PropsWithChildren<CategoryComponentProps>> = (
  props: PropsWithChildren<CategoryComponentProps>,
): ReactElement => {
  const {navigation, list, displayMode, loading} = props;

  const [translate] = useTranslation();

  const loadingList = [{}, {}, {}, {}];

  const [carousel, setCarousel] = React.useState<Carousel<any>>(null);

  const [index, setIndex] = React.useState<number>(0);

  const handleGotoMovieScreen = React.useCallback(
    async (movieInfo: MovieInfo) => {
      navigation.navigate(MovieInfoScreen.displayName, {
        movieInfo,
      });
    },
    [navigation],
  );

  const renderItem = ({item, index}: any) => {
    return (
      <View key={index}>
        <Pressable
          onPress={() => handleGotoMovieScreen(item)}
          style={[styles.itemContainer]}>
          <Image
            style={[
              {
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
              },
              styles.imageContainer,
            ]}
            source={{
              uri: item?.Poster,
            }}
          />
        </Pressable>
      </View>
    );
  };

  const renderLoadingItem = ({item, index}: any) => {
    return (
      <View key={index}>
        <CategoryComponentSkeleton />
      </View>
    );
  };

  const listFooterComponent = (
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
          <Text style={[atomicStyles.h6, styles.release, styles.textStyle]}>
            {translate('homeScreen.releaseDay') +
              ': ' +
              convertTimestamp(list[index]?.Release.seconds)}
          </Text>
        )}
      </View>
      <View style={styles.line} />
    </>
  );

  return (
    <View
      style={displayMode === 'flex' ? {display: 'flex'} : {display: 'none'}}>
      <Carousel
        ref={(c) => setCarousel(c)}
        data={loading ? loadingList : list}
        renderItem={loading ? renderLoadingItem : renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
        keyExtractor={(item, index) => item.toString() + index.toString()}
        ListFooterComponent={listFooterComponent}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
        autoplay={true}
        autoplayDelay={5000}
        autoplayInterval={5000}
        loop={true}
        inactiveSlideScale={0.82}
      />
      <View style={styles.line} />
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
