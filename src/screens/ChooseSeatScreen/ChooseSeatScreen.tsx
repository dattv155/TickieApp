import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ChooseSeatScreen.scss';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import SmallTheater from 'src/screens/ChooseSeatScreen/component/SmallTheater/SmallTheater';
import SelectComboScreen from 'src/screens/SelectComboScreen/SelectComboScreen';

/**
 * File: ChooseSeatScreen.tsx
 * @created 2021-04-09 20:25:43
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ChooseSeatScreenProps>>}
 */
const ChooseSeatScreen: FC<PropsWithChildren<ChooseSeatScreenProps>> = (
  props: PropsWithChildren<ChooseSeatScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  const hanleGotoSelectComboScreen = React.useCallback(() => {
    navigation.navigate(SelectComboScreen.displayName);
  }, [navigation]);
  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.containerView}>
        <View style={styles.title}>
          <Text style={[atomicStyles.h1, atomicStyles.bold]}>Mulan</Text>
          <Text style={[atomicStyles.h4, atomicStyles.bold]}>
            Ticket Cinema - Giai Phong
          </Text>
          <Text style={[atomicStyles.h5, styles.textTime]}>
            Thứ 6, ngày 10/5/2021, 7:30 PM
          </Text>
        </View>
        <View style={styles.screen}>
          <SvgIcon component={require('assets/icons/SmallScreen.svg')} />
        </View>
        <View style={styles.seatsArea}>
          <SmallTheater />
        </View>
        <View style={styles.noteArea}>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/BlankDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>Ghế trống</Text>
          </View>
          <View style={[styles.note, styles.marginlr25px]}>
            <SvgIcon
              component={require('assets/icons/SeatNote/SelectedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>
              Ghế đang chọn
            </Text>
          </View>
          <View style={styles.note}>
            <SvgIcon
              component={require('assets/icons/SeatNote/OccupiedDot.svg')}
            />
            <Text style={[atomicStyles.h7, styles.textNote]}>Ghế đã chọn</Text>
          </View>
        </View>
        <View style={styles.summaryArea}>
          <Text
            style={[atomicStyles.h1, atomicStyles.bold, styles.summaryTitle]}>
            Chọn ghế ngồi
          </Text>
          <View style={styles.seatSummary}>
            <Text style={[atomicStyles.h4, styles.seatSummaryTitle]}>
              Ghế đang chọn
            </Text>
            <View style={styles.totalSeatArea}>
              <Text style={[atomicStyles.h5, styles.seatChosen]}>D01, D02</Text>
              <SvgIcon component={require('assets/icons/Clear.svg')} />
            </View>
          </View>
          <View style={styles.summaryTotal}>
            <View style={styles.costSummary}>
              <Text style={[atomicStyles.h5, styles.costTitle]}>Tạm tính</Text>
              <Text style={[atomicStyles.h1, atomicStyles.bold, styles.cost]}>
                220.000 VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={hanleGotoSelectComboScreen}>
              <Text style={[atomicStyles.h5, styles.buttonText]}>Đặt chỗ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export interface ChooseSeatScreenProps extends StackScreenProps<any> {
  //
}

ChooseSeatScreen.defaultProps = {
  //
};

ChooseSeatScreen.propTypes = {
  //
};

ChooseSeatScreen.displayName = nameof(ChooseSeatScreen);

export default ChooseSeatScreen;
