import {Model} from 'react3l-common';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Schedule} from './Schedule';

export class MovieSchedule extends Model {
  public Day?: FirebaseFirestoreTypes.Timestamp;
  public Schedule?: Schedule[];
}
