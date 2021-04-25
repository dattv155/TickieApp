import React, { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Notibox.scss';
import {atomicStyles} from '../../../styles'
import {View, Text, Animated, TouchableOpacity, StyleSheet, Touchable, TouchableOpacityBase} from 'react-native';
import { string } from 'prop-types';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Timestamp } from 'react-native-firebase/firestore';
/**
 * File: ./Notibox.tsx
 * @created 2021-04-19 21:48:55
 * @author Huy-No1 <huygg12345@gmail.com>
 * @type {FC<PropsWithChildren<NotiboxProps>>}
 */
const Notibox: FC<PropsWithChildren<NotiboxProps>> = (
  props: PropsWithChildren<NotiboxProps>,
): ReactElement => {
    const [height, setHeight]= React.useState(new Animated.Value(85));
    const [title, setTitle]= React.useState("");
    const {data}= props;
    const {type, span, content, day} = data;
  const press = ()=>{
      Animated.timing(
          height,
          {
              toValue: height._value == 85 ? 145: 85,
              duration: 450,
              useNativeDriver: false
          }
        ).start();

  }
  useEffect(() =>{
      if(props.data === undefined) return ;
      switch (type){
          case "bookingsuccess": {
              setTitle("Đặt vé thành công");
              break;
          }
          case "discount": {
              setTitle("Thông báo khuyến mãi");
              break;
          }
          case "upcoming": {
              setTitle("Phim sắp ra mắt");
              break;
          }
          case "member": {
              setTitle("Thông báo thành viên");
              break;
          }
          case "newRelease": {
              setTitle("Chính thức khởi chiếu");
              break;
          }
          default:{
              setTitle("Chung");
          }
      }
  },[]);
  const getHour = (day) => {
      let hour="";
      let isoDay= new Date(day * 1000 + 43200000);
      let minutes= isoDay.getUTCMinutes();
      if(minutes < 10)
        return `${isoDay.getHours() -5}:0${isoDay.getUTCMinutes()}`;
      return `${isoDay.getHours() -5}:${isoDay.getUTCMinutes()}`;
  }
  return (
      <Animated.View style={[
          {
              height: height
          },
          sstyle.box
      ]}
          >
        <TouchableOpacity activeOpacity={0.1} style={styles.touchable} onPress={press}>
          <View style={styles.bigwrapper}>
              <View style={styles.title}>
                <Text style={[styles.type, atomicStyles.bold]}>
                    {title}
                </Text>
                <Text style={[styles.hour, atomicStyles.regular]}>
                      {getHour(day.seconds)}
                </Text>
              </View>
              <View style={styles.wrapper}>
                  <Text style={[styles.content, atomicStyles.regular]}>
                      {content}
                  </Text>
              </View> 
              <Text style={[styles.content, atomicStyles.regular]}>
                      {span}
              </Text>

          </View> 
          </TouchableOpacity>
      </Animated.View>
     
  )

};

const sstyle= StyleSheet.create({
  box: {  
    alignSelf: 'center'  , 
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 2,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.5,
        height: 3.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    paddingBottom: 9,
    elevation: 8
  },  
})
export interface NotiboxProps {
  //
  data?: Data;
}

export interface Data {
    span?: string;
    content?: string;
    type?: string;
    day?: Timestamp;
}
Notibox.defaultProps = {
  //
};

Notibox.propTypes = {
  //
};

Notibox.displayName = nameof(Notibox);

export default React.memo(Notibox);
