export function indexOf2dArray(array: number[][], item: number[]): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return i;
    }
  }
  return -1;
}
