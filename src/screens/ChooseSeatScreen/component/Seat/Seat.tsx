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
  const [isChoose, setChoose] = React.useState(false);
  const handleChooseSeat = React.useCallback(() => {
    !isChoose ? setChoose(true) : setChoose(false);
  }, [isChoose]);
  return (
    <>
      <View style={styles.container}>
        {state !== 0 ? (
          <View>
            {state === 2 ? (
              <SvgIcon
                component={require('assets/icons/seat/OccupiedSeat.svg')}
              />
            ) : (
              <TouchableOpacity onPress={handleChooseSeat}>
                {!isChoose ? (
                  <SvgIcon
                    component={require('assets/icons/seat/BlankSeat.svg')}
                  />
                ) : (
                  <SvgIcon
                    component={require('assets/icons/seat/SelectedSeat.svg')}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.noSeat} />
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
