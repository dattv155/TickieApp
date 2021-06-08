import React, {Dispatch, SetStateAction} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';
import {SEAT_PRICE} from 'src/config/consts';
import {StackScreenProps} from '@react-navigation/stack';
import {SeatPosition} from 'src/models/SeatPosition';
import {MovieBooking} from 'src/models/MovieBooking';

export function useBooking(
  movieName: string,
  movieDate: FirebaseFirestoreTypes.Timestamp,
  movieFormat: string,
  cinemaName: string,
  showTime: string,
  navigation: StackScreenProps<any>['navigation'],
): [
  number,
  SeatPosition[],
  Dispatch<SetStateAction<SeatPosition[]>>,
  string,
  () => Promise<FirebaseFirestoreTypes.DocumentData[]>,
  (seatList: SeatPosition[]) => void,
  () => void,
  SeatPosition[],
  React.MutableRefObject<boolean>,
  () => void,
  () => Promise<void>,
] {
  const [seatCost, setSeatCost] = React.useState<number>(0);

  const [selectedList, setSelectedList] = React.useState<SeatPosition[]>([]);

  const [pickingSeats, setPickingSeats] = React.useState<SeatPosition[]>([]);

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
    let labelRow = CinemaLayoutSmall[0].label.row[pos.row];
    let labelColumn = CinemaLayoutSmall[0].label.column[pos.column];
    // console.log(pos.row);
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
    fetchData,
  ];
}
