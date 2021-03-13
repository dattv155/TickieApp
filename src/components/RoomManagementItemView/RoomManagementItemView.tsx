import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './RoomManagementItemView.scss';
import {Animated, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from 'src/styles';

/**
 * File: RoomManagementItemView.tsx
 * @created 2021-03-13 09:52:46
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<RoomManagementItemViewProps>>}
 */
const RoomManagementItemView: FC<
  PropsWithChildren<RoomManagementItemViewProps>
> = (): ReactElement => {
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
            style={[{transform: [{scale: scale}]}, styles.buttonDeleteText]}>
            Xóa
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.height}>
        <Pressable style={[styles.containerView]} onPress={() => {}}>
          <View>
            <Text
              style={[
                atomicStyles.textPrimary,
                atomicStyles.h5,
                atomicStyles.bold,
                atomicStyles.pb8px,
              ]}>
              alo
            </Text>
            <Text style={[styles.textInfo]}>Device</Text>
          </View>
          <SvgIcon component={require('assets/icons/Right.svg')} />
        </Pressable>
      </View>
    </Swipeable>
  );
};

export interface RoomManagementItemViewProps {
  //
}

RoomManagementItemView.defaultProps = {
  //
};

RoomManagementItemView.propTypes = {
  //
};

RoomManagementItemView.displayName = nameof(RoomManagementItemView);

export default React.memo(RoomManagementItemView);
