import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ReviewList.scss';
import {Image, View, Text} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from 'src/styles';
import moment from 'moment';

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
  const avatar = !item.avatar
    ? require('assets/images/defaultAvatar.png')
    : {uri: item.avatar};
  return (
    <>
      <View style={[styles.containerReview, atomicStyles.pb10px]}>
        <View style={styles.avatarItem}>
          <Image
            source={avatar}
            resizeMode={'cover'}
            style={styles.avatarItem}
          />
        </View>
        <View style={styles.containerViewRight}>
          <View style={styles.ReviewArea}>
            <View style={styles.reviewTitle}>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.bold,
                  atomicStyles.textGray,
                  {
                    fontWeight: '100',
                  },
                ]}>
                {item.name}
              </Text>
              <Text style={[atomicStyles.h7, styles.timeItem]}>
                {moment(item.time.toDate()).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View>
              <SvgIcon component={require('assets/icons/star.svg')} />
              <Text
                style={[
                  atomicStyles.h7,
                  atomicStyles.textGray,
                  atomicStyles.mt8px,
                ]}>
                {item.rate.toFixed(1)}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[atomicStyles.h7, styles.detailReview]}>
              {item.text}
            </Text>
          </View>
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
