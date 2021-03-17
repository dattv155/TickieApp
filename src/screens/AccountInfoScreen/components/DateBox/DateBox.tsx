import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './DateBox.scss';
// import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View, Text, Button} from 'react-native';
import {atomicStyles} from 'src/styles';
import ConfirmBox from 'src/components/organisms/ConfirmBox/ConfirmBox';
import DatePicker from 'react-native-date-picker';

/**
 * File: DateBox.tsx
 * @created 2021-03-16 16:53:04
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<DateBoxProps>>}
 */
const DateBox: FC<PropsWithChildren<DateBoxProps>> = (
  props: PropsWithChildren<DateBoxProps>,
): ReactElement => {
  const {initialTime} = props;
  // const [translate] = useTranslation();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const [needDate, handleChangeTime] = React.useState(initialTime);

  const handleOpenTimeModal = () => {
    setModalVisible(true);
    handleChangeTime(needDate);
    // console.log(date);
  };
  const handleSaveTime = React.useCallback(() => {
    setModalVisible(false);
  }, []);
  const handleCloseTimeModal = React.useCallback(() => {
    handleChangeTime(needDate);
    setModalVisible(false);
  }, [needDate, handleChangeTime]);
  const formatTime = (time: Date) => {
    let year = time.getUTCFullYear();
    let month = time.getUTCMonth();
    let day = time.getDay();
    return `${day}/${month}/${year}`;
  };
  return (
    <View>
      <TouchableOpacity style={styles.timeContainerButton}>
        <View style={[styles.timeButton]}>
          <TouchableOpacity onPress={handleOpenTimeModal}>
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.bold,
                atomicStyles.textDark,
                styles.alarmTextNumber,
              ]}>
              {formatTime(needDate)}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ConfirmBox isVisible={modalVisible} onCancel={handleCloseTimeModal}>
        <View
          style={[
            atomicStyles.flex,
            atomicStyles.justifyContentCenter,
            atomicStyles.alignItemsCenter,
          ]}>
          <Text
            style={[atomicStyles.text, atomicStyles.h5, atomicStyles.pb16px]}>
            Chọn ngày
          </Text>
        </View>
        <View style={styles.modalContent}>
          <DatePicker
            date={needDate}
            // onDateChange={(time: Date) => {
            //   handleChangeTime(time);
            // }}
            onDateChange={(abc) => {
              handleChangeTime(abc);
            }}
            mode="date"
            androidVariant="iosClone"
            locale="vi"
          />

          <View
            style={[
              atomicStyles.flexRow,
              atomicStyles.w100,
              atomicStyles.justifyContentBetween,
              atomicStyles.alignItemsCenter,
              atomicStyles.pt16px,
            ]}>
            <Button onPress={handleSaveTime} title="Luu" />
            <Button onPress={handleCloseTimeModal} title="Thoat" />
          </View>
        </View>
      </ConfirmBox>
    </View>
  );
};

export interface DateBoxProps {
  //
  initialTime: Date;
}

DateBox.defaultProps = {
  //
};

DateBox.propTypes = {
  //
};

DateBox.displayName = nameof(DateBox);

export default React.memo(DateBox);
