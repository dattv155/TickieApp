import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SmallTheater.scss';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import type {ListRenderItem, ListRenderItemInfo} from 'react-native';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';
import {SeatPosition} from 'src/models/SeatPosition';
import {CinemaLayout} from 'src/models/CinemaLayout';
import {SeatState} from 'src/config/seat-state';
import {
  convertIndexToPosition,
  getIndexOfPosition,
} from 'src/helpers/position-helper';
import {indexOfPositions} from 'src/helpers/position-helper';

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
  const {selectedList, handleSelectPickedSeats, handleClear} = props;
  const layout = React.useState<CinemaLayout>(CinemaLayoutSmall[0])[0];

  const [pickList, setPickList] = React.useState<SeatPosition[]>([]);

  const [cinemaLayout, setCinemaLayout] = React.useState<number[]>([]);

  const handleLayout = React.useCallback((): number[] => {
    let cinema = Array(layout.size.row * layout.size.column).fill(
      SeatState.AVAILABLE_SEAT,
    );

    cinema[0] = SeatState.NO_SEAT;
    cinema[layout.size.column - 1] = SeatState.NO_SEAT;
    for (let iLayout = 1; iLayout < cinema.length; iLayout++) {
      for (let iSelected = 0; iSelected < selectedList.length; iSelected++) {
        if (
          iLayout ===
          getIndexOfPosition(selectedList[iSelected], layout.size.column)
        ) {
          cinema[iLayout] = SeatState.OCCUPIED_SEAT;
        }
      }
      // for (let iPicking = 0; iPicking < pickList.length; iPicking) {
      //   if (iLayout === getIndexOfPosition(pickList[iPicking])) {
      //     cinema[iLayout] = SeatState.SELECTING_SEAT;
      //   }
      // }
    }
    return cinema;
  }, [layout.size.column, layout.size.row, selectedList]);

  React.useEffect(() => {
    const layout = handleLayout();
    setCinemaLayout(layout);
  }, [handleLayout]);

  const listSeat = React.useRef<SeatPosition[]>([]);

  const isClear = React.useRef<boolean>(false);

  const handleSelectSeat = React.useCallback(
    (seatIndex: number) => {
      const index = indexOfPositions(
        listSeat.current,
        seatIndex,
        layout.size.column,
      );
      if (index === -1) {
        listSeat.current.push(
          convertIndexToPosition(seatIndex, layout.size.column),
        );
      } else {
        listSeat.current = listSeat.current.splice(index, 1);
      }

      setPickList([...listSeat.current]);
    },
    [layout.size.column],
  );

  const renderListSeats: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <TouchableOpacity
          onPress={() => {
            handleSelectSeat(index);
            handleSelectPickedSeats([...listSeat.current]);
            handleClear(isClear.current);
          }}>
          <Seat key={index} state={item} />
        </TouchableOpacity>
      );
    },
    [handleClear, handleSelectSeat, handleSelectPickedSeats],
  );

  const getItemLayout = React.useCallback(
    (data, index) => ({length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}),
    [],
  );

  // const handleSelect = React.useCallback(
  //   (rowIndex: number, columnIndex: number) => {
  //     if (
  //       indexOfPositionArray(listSeat.current, {
  //         row: rowIndex,
  //         column: columnIndex,
  //       }) === -1
  //     ) {
  //       listSeat.current.push({
  //         row: rowIndex,
  //         column: columnIndex,
  //       });
  //     } else {
  //       let pickedIndex = indexOfPositionArray(listSeat.current, {
  //         row: rowIndex,
  //         column: columnIndex,
  //       });
  //       listSeat.current.splice(pickedIndex, 1);
  //     }
  //
  //     setPickList([...listSeat.current]);
  //   },
  //   [indexOfPositionArray],
  // );

  // const renderSeat = React.useCallback(
  //   ({item, index}: ListRenderItemInfo<any>, indexRow: number) => {
  //     let choose = false;
  //
  //     if (!isClear.current) {
  //       if (
  //         indexOfPositionArray(pickList, {
  //           row: indexRow,
  //           column: index,
  //         }) > -1
  //       ) {
  //         choose = true;
  //       }
  //     }
  //
  //     return indexOfPositionArray(selectedList, {
  //       row: indexRow,
  //       column: index,
  //     }) === -1 ? (
  //       <TouchableOpacity
  //         onPress={() => {
  //           handleSelect(indexRow, index);
  //           handleShowPickedSeats([...listSeat.current]);
  //           handleClear(isClear.current);
  //         }}>
  //         <Seat
  //           key={index}
  //           state={
  //             indexRow === 0 &&
  //             (index === 0 || index === layout.size.column - 1)
  //               ? 0
  //               : item
  //           }
  //           positionRow={indexRow}
  //           positionColumn={index}
  //           isChoose={choose}
  //         />
  //       </TouchableOpacity>
  //     ) : (
  //       <Seat key={index} state={2} />
  //     );
  //   },
  //   [
  //     indexOfPositionArray,
  //     selectedList,
  //     layout.size.column,
  //     pickList,
  //     handleShowPickedSeats,
  //     handleClear,
  //   ],
  // );

  const renderLabelColumn: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
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

  const renderLabelRow: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.containerViewRow}>
        <View style={styles.labelView}>
          <FlatList
            key={'_'}
            data={layout.label.row}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => item.toString() + index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
        <View style={styles.seatArea}>
          {/*{Array(layout.size.row)*/}
          {/*  .fill(1)*/}
          {/*  .map((itemRow, indexRow) => {*/}
          {/*    return (*/}
          {/*      <FlatList*/}
          {/*        data={Array(layout.size.column).fill(1)}*/}
          {/*        renderItem={(info) => renderSeat(info, indexRow)}*/}
          {/*        horizontal={true}*/}
          {/*        keyExtractor={(item, index) =>*/}
          {/*          item.toString() + index.toString()*/}
          {/*        }*/}
          {/*        contentContainerStyle={styles.rowStyle}*/}
          {/*        getItemLayout={getItemLayout}*/}
          {/*      />*/}
          {/*    );*/}
          {/*  })}*/}
          <FlatList
            data={cinemaLayout}
            renderItem={renderListSeats}
            keyExtractor={(item, index) => index.toString()}
            numColumns={11}
            columnWrapperStyle={styles.wrapperRow}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.labelView}>
          <FlatList
            key={'+'}
            data={layout.label.row}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => item.toString() + index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
      </View>
      <View>
        <FlatList
          key={'='}
          data={layout.label.column}
          renderItem={renderLabelRow}
          horizontal={true}
          keyExtractor={(item, index) => item.toString() + index.toString()}
          contentContainerStyle={styles.labelRowContainer}
        />
      </View>
    </View>
  );
};

export interface SmallTheaterProps {
  //
  selectedList?: SeatPosition[];

  handleSelectPickedSeats?: (pickedList: SeatPosition[]) => void;

  handleClear?: (isClear: boolean) => void;
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
