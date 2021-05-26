import {Model} from 'react3l-common';
import {CinemaSchedule} from 'src/screens/BookingScreen/BookingScreen';

export class Schedule extends Model {
  public id?: number;
  public byType?: string;
  public cinema?: CinemaSchedule[];
}
