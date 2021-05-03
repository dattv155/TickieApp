import {Model} from '@react3l/react3l';
import firebase from 'firebase';

export class AppUser extends Model {
  public uid?: string;
  public fullname?: string;
  public phoneNumber?: string;
  public email?: string;
  public dateOfBirth?: firebase.firestore.Timestamp;
  public gender?: string;
  public province?: string;
  public createAt?: Date;
  public userImg?: string;
}
