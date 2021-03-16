import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
// import styles from './HomeScreen.scss';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
/**
 * File: CurrentFilm.tsx
 * @created 2021-03-16 16:40:00
 * @author NhatHuy <huygg12345@gmail.com>
 * @type {FC<PropsWithChildren<HomeScreenProps>>}
 */

const CurrentFilm: FC<PropsWithChildren<HomeScreenProps>> = (
  props: PropsWithChildren<HomeScreenProps>,
): ReactElement => {
  const [translate] = useTranslation();

  return (
    <View>

    </View>
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
