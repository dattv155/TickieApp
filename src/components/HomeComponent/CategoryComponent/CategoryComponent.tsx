import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {scrollInterpolator, animatedStyles} from '../CategoryComponent/utils/animations';
import styles from './CategoryComponent.scss';
// import {atomicStyles} from '../../../styles';
import { useTranslation } from 'react-i18next/';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

export default function CategoryComponent(props) {
  const {list, display}= props;
  const [carousel, setCarousel]= React.useState();
  const [translate] = useTranslation();
  const [width, setWidth]= React.useState(300);
  const [index, setIndex]= React.useState(0);
  const renderItem  = ({item}) => {
    return (
      <View>
        <Image
          style={[styles.imageContainer, 
                  {
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT
                  }
                ]}
          source={{
            uri: item.img
          }}>
        </Image>
      </View>
    );
  }

  return (
    <View style={{display: display}}>
      <Carousel
        ref={(c) => (setCarousel(c))}
        data={list}
        renderItem={(item) => renderItem(item)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        // inactiveSlideShift={1}
        onSnapToItem={index => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
      <View style={styles.info}>
        <Text style={styles.headerText}>{list[index].name}</Text> 
        <Text style={styles.release}>{translate("homeScreen.releaseDay") +": " + `${list[index].release}`}</Text>
      </View>
      <View style={styles.line}/>
    </View>
  );
  
}

