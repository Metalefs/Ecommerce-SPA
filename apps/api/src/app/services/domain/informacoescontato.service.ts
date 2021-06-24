import { entities, enums } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class InformacoesContatoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.InformacoesContato.NomeID);

  }

}
