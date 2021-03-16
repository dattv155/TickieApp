import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, Image, Animated, Easing, FlatList} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {scrollInterpolator, animatedStyles} from './utils/animations';

import styles from './CategoryComponent.scss';
import { ScrollView } from 'react-native-gesture-handler';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);
export default function CategoryComponent(props) {
  const [list, setList]= useState([
    {
      id: 1,
      img: 'https://ae01.alicdn.com/kf/HTB1Va5mQXXXXXcnXXXXq6xXFXXXV/La-La-Land-Film-Aquarelle-Tissu-jet-d-encre-affiche-20-X13-07.jpg',
      name: 'La La Land',
      release: '12-12-2021'
    },
    {
      id: 2,
      img: 'https://resizing.flixster.com/JSQhj07oIhsYdTaPu6iZ_ldKJa8=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2RlNzI0MGQyLTQ2ZTktNGMyYi05N2VmLTFjMDhiY2VlMDQ2Ni53ZWJw',
      name: 'Blade Runner 2049',
      release: '12-2-2021'
    },
    {
      id: 3,
      img: 'https://fcine.net/uploads/monthly_2019_06/2pikachu-_vietnamese_poster.jpg.015075262656d06602221295e8ef16cf.jpg',
      name: 'Detective Pikachu',
      release: '12-02-2022'
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/originals/a6/6d/93/a66d93b32698ef7d7f6aea369ab4d196.jpg',
      name: 'Demon Slayer: Infinitive train',
      release: '12-02-2020'
    }
  ])
  const [animation, setAnimation]= useState(new Animated.Value(0));
  const [index, setIndex]= useState(0);
  const [carousel, setCarousel]= useState();
  const renderItem  = ({item}) => {
    return (
      <View style={itemStyles.itemContainer}>
        <Image
          style={itemStyles.imageContainer}
          source={{
            uri: item.img
          }}>
        </Image>
      </View>
    );
  }

  return (
    <ScrollView style={itemStyles.view} >
      <Carousel
        ref={(c) => (setCarousel(c))}
        data={list}
        renderItem={(item) => renderItem(item)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={1}
        onSnapToItem={index => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
      <View style={styles.info}>
        <Text style={styles.headerText}>{list[index].name}</Text> 
        <Text style={styles.release}>{"Ngày ra mắt: "+`${list[index].release}`}</Text>
      </View>
      <View style={styles.line}/>
      <View style={{height: 'auto',width: 'auto', marginHorizontal: '5.8%'}}> 
        <View>
          <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontStyle: 'normal',
              lineHeight: 23,
              marginVertical: 20
                      }}>
            Đang có tại Rạp
          </Text>
        </View>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <View>
                  <Image
                      style={{width: ITEM_WIDTH *1 /2,
                              height: ITEM_HEIGHT*1/2,
                              borderRadius: 22,
                              marginRight: SLIDER_WIDTH* 0.051
                              }}
                      source={{
                        uri: item.img
                      }}>
                  </Image>
                  <Text>{item.name}</Text>
                  <Text>{item.release}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            />
            <View style={styles.line}/>
      </View>
      <View style={{height: 'auto',width: 'auto', marginHorizontal: '5.8%', marginBottom: 100}}> 
        <View>
          <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontStyle: 'normal',
              lineHeight: 23,
              marginVertical: 20
                      }}>
            Sắp chiếu
          </Text>
        </View>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <View>
                <Image
                    style={{width: ITEM_WIDTH *1 /2,
                            height: ITEM_HEIGHT*1/2,
                            borderRadius: 22,
                            marginRight: SLIDER_WIDTH* 0.051
                            }}
                    source={{
                      uri: item.img
                    }}>
                </Image>
                <Text>{item.name}</Text>
                <Text>{item.release}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            />
            <View style={styles.line}/>
      </View>
    </ScrollView>
  );
  
}

const itemStyles = StyleSheet.create({

  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 39,
  },
  release: {
    paddingTop: 3,
    color: '#828282',
    fontWeight: "500",
    fontStyle: 'normal',
}
});
