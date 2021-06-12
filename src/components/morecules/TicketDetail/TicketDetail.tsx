import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TicketDetail.scss';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import TextItemView from 'src/screens/DetailTicketScreen/components/TextItemView/TextItemView';
import {
  convertListSeatsLabel,
  formatToCurrency,
  handleListCombo,
} from 'src/helpers/string-helper';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {MovieBooking} from 'src/models/MovieBooking';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

/**
 * File: TicketDetail.tsx
 * @created 2021-06-13 01:34:26
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<TicketDetailProps>>}
 */
const TicketDetail: FC<PropsWithChildren<TicketDetailProps>> = (
  props: PropsWithChildren<TicketDetailProps>,
): ReactElement => {
  const {movieBooking} = props;

  const [translate] = useTranslation();

  const timeDate = `${movieBooking?.time} ${moment(
    movieBooking?.date?.toDate(),
  ).format('DD/MM')}`;

  return (
    <>
      <View style={styles.ticketViewContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#2c2c2c', '#000000']}
          style={styles.darkerLayer}
        />
        <Image
          source={{uri: movieBooking?.poster}}
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
              {movieBooking?.movieName}
            </Text>
            <Text
              style={[
                atomicStyles.textWhite,
                atomicStyles.h5,
                // atomicStyles.bold,
                styles.textStyle,
              ]}>
              {translate('movieDetail.title', {
                time: movieBooking?.movieTotalTime,
                format: movieBooking?.cinemaFormat,
              })}
            </Text>
          </View>

          <TextItemView
            label={translate('movieDetail.code')}
            value={movieBooking?.bookingId}
          />
          <TextItemView
            label={translate('movieDetail.time')}
            value={timeDate}
          />
          <TextItemView
            label={translate('movieDetail.cinema')}
            value={movieBooking?.cinemaName}
          />
          <TextItemView label={translate('movieDetail.room')} value="5A" />
          <TextItemView
            label={translate('movieDetail.seats')}
            value={convertListSeatsLabel(movieBooking?.position)}
          />
          <TextItemView
            label={translate('movieDetail.setCombo')}
            value={handleListCombo(movieBooking?.combos)}
          />
          <TextItemView
            label={translate('movieDetail.price')}
            value={formatToCurrency(movieBooking?.totalCost) + ' VND'}
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
            movieBooking?.combos.length > 1 && {top: 580},
          ]}
        />
      </View>
    </>
  );
};

export interface TicketDetailProps {
  //
  movieBooking?: MovieBooking;
}

TicketDetail.defaultProps = {
  //
};

TicketDetail.propTypes = {
  //
};

TicketDetail.displayName = nameof(TicketDetail);

export default React.memo(TicketDetail);
