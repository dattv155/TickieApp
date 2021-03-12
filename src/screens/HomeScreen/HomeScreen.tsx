import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HomeScreen.scss';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text} from 'react-native';
import MainTabBar from '../../components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';

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
    <SafeAreaView style={styles.container}>
      {/*<CategoryComponent />*/}
      <Text>{translate('homeScreen.title')}</Text>
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
