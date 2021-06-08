import {SeatPosition} from 'src/models/SeatPosition';

export function getIndexOfPosition(pos: SeatPosition, numOfColumn: number) {
  return numOfColumn * pos.row + pos.column;
}

export function convertIndexToPosition(
  indexPosition: number,
  numOfColumn: number,
) {
  let pos: SeatPosition = {row: 0, column: 0};
  if (indexPosition < numOfColumn - 1) {
    pos.row = 0;
    pos.column = indexPosition;
    return pos;
  }
  for (let indexColumn = 1; indexColumn < numOfColumn; indexColumn++) {
    const indexRow = (indexPosition - indexColumn) / numOfColumn;
    if (Number.isInteger(indexRow)) {
      pos.row = indexRow;
      pos.column = indexColumn;
      return pos;
    }
  }
  return pos;
}

export function indexOfPositions(
  listPosition: SeatPosition[],
  positionIndex: number,
  numOfColumn: number,
) {
  const position: SeatPosition = convertIndexToPosition(
    positionIndex,
    numOfColumn,
  );
  return listPosition.findIndex((pos) => {
    return pos.row === position.row && pos.column === position.column;
  });
}
