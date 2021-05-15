import React, {Dispatch, SetStateAction} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {CinemaLayout} from 'src/sample/cinemaLayout';
import {SEAT_PRICE} from 'src/config/consts';

export function useBooking(): [
  number,
  number[][],
  Dispatch<SetStateAction<number[][]>>,
  string,
  () => Promise<FirebaseFirestoreTypes.DocumentData[]>,
  (seatList: number[][]) => void,
  () => void,
  number[][],
] {
  const [seatCost, setSeatCost] = React.useState<number>(0);

  const [selectedList, setSelectedList] = React.useState<number[][]>([]);

  const [pickingSeats, setPickingSeats] = React.useState<number[][]>([]);

  const [listLabel, setListLabel] = React.useState<string>('');

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('bookings')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  const handlePickedSeats = React.useCallback((seatList: number[][]) => {
    setPickingSeats([...seatList]);
  }, []);

  const convertPosToLabel = React.useCallback((pos: number[]) => {
    let labelRow = CinemaLayout[0].label.row[pos[0]];
    let labelColumn = CinemaLayout[0].label.column[pos[1]];
    labelColumn = Number(labelColumn) > 9 ? labelColumn : '0' + labelColumn;
    return labelRow + labelColumn;
  }, []);

  const convertListLabel = React.useCallback(
    (listPos: number[][]): string => {
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

  return [
    seatCost,
    selectedList,
    setSelectedList,
    listLabel,
    handleGetData,
    handlePickedSeats,
    handleClearPickedSeats,
    pickingSeats,
  ];
}
