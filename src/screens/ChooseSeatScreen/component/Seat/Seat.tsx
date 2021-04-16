import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Seat.scss';
import {TouchableOpacity, View} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

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
  const [seatState, setSeatState] = React.useState<
    'blank' | 'occupied' | 'selected'
  >('blank');
  const [isChoose, setChoose] = React.useState(false);
  const handleChooseSeat = React.useCallback(() => {
    !isChoose
      ? (setSeatState('selected'), setChoose(true))
      : (setSeatState('blank'), setChoose(false));
  }, [isChoose]);
  return (
    <>
      <View>
        <TouchableOpacity onPress={handleChooseSeat}>
          {seatState === 'blank' ? (
            <SvgIcon component={require('assets/icons/seat/BlankSeat.svg')} />
          ) : seatState === 'occupied' ? (
            <SvgIcon
              component={require('assets/icons/seat/SelectedSeat.svg')}
            />
          ) : (
            <SvgIcon
              component={require('assets/icons/seat/SelectedSeat.svg')}
            />
          )}
        </TouchableOpacity>
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
