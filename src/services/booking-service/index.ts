import {useBooking} from 'src/services/booking-service/use-booking';
import {useCombo} from 'src/services/booking-service/use-combo';
import {useUserBooking} from 'src/services/booking-service/use-user-booking';

export class BookingService {
  public readonly useBooking = useBooking;

  public readonly useCombo = useCombo;

  public readonly useUserBooking = useUserBooking;
}

export const bookingService: BookingService = new BookingService();
