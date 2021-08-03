import * as express from 'express';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
import { CorProdutoService } from '../services';
import BaseController from './base.controller';

const CorProdutoRouter = express();

export class CorProdutoController extends BaseController {
  constructor(service:CorProdutoService) {
    super(service)
  }
}

const CorProdutoCtrl = new CorProdutoController(new CorProdutoService())

CorProdutoRouter.get(RouteDictionary.CorProduto,CorProdutoCtrl.Ler)
.put(RouteDictionary.CorProduto, ensureIsAdmin, CorProdutoCtrl.Editar)
.post(RouteDictionary.CorProduto, ensureIsAdmin, CorProdutoCtrl.Incluir)
.delete(RouteDictionary.CorProduto + `:id`, ensureIsAdmin, CorProdutoCtrl.Remover);

export {
  CorProdutoRouter
}
