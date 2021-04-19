import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TicketItemView.scss';
import {
  Animated,
  Image,
  ImageProps,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

/**
 * File: TicketItemView.tsx
 * @created 2021-03-15 22:40:24
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<TicketItemViewProps>>}
 */
const TicketItemView: FC<PropsWithChildren<TicketItemViewProps>> = (
  props: PropsWithChildren<TicketItemViewProps>,
): ReactElement => {
  const {film, theater, time, seat, image, onPress} = props;

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0], //
      outputRange: [1, 0],

      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
        <View style={[styles.buttonDelete]}>
          <Animated.Text
            style={[
              {transform: [{scale: scale}]},
              styles.buttonDeleteText,
              atomicStyles.h4,
              atomicStyles.textWhite,
            ]}>
            Xóa
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.viewContainer}>
        <Image resizeMode="cover" style={styles.imageView} source={image} />
        <View style={styles.infoSection}>
          <Text
            style={[
              atomicStyles.h4,
              atomicStyles.bold,
              atomicStyles.mb8px,
              styles.textStyle,
              atomicStyles.textDark,
            ]}>
            {film}
          </Text>
          <Text style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
            Rạp:{' '}
            <Text
              style={[
                atomicStyles.textBlue,
                atomicStyles.bold,
                styles.textStyle,
              ]}>
              {theater}
            </Text>
          </Text>
          <Text style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
            Thời gian:{' '}
            <Text
              style={[
                atomicStyles.textBlue,
                atomicStyles.bold,
                styles.textStyle,
              ]}>
              {time}
            </Text>
          </Text>
          <Text style={[atomicStyles.h6, styles.textStyle, atomicStyles.mb4px]}>
            Chỗ ngồi:{' '}
            <Text
              style={[
                atomicStyles.textBlue,
                atomicStyles.bold,
                styles.textStyle,
              ]}>
              {seat}
            </Text>
          </Text>
          <Pressable style={styles.miniButton} onPress={onPress}>
            <Text
              style={[
                styles.textStyle,
                atomicStyles.h76,
                atomicStyles.bold,
                atomicStyles.textWhite,
              ]}>
              Xem vé
            </Text>
          </Pressable>
        </View>
      </View>
    </Swipeable>
  );
};

export interface TicketItemViewProps {
  //
  film?: string;
  theater?: string;
  time?: string;
  seat?: string;
  image?: ImageProps['source'];
  onPress?: () => void;
}

TicketItemView.defaultProps = {
  //
};

TicketItemView.propTypes = {
  //
};

TicketItemView.displayName = nameof(TicketItemView);

export default React.memo(TicketItemView);
