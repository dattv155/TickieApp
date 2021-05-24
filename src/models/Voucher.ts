import {Model} from 'react3l-common';

export class Voucher extends Model {
  public code?: string;
  public detail?: string;
  public discountPercent?: number;
  public condition?: string;
}
