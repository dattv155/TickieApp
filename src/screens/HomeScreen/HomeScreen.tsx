import React, {FC, PropsWithChildren, ReactElement, useState} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import CategoryComponent from 'src/components/HomeComponent/CategoryComponent/CategoryComponent';
import UpcomingFilm from 'src/components/HomeComponent/UpcomingFilm/UpcomingFilm';
import Search from '../../components/HomeComponent/Search/Search';

import firestore from '@react-native-firebase/firestore';
import Voucher from './Voucher/Voucher';
import {MovieInfo} from 'src/models/MovieInfo';
import {ListSampleMovie} from 'src/sample/listSampleMovie';

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

  const [display, setDisplay] = useState('flex');

  const onClick = () => {
    display === 'flex' ? setDisplay('none') : setDisplay('flex');
  };

  const [data, setData] = React.useState<MovieInfo[]>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  // const handleGetData = React.useCallback(async () => {
  //   return await firestore()
  //     .collection('movie')
  //     .get()
  //     .then((documentData) => {
  //       return documentData.docs.map((item) => item.data());
  //     });
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const result = await firestore()
        .collection('movie')
        .get()
        .then((documentData) => {
          return documentData.docs.map((item) => item.data());
        });

      setData(result);
      setLoading(false);
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [data, navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <SafeAreaView style={[atomicStyles.container]}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.containerView]}>
            <Search handleClick={onClick} display={display} list={data} />
            <CategoryComponent
              navigation={navigation}
              route={route}
              list={data}
              displayMode={display}
              loading={loading}
            />
            <UpcomingFilm display={display} list={ListSampleMovie} />
            <Voucher />
          </View>
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
