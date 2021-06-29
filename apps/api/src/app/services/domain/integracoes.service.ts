import { entities, enums } from '@personalizados-lopes/data';
import { Integracoes } from 'libs/data/src/lib/classes';

import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';

export class IntegracoesService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Integracoes.NomeID);

  }

}
