import React, {Dispatch, SetStateAction} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {CinemaLayout} from 'src/sample/cinemaLayout';
import {SEAT_PRICE} from 'src/config/consts';
import {StackScreenProps} from '@react-navigation/stack';
import {BookingData} from 'src/screens/ChooseSeatScreen/ChooseSeatScreen';

export function useBooking(
  movieName: string,
  movieDate: FirebaseFirestoreTypes.Timestamp,
  movieFormat: string,
  cinemaName: string,
  showTime: string,
  navigation: StackScreenProps<any>['navigation'],
): [
  number,
  number[][],
  Dispatch<SetStateAction<number[][]>>,
  string,
  () => Promise<FirebaseFirestoreTypes.DocumentData[]>,
  (seatList: number[][]) => void,
  () => void,
  number[][],
  React.MutableRefObject<boolean>,
  () => void,
] {
  const [seatCost, setSeatCost] = React.useState<number>(0);

  const [selectedList, setSelectedList] = React.useState<number[][]>([]);

  const [pickingSeats, setPickingSeats] = React.useState<number[][]>([]);

  const [listLabel, setListLabel] = React.useState<string>('');

  // const [isClear, setClear] = React.useState<boolean>(false);

  const isClear = React.useRef<boolean>(false);

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('bookings')
      .where('movieName', '==', movieName)
      .where('date', '==', movieDate)
      .where('filmType', '==', movieFormat)
      .where('time', '==', showTime)
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, [movieDate, movieFormat, movieName, showTime]);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const result = (await handleGetData()) as BookingData[];

      const selected: number[][] = [];
      result.map((item) => {
        item.position.map((pos) => {
          selected.push([pos.row, pos.column]);
        });
      });
      setSelectedList(selected);
    });
  }, [handleGetData, navigation, setSelectedList]);

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
    isClear.current = true;
  }, [handlePickedSeats]);

  React.useEffect(() => {
    let list = convertListLabel(pickingSeats);
    setListLabel(list);
    setSeatCost(pickingSeats.length * SEAT_PRICE);
  }, [convertListLabel, pickingSeats]);

  const handleClear = React.useCallback(() => {
    isClear.current = false;
  }, []);

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
  ];
}
