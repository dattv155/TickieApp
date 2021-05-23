import {Model} from '@react3l/common';
import {ComboSet} from 'src/models/ComboSet';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {SeatPosition} from 'src/models/SeatPosition';

export class MovieBooking extends Model {
  public cinemaName?: string;
  public combos?: ComboSet[];
  public date?: FirebaseFirestoreTypes.Timestamp;
  public filmType?: string;
  public movieName?: string;
  public position?: SeatPosition[];
  public time?: string;
  public totalCost?: number;
  public userId?: string;
}
