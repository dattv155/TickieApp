import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';
import {SEAT_PRICE} from 'src/config/consts';
import {SeatPosition} from 'src/models/SeatPosition';
import {globalState} from 'src/app/global-state';
import {useNavigation} from '@react-navigation/native';
import {
  convertIndexToPosition,
  indexOfPositions,
} from 'src/helpers/position-helper';

export function useBooking(): [
  number,
  SeatPosition[],
  string,
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

  const handleClear = React.useCallback(() => {
    setClear(true);
    setPickingSeats([]);
  }, [setClear]);

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('bookings')
      .where('movieName', '==', bookingData.movieName)
      .where('date', '==', bookingData.date)
      .where('cinemaFormat', '==', bookingData.cinemaFormat)
      .where('time', '==', bookingData.time)
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data().position);
      });
  }, [
    bookingData.cinemaFormat,
    bookingData.date,
    bookingData.movieName,
    bookingData.time,
  ]);

  const fetchData = React.useCallback(async () => {
    const result = (await handleGetData()).flat() as SeatPosition[];

    setSelectedList(result);
  }, [handleGetData, setSelectedList]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (pickingSeats) {
        handleClear();
      }
      await fetchData();
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [fetchData, handleClear, navigation, pickingSeats]);

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

  React.useEffect(() => {
    let list = convertListLabel(pickingSeats);
    setListLabel(list);
    setSeatCost(pickingSeats.length * SEAT_PRICE);
  }, [convertListLabel, pickingSeats]);

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
    listLabel,
    pickingSeats,
    isClear,
    handleClear,
    fetchData,
    handlePickingSeat,
  ];
}
