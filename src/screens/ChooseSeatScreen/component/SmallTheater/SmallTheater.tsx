import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SmallTheater.scss';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import type {ListRenderItem, ListRenderItemInfo} from 'react-native';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';
import {SeatPosition} from 'src/models/SeatPosition';
import {CinemaLayout} from 'src/models/CinemaLayout';
import {SeatState} from 'src/config/seat-state';
import {getIndexOfPosition} from 'src/helpers/position-helper';

/**
 * File: SmallTheater.tsx
 * @created 2021-04-10 22:35:47
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SmallTheaterProps>>}
 */

const ITEM_WIDTH = 26;

const SmallTheater: FC<PropsWithChildren<SmallTheaterProps>> = (
  props: PropsWithChildren<SmallTheaterProps>,
): ReactElement => {
  const {selectedList, onPickingSeat, isClear} = props;

  const layout: CinemaLayout = React.useMemo(() => {
    return CinemaLayoutSmall;
  }, []);

  const [cinemaLayout, setCinemaLayout] = React.useState<number[]>([]);

  React.useEffect(() => {
    let canceled = false;
    let cinema = Array(layout.size.row * layout.size.column).fill(
      SeatState.AVAILABLE_SEAT,
    );

    cinema[0] = SeatState.NO_SEAT;
    cinema[layout.size.column - 1] = SeatState.NO_SEAT;
    for (let iLayout = 1; iLayout < cinema.length; iLayout++) {
      for (let iSelected = 0; iSelected < selectedList.length; iSelected++) {
        if (iLayout === getIndexOfPosition(selectedList[iSelected])) {
          cinema[iLayout] = SeatState.OCCUPIED_SEAT;
        }
      }
    }
    if (!canceled) {
      setCinemaLayout(cinema);
    }

    return () => {
      canceled = true;
    };
  }, [layout.size.column, layout.size.row, selectedList]);

  const handleChangeValue = React.useCallback(
    (seatIndex: number, state: SeatState) => {
      const newLayout = [...cinemaLayout];
      newLayout[seatIndex] = state;
      setCinemaLayout(newLayout);
    },
    [cinemaLayout],
  );

  const handleSelectSeat = React.useCallback(
    (seatIndex: number) => {
      if (cinemaLayout[seatIndex] === SeatState.AVAILABLE_SEAT) {
        handleChangeValue(seatIndex, SeatState.SELECTING_SEAT);
        onPickingSeat(seatIndex);
      } else if (cinemaLayout[seatIndex] === SeatState.SELECTING_SEAT) {
        handleChangeValue(seatIndex, SeatState.AVAILABLE_SEAT);
        onPickingSeat(seatIndex);
      }
    },
    [cinemaLayout, handleChangeValue, onPickingSeat],
  );

  React.useLayoutEffect(() => {
    if (isClear) {
      cinemaLayout.forEach((item, index) => {
        if (item === SeatState.SELECTING_SEAT) {
          const newLayout = [...cinemaLayout];
          newLayout[index] = SeatState.AVAILABLE_SEAT;
          setCinemaLayout(newLayout);
        }
      });
    }
  }, [cinemaLayout, isClear]);

  const renderListSeats: ListRenderItem<number> = React.useCallback(
    ({item, index}: ListRenderItemInfo<number>) => {
      return (
        <TouchableOpacity onPress={() => handleSelectSeat(index)}>
          <Seat key={index} state={item} />
        </TouchableOpacity>
      );
    },
    [handleSelectSeat],
  );

  const renderLabelColumn: ListRenderItem<string> = React.useCallback(
    ({item, index}: ListRenderItemInfo<string>) => {
      return (
        <Text
          style={[atomicStyles.h7, atomicStyles.bold, styles.labelText]}
          key={index}>
          {item}
        </Text>
      );
    },
    [],
  );

  const renderLabelRow: ListRenderItem<string> = React.useCallback(
    ({item, index}: ListRenderItemInfo<string>) => {
      return (
        <Text
          style={[
            atomicStyles.h7,
            atomicStyles.bold,
            styles.labelText,
            styles.labelRow,
          ]}
          key={index}>
          {item}
        </Text>
      );
    },
    [],
  );

  const renderFooter = React.useCallback(() => {
    return (
      <FlatList
        key={'='}
        data={layout.label.column}
        renderItem={renderLabelRow}
        horizontal={true}
        keyExtractor={(item, index) => item.toString() + index.toString()}
        contentContainerStyle={styles.labelRowContainer}
      />
    );
  }, [layout.label.column, renderLabelRow]);

  const getItemLayout = React.useCallback(
    (data, index) => ({length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerViewRow}>
        <View style={styles.labelView}>
          <FlatList
            key={'_'}
            data={layout.label.row}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
        <View style={styles.seatArea}>
          <FlatList
            data={cinemaLayout}
            renderItem={renderListSeats}
            keyExtractor={(item, index) => index.toString()}
            numColumns={11}
            columnWrapperStyle={styles.wrapperRow}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ListFooterComponentStyle={styles.footerStyle}
          />
        </View>

        <View style={styles.labelView}>
          <FlatList
            key={'+'}
            data={layout.label.row}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
      </View>
    </View>
  );
};

export interface SmallTheaterProps {
  //
  selectedList?: SeatPosition[];

  onPickingSeat: (indexSeat: number) => void;

  isClear?: boolean;
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
