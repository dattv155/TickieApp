import {Model} from 'react3l-common';

export class CinemaLayout extends Model {
  public cinemaID?: number;
  public size?: {
    row?: number;
    column?: number;
  };
  public label?: {
    row?: string[];
    column?: string[];
  };
}
