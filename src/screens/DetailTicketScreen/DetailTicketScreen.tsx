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
import {
  convertListSeatsLabel,
  formatToCurrency,
  handleListCombo,
} from 'src/helpers/string-helper';
import {useTranslation} from 'react-i18next/';

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

  const {movieTicket} = route?.params;

  const timeDate = `${movieTicket?.time} ${moment(
    movieTicket?.date?.toDate(),
  ).format('DD/MM')}`;

  const [translate] = useTranslation();

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
              styles.textStyle,
              atomicStyles.mt16px,
            ]}>
            {translate('movieDetail.header')}
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
              source={{uri: movieTicket?.poster}}
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
                  {movieTicket?.movieName}
                </Text>
                <Text
                  style={[
                    atomicStyles.textWhite,
                    atomicStyles.h5,
                    // atomicStyles.bold,
                    styles.textStyle,
                  ]}>
                  {movieTicket?.movieTotalTime} phút -{' '}
                  {movieTicket?.cinemaFormat}
                </Text>
              </View>

              <TextItemView
                label={translate('movieDetail.code')}
                value={movieTicket?.bookingId}
              />
              <TextItemView
                label={translate('movieDetail.time')}
                value={timeDate}
              />
              <TextItemView
                label={translate('movieDetail.cinema')}
                value={movieTicket?.cinemaName}
              />
              <TextItemView label={translate('movieDetail.room')} value="5A" />
              <TextItemView
                label={translate('movieDetail.seats')}
                value={convertListSeatsLabel(movieTicket?.position)}
              />
              <TextItemView
                label={translate('movieDetail.setCombo')}
                value={handleListCombo(movieTicket?.combos)}
              />
              <TextItemView
                label={translate('movieDetail.price')}
                value={formatToCurrency(movieTicket?.totalCost) + ' VND'}
              />
            </View>

            <SvgIcon
              component={require('assets/TicketFrame/TicketFrame.svg')}
              style={styles.ticketFrame}
            />

            <SvgIcon
              component={require('assets/TicketFrame/BarCode.svg')}
              style={[
                styles.barCode,
                movieTicket?.combos.length > 1 && {top: 580},
              ]}
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
