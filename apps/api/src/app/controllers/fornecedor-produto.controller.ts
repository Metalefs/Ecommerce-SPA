import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import * as express from 'express';
import BaseController from './base.controller';
import { FornecedorProdutoService } from '../services';

const FornecedorProdutoRouter = express();

export class FornecedorProdutoController extends BaseController {
  constructor(service:FornecedorProdutoService) {
    super(service);
  }
}

const FornecedorProdutoCtrl = new FornecedorProdutoController(new FornecedorProdutoService())

FornecedorProdutoRouter.get(RouteDictionary.FornecedorProduto,FornecedorProdutoCtrl.Ler);
FornecedorProdutoRouter.put(RouteDictionary.FornecedorProduto,FornecedorProdutoCtrl.Editar);
FornecedorProdutoRouter.post(RouteDictionary.FornecedorProduto,FornecedorProdutoCtrl.Incluir);
FornecedorProdutoRouter.delete(RouteDictionary.FornecedorProduto + `:id`,FornecedorProdutoCtrl.Remover);

export {
  FornecedorProdutoRouter
}
