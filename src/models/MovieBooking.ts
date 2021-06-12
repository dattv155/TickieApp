import {Model} from 'react3l-common';
import {ComboSet} from 'src/models/ComboSet';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {SeatPosition} from 'src/models/SeatPosition';
import {Voucher} from 'src/models/Voucher';

export class MovieBooking extends Model {
  public userId?: string;
  public bookingId?: string;
  public movieName?: string;
  public movieInfoType?: string;
  public cinemaFormat?: string;
  public movieTotalTime?: number;
  public cinemaName?: string;
  public date?: FirebaseFirestoreTypes.Timestamp;
  public time?: string;
  public position?: SeatPosition[];
  public listLabelSeats?: string;
  public combos?: ComboSet[];
  public poster?: string;
  public voucher?: Voucher;
  public bookingMoment?: string;
  public paymentMethod?: string;
  public seatCost?: number;
  public comboCost?: number;
  public totalCost?: number;
}
