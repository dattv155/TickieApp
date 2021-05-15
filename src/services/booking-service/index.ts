import {useBooking} from 'src/services/booking-service/use-booking';
import {useCombo} from 'src/services/booking-service/use-combo';

export class BookingService {
  public readonly useBooking = useBooking;

  public readonly useCombo = useCombo;
}

export const bookingService: BookingService = new BookingService();
