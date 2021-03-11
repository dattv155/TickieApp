import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MovieInfoScreen.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles, Colors} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * File: MovieInfoScreen.tsx
 * @created 2021-03-09 17:22:26
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<MovieInfoScreenProps>>}
 */
const MovieInfoScreen: FC<PropsWithChildren<MovieInfoScreenProps>> = (
  props: PropsWithChildren<MovieInfoScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      right={
        <TouchableOpacity>
          <LinearGradient
            style={[styles.button, atomicStyles.p8px]}
            colors={[Colors.Blue, Colors.RobinsEggBlue]}
            useAngle={true}
            angleCenter={{x: 0.45, y: 0.55}}
            angle={90}>
            <View>
              <SvgIcon component={require('assets/Iconly/Light/Plus.svg')} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      }
      title={<Text>Movie Screen</Text>}
      gradient={false}
      customHeader={false}>
      <View style={styles.container}>
        <Text>Movie Info Screen</Text>
      </View>
    </DefaultLayout>
  );
};

export interface MovieInfoScreenProps extends StackScreenProps<any> {
  //
}

MovieInfoScreen.defaultProps = {
  //
};

MovieInfoScreen.propTypes = {
  //
};

MovieInfoScreen.displayName = nameof(MovieInfoScreen);

export default MovieInfoScreen;
