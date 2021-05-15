import React from 'react';

export function UseTimestamp(): [
  (time: number) => string,
  (time: number) => string,
] {
  const getDayOfWeek = React.useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    switch (day) {
      case 0:
        return 'Chủ nhật';
      case 1:
        return 'Thứ 2';
      case 2:
        return 'Thứ 3';
      case 3:
        return 'Thứ 4';
      case 4:
        return 'Thứ 5';
      case 5:
        return 'Thứ 6';
      default:
        return 'Thứ 7';
    }
  }, []);

  const handleTimestamp = React.useCallback(
    (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      const month =
        date.getMonth() >= 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1);

      // return date.getFullYear() + '-' + month + '-' + day;
      return (
        getDayOfWeek(timestamp) +
        ', Ngày ' +
        day +
        '/' +
        month +
        '/' +
        date.getFullYear()
      );
    },
    [getDayOfWeek],
  );

  const handleGetDay = React.useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);

    // return date.getFullYear() + '-' + month + '-' + day;
    return day + '/' + month;
  }, []);

  return [handleTimestamp, handleGetDay];
}
