import React, {FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import nameof from 'ts-nameof.macro';
// import styles from './NotificationScreen.scss';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainTabBar from 'src/components/organisms/MainTabBar/MainTabBar';
import {atomicStyles} from 'src/styles';
import Notibox from '../../components/atoms/Notibox/Notibox';
import firestore from '@react-native-firebase/firestore';
import styles from './NotificationScreen.scss';
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
  const db= firestore();
  const [list, setList]= React.useState([]);
  const userId= "9AKYA27yIDfm9UrJ65InchSZ62H2";

  useEffect(() =>{
    async function fetchData(){
      var exp=[];
      var dataGeneral= await db.collection("notification").doc("general").collection("1").orderBy("day", "desc").get();
      dataGeneral.forEach(item => exp.push(item.data()));
      var dataSpecific= await db.collection("notification").doc("specific").collection("1").where("userId", "==", userId).get();
      dataSpecific.forEach(item => exp.push(item.data()));
      exp.sort((a, b) => a.day.seconds < b.day.seconds ? 1 : (a.day.seconds > b.day.seconds ? -1: 0));
      setList(exp);
    }
    fetchData();
  },[]); 
  const renderData = ()=>{
    let item=[];
    var day=0;
    var isoday;
    for(let i=0; i<list.length; i++){
      if(list[i].day.seconds * 1000 > Date.now()) continue;
      if(list[i].day.seconds * 1000 != day){
        day=list[i].day.seconds * 1000;
        isoday= new Date(day);
        let realday;
        if(isoday.toLocaleDateString() === new Date().toLocaleDateString())
            realday="Hôm nay";

        else if(isoday.toLocaleDateString() === new Date(Date.now() - 86400000).toLocaleDateString())
            realday="Hôm qua";
        else
            realday= `${isoday.getDate()}/${isoday.getMonth() + 1}/${isoday.getFullYear()}`;
        item.push(<Text key={day} style={[styles.day, atomicStyles.regular]}>{realday}</Text>);
      }

      item.push(<Notibox key={i} data={list[i]}/>);
    }
    return item;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          renderData()
        }
        <View style={styles.padding}/>
      </ScrollView>
      
      <MainTabBar navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
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
