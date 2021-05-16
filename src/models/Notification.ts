import {Model} from '@react3l/react3l';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export class Notification extends Model {
  public content?: string;
  public day?: FirebaseFirestoreTypes.Timestamp;
  public span?: string;
  public type?: string;
  public userId?: string;
}
