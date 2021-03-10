import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import axios from 'axios';
import {Image, SafeAreaView, View, Text} from 'react-native';
import MainTabBar from '../../components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
// import CategoryComponent from 'src/components/CategoryComponent/CategoryComponent';
// import UnsplashAPI from 'src/unsplashAPI/UnsplashAPI';

/**
 * File: HomeScreen.tsx
 * @created 2021-03-09 16:40:00
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<HomeScreenProps>>}
 */
const HomeScreen: FC<PropsWithChildren<HomeScreenProps>> = (
  props: PropsWithChildren<HomeScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  // function getAxios() {
  //   return axios({
  //     method: 'GET',
  //     url: 'https://source.unsplash.com/random?sig=1/&flower',
  //     data: null,
  //   }).then((response) => {
  //     return (
  //       <View>
  //         <Image style={styles.tinyLogo} source={response} />
  //       </View>
  //     );
  //   });
  // }
  return (
    <SafeAreaView style={styles.container}>
      {/*<CategoryComponent />*/}
      <Text>Home</Text>
      <MainTabBar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export interface HomeScreenProps extends StackScreenProps<any> {
  //
}

HomeScreen.defaultProps = {
  //
};

HomeScreen.propTypes = {
  //
};

HomeScreen.displayName = nameof(HomeScreen);

export default HomeScreen;
