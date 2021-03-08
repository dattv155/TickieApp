import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {scrollInterpolator, animatedStyles} from './utils/animations';

import styles from './CategoryComponent.scss';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.55);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

let DATA: any[];
DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default class CategoryComponent extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}) {
    return (
      <View style={itemStyles.itemContainer}>
        {/*<Text style={styles.itemLabel}>{`Item ${item}`}</Text>*/}
        <Image
          style={itemStyles.imageContainer}
          source={{
            uri: 'https://source.unsplash.com/collection/190727/',
          }}>
          {/*<Text style={styles.itemLabel}>{`Item ${item}`}</Text>*/}
        </Image>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({index})}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
      </View>
    );
  }
}

const itemStyles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'dodgerblue',
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 5.0,
    //
    // elevation: 2,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
  },
});
