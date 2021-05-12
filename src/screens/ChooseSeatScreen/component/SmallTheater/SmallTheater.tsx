import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SmallTheater.scss';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import {
  View,
  Text,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import {CinemaLayout} from 'src/sample/cinemaLayout';

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
    column: string[];
    row: number[];
  };
}

const SmallTheater: FC<PropsWithChildren<SmallTheaterProps>> = (
  props: PropsWithChildren<SmallTheaterProps>,
): ReactElement => {
  const {selectedList} = props;
  const [layout, setLayout] = React.useState<CinemaLayout>(CinemaLayout[0]);

  const checkSelectedSeat = React.useCallback(
    (row: number, column: number) => {
      for (let item of selectedList) {
        if (JSON.stringify(item) === JSON.stringify([row, column])) {
          return true;
        }
      }
      return false;
    },
    [selectedList],
  );

  React.useEffect(() => {}, [checkSelectedSeat, selectedList]);

  const renderSeat = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>, indexRow: number) => {
      return !checkSelectedSeat(indexRow, index) ? (
        <Seat
          key={index}
          state={
            indexRow === 0 && (index === 0 || index === layout.size.column - 1)
              ? 0
              : item
          }
          positionRow={indexRow}
          positionColumn={index}
        />
      ) : (
        <Seat key={index} state={2} />
      );
    },
    [checkSelectedSeat, layout.size.column],
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
            data={layout.label.column}
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
            data={layout.label.column}
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
          data={layout.label.row}
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
  selectedList?: any[][];
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
