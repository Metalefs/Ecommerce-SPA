import { entities } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class CorProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.CorProduto.NomeID);

  }

}
