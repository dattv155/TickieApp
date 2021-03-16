import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
// import styles from './HomeScreen.scss';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StatusBar, Text, View, ScrollView} from 'react-native';
import MainTabBar from '../../components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import CategoryComponent from '../../components/HomeComponent/CategoryComponent/CategoryComponent';
import AvailableFilm from '../../components/HomeComponent/AvailableFilm/AvailableFilm';
import ABCXYZ from '../../components/HomeComponent/ABCXYZ/ABCXYZ';
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
  const [translate] = useTranslation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <SafeAreaView style={atomicStyles.container}>
        <ScrollView>
          <CategoryComponent/>  
          <AvailableFilm/>
          <AvailableFilm/>
          <AvailableFilm/>
        </ScrollView>
        <MainTabBar navigation={navigation} route={route} />
      </SafeAreaView>
    </>
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
