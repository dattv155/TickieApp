import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SmallTheater.scss';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import type {ListRenderItem, ListRenderItemInfo} from 'react-native';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import {CinemaLayout} from 'src/sample/cinemaLayout';
import {indexOf2dArray} from 'src/helpers/array-helper';

/**
 * File: SmallTheater.tsx
 * @created 2021-04-10 22:35:47
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SmallTheaterProps>>}
 */

export interface CinemaLayout {
  cinemaID: number;
  size: {
    row: number;
    column: number;
  };
  label: {
    row: string[];
    column: string[];
  };
}

const SmallTheater: FC<PropsWithChildren<SmallTheaterProps>> = (
  props: PropsWithChildren<SmallTheaterProps>,
): ReactElement => {
  const {selectedList, handleShowPickedSeats} = props;
  const [layout, setLayout] = React.useState<CinemaLayout>(CinemaLayout[0]);

  const [pickList, setPickList] = React.useState<number[][]>([]);

  const listSeat = React.useRef<number[][]>([]);

  const handleSelect = React.useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (indexOf2dArray(listSeat.current, [rowIndex, columnIndex]) === -1) {
        listSeat.current.push([rowIndex, columnIndex]);
      } else {
        let pickedIndex = indexOf2dArray(listSeat.current, [
          rowIndex,
          columnIndex,
        ]);
        listSeat.current.splice(pickedIndex, 1);
      }

      setPickList([...listSeat.current]);
    },
    [],
  );

  React.useEffect(() => {}, []);

  const renderSeat = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>, indexRow: number) => {
      let choose = false;

      if (indexOf2dArray(pickList, [indexRow, index]) > -1) {
        choose = true;
      }

      return indexOf2dArray(selectedList, [indexRow, index]) === -1 ? (
        <TouchableOpacity
          onPress={() => {
            handleSelect(indexRow, index);
            handleShowPickedSeats(listSeat.current);
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
      pickList,
      selectedList,
      layout.size.column,
      handleSelect,
      handleShowPickedSeats,
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
                    item.toString() + index.toString()
                  }
                  contentContainerStyle={styles.rowStyle}
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
  selectedList?: number[][];

  handleShowPickedSeats?: (pickedList: number[][]) => void;
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
