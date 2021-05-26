import React from 'reactn';
import {StateTuple} from 'reactn/types/use-global';
import {MovieBooking} from 'src/models/MovieBooking';

export class GlobalState {
  public get bookingData(): MovieBooking {
    return React.getGlobal<GlobalState>().bookingData;
  }

  /**
   * Current Booking Data
   *
   * @type {MovieBooking}
   */
  public useBookingData(): StateTuple<GlobalState, 'bookingData'> {
    return React.useGlobal<GlobalState, 'bookingData'>('bookingData');
  }

  /**
   * Update Booking Data
   *
   * @param bookingData {MovieBooking}
   */
  public async setBookingData(bookingData: MovieBooking): Promise<void> {
    await React.setGlobal<GlobalState>({
      bookingData,
    });
  }

  public async cleanNewBookingData() {
    await React.setGlobal<GlobalState>({
      bookingData: {},
    });
  }
}

export const globalState: GlobalState = new GlobalState();
