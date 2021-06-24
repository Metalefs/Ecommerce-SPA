import { entities, enums } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class CategoriaService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Categoria.NomeID);

  }

}
