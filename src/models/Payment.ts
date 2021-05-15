import {Model} from '@react3l/react3l';

export class Payment extends Model {
  public textAmount?: number;
  public amount?: number;
  public description?: string;
  public processing?: boolean;
}
