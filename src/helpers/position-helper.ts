import {SeatPosition} from 'src/models/SeatPosition';
import {COLUMN_SIZE} from 'src/config/consts';

export function getIndexOfPosition(pos: SeatPosition) {
  return COLUMN_SIZE * pos.row + pos.column;
}

export function convertIndexToPosition(indexPosition: number) {
  let pos: SeatPosition = {row: 0, column: 0};
  if (indexPosition < COLUMN_SIZE - 1) {
    pos.row = 0;
    pos.column = indexPosition;
    return pos;
  }
  for (let indexColumn = 0; indexColumn < COLUMN_SIZE; indexColumn++) {
    const indexRow = (indexPosition - indexColumn) / COLUMN_SIZE;
    if (Number.isInteger(indexRow)) {
      pos.row = indexRow;
      pos.column = indexColumn;
      return pos;
    }
  }
  return pos;
}

export function indexOfPositions(
  positionIndex: number,
  listPosition: SeatPosition[],
) {
  const position: SeatPosition = convertIndexToPosition(positionIndex);
  return listPosition.findIndex((pos) => {
    return pos.row === position.row && pos.column === position.column;
  });
}
