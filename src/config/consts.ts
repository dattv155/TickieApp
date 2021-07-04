import {Dimensions} from 'react-native';
import {CinemaLayoutSmall} from 'src/sample/cinemaLayout';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export {SCREEN_WIDTH, SCREEN_HEIGHT};

export const IMAGE_BASE64_URI_EXTEND: string = 'data:image/jpeg;base64';

export const SEAT_PRICE = 100000;

export const COLUMN_SIZE = CinemaLayoutSmall.size.column;

export const ROW_SIZE = CinemaLayoutSmall.size.row;
