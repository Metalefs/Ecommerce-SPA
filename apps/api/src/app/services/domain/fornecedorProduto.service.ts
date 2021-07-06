import { entities } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class FornecedorProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.FornecedorProduto.NomeID);

  }

}
