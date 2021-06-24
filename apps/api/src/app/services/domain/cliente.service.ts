import { entities, enums } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class ClienteService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Cliente.NomeID);

  }


}
