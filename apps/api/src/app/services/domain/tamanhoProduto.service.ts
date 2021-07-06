import { entities } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class TamanhoProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.TamanhoProduto.NomeID);

  }

}
