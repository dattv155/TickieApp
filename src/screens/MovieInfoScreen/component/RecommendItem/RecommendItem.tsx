import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './RecommendItem.scss';
import {Image, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: RecommendItem.tsx
 * @created 2021-04-04 10:21:48
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<RecommendItemProps>>}
 */
const RecommendItem: FC<PropsWithChildren<RecommendItemProps>> = (
  props: PropsWithChildren<RecommendItemProps>,
): ReactElement => {
  return (
    <>
      <View style={styles.recommendArea}>
        <Image
          source={require('assets/images/mulan-poster.png')}
          resizeMode="cover"
          style={styles.imageView}
        />
        <View style={styles.textArea}>
          <Text style={[atomicStyles.h7, atomicStyles.bold, styles.filmName]}>
            Mulan
          </Text>
          <Text style={[atomicStyles.h7, styles.filmType]}>Hài hước</Text>
        </View>
      </View>
    </>
  );
};

export interface RecommendItemProps {
  //
}

RecommendItem.defaultProps = {
  //
};

RecommendItem.propTypes = {
  //
};

RecommendItem.displayName = nameof(RecommendItem);

export default React.memo(RecommendItem);
