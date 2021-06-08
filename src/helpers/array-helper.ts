import {SeatPosition} from 'src/models/SeatPosition';

export function indexOf2dArray(array: number[][], item: number[]): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return i;
    }
  }
  return -1;
}
export function indexOfPositionArray(
  array: SeatPosition[],
  position: SeatPosition,
): number {
  return array.findIndex((pos) => {
    return pos.row === position.row && pos.column === position.column;
  });
}
