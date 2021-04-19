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
import {SmallTheaterLayout} from 'src/sample/smallTheaterLayout';

/**
 * File: SmallTheater.tsx
 * @created 2021-04-10 22:35:47
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SmallTheaterProps>>}
 */

const rowLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const SmallTheater: FC<PropsWithChildren<SmallTheaterProps>> = (
  props: PropsWithChildren<SmallTheaterProps>,
): ReactElement => {
  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <Seat state={item} key={index} />;
    },
    [],
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
            data={SmallTheaterLayout.map((item) => {
              return item.title;
            })}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => item.toString() + index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
        <View style={styles.seatArea}>
          {SmallTheaterLayout.map((row) => {
            return (
              <FlatList
                data={row.data}
                renderItem={renderItem}
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
            data={SmallTheaterLayout.map((item) => {
              return item.title;
            })}
            renderItem={renderLabelColumn}
            horizontal={true}
            keyExtractor={(item, index) => item.toString() + index.toString()}
            contentContainerStyle={styles.labelContainer}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={rowLabel}
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
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
