import {Model} from 'react3l-common';

export class MomoData extends Model {
  public action?: string;
  public partner?: string;
  public appScheme?: string;
  public amount?: number;
  public description?: string;
  public merchantcode?: string;
  public merchantname?: string;
  public merchantnamelabel?: string;
  public language?: string;
  public fee?: number;
  public username?: string;
  public orderId?: string;
  public requestId?: string;
  public orderLabel?: string;
  public extra?: string;
  public enviroment?: '0' | '1';
  public isDev?: boolean;
}
