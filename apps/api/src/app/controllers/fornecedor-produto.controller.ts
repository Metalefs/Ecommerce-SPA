import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import * as express from 'express';
import BaseController from './base.controller';
import { FornecedorProdutoService } from '../services';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const FornecedorProdutoRouter = express();
const fornecedorProdutoService = new FornecedorProdutoService();
export class FornecedorProdutoController extends BaseController {
  constructor(service:FornecedorProdutoService) {
    super(service);
  }
}

const FornecedorProdutoCtrl = new FornecedorProdutoController(fornecedorProdutoService)

FornecedorProdutoRouter.get(RouteDictionary.FornecedorProduto, FornecedorProdutoCtrl.Ler)
.put(RouteDictionary.FornecedorProduto, ensureIsAdmin, FornecedorProdutoCtrl.Editar)
.post(RouteDictionary.FornecedorProduto, ensureIsAdmin, FornecedorProdutoCtrl.Incluir)
.delete(RouteDictionary.FornecedorProduto + `:id`, ensureIsAdmin, FornecedorProdutoCtrl.Remover);

export {
  FornecedorProdutoRouter
}
