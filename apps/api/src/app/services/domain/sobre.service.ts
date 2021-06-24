import { entities, enums } from '@personalizados-lopes/data';
import { Sobre } from 'libs/data/src/lib/classes';
import { BaseService } from '../baseService';

export class SobreService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Sobre.NomeID);

  }


}
