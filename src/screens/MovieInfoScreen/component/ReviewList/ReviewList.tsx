import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ReviewList.scss';
import {Image, View, Text} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from 'src/styles';

/**
 * File: ReviewList.tsx
 * @created 2021-04-04 11:12:02
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ReviewListProps>>}
 */
const ReviewList: FC<PropsWithChildren<ReviewListProps>> = (
  props: PropsWithChildren<ReviewListProps>,
): ReactElement => {
  const {item} = props;

  return (
    <>
      <View style={styles.containerReview}>
        <Image
          source={require('assets/images/MCK.jpeg')}
          // source={{uri: item.avatar}}
          resizeMode={'cover'}
          style={styles.avatarItem}
        />
        <View style={styles.containerViewRight}>
          <View style={styles.ReviewArea}>
            <View style={styles.reviewTitle}>
              <Text style={[atomicStyles.bold]}>{item.name}</Text>
              <Text style={[styles.h7, styles.timeItem]}>{item.time}</Text>
            </View>
            <View style={styles.rate}>
              <SvgIcon component={require('assets/icons/star.svg')} />
              <Text style={[styles.rateNumber]}>{item.rate.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={[atomicStyles.h7, styles.detailReview]}>
            {item.text}
          </Text>
        </View>
      </View>
    </>
  );
};

export interface ReviewListProps {
  //
  item?: any;
}

ReviewList.defaultProps = {
  //
};

ReviewList.propTypes = {
  //
};

ReviewList.displayName = nameof(ReviewList);

export default React.memo(ReviewList);
