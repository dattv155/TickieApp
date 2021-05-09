export function fomatNumberToMoney(
  number: any,
  defaultNum: any,
  predicate: any,
) {
  predicate = !predicate ? '' : '' + predicate;
  if (
    number == 0 ||
    number == '' ||
    number == null ||
    number == 'undefined' ||
    isNaN(number) === true ||
    number == '0' ||
    number == '00' ||
    number == '000'
  ) {
    return '0' + predicate;
  }

  var array = [];
  var result = '';
  var count = 0;

  if (!number) {
    return defaultNum ? defaultNum : '' + predicate;
  }

  let flag1 = false;
  if (number < 0) {
    number = -number;
    flag1 = true;
  }

  var numberString = number.toString();
  if (numberString.length < 3) {
    return numberString + predicate;
  }

  for (let i = numberString.length - 1; i >= 0; i--) {
    count += 1;
    if (numberString[i] == '.' || numberString[i] == ',') {
      array.push(',');
      count = 0;
    } else {
      array.push(numberString[i]);
    }
    if (count == 3 && i >= 1) {
      array.push('.');
      count = 0;
    }
  }

  for (let i = array.length - 1; i >= 0; i--) {
    result += array[i];
  }

  if (flag1) {
    result = '-' + result;
  }

  return result + predicate;
}
