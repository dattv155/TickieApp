import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Notibox.scss';
import {atomicStyles} from '../../../styles';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Notification} from 'src/models/Notification';
import {useTranslation} from 'react-i18next/';
import MyTicketScreen from 'src/screens/MyTicketScreen/MyTicketScreen';

/**
 * File: ./Notibox.tsx
 * @created 2021-04-19 21:48:55
 * @type {FC<PropsWithChildren<NotiboxProps>>}
 */
const Notibox: FC<PropsWithChildren<NotiboxProps>> = (
  props: PropsWithChildren<NotiboxProps>,
): ReactElement => {
  const [title, setTitle] = React.useState('');

  const [translate] = useTranslation();

  const [displayComp, setDisplay] = React.useState('none');

  const {data, navigation} = props;

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

  return (
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
          <View style={{display: displayComp}}>
            <Text style={[atomicStyles.h6]}>{span}</Text>
            {isBookingNoti && (
              <Pressable
                style={styles.button}
                onPress={handleGoToMyTicketScreen}>
                <Text style={[atomicStyles.h6, atomicStyles.textWhite]}>
                  Vé của bạn
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export interface NotiboxProps {
  //
  data?: Notification;

  navigation?: any;
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
