import {useIdFilter} from 'src/services/select-one-service/select-one-service';
import {useNumberFilter} from 'src/services/select-one-service/select-one-service';

export class SelectOneService {
  public readonly useIdFilter = useIdFilter;

  public readonly useNumberFilter = useNumberFilter;
}

export const selectOneService: SelectOneService = new SelectOneService();
