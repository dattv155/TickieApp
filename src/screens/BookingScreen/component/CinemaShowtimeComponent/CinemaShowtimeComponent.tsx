import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './CinemaShowtimeComponent.scss';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import {CinemaSchedule} from 'src/screens/BookingScreen/BookingScreen';

/**
 * File: CinemaShowtimeComponent.tsx
 * @created 2021-05-16 17:11:16
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<CinemaShowtimeComponentProps>>}
 */
const CinemaShowtimeComponent: FC<
  PropsWithChildren<CinemaShowtimeComponentProps>
> = (props: PropsWithChildren<CinemaShowtimeComponentProps>): ReactElement => {
  const {data, handleChooseCinema, currentCinema, currentShowTime} = props;

  const handleSelection = React.useCallback(
    (time) => {
      if (currentCinema !== data.cinemaName) {
        handleChooseCinema(data.cinemaName, time);
      } else if (currentShowTime !== time) {
        handleChooseCinema(currentCinema, time);
      }
    },
    [currentCinema, currentShowTime, data.cinemaName, handleChooseCinema],
  );

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      let selected = false;
      if (currentCinema === data.cinemaName && currentShowTime === item) {
        selected = true;
      }
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleSelection(item);
          }}
          style={styles.press}>
          <View
            style={[styles.buttonContainer, selected && styles.pickedButton]}>
            <Text
              style={[
                atomicStyles.bold,
                atomicStyles.h4,
                selected ? styles.pickedText : styles.unPickedText,
              ]}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [currentCinema, currentShowTime, data.cinemaName, handleSelection],
  );

  return (
    <>
      <View style={styles.containerView}>
        <Text style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
          {data.cinemaName}
        </Text>
        <View>
          <FlatList
            key={'#'}
            data={data.showTime}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => '#' + item}
            contentContainerStyle={styles.listTime}
            numColumns={3}
          />
        </View>
      </View>
    </>
  );
};

export interface CinemaShowtimeComponentProps {
  //
  data?: CinemaSchedule;

  handleChooseCinema?: (cinema: string, showTime: string) => void;

  currentCinema?: string;

  currentShowTime?: string;
}

CinemaShowtimeComponent.defaultProps = {
  //
};

CinemaShowtimeComponent.propTypes = {
  //
};

CinemaShowtimeComponent.displayName = nameof(CinemaShowtimeComponent);

export default React.memo(CinemaShowtimeComponent);
