import React, {FC, PropsWithChildren, ReactElement, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  scrollInterpolator,
  animatedStyles,
} from '../CategoryComponent/utils/animations';

// import SvgComponent from './SvgComponent'
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
  const {navigation, route} = props;

  const [carousel, setCarousel] = useState();
  const [translate] = useTranslation();

  const [list, setList] = useState([
    {
      id: 1,
      img:
        'https://ae01.alicdn.com/kf/HTB1Va5mQXXXXXcnXXXXq6xXFXXXV/La-La-Land-Film-Aquarelle-Tissu-jet-d-encre-affiche-20-X13-07.jpg',
      name: 'La La Land',
      release: '12-12-2021',
    },
    {
      id: 2,
      img:
        'https://resizing.flixster.com/JSQhj07oIhsYdTaPu6iZ_ldKJa8=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2RlNzI0MGQyLTQ2ZTktNGMyYi05N2VmLTFjMDhiY2VlMDQ2Ni53ZWJw',
      name: 'Blade Runner 2049',
      release: '12-2-2021',
    },
    {
      id: 3,
      img:
        'https://fcine.net/uploads/monthly_2019_06/2pikachu-_vietnamese_poster.jpg.015075262656d06602221295e8ef16cf.jpg',
      name: 'Detective Pikachu',
      release: '12-02-2022',
    },
    {
      id: 4,
      img:
        'https://i.pinimg.com/originals/a6/6d/93/a66d93b32698ef7d7f6aea369ab4d196.jpg',
      name: 'Demon Slayer: Infinitive train',
      release: '12-02-2020',
    },
  ]);
  const [index, setIndex] = useState(0);

  const handleGotoMovieScreen = React.useCallback(() => {
    navigation.navigate(MovieInfoScreen.displayName);
  }, [navigation]);

  const renderItem = ({item}: any) => {
    return (
      <View>
        <TouchableOpacity onPress={handleGotoMovieScreen}>
          <Image
            style={itemStyles.imageContainer}
            source={{
              uri: item.img,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text
        style={[
          atomicStyles.h1,
          atomicStyles.bold,
          styles.header,
          styles.textStyle,
        ]}>
        {translate('homeScreen.latest')}
      </Text>

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

const itemStyles = StyleSheet.create({
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 39,
    borderWidth: 3,
  },
  release: {
    paddingTop: 3,
    color: '#828282',
    fontWeight: '500',
    fontStyle: 'normal',
  },
});

export interface CategoryComponentProps extends StackScreenProps<any> {
  //
}

CategoryComponent.defaultProps = {
  //
};

CategoryComponent.propTypes = {
  //
};

CategoryComponent.displayName = nameof(CategoryComponent);

export default React.memo(CategoryComponent);
