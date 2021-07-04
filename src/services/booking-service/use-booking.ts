import React, {Dispatch, SetStateAction} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';
import {SEAT_PRICE} from 'src/config/consts';
import {SeatPosition} from 'src/models/SeatPosition';
import {MovieBooking} from 'src/models/MovieBooking';
import {globalState} from 'src/app/global-state';
import {useNavigation} from '@react-navigation/native';
import {
  convertIndexToPosition,
  indexOfPositions,
} from 'src/helpers/position-helper';
import {useBoolean} from 'react3l-common';

export function useBooking(): [
  number,
  SeatPosition[],
  Dispatch<SetStateAction<SeatPosition[]>>,
  string,
  () => Promise<FirebaseFirestoreTypes.DocumentData[]>,
  (seatList: SeatPosition[]) => void,
  () => void,
  SeatPosition[],
  boolean,
  () => void,
  () => Promise<void>,
  (indexSeat: number) => void,
] {
  const navigation = useNavigation();

  const [bookingData] = globalState.useBookingData();

  const [seatCost, setSeatCost] = React.useState<number>(0);

  const [selectedList, setSelectedList] = React.useState<SeatPosition[]>([]);

  const [pickingSeats, setPickingSeats] = React.useState<SeatPosition[]>([]);

  const [listLabel, setListLabel] = React.useState<string>('');

  const [isClear, setClear] = React.useState<boolean>(false);

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('bookings')
      .where('movieName', '==', bookingData.movieName)
      .where('date', '==', bookingData.date)
      .where('cinemaFormat', '==', bookingData.cinemaFormat)
      .where('time', '==', bookingData.time)
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, [
    bookingData.cinemaFormat,
    bookingData.date,
    bookingData.movieName,
    bookingData.time,
  ]);

  const fetchData = React.useCallback(async () => {
    const result = (await handleGetData()) as MovieBooking[];

    const selected: SeatPosition[] = [];
    result.map((item) => {
      item.position.map((pos) => {
        selected.push(pos);
      });
    });

    setSelectedList(selected);
  }, [handleGetData, setSelectedList]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchData();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [fetchData, navigation]);

  const handlePickedSeats = React.useCallback((seatList: SeatPosition[]) => {
    setPickingSeats([...seatList]);
  }, []);

  const convertPosToLabel = React.useCallback((pos: SeatPosition) => {
    let labelRow = CinemaLayoutSmall.label.row[pos.row];
    let labelColumn = CinemaLayoutSmall.label.column[pos.column];
    labelColumn = Number(labelColumn) > 9 ? labelColumn : '0' + labelColumn;
    return labelRow + labelColumn;
  }, []);

  const convertListLabel = React.useCallback(
    (listPos: SeatPosition[]): string => {
      let list = '';
      listPos.map((pos) => {
        list = list + convertPosToLabel(pos) + ', ';
      });
      return list.substring(0, list.length - 2);
    },
    [convertPosToLabel],
  );

  const handleClearPickedSeats = React.useCallback(() => {
    setListLabel('');
    handlePickedSeats([]);
    setPickingSeats([]);
    setSeatCost(0);
  }, [handlePickedSeats]);

  React.useEffect(() => {
    let list = convertListLabel(pickingSeats);
    setListLabel(list);
    setSeatCost(pickingSeats.length * SEAT_PRICE);
  }, [convertListLabel, pickingSeats]);

  const handleClear = React.useCallback(() => {
    setClear(true);
    setPickingSeats([]);
  }, [setClear]);

  const handlePickingSeat = React.useCallback(
    (indexSeat: number) => {
      setClear(false);
      const index = indexOfPositions(indexSeat, pickingSeats);
      const seatPos = convertIndexToPosition(indexSeat);
      if (index === -1) {
        setPickingSeats([...pickingSeats, seatPos]);
      } else {
        setPickingSeats((list) =>
          list.filter(
            (item) =>
              item.row !== seatPos.row || item.column !== seatPos.column,
          ),
        );
      }
    },
    [pickingSeats],
  );

  return [
    seatCost,
    selectedList,
    setSelectedList,
    listLabel,
    handleGetData,
    handlePickedSeats,
    handleClearPickedSeats,
    pickingSeats,
    isClear,
    handleClear,
    fetchData,
    handlePickingSeat,
  ];
}
