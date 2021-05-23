import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './DetailTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import LinearGradient from 'react-native-linear-gradient';
import {atomicStyles, Colors} from 'src/styles';
import TextItemView from 'src/screens/DetailTicketScreen/components/TextItemView/TextItemView';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import moment from 'moment';
import {formatToCurrency} from 'src/helpers/string-helper';
import {SeatPosition} from 'src/models/SeatPosition';
import {ComboSet} from 'src/models/ComboSet';

/**
 * File: DetailTicketScreen.tsx
 * @created 2021-03-15 23:09:51
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<DetailTicketScreenProps>>}
 */
const DetailTicketScreen: FC<PropsWithChildren<DetailTicketScreenProps>> = (
  props: PropsWithChildren<DetailTicketScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {data} = route?.params;

  const timeDate = `${data.time} ${moment(data.date.toDate()).format('DD/MM')}`;

  const changeSeat = React.useCallback((column: number, row: number) => {
    switch (row) {
      case 1:
        return 'A' + column;

      case 2:
        return 'B' + column;

      case 3:
        return 'C' + column;

      case 4:
        return 'D' + column;

      case 5:
        return 'E' + column;

      case 6:
        return 'F' + column;

      case 7:
        return 'G' + column;

      case 8:
        return 'H' + column;

      case 9:
        return 'I' + column;
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        right={<HeaderIconPlaceholder />}
        title={
          <Text
            style={[
              atomicStyles.h3,
              atomicStyles.bold,
              // styles.textStyle,
              atomicStyles.mt16px,
            ]}>
            Thông tin vé
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.ticketViewContainer}>
            {/*<View style={styles.darkerLayer} />*/}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#2c2c2c', '#000000']}
              style={styles.darkerLayer}
            />
            <Image
              source={require('assets/images/mulan-poster.png')}
              resizeMode="cover"
              style={styles.imageView}
            />
            <View style={styles.infoContainer}>
              <View style={styles.titleTicket}>
                <Text
                  style={[
                    atomicStyles.textWhite,
                    atomicStyles.h3,
                    atomicStyles.bold,
                    styles.textStyle,
                  ]}>
                  {data.movieName}
                </Text>
                <Text
                  style={[
                    atomicStyles.textWhite,
                    atomicStyles.h5,
                    // atomicStyles.bold,
                    styles.textStyle,
                  ]}>
                  180 phút - IMAX
                </Text>
              </View>

              <TextItemView label="Mã vé" value="18022123214" />
              <TextItemView label="Thời gian" value={timeDate} />
              <TextItemView label="Rạp" value={data.cinemaName} />
              <TextItemView label="Phòng chiếu" value="2B" />
              <TextItemView
                label="Chỗ ngồi"
                value={data.position.map((pos: SeatPosition, index: number) => {
                  return index === data.position.length - 1
                    ? changeSeat(pos.column, pos.row)
                    : changeSeat(pos.column, pos.row) + ', ';
                })}
              />
              <TextItemView
                label="Set Combo"
                value={
                  data.combos.length > 1
                    ? data.combos.map((combo: ComboSet) => {
                        return combo.count + ' ' + combo.name + '\n';
                      })
                    : data.combos.length
                    ? data.combos[0].count + ' ' + data.combos[0].name
                    : ''
                }
              />
              <TextItemView
                label="Giá"
                value={formatToCurrency(data.totalCost) + ' VND'}
              />
            </View>

            <SvgIcon
              component={require('assets/TicketFrame/TicketFrame.svg')}
              style={styles.ticketFrame}
            />

            <SvgIcon
              component={require('assets/TicketFrame/BarCode.svg')}
              style={[styles.barCode, data.combos.length > 1 && {top: 580}]}
            />
          </View>
        </SafeAreaView>
      </DefaultLayout>
    </>
  );
};

export interface DetailTicketScreenProps extends StackScreenProps<any> {
  //
}

DetailTicketScreen.defaultProps = {
  //
};

DetailTicketScreen.propTypes = {
  //
};

DetailTicketScreen.displayName = nameof(DetailTicketScreen);

export default DetailTicketScreen;
