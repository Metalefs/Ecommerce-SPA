import { entities, enums } from '@personalizados-lopes/data';

import { BaseService } from '../baseService';

export class TemaService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Tema.NomeID);

  }

}
