import {Model} from 'react3l-common';
import {Actor} from './Actor';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {MovieSchedule} from 'src/models/MovieSchedule';

export class MovieInfo extends Model {
  public Actor?: Actor[];
  public AverageScore?: number;
  public Description?: string;
  public Director?: string;
  public Duration?: number;
  public Image?: string[];
  public Name?: string;
  public Poster?: string;
  public Release?: FirebaseFirestoreTypes.Timestamp;
  public Schedules?: MovieSchedule[];
  public Trailer?: string;
  public TrailerID?: string;
  public Type?: string;
  public movieID?: number;
}
