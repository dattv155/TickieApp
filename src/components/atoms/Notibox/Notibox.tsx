import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Notibox.scss';
import {atomicStyles} from '../../../styles';
import {Animated, Pressable, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Notification} from 'src/models/Notification';
import {useTranslation} from 'react-i18next/';
import MyTicketScreen from 'src/screens/MyTicketScreen/MyTicketScreen';
import {Swipeable} from 'react-native-gesture-handler';

/**
 * File: ./Notibox.tsx
 * @created 2021-04-19 21:48:55
 * @type {FC<PropsWithChildren<NotiboxProps>>}
 */
const Notibox: FC<PropsWithChildren<NotiboxProps>> = (
  props: PropsWithChildren<NotiboxProps>,
): ReactElement => {
  const {data, onDelete, navigation} = props;

  const [title, setTitle] = React.useState('');

  const [translate] = useTranslation();

  const [displayComp, setDisplay] = React.useState('none');

  const {type, span, content, day} = data;

  const [isBookingNoti, setBookingNoti] = React.useState<boolean>(false);

  const handleGoToMyTicketScreen = React.useCallback(() => {
    navigation.navigate(nameof(MyTicketScreen));
  }, [navigation]);

  const press = () => {
    if (displayComp === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  };

  React.useEffect(() => {
    if (props.data === undefined) {
      return;
    }
    switch (type) {
      case 'bookingsuccess': {
        setTitle(translate('notification.bookSuccess'));
        setBookingNoti(true);
        break;
      }
      case 'discount': {
        setTitle(translate('notification.discountInformation'));
        break;
      }
      case 'upcoming': {
        setTitle(translate('notification.comingUpMovie'));
        break;
      }
      case 'member': {
        setTitle(translate('notification.memberInformation'));
        break;
      }
      case 'newRelease': {
        setTitle(translate('notification.officialRelease'));
        break;
      }
      default: {
        setTitle(translate('notification.general'));
      }
    }
  }, [props.data, translate, type]);

  const handleDelete = React.useCallback(() => {
    if (typeof onDelete === 'function') {
      onDelete();
    }
  }, [onDelete]);

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0], //
      outputRange: [1, 0],

      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <View style={[styles.buttonDelete]}>
          <Animated.Text
            style={[
              {transform: [{scale: scale}]},
              styles.buttonDeleteText,
              atomicStyles.h4,
              atomicStyles.textWhite,
            ]}>
            {translate('myTicket.delete')}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={[styles.box]}>
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
                {moment(day.toDate()).format('hh:mm A')}
              </Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={[styles.content, atomicStyles.h6]}>{content}</Text>
            </View>
            <View
              style={
                displayComp === 'none' ? {display: 'none'} : {display: 'flex'}
              }>
              <Text style={[atomicStyles.h6]}>{span}</Text>
              {isBookingNoti && (
                <Pressable
                  style={styles.button}
                  onPress={handleGoToMyTicketScreen}>
                  <Text style={[atomicStyles.h6, atomicStyles.textWhite]}>
                    {translate('myTicket.yourTicket')}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export interface NotiboxProps {
  //
  data?: Notification;

  navigation?: any;

  onDelete?: () => void;
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
