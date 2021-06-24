import { entities, enums } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class ServicoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Servico.NomeID);

  }

}
