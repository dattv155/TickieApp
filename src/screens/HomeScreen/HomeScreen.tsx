import React, {FC, PropsWithChildren, ReactElement, useState} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import {SafeAreaView, StatusBar, ScrollView, View} from 'react-native';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles, Colors} from 'src/styles';
import CategoryComponent from 'src/components/HomeComponent/CategoryComponent/CategoryComponent';
import AvailableFilm from 'src/components/HomeComponent/AvailableFilm/AvailableFilm';
import FavoriteFilm from 'src/components/HomeComponent/FavoriteFilm/FavoriteFilm';
import UpcomingFilm from 'src/components/HomeComponent/UpcomingFilm/UpcomingFilm';
import Search from '../../components/HomeComponent/Search/Search';
import {LogBox} from 'react-native';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import Voucher from './Voucher/Voucher';

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

  const [data, setData] = React.useState<FirebaseFirestoreTypes.DocumentData[]>(
    [],
  );

  const handleGetData = React.useCallback(async () => {
    return await firestore()
      .collection('movie')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const result = await handleGetData();
      setData(result);
    });
  }, [handleGetData, navigation]);

  const list = [
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
      name: 'Demon Slayer',
      release: '12-02-2020',
    },
  ];
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <SafeAreaView style={[atomicStyles.container]}>
        <ScrollView>
          <View style={[styles.containerView]}>
            <Search handleClick={onClick} display={display} list={list} />
            <CategoryComponent
              navigation={navigation}
              route={route}
              list={data}
              display={display}
            />
            <UpcomingFilm display={display} list={list} />
            <Voucher/>
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
