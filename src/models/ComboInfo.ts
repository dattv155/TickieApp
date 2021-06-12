import {Model} from 'react3l-common';

export class ComboInfo extends Model {
  public comboID?: number;
  public name?: string;
  public amount?: number;
  public detail?: {
    type?: string;
    quantity?: number;
  }[];
}
