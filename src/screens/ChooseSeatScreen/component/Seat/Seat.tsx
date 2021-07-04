import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Seat.scss';
import {View} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {SeatState} from 'src/config/seat-state';

/**
 * File: Seat.tsx
 * @created 2021-04-10 15:15:49
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SeatProps>>}
 */
const Seat: FC<PropsWithChildren<SeatProps>> = (
  props: PropsWithChildren<SeatProps>,
): ReactElement => {
  const {state} = props;

  return (
    <>
      <View style={styles.container}>
        {state === SeatState.NO_SEAT ? (
          <View style={styles.noSeat} />
        ) : state === SeatState.OCCUPIED_SEAT ? (
          <SvgIcon component={require('assets/icons/seat/OccupiedSeat.svg')} />
        ) : state === SeatState.SELECTING_SEAT ? (
          <SvgIcon component={require('assets/icons/seat/SelectedSeat.svg')} />
        ) : (
          state === SeatState.AVAILABLE_SEAT && (
            <SvgIcon component={require('assets/icons/seat/BlankSeat.svg')} />
          )
        )}
      </View>
    </>
  );
};

export interface SeatProps {
  //
  state?: number;
}

Seat.defaultProps = {
  //
};

Seat.propTypes = {
  //
};

Seat.displayName = nameof(Seat);

export default React.memo(Seat);
