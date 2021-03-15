import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
// import styles from './NotificationScreen.scss';
import {SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {atomicStyles} from 'src/styles';

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
    <SafeAreaView
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        atomicStyles.container,
      ]}>
      <View>
        <Text>Notification Page</Text>
      </View>
      <MainTabBar navigation={navigation} route={route} />
    </SafeAreaView>
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
