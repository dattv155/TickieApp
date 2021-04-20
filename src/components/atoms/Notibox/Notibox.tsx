import React, { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Notibox.scss';
import {atomicStyles} from '../../../styles'
import {View, Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
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
    const {type, span, content} = data;
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
  return (
      <TouchableOpacity style={styles.touchable} onPress={press}>
      <Animated.View style={[
          {
              height: height
          },
          sstyle.box
      ]}
          >
          <View style={styles.bigwrapper}>
              <Text style={[styles.type, atomicStyles.bold]}>
                  {title}
              </Text>
              <View style={styles.wrapper}>
                  <Text style={[styles.content, atomicStyles.regular]}>
                      {content}
                  </Text>
              </View> 
              <Text style={[styles.content, atomicStyles.regular]}>
                      {span}
              </Text>
          </View>
      </Animated.View>
      </TouchableOpacity>
  )

};

const sstyle= StyleSheet.create({
  box: {     
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 13,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.5,
        height: 2.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 9
  },  
})
export interface NotiboxProps {
  //
  type?: string;
  content?: string;
  span?: string;
  data?: object;
}

Notibox.defaultProps = {
  //
};

Notibox.propTypes = {
  //
};

Notibox.displayName = nameof(Notibox);

export default React.memo(Notibox);
