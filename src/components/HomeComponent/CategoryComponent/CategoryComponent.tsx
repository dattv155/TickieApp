import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
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

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const CategoryComponent: FC<PropsWithChildren<CategoryComponentProps>> = (
  props: PropsWithChildren<CategoryComponentProps>,
): ReactElement => {
  const {navigation} = props;

  const {list, display} = props;

  const [translate] = useTranslation();

  const [carousel, setCarousel] = React.useState<Carousel<any>>(null);

  const [index, setIndex] = React.useState<number>(0);

  const handleGotoMovieScreen = React.useCallback(() => {
    navigation.navigate(MovieInfoScreen.displayName);
  }, [navigation]);

  const renderItem = ({item}: any) => {
    return (
      <View>
        <TouchableOpacity onPress={handleGotoMovieScreen}>
          <Image
            style={[styles.imageContainer,
                      {
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                      }
                  ]}
            source={{
              uri: item.img,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[{display: display}]}>
      <Carousel
        ref={(c) => setCarousel(c)}
        data={list}
        renderItem={(item: object) => renderItem(item)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        // inactiveSlideShift={1}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
        keyExtractor={(item, index) => item.toString() + index.toString()}
      />
      <View style={styles.info}>
        <Text
          style={[
            atomicStyles.h5,
            atomicStyles.bold,
            styles.textStyle,
            styles.headerText,
          ]}>
          {list[index].name}
        </Text>
        <Text style={[atomicStyles.h6, styles.release, styles.textStyle]}>
          {translate('homeScreen.releaseDay') + ': ' + `${list[index].release}`}
        </Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export interface CategoryComponentProps extends StackScreenProps<any> {
  //
  list?: any[];
  display?: string;
}

CategoryComponent.defaultProps = {
  //
};

CategoryComponent.propTypes = {
  //
};

CategoryComponent.displayName = nameof(CategoryComponent);

export default React.memo(CategoryComponent);
