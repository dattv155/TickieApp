import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './NotificationScreen.scss';
import {View, Text} from 'react-native';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {StackScreenProps} from '@react-navigation/stack';

/**
 * File: NotificationScreen.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<NotificationScreenProps>>}
 */
const NotificationScreen: FC<PropsWithChildren<NotificationScreenProps>> = (
  props: PropsWithChildren<NotificationScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
      <MainTabBar navigation={navigation} route={route} />
    </View>
  );
};

export interface NotificationScreenProps extends StackScreenProps<any> {
  //
}

NotificationScreen.defaultProps = {
  //
};

NotificationScreen.propTypes = {
  //
};

NotificationScreen.displayName = nameof(NotificationScreen);

export default NotificationScreen;
