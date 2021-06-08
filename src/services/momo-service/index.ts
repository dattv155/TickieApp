import {usePayment} from 'src/services/momo-service/use-payment';

export class MomoService {
  public readonly usePayment = usePayment;
}

export const momoService: MomoService = new MomoService();
