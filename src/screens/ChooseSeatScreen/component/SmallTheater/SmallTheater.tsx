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
import {indexOfPositionArray} from 'src/helpers/array-helper';

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

  const listSeat = React.useRef<SeatPosition[]>([]);

  const isClear = React.useRef<boolean>(false);

  const getItemLayout = React.useCallback(
    (data, index) => ({length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}),
    [],
  );

  const handleSelect = React.useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (
        indexOfPositionArray(listSeat.current, {
          row: rowIndex,
          column: columnIndex,
        }) === -1
      ) {
        listSeat.current.push({
          row: rowIndex,
          column: columnIndex,
        });
      } else {
        let pickedIndex = indexOfPositionArray(listSeat.current, {
          row: rowIndex,
          column: columnIndex,
        });
        listSeat.current.splice(pickedIndex, 1);
      }

      setPickList([...listSeat.current]);
    },
    [],
  );

  const renderSeat = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>, indexRow: number) => {
      let choose = false;

      if (!isClear.current) {
        if (
          indexOfPositionArray(pickList, {
            row: indexRow,
            column: index,
          }) > -1
        ) {
          choose = true;
        }
      }

      return indexOfPositionArray(selectedList, {
        row: indexRow,
        column: index,
      }) === -1 ? (
        <TouchableOpacity
          onPress={() => {
            handleSelect(indexRow, index);
            handleSelectPickedSeats([...listSeat.current]);
            handleClear(isClear.current);
          }}>
          <Seat
            key={index}
            state={
              indexRow === 0 &&
              (index === 0 || index === layout.size.column - 1)
                ? 0
                : item
            }
            positionRow={indexRow}
            positionColumn={index}
            isChoose={choose}
          />
        </TouchableOpacity>
      ) : (
        <Seat key={index} state={2} />
      );
    },
    [
      selectedList,
      layout.size.column,
      pickList,
      handleSelect,
      handleSelectPickedSeats,
      handleClear,
    ],
  );

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
          {Array(layout.size.row)
            .fill(1)
            .map((itemRow, indexRow) => {
              return (
                <FlatList
                  data={Array(layout.size.column).fill(1)}
                  renderItem={(info) => renderSeat(info, indexRow)}
                  horizontal={true}
                  keyExtractor={(item, index) =>
                    (indexRow * layout.size.column + index).toString()
                  }
                  contentContainerStyle={styles.rowStyle}
                  getItemLayout={getItemLayout}
                />
              );
            })}
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
