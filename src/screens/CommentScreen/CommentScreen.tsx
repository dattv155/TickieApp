import React, { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import nameof from 'ts-nameof.macro';
import styles from'./CommentScreen.scss';
import {
  Image,
  Text,
  View,

  TouchableOpacity,
  TextInput
} from 'react-native';

import {atomicStyles} from 'src/styles';

import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { any } from 'prop-types';

/**
 * File: CommentScreen.tsx
 * @created 2021-05-11 23:47:47
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<CommentScreenProps>>}
 */
const CommentScreen: FC<PropsWithChildren<CommentScreenProps>> = (
  props: PropsWithChildren<CommentScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  const userId=auth().currentUser.uid;
  const db=firestore();
  const yellowstar= require('assets/icons/star.svg');
  const graystar= require('assets/icons/stargray.svg');
  const [svg,setSvg]= React.useState([yellowstar, graystar, graystar, graystar, graystar]);
  const [text, onChangeText] = React.useState("");
  const [curStar, setCurStar]= React.useState(1);
  const handleComment = () =>{
      console.log("add comment");
  }
  useEffect(() =>{
    var exp=[...svg];
    for(let i=0; i<curStar; i++)
      exp[i]=yellowstar;
    for(let i=curStar; i<5; i++)
      exp[i]=graystar;
    setSvg(exp);
  },[curStar])
  return (

    <View style={styles.yourcomment}>
      <TouchableOpacity style={styles.goback} >
        <SvgIcon component={require('assets/icons/backIconRound.svg')}/> 
      </TouchableOpacity>

    <Text style={[styles.textyourcomment,atomicStyles.bold]}>Đánh giá của bạn</Text>
    <View style={styles.header}>
      <Image
        source={require('assets/images/mulan-poster.png')}
        resizeMode="cover"
        style={styles.imageheaderinfo}
      />
      <View style={styles.headerinfo}>
        <Text style={[styles.headerinfo_name,atomicStyles.bold]}>Mulan</Text>
        <Text style={[styles.headerinfo_release, atomicStyles.regular]}>2020</Text>
        <Text style={[styles.headerinfo_kind, atomicStyles.regular]}>PG 13, hành động, cổ trang</Text>
      </View> 
    </View>
    <View style={styles.ratemovie}>
        <Text style={[styles.rateheader, atomicStyles.bold]}>Xếp hạng phim</Text>
        <View style={styles.pressstar}>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(1)}>          
            <SvgIcon component={svg[0]} scaleY={1.4} scaleX={1.4}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(2)}>          
            <SvgIcon component={svg[1]} scaleY={1.4} scaleX={1.4}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(3)}>          
            <SvgIcon component={svg[2]} scaleY={1.4} scaleX={1.4}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(4)}>          
            <SvgIcon component={svg[3]} scaleY={1.4} scaleX={1.4}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.star} onPress={() => setCurStar(5)}>          
            <SvgIcon component={svg[4]} scaleY={1.4} scaleX={1.4}  />
          </TouchableOpacity>
        </View>
        
       <TextInput
          style={[styles.input,atomicStyles.regular]}
          placeholder="Để lại đánh giá của bạn tại đây..."
          multiline={true}
          textAlignVertical={"top"}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity style={[styles.buttondanhgia]} onPress={handleComment}>
          <View >
            <Text style={[styles.textbuttondanhgia,atomicStyles.regular]}>Gửi đánh giá</Text>
          </View>
        </TouchableOpacity> 
    </View> 
  </View>
  );
};

export interface CommentScreenProps {
  //
  auth?: any;
}

CommentScreen.defaultProps = {

  //
};

CommentScreen.propTypes = {
  //
};

CommentScreen.displayName = nameof(CommentScreen);

export default CommentScreen;
