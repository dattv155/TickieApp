import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {atomicStyles} from 'src/styles';
import Notibox from '../../components/atoms/Notibox/Notibox';
import firestore from '@react-native-firebase/firestore';
import styles from './NotificationScreen.scss';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {Notification} from 'src/models/Notification';
import {useTranslation} from 'react-i18next/';
import NotificationScreenSkeleton from 'src/screens/NotificationScreen/NotificationScreenSkeleton/NotificationScreenSkeleton';

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

  const today = new Date();

  const [translate] = useTranslation();

  const loadingList = [{}, {}, {}, {}, {}, {}];

  const [list, setList] = React.useState<Notification[]>([]);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    var exp: Array<Obj> = [];

    var dataGeneral = await firestore()
      .collection('notification')
      .doc('general')
      .collection('1')
      .orderBy('day', 'desc')
      .get();

    dataGeneral.forEach((item) => exp.push(item.data()));

    var dataSpecific = await firestore()
      .collection('notification')
      .doc('specific')
      .collection('1')
      .where('userId', '==', auth().currentUser.uid)
      .get();

    dataSpecific.forEach((item) => exp.push(item.data()));

    exp.sort((a, b) =>
      a.day.seconds < b.day.seconds
        ? 1
        : a.day.seconds > b.day.seconds
        ? -1
        : 0,
    );
    setList(exp);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [fetchData, navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loading
            ? loadingList.map((value, index: number) => (
                <View key={index}>
                  <NotificationScreenSkeleton />
                </View>
              ))
            : list.map((notifiation, index) => {
                let realDay;
                if (notifiation.day.toDate().getDate() === today.getDate()) {
                  realDay = 'Hôm nay';
                } else if (
                  notifiation.day.toDate().getDate() ===
                  today.getDate() - 1
                ) {
                  realDay = 'Hôm qua';
                } else {
                  realDay = moment(notifiation.day.toDate()).format(
                    'DD/MM/YYYY',
                  );
                }
                return (
                  <View key={index}>
                    <Text
                      style={[
                        styles.day,
                        atomicStyles.h6,
                        atomicStyles.textGray,
                      ]}>
                      {realDay === 'Hôm nay'
                        ? translate('notification.today')
                        : realDay === 'Hôm qua'
                        ? translate('notification.yesterday')
                        : realDay}
                    </Text>
                    <Notibox data={notifiation} navigation={navigation} />
                  </View>
                );
              })}
        </ScrollView>
      </View>

      <MainTabBar navigation={navigation} route={route} />
    </SafeAreaView>
  );
};
export interface NotificationScreenProps extends StackScreenProps<any> {
  //
}

export interface Obj {
  day?: any;

  content?: string;

  span?: string;

  type?: string;
}
NotificationScreen.defaultProps = {
  //
};

NotificationScreen.propTypes = {
  //
};

NotificationScreen.displayName = nameof(NotificationScreen);

export default NotificationScreen;
