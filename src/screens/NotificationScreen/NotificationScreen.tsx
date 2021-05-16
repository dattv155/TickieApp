import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {RefreshControl, SafeAreaView, ScrollView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {atomicStyles} from 'src/styles';
import Notibox from '../../components/atoms/Notibox/Notibox';
import firestore from '@react-native-firebase/firestore';
import styles from './NotificationScreen.scss';
import auth from '@react-native-firebase/auth';

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

  const db = firestore();

  const [list, setList] = React.useState([]);

  const userId = auth().currentUser.uid;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, [fetchData]);

  const fetchData = React.useCallback(async () => {
    var exp: Array<Obj> = [];

    var dataGeneral = await db
      .collection('notification')
      .doc('general')
      .collection('1')
      .orderBy('day', 'desc')
      .get();

    dataGeneral.forEach((item) => exp.push(item.data()));

    var dataSpecific = await db
      .collection('notification')
      .doc('specific')
      .collection('1')
      .where('userId', '==', userId)
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
  }, [db, userId]);

  React.useEffect(() => {
    fetchData();
  }, [db, fetchData, userId]);

  const renderData = () => {
    let saiso = 43200000;
    let item = [];
    var day = 0;
    var isoday;
    for (let i = 0; i < list.length; i++) {
      if (list[i].day.seconds * 1000 + saiso > Date.now()) {
        continue;
      }
      if (list[i].day.seconds * 1000 + saiso != day) {
        day = list[i].day.seconds * 1000 + saiso;
        isoday = new Date(day);
        let realday;
        if (isoday.toLocaleDateString() === new Date().toLocaleDateString()) {
          realday = 'Hôm nay';
        } else if (
          isoday.toLocaleDateString() ===
          new Date(Date.now() - 86400000).toLocaleDateString()
        ) {
          realday = 'Hôm qua';
        } else {
          realday = `${isoday.getDate()}/${
            isoday.getMonth() + 1
          }/${isoday.getFullYear()}`;
        }
        item.push(
          <Text
            key={day}
            style={[styles.day, atomicStyles.regular, atomicStyles.textGray]}>
            {realday}
          </Text>,
        );
      }

      item.push(<Notibox key={i} data={list[i]} />);
    }
    return item;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {renderData()}
      </ScrollView>
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
