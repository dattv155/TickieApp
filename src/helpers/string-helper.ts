import {ComboInfo} from 'src/models/ComboInfo';
import {ComboSet} from 'src/models/ComboSet';
import React from 'react';
import {SeatPosition} from 'src/models/SeatPosition';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';

export function formatToCurrency(num: number): string {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function convertPosToLabel(pos: SeatPosition) {
  let labelRow = CinemaLayoutSmall[0].label.row[pos.row];
  let labelColumn = CinemaLayoutSmall[0].label.column[pos.column];
  labelColumn = Number(labelColumn) > 9 ? labelColumn : '0' + labelColumn;
  return labelRow + labelColumn;
}

export function convertListSeatsLabel(listPos: SeatPosition[]): string {
  let list = '';
  listPos.map((pos) => {
    list = list + convertPosToLabel(pos) + ', ';
  });
  return list.substring(0, list.length - 2);
}

export function handleDetailCombo(combo: ComboInfo): string {
  let detailText = '';
  combo.detail.map((detail) => {
    detailText += detail.type + '(x' + detail.quantity + '); ';
  });
  return detailText;
}

export function handleListCombo(listCombo: ComboSet[]) {
  let text = '';
  if (listCombo) {
    listCombo.map((combo) => {
      text = text + combo.count + ' ' + combo.name + ', ';
    });
    return text.substring(0, text.length - 2);
  }
  return text;
}
