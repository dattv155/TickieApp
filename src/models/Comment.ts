import {Model} from '@react3l/react3l';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export class Comment extends Model {
  public avatar?: string;
  public movieId?: string;
  public name?: string;
  public rate?: number;
  public text?: string;
  public time?: FirebaseFirestoreTypes.Timestamp;
  public userId?: string;
}
