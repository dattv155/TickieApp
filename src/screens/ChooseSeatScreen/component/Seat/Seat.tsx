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
  const {state, handleSeat, positionRow, positionColumn, isChoose} = props;

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
              <View>
                {!isChoose ? (
                  <SvgIcon
                    component={require('assets/icons/seat/BlankSeat.svg')}
                  />
                ) : (
                  <SvgIcon
                    component={require('assets/icons/seat/SelectedSeat.svg')}
                  />
                )}
              </View>
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

  handleSeat?: (rowNumber: number, columnNumber: number) => void;

  positionRow?: number;

  positionColumn?: number;

  isChoose?: boolean;
}

Seat.defaultProps = {
  //
};

Seat.propTypes = {
  //
};

Seat.displayName = nameof(Seat);

export default React.memo(Seat);
