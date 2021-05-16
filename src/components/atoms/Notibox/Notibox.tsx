import React, {FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Notibox.scss';
import {atomicStyles} from '../../../styles';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Notification} from 'src/models/Notification';

/**
 * File: ./Notibox.tsx
 * @created 2021-04-19 21:48:55
 * @author Huy-No1 <huygg12345@gmail.com>
 * @type {FC<PropsWithChildren<NotiboxProps>>}
 */
const Notibox: FC<PropsWithChildren<NotiboxProps>> = (
  props: PropsWithChildren<NotiboxProps>,
): ReactElement => {
  const [title, setTitle] = React.useState('');
  const [display, setDisplay] = React.useState('none');
  const {data} = props;
  const {type, span, content, day} = data;
  const press = () => {
    if (display === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  };
  useEffect(() => {
    if (props.data === undefined) {
      return;
    }
    switch (type) {
      case 'bookingsuccess': {
        setTitle('Đặt vé thành công');
        break;
      }
      case 'discount': {
        setTitle('Thông báo khuyến mãi');
        break;
      }
      case 'upcoming': {
        setTitle('Phim sắp ra mắt');
        break;
      }
      case 'member': {
        setTitle('Thông báo thành viên');
        break;
      }
      case 'newRelease': {
        setTitle('Chính thức khởi chiếu');
        break;
      }
      default: {
        setTitle('Chung');
      }
    }
  }, [props.data, type]);

  return (
    <View style={[sstyle.box]}>
      <TouchableOpacity
        activeOpacity={0.1}
        style={styles.touchable}
        onPress={press}>
        <View style={styles.bigwrapper}>
          <View style={styles.title}>
            <Text
              style={[
                atomicStyles.h5,
                atomicStyles.bold,
                styles.textStyle,
                atomicStyles.textBlue,
              ]}>
              {title}
            </Text>
            <Text style={[styles.hour, atomicStyles.h7]}>
              {moment(day.toDate()).format('hh:mm')}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={[styles.content, atomicStyles.h6]}>{content}</Text>
          </View>
          <Text style={[styles.content, atomicStyles.h6, {display: display}]}>
            {span}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const sstyle = StyleSheet.create({
  box: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 16,
  },
});
export interface NotiboxProps {
  //
  data?: Notification;
}

export interface Data {
  span?: string;
  content?: string;
  type?: string;
  day?: FirebaseFirestoreTypes.Timestamp;
}
Notibox.defaultProps = {
  //
};

Notibox.propTypes = {
  //
};

Notibox.displayName = nameof(Notibox);

export default React.memo(Notibox);
