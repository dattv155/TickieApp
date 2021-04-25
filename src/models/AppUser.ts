import {Model} from '@react3l/react3l';

export class AppUser extends Model {
  public uid?: string;
  public fullname?: string;
  public phoneNumber?: string;
  public email?: string;
  public dateOfBirth?: Date;
  public gender?: string;
  public province?: string;
  public createAt?: Date;
  public userImg?: string;
}
